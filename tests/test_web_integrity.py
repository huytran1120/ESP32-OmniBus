"""
Automated Web & Assets Integrity Test Suite for ESP32 OmniBus.
Ensures i18n dictionary parity, firmware manifest validity, and link integrity.
"""

import glob
import json
import os
import re
import unittest


class TestESP32OmniBusWeb(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        cls.docs_dir = os.path.join(cls.repo_root, "docs")
        cls.i18n_file = os.path.join(cls.docs_dir, "assets", "omnibus-i18n.js")

    def test_i18n_dictionary_parity(self):
        """Verify that VI and EN dictionaries have 100% key parity."""
        self.assertTrue(os.path.isfile(self.i18n_file), "omnibus-i18n.js must exist")
        with open(self.i18n_file, "r", encoding="utf-8") as f:
            js = f.read()

        vi_match = re.search(r"vi:\s*\{(.*?)\n\s*\},?\s*en:", js, re.DOTALL)
        en_match = re.search(r"en:\s*\{(.*?)\n\s*\}\s*\};", js, re.DOTALL)

        self.assertIsNotNone(vi_match, "vi dictionary block must exist")
        self.assertIsNotNone(en_match, "en dictionary block must exist")

        vi_keys = set(re.findall(r"^\s*([a-zA-Z0-9_]+):", vi_match.group(1), re.MULTILINE))
        en_keys = set(re.findall(r"^\s*([a-zA-Z0-9_]+):", en_match.group(1), re.MULTILINE))

        diff_vi = vi_keys - en_keys
        diff_en = en_keys - vi_keys

        self.assertEqual(diff_vi, set(), f"Keys in VI but missing in EN: {diff_vi}")
        self.assertEqual(diff_en, set(), f"Keys in EN but missing in VI: {diff_en}")
        self.assertGreaterEqual(len(vi_keys), 200, "Dictionary should have at least 200 keys")

    def test_html_data_i18n_coverage(self):
        """Verify all data-i18n tags in key pages are defined in the dictionary."""
        with open(self.i18n_file, "r", encoding="utf-8") as f:
            js = f.read()

        vi_match = re.search(r"vi:\s*\{(.*?)\n\s*\},?\s*en:", js, re.DOTALL)
        vi_keys = set(re.findall(r"^\s*([a-zA-Z0-9_]+):", vi_match.group(1), re.MULTILINE))

        pages = [
            os.path.join(self.docs_dir, "index.html"),
            os.path.join(self.docs_dir, "webflasher", "index.html"),
            os.path.join(self.docs_dir, "web-tools", "index.html"),
        ]

        for page in pages:
            self.assertTrue(os.path.isfile(page), f"Page {page} must exist")
            with open(page, "r", encoding="utf-8") as f:
                html = f.read()

            tags = set(re.findall(r'data-i18n="([^"]+)"', html))
            missing = tags - vi_keys
            self.assertEqual(missing, set(), f"Page {page} has undefined data-i18n keys: {missing}")

    def test_webflasher_manifests_and_firmware_files(self):
        """Verify all 19 manifests are valid JSON and point to existing binaries."""
        manifest_files = glob.glob(os.path.join(self.docs_dir, "webflasher", "manifests", "*.json"))
        self.assertGreaterEqual(len(manifest_files), 15, "Expected at least 15 manifest files")

        firmware_dir = os.path.join(self.docs_dir, "webflasher", "firmwares")
        self.assertTrue(os.path.isdir(firmware_dir), "Firmwares directory must exist")

        for mf in manifest_files:
            with open(mf, "r", encoding="utf-8") as f:
                data = json.load(f)

            self.assertIn("name", data, f"Manifest {mf} missing name")
            self.assertIn("builds", data, f"Manifest {mf} missing builds")

            for build in data["builds"]:
                self.assertIn("parts", build, f"Manifest {mf} missing parts in build")
                for part in build["parts"]:
                    path = part["path"]
                    filename = os.path.basename(path)
                    target = os.path.join(firmware_dir, filename)
                    self.assertTrue(
                        os.path.isfile(target),
                        f"Manifest {os.path.basename(mf)} points to non-existent firmware: {filename}",
                    )
                    self.assertGreater(
                        os.path.getsize(target),
                        1024,
                        f"Firmware binary {filename} must be > 1KB",
                    )

    def test_relative_links_and_assets(self):
        """Scan all HTML files in docs/ to verify local relative links and assets resolve properly."""
        html_files = glob.glob(os.path.join(self.docs_dir, "**", "*.html"), recursive=True)
        self.assertGreater(len(html_files), 50, "Expected numerous HTML pages in docs/")

        broken = []
        for hf in html_files:
            hf_dir = os.path.dirname(hf)
            with open(hf, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()

            links = re.findall(r'(?:href|src)=["\']([^"\']+)["\']', content)
            for link in links:
                link = link.split("?")[0].split("#")[0]
                if not link or link.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:")):
                    continue

                if link.startswith("/"):
                    target = os.path.join(self.docs_dir, link.lstrip("/"))
                else:
                    target = os.path.normpath(os.path.join(hf_dir, link))

                if os.path.isdir(target):
                    target_file = os.path.join(target, "index.html")
                else:
                    target_file = target

                if not os.path.exists(target_file) and not os.path.exists(target):
                    broken.append((hf, link, target_file))

        self.assertEqual(len(broken), 0, f"Found broken relative links: {broken[:10]}")

    def test_demo_simulator_integrity(self):
        """Verify simulator files exist and contain core simulation routines."""
        demo_html = os.path.join(self.docs_dir, "demo", "index.html")
        demo_js = os.path.join(self.docs_dir, "demo", "scripts.js")
        demo_css = os.path.join(self.docs_dir, "demo", "style.css")

        for f in [demo_html, demo_js, demo_css]:
            self.assertTrue(os.path.isfile(f), f"Simulator file {f} must exist")

        with open(demo_js, "r", encoding="utf-8") as f:
            js = f.read()

        self.assertIn("simulateCommandResponse", js, "simulateCommandResponse must be defined")
        self.assertIn("isStaticSim", js, "isStaticSim fallback must be defined")
        self.assertIn("I18N", js, "I18N dictionary must be defined")


if __name__ == "__main__":
    unittest.main()
