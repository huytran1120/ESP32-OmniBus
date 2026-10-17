/**
 * ESP32 OmniBus - Bilingual i18n Engine (Tiếng Việt & English)
 * Prioritizes Vietnamese by default (localStorage key: 'omnibus_lang')
 */

const OMNIBUS_I18N = {
  vi: {
    // Nav
    nav_demo: "Web Demo ⚡",
    nav_flasher: "Nạp Firmware (Web Flasher)",
    nav_tools: "Bộ Công Cụ (Web Tools)",
    nav_quickstart: "Hướng Dẫn Nhanh",
    nav_ecosystem: "Hệ Sinh Thái",
    nav_boards: "Bo Mạch",
    nav_hardware: "Phần Cứng",
    nav_recipes: "Bài Hướng Dẫn",
    nav_docs: "Tài Liệu Wiki",

    // Home Hero
    hero_eyebrow: "ESP32-S3 Firmware Đa Giao Thức · Công Cụ Trình Duyệt · Song Ngữ Việt - Anh",
    hero_title: "ESP32 OmniBus — <span>Mọi giao thức, một trạm phân tích.</span>",
    hero_lead: "<strong>ESP32 OmniBus</strong> biến vi điều khiển ESP32 / ESP32-S3 thành một trạm phân tích, phát triển và gỡ lỗi phần cứng mạnh mẽ. Hỗ trợ hơn 20 giao thức (I2C, SPI, UART, 1-Wire, CAN, Wi-Fi, BLE, LoRa, Sub-GHz...), tích hợp Web Flasher, Web Serial Tools và Web Terminal song ngữ trực tiếp trên trình duyệt.",
    btn_demo: "Trải nghiệm Web Demo ⚡",
    btn_flash: "Nạp Firmware (Web Flasher)",
    btn_tools: "Mở Bộ Công Cụ (Web Tools)",

    // Terminal Hero Preview
    cli_eyebrow: "DÒNG LỆNH CLI · MỘT GIAO DIỆN, ĐA MỤC TIÊU",
    cli_desc: "Tương tác linh hoạt từ Serial Terminal qua USB, giao diện Web qua Wi-Fi, hoặc biến ESP32 thành các USB adapter chuyên dụng.",

    // Quick Start Guide
    qs_eyebrow: "HƯỚNG DẪN DÀNH CHO NGƯỜI DÙNG VIỆT NAM",
    qs_title: "🚀 Hướng Dẫn Bắt Đầu Nhanh (Quick Start Guide)",
    qs_subtitle: "Khởi đầu làm chủ ESP32 OmniBus chỉ trong 4 bước đơn giản trực tiếp trên trình duyệt, không cần cài đặt phần mềm phức tạp.",
    qs_step1_title: "01. Chuẩn Bị Phần Cứng",
    qs_step1_desc: "Dùng cáp USB Type-C truyền dữ liệu (tránh cáp sạc 2 dây). Cắm vào cổng USB/UART hoặc Native USB của ESP32-S3.",
    qs_step1_warning: "⚠️ <strong>Cảnh báo an toàn:</strong> Chân GPIO ESP32 chỉ hoạt động ở mức logic <strong>3.3V</strong>. Tuyệt đối không cấp trực tiếp 5V vào chân GPIO.",
    qs_step2_title: "02. Nạp Firmware 1-Chạm",
    qs_step2_desc: "Mở trang Web Flasher, chọn đúng dòng bo mạch (DevKit 8MB, Super Mini 4MB, Cardputer...), đưa bo vào chế độ boot (nhấn giữ BOOT → bấm RESET → nhả BOOT) rồi bấm Nạp.",
    qs_step2_tip: "💡 Trình duyệt tương thích: Google Chrome, Microsoft Edge, Brave hoặc Opera trên máy tính.",
    qs_step3_title: "03. Trải Nghiệm & Tương Tác",
    qs_step3_desc: "Chưa có mạch? Thử ngay Web Demo Simulator với Trợ lý OmniBus AI dịch tiếng Việt sang lệnh phần cứng. Nếu có mạch, mở Web Serial Terminal tốc độ 115200.",
    qs_step3_tip: "🤖 Trợ lý OmniBus AI: Hỏi bằng tiếng Việt (vd: 'quét địa chỉ chip I2C') để nhận ngay tập lệnh chính xác.",
    qs_step4_title: "04. Tra Cứu Lệnh Cơ Bản",
    cmd_help: "Xem danh mục trợ giúp cú pháp",
    cmd_mode: "Chuyển giao thức (i2c, spi, uart...)",
    cmd_scan: "Quét địa chỉ IC đang nối trên bus",
    cmd_pins: "Xem sơ đồ chân & trạng thái GPIO",
    cmd_status: "Xem điện áp, xung nhịp, kết nối",
    qs_step4_more: "Xem 30+ bài hướng dẫn thực hành (Recipes) →",

    // Home Identity
    identity_eyebrow: "DỰ ÁN ESP32 OMNIBUS",
    identity_title: "Biến vi điều khiển ESP32-S3 thành bàn làm việc phần cứng trên trình duyệt.",
    identity_desc: "Firmware OmniBus kết hợp cùng công cụ trình duyệt, thư viện kịch bản, phần cứng dock mở rộng và tài liệu thực hành để giúp kỹ sư, sinh viên và maker khám phá thế giới phần cứng nhúng dễ dàng.",

    // Ecosystem
    eco_eyebrow: "01 HỆ SINH THÁI",
    eco_title: "Firmware ESP32, công cụ Web Serial, tài liệu phần cứng.",
    eco_intro: "Dự án không chỉ là mã nguồn firmware C++ mà còn là một hệ sinh thái hoàn chỉnh gồm công cụ Web, tài liệu, kịch bản tự động hóa và bo mạch mở rộng.",
    eco_core_title: "ESP32 OmniBus",
    eco_core_desc: "Mã nguồn firmware C++ hỗ trợ bus có dây, giao thức không dây, bộ chuyển đổi USB và tập lệnh gỡ lỗi phần cứng.",
    eco_core_btn: "Xem mã nguồn GitHub ↗",
    eco_flasher_title: "Cài đặt Firmware 1-chạm",
    eco_flasher_desc: "Nạp firmware ESP32 OmniBus và firmware mở rộng cho các bo mạch tương thích trực tiếp từ trình duyệt web.",
    eco_flasher_btn: "Nạp firmware ngay →",
    eco_tools_title: "Công cụ Serial, flash và phân tích",
    eco_tools_desc: "Bộ công cụ phong cách desktop: Web Serial, lập trình SPI flash, AVR, STM32, ESP32, phân tích logic SUMP và điều khiển ngoại vi BPIO2.",
    eco_tools_btn: "Mở bộ công cụ →",
    eco_recipes_title: "Tài liệu thực hành theo tác vụ",
    eco_recipes_desc: "Trang hướng dẫn tìm kiếm được, giải thích sơ đồ đấu dây, câu lệnh mẫu giúp bạn thực hành các tính năng firmware.",
    eco_recipes_btn: "Đọc bài hướng dẫn →",
    eco_wiki_title: "Tài liệu tra cứu lệnh & lý thuyết",
    eco_wiki_desc: "Wiki chuyên sâu về cú pháp lệnh, thông số kỹ thuật từng chế độ giao thức và cấu trúc hệ thống.",
    eco_wiki_btn: "Mở trang Wiki ↗",
    eco_python_title: "Phòng Thí Nghiệm Python (Pyodide)",
    eco_python_desc: "Chạy kịch bản Python trực tiếp trên web để quét cổng, kiểm tra giao thức, thu thập dữ liệu và tự động hoá kiểm thử.",
    eco_python_btn: "Mở Python Lab →",
    eco_modules_title: "Linh Kiện & IC Mẫu",
    eco_modules_desc: "Sơ đồ và hướng dẫn nối dây cho CC1101, SPI flash, PN532, nRF24L01, MCP2515 và nhiều linh kiện phổ biến.",
    eco_modules_btn: "Khám phá linh kiện →",
    eco_dock_title: "Bo Mở Rộng & Mạch Đệm Logic",
    eco_dock_desc: "Mạch đế mở rộng hỗ trợ chuyển đổi mức logic an toàn từ 1.8V đến 5V cho vi điều khiển ESP32.",
    eco_dock_btn: "Xem phần cứng mở rộng →",
    eco_boards_title: "So Sánh & Lựa Chọn Bo Mạch",
    eco_boards_desc: "So sánh cấu hình Cardputer, S3 DevKit, T-Embed, Super Mini, StampS3, AtomS3 trước khi nạp firmware.",
    eco_boards_btn: "So sánh bo mạch →",

    // Section 02: Start Here
    start_eyebrow: "02 BẮT ĐẦU NGAY",
    start_title: "Cài đặt & sử dụng ESP32 OmniBus trực tiếp trên trình duyệt.",
    start_intro: "Sử dụng Web Flasher để nạp firmware, mở Web Serial terminal và bắt đầu thực hành phần cứng ngay lập tức.",
    start_flash_eyebrow: "01 Nạp · Web Flasher",
    start_flash_title: "Nạp ESP32 OmniBus từ trình duyệt",
    start_flash_desc: "Chọn bo mạch tương thích và nạp firmware trong 1-chạm mà không cần cài đặt PlatformIO hay toolchain phức tạp.",
    start_flash_btn: "Mở Web Flasher →",
    start_tools_eyebrow: "02 Bộ Công Cụ USB",
    start_tools_title: "Sử dụng Web Serial Terminal",
    start_tools_desc: "Truy cập dòng lệnh CLI tương tác trực tiếp qua cổng USB trên trình duyệt mà không cần cài thêm phần mềm.",
    start_tools_btn: "Khám phá Web Tools →",

    // Supported Devices
    devices_eyebrow: "Thiết bị hỗ trợ",
    devices_title: "Lựa chọn bo mạch của bạn.",
    devices_desc: "Nhấp vào bo mạch để xem sơ đồ chân GPIO và hướng dẫn đấu nối tương ứng.",

    // Community Video
    video_eyebrow: "Video cộng đồng",
    video_title: "Khám phá phần cứng & giao thức UART cùng M5Stack Cardputer ADV.",
    video_intro: "Chân thành cảm ơn tác giả Douglas Habian đã khám phá ESP32 OmniBus và chia sẻ video hướng dẫn thực tế này.",

    // Protocol Workbench (Section 03)
    bench_eyebrow: "03 BÀN LÀM VIỆC GIAO THỨC",
    bench_title: "Kiểm thử phần cứng nhúng toàn diện chỉ với một bo ESP32-S3.",
    bench_intro: "Biến vi điều khiển thành trạm kiểm thử nhỏ gọn cho các bus có dây, trích xuất firmware, phân tích tín hiệu số và giao thức không dây.",
    bench_c1_title: "Bus I2C, SPI, UART và GPIO Bit-bang",
    bench_c1_desc: "Quét địa chỉ IC, đọc ghi thanh ghi, trích xuất bộ nhớ, bắc cầu cổng nối tiếp, phát xung và kiểm tra bo mạch không cần viết code mẫu.",
    bench_c2_title: "Quy trình bộ nhớ & Nạp firmware",
    bench_c2_desc: "Nạp bo ESP32, đọc chip SPI NOR flash, nạp vi điều khiển AVR qua AVRDUDE, nạp STM32 và sao lưu firmware an toàn.",
    bench_c3_title: "Bắt tín hiệu số, Adapter & Tự động hoá",
    bench_c3_desc: "Máy phân tích logic SUMP, điều khiển ngoại vi BPIO2, chế độ USB CDC adapter và viết script Python tự động hoá tác vụ lab.",
    bench_c4_title: "Sóng vô tuyến & Không dây đa dải",
    bench_c4_desc: "Khám phá Wi-Fi, BLE, Hồng ngoại IR, Sub-GHz CC1101, LoRa SX1262 cùng các module mở rộng cho mọi tình huống đo kiểm thực tế.",

    // FAQ Section (Section 04)
    faq_eyebrow: "04 GIẢI ĐÁP NHANH",
    faq_title: "Câu hỏi thường gặp về ESP32 OmniBus (FAQ)",
    faq_intro: "Tổng hợp câu trả lời nhanh cho các thắc mắc phổ biến nhất của người dùng.",
    faq_q1: "Làm thế nào để sử dụng dòng lệnh CLI của ESP32 OmniBus?",
    faq_a1: "Bạn có thể dùng cùng một giao diện CLI theo 3 cách: kết nối trực tiếp qua USB Serial bằng terminal, truy cập Web CLI qua mạng Wi-Fi, hoặc mở Web Serial Terminal trên trình duyệt Chrome/Edge.",
    faq_q2: "Firmware có chỉ hỗ trợ một loại bo mạch duy nhất không?",
    faq_a2: "Không. Dự án hỗ trợ nhiều dòng bo mạch ESP32-S3 như M5Stack Cardputer, ESP32-S3 DevKit, T-Embed, T-Display, M5StickS3, StampS3, Super Mini và nhiều kit khác.",
    faq_q3: "ESP32 OmniBus có thể thay thế các công cụ máy tính để bàn không?",
    faq_a3: "Với hầu hết các tác vụ cơ bản trong phòng thí nghiệm, câu trả lời là có. Các công cụ web bao gồm serial terminal, nạp firmware ESP32, đọc/ghi SPI flash, nạp chip AVR/STM32 và phân tích logic SUMP mà không cần cài đặt phần mềm máy tính tính năng cồng kềnh.",
    faq_q4: "Có thể tự động hoá các quy trình kiểm tra không?",
    faq_a4: "Hoàn toàn được. Bạn có thể bắt đầu gỡ lỗi thủ công từ CLI hoặc Web Tools, sau đó chuyển sang viết các kịch bản tự động hóa bằng Python để quét cổng, chạy bài test và xuất báo cáo.",
    faq_q5: "Tôi có thể dùng các bo mạch ESP32-S3 khác không?",
    faq_a5: "Có. Bất kỳ bo mạch ESP32-S3 nào có bộ nhớ Flash từ 4MB (khuyến nghị 8MB) trở lên đều có thể chạy ESP32 OmniBus. Lưu ý kiểm tra sơ đồ chân GPIO của từng bo mạch trước khi kết nối dây.",
    faq_q6: "Mạch có hỗ trợ mức điện áp logic từ 1.8V đến 5V không?",
    faq_a6: "Bản thân ESP32 chỉ hoạt động ở mức logic 3.3V. Bạn nên dùng mạch đệm chuyển đổi mức logic (Level Shifter hoặc Dock) khi giao tiếp với thiết bị 1.8V hoặc 5V để tránh làm hỏng chân vi điều khiển.",
    faq_q7: "Dự án này có dễ bắt đầu đối với người mới không?",
    faq_a7: "Rất dễ dàng. Giao diện được thiết kế thân thiện cho cả người mới lẫn kỹ sư giàu kinh nghiệm. Hầu hết các thao tác đều thực hiện trực tiếp trên trình duyệt với hướng dẫn từng bước rõ ràng.",
    faq_q8: "Chi phí để xây dựng một trạm kiểm thử như thế này là bao nhiêu?",
    faq_a8: "Phần mềm hoàn toàn miễn phí và mã nguồn mở 100%. Phần cứng vi điều khiển ESP32-S3 có giá rất bình dân, chỉ từ khoảng 70.000đ đến vài trăm nghìn đồng tùy thuộc vào màn hình, vỏ hộp và linh kiện đi kèm.",

    // Support & Safety Notes
    support_eyebrow: "DỰ ÁN MÃ NGUỒN MỞ",
    support_title: "Xây dựng, chia sẻ và phát triển cùng cộng đồng.",
    support_desc: "ESP32 OmniBus là dự án mã nguồn mở. Hãy duyệt mã nguồn, báo cáo lỗi, đóng góp lệnh mới, bổ sung bài hướng dẫn hoặc phát triển công cụ mới.",
    support_btn1: "Mã nguồn trên GitHub ↗",
    support_btn2: "Góp ý & Báo lỗi ↗",
    safety_eyebrow: "AN TOÀN PHÒNG THÍ NGHIỆM",
    safety_title: "Luôn kiểm tra an toàn điện trước khi cấp nguồn.",
    safety_desc: "Dùng đúng mức điện áp 3.3V, nối chung GND khi cần thiết, tránh chập chân GPIO và chỉ thực nghiệm trên các thiết bị, tần số sóng vô tuyến mà bạn sở hữu hoặc được phép đo kiểm.",

    // Supporters & Footer
    partners_eyebrow: "CỘNG ĐỒNG ĐỒNG HÀNH",
    partners_title: "Đối tác & Nhà tài trợ dự án.",
    partners_intro: "ESP32 OmniBus tự hào nhận được sự đồng hành từ các đối tác phần cứng hàng đầu.",

    // Web Flasher Page
    wf_eyebrow: "⚡ Trình nạp firmware qua trình duyệt",
    wf_title: "Nạp Firmware Một Chạm, Bắt Đầu Sử Dụng Ngay.",
    wf_lead: "Cài đặt firmware ESP32 OmniBus lên các dòng bo mạch ESP32-S3 và ESP32-C5/C6 Bus Expander trực tiếp từ trình duyệt web. Quy trình tinh gọn: chọn bo mạch, nạp firmware, mở Web Serial terminal và làm theo hướng dẫn thực hành.",
    wf_btn_flash: "Chọn bo mạch & Nạp ngay",
    wf_btn_term: "Mở Web Terminal",
    wf_step1_name: "Nạp Firmware",
    wf_step1_text: "Chọn đúng bo mạch bên dưới và khởi chạy trình nạp Web Serial.",
    wf_step2_name: "Mở Terminal",
    wf_step2_text: "Kết nối với bo mạch vừa nạp để xác nhận firmware đã khởi động thành công.",
    wf_step3_name: "Thử Nghiệm",
    wf_step3_text: "Áp dụng các bài hướng dẫn mẫu cho I2C, SPI, UART, GPIO, USB...",
    wf_step4_name: "Tra Cứu Lệnh",
    wf_step4_text: "Đọc Wiki để nắm rõ cú pháp và các thông số nâng cao.",
    wf_select_title: "Chọn loại bo mạch ESP32 OmniBus của bạn",
    wf_select_desc: "Cắm bo mạch vào máy tính qua cáp USB và chọn dòng firmware tương ứng bên dưới. Trình nạp sẽ hướng dẫn bạn từng bước.",
    wf_compat_note: "ⓘ Mọi bo mạch ESP32-S3 có ít nhất 4 MB Flash đều có thể chạy OmniBus với bản firmware S3 DevKit hoặc S3 Super Mini. Sơ đồ chân mặc định có thể khác nhau tùy bo mạch.",
    wf_master_group: "Firmware ESP32 OmniBus (Dành cho ESP32-S3)",
    wf_expander_group: "Firmware Bus Expander (Dành cho ESP32-C5 / ESP32-C6)",
    wf_flash_btn: "⚡ Nạp Firmware đã chọn",
    wf_hint_select: "Vui lòng chọn loại bo mạch ở trên.",
    wf_hint_ready: "Sẵn sàng: Nhấn nút Nạp Firmware.",
    wf_term_title: "Mở Web Serial Terminal sau khi nạp xong",
    wf_term_desc: "Sau khi nạp thành công, rút và cắm lại USB (hoặc bấm nút Reset). Mở Web Serial Terminal để kiểm tra hoạt động và gửi những câu lệnh đầu tiên.",
    wf_before_title: "Lưu ý quan trọng trước khi nạp",
    wf_tip_cable_title: "Dùng cáp USB truyền dữ liệu",
    wf_tip_cable_desc: "Nhiều loại cáp chỉ có 2 lõi sạc nguồn sẽ không hiện cổng COM. Hãy chắc chắn bạn đang dùng cáp USB có đường truyền dữ liệu.",
    wf_tip_port_title: "Chọn đúng cổng USB",
    wf_tip_port_desc: "Một số bo mạch ESP32-S3 có 2 cổng Type-C (1 cổng USB-to-UART và 1 cổng Native USB). Chọn đúng cổng kết nối dùng để nạp.",
    wf_tip_busy_title: "Đóng các ứng dụng đang giữ cổng Serial",
    wf_tip_busy_desc: "Arduino IDE, PlatformIO, PuTTY hoặc các tab trình duyệt khác đang mở cổng Serial sẽ làm xung đột và khiến việc nạp bị lỗi.",
    wf_boot_title: "Mẹo đưa bo mạch vào chế độ nạp (Bootloader)",
    wf_faq_title: "Câu hỏi thường gặp khi nạp Firmware",

    // Web Tools Page
    wt_banner_title: "Bộ Công Cụ Web Tools:",
    wt_banner_desc: "Sử dụng trực tiếp trên trình duyệt với ESP32 OmniBus hoặc các thiết bị phần cứng tương thích. Hãy chuyển đổi vi điều khiển sang đúng chế độ adapter trước khi sử dụng từng công cụ.",
    wt_term_title: "Web Serial Terminal",
    wt_term_desc: "Đọc log dữ liệu, gửi câu lệnh và lưu phiên làm việc. Kết nối ESP32, Arduino, Bus Pirate hoặc bất kỳ thiết bị USB-UART/CDC-ACM nào.",
    wt_term_btn: "Mở Terminal ↗",
    wt_flash_title: "Lập trình Chip nhớ SPI Flash",
    wt_flash_desc: "Nhận diện, đọc và ghi chip nhớ SPI NOR Flash (W25Qxx, GD25Qxx...) qua flashrom và adapter serprog. Sao lưu bản dump trực tiếp về máy tính.",
    wt_flash_btn: "Mở SPI Flash Programmer ↗",
    wt_logic_title: "Máy Phân Tích Logic (SUMP)",
    wt_logic_desc: "Thu thập tín hiệu số với phần cứng chuẩn SUMP và phân tích dạng sóng trực quan. Xuất file VCD, CSV, binary thô hoặc JSON.",
    wt_logic_btn: "Mở Logic Analyzer ↗",
    wt_sdr_title: "Máy Thu Phát Sóng SDR (2.4 GHz)",
    wt_sdr_desc: "Bộ thu SDR dải rộng khoảng 2.2–2.8 GHz với biểu đồ phổ và thác nước (waterfall), theo dõi đỉnh xung và phân tích tín hiệu bằng sóng vô tuyến nội bộ của ESP32-S3.",
    wt_sdr_btn: "Mở ESP SDR ↗",
    wt_esptool_title: "Công Cụ Quản Lý & Nạp ESP",
    wt_esptool_desc: "Nạp firmware, đọc dữ liệu NVS, trích xuất bộ nhớ LittleFS, sao lưu hoặc xóa trắng chip ESP. Ghép nối file nhị phân offline với esptool-js.",
    wt_esptool_btn: "Mở ESP Tool ↗",
    wt_stm32_title: "Nạp Vi Điều Khiển STM32",
    wt_stm32_desc: "Nạp file firmware BIN hoặc Intel HEX, sao lưu bộ nhớ và xóa chip STM32. Kết nối qua bootloader ROM UART hoặc adapter ST-Link WebUSB.",
    wt_stm32_btn: "Mở STM32 Programmer ↗",
    wt_avr_title: "Nạp Vi Điều Khiển AVR (AVRDUDE)",
    wt_avr_desc: "Nhận diện chip ATmega và ATtiny, đọc bộ nhớ và nạp file HEX bằng AVRDUDE WebAssembly qua adapter ESP32 OmniBus AVRDUDE.",
    wt_avr_btn: "Mở AVR Programmer ↗",
    wt_bpio_title: "Điều Khiển Bit Bang Ngoại Vi (BPIO2)",
    wt_bpio_desc: "Điều khiển trực quan các chân GPIO, quét địa chỉ thiết bị I2C và trao đổi byte SPI từ xa với phần cứng tương thích BPIO2.",
    wt_bpio_btn: "Mở Bit Bang Controller ↗",
    wt_py_title: "Phòng Thí Nghiệm Python (Pyodide)",
    wt_py_desc: "Chạy Python trực tiếp trên trình duyệt bằng Pyodide và điều khiển ESP32 OmniBus qua Web Serial. Viết kịch bản tự động hóa hoặc dùng mẫu có sẵn.",
    wt_py_btn: "Mở Python Lab ↗",
    wt_browser_title: "Trình Duyệt Hỗ Trợ",
    wt_browser_desc: "Web Serial hoạt động tốt nhất trên Chrome, Edge, Brave, Opera và các trình duyệt Chromium trên máy tính. Safari trên iOS/macOS chưa hỗ trợ Web Serial.",
    wt_privacy_title: "Bảo Mật & Riêng Tư",
    wt_privacy_desc: "Mọi luồng dữ liệu serial log, flash chip và dạng sóng logic đều được xử lý 100% cục bộ trên trình duyệt máy tính của bạn, không tải lên bất kỳ máy chủ nào.",
    wt_suggest_eyebrow: "Ý tưởng & Đề xuất",
    wt_suggest_title: "Bạn muốn thêm công cụ mới?",
    wt_suggest_desc: "Bạn cần thêm tính năng hoặc hỗ trợ giao thức nào? Mở issue trên GitHub kèm mô tả thiết bị và tài liệu tham khảo.",
    wt_suggest_btn: "Đề xuất trên GitHub ↗",
    wt_companion_eyebrow: "0x Phân tích chuyên sâu",
    wt_companion_title: "Phân tích dữ liệu & Firmware đã trích xuất",
    wt_companion_desc: "Sử dụng các công cụ nền web sau khi bắt tín hiệu, đọc log serial hoặc đọc chip nhớ để phân tích byte hex, giải nén file con và đảo ngược firmware.",
    wt_compat_heading: "Khả năng tương thích & Mẹo sử dụng",
    wt_compat_subheading: "Hoạt động với ESP32 OmniBus và các thiết bị tương thích",
    wt_compat_desc: "Các công cụ web này được thiết kế tối ưu cho ESP32 OmniBus, nhưng cũng tương thích với mọi phần cứng hỗ trợ chuẩn giao tiếp mở tương đương.",
    wt_faq_b_title: "Trình duyệt được hỗ trợ",
    wt_faq_b_desc: "Web Serial hoạt động trên Chrome, Edge, Opera, Brave và các trình duyệt Chromium trên máy tính. Safari hiện chưa hỗ trợ Web Serial.",
    wt_faq_h_title: "Phần cứng tương thích",
    wt_faq_h_desc: "Hệ điều hành cần nhận diện bo mạch ESP32, USB UART hoặc thiết bị CDC-ACM trước khi trình duyệt có thể yêu cầu cấp quyền truy cập.",
    wt_faq_l_title: "Quyền truy cập trên Linux",
    wt_faq_l_desc: "Nếu không mở được cổng serial trên Linux, hãy cấp quyền cho tài khoản bằng lệnh <code>sudo setfacl -m u:$USER:rw /dev/ttyACM0</code> rồi cắm lại mạch.",
    wt_faq_p_title: "Bảo mật & Quyền riêng tư",
    wt_faq_p_desc: "Toàn bộ log cổng nối tiếp, dữ liệu chip nhớ flash và dạng sóng logic đều được xử lý cục bộ ngay trên trình duyệt máy tính của bạn, không tải lên bất kỳ máy chủ nào.",
    wt_os_title: "Gỡ lỗi phần cứng mã nguồn mở ngay trên trình duyệt",
    wt_os_p1: "ESP32 OmniBus là firmware mã nguồn mở biến các bo mạch ESP32-S3 thành công cụ đa năng để phân tích, đo kiểm và gỡ lỗi phần cứng lấy cảm hứng từ Bus Pirate.",
    wt_os_p2: "Hỗ trợ giao diện dòng lệnh CLI qua cổng Serial và giao diện Web cho UART, I2C, SPI, 1-Wire, 2-Wire, 3-Wire, CAN, JTAG/SWD, hồng ngoại IR, Wi-Fi, BLE, Sub-GHz, RFID, RF24, FM và các chế độ adapter USB.",
    wt_os_p3: "Bộ công cụ web này giúp người dùng dễ dàng thao tác mà không cần cài đặt phần mềm máy tính phức tạp.",
    wt_os_cap1_title: "Dòng lệnh Serial & Web CLI",
    wt_os_cap1_desc: "Sử dụng chung một tập lệnh trên cả cổng USB Serial vật lý, giao diện Web qua Wi-Fi hoặc Web Serial Terminal trên trình duyệt.",
    wt_os_cap2_title: "Bàn làm việc giao thức",
    wt_os_cap2_desc: "Quét tìm thiết bị, bắt gói tin (sniff), truyền lệnh, lập trình kịch bản và khảo sát các giao thức có dây lẫn không dây.",
    wt_os_cap3_title: "Bộ nhớ & Firmware",
    wt_os_cap3_desc: "Đọc ghi EEPROM, SPI flash, thẻ chip thông minh, SIM, iButton, thẻ RFID và trích xuất firmware an toàn."
  },
  en: {
    // Nav
    nav_demo: "Web Demo ⚡",
    nav_flasher: "Web Flasher",
    nav_tools: "Web Tools",
    nav_quickstart: "Quick Start",
    nav_ecosystem: "Ecosystem",
    nav_boards: "Boards",
    nav_hardware: "Hardware",
    nav_recipes: "Recipes",
    nav_docs: "Docs Wiki",

    // Home Hero
    hero_eyebrow: "ESP32-S3 Multi-Protocol Firmware · Browser Tools · Bilingual VI - EN",
    hero_title: "ESP32 OmniBus — <span>Every protocol, one hardware workbench.</span>",
    hero_lead: "<strong>ESP32 OmniBus</strong> turns compatible ESP32-S3 development boards into a versatile hardware debugging and exploration station. Supporting 20+ protocols (I2C, SPI, UART, 1-Wire, CAN, Wi-Fi, BLE, LoRa, Sub-GHz...), with browser-based Web Flasher, Web Serial tools and bilingual interactive terminal.",
    btn_demo: "Launch Web Demo ⚡",
    btn_flash: "Flash Firmware (Web Flasher)",
    btn_tools: "Open Web Tools",

    // Terminal Hero Preview
    cli_eyebrow: "CLI · ONE INTERFACE, MANY TARGETS",
    cli_desc: "Use it from a serial terminal, from browser-based tools, or as a dedicated USB adapter for firmware and signal workflows.",

    // Quick Start Guide
    qs_eyebrow: "QUICK START GUIDE & USAGE TIPS",
    qs_title: "🚀 Quick Start Guide",
    qs_subtitle: "Master ESP32 OmniBus in 4 simple steps directly from your web browser, no complex IDE installation needed.",
    qs_step1_title: "01. Hardware Setup",
    qs_step1_desc: "Use a USB Type-C data cable (avoid charging-only cables). Connect to the ESP32-S3 USB/UART or Native USB port.",
    qs_step1_warning: "⚠️ <strong>Safety Warning:</strong> ESP32 GPIOs operate strictly at <strong>3.3V</strong> logic. Never apply 5V directly to GPIO pins without a level shifter.",
    qs_step2_title: "02. One-Click Flashing",
    qs_step2_desc: "Open Web Flasher, pick your board model (DevKit 8MB, Super Mini 4MB, Cardputer...), enter boot mode (hold BOOT → click RESET → release BOOT), and click Flash.",
    qs_step2_tip: "💡 Compatible browsers: Google Chrome, Microsoft Edge, Brave or Opera on desktop.",
    qs_step3_title: "03. Try & Interact",
    qs_step3_desc: "No board yet? Test on the Web Demo Simulator with OmniBus AI translating natural queries into hardware commands. If hardware is connected, launch Web Serial Terminal at 115200 baud.",
    qs_step3_tip: "🤖 OmniBus AI Assistant: Ask in plain English (e.g., 'scan I2C devices') to get ready-to-run hardware commands.",
    qs_step4_title: "04. Essential Commands",
    cmd_help: "Display help and syntax index",
    cmd_mode: "Switch protocol (i2c, spi, uart...)",
    cmd_scan: "Scan addresses of devices on bus",
    cmd_pins: "Inspect pinout & current GPIO state",
    cmd_status: "View voltage, clock, connection info",
    qs_step4_more: "Explore 30+ practical task guides (Recipes) →",

    // Home Identity
    identity_eyebrow: "ESP32 OMNIBUS PROJECT",
    identity_title: "Turn a $5 ESP32-S3 into a browser-based hardware workbench.",
    identity_desc: "The OmniBus firmware is complemented by scripting, hardware dock, extension, adapters, browser tools, documentation and practical embedded workflows to enable comprehensive hardware debugging and development.",

    // Ecosystem
    eco_eyebrow: "01 ECOSYSTEM",
    eco_title: "ESP32 firmware, web serial tools, hardware guides.",
    eco_intro: "The project is more than a C++ firmware repo: it includes browser workflows, documentation, scripts, boards and companion hardware.",
    eco_core_title: "ESP32 OmniBus",
    eco_core_desc: "C++ firmware for wired buses, wireless protocols, USB adapters, device shells and hardware debugging commands.",
    eco_core_btn: "View source on GitHub ↗",
    eco_flasher_title: "Firmware one-click install",
    eco_flasher_desc: "Flash ESP32 OmniBus and companion firmware for supported devices directly from your web browser.",
    eco_flasher_btn: "Flash firmware →",
    eco_tools_title: "Serial, flash and capture tools",
    eco_tools_desc: "Desktop-style tools for Web Serial, SPI flash, AVR, STM32, ESP32, SUMP logic capture and BPIO2 GPIO/I2C/SPI.",
    eco_tools_btn: "Open tools →",
    eco_recipes_title: "Practical bench documentation",
    eco_recipes_desc: "Searchable task pages that explain wiring, commands and helps to learn and practice the firmware features.",
    eco_recipes_btn: "Read recipes →",
    eco_wiki_title: "Theoretical bench documentation",
    eco_wiki_desc: "Comprehensive wiki detailing syntax, modes, hardware adapters and theoretical documentation.",
    eco_wiki_btn: "Open wiki ↗",
    eco_python_title: "Web Scripting Lab (Pyodide)",
    eco_python_desc: "Run Python workflows to automate scans, protocol checks, signal captures, test reports and repeatable tasks.",
    eco_python_btn: "Open Python Lab →",
    eco_modules_title: "Modules and Chips",
    eco_modules_desc: "Wiring guides for CC1101, SPI flash, PN532, nRF24L01, MCP2515 and other common workbench parts.",
    eco_modules_btn: "Explore modules →",
    eco_dock_title: "Dock & Adapters",
    eco_dock_desc: "A carrier-board direction for adapters, accessories and logic level shifting from 1.8V to 5V.",
    eco_dock_btn: "Explore hardware →",
    eco_boards_title: "Pick the Right Target Board",
    eco_boards_desc: "Compare Cardputer, S3 DevKit, T-Embed, Super Mini, StampS3 and AtomS3 before flashing.",
    eco_boards_btn: "Compare boards →",

    // Section 02: Start Here
    start_eyebrow: "02 START HERE",
    start_title: "Flash and use ESP32 OmniBus in your browser.",
    start_intro: "Use the Web Flasher, open the Web Serial terminal, then explore, script and interact with hardware directly.",
    start_flash_eyebrow: "01 Flash · Web Flasher",
    start_flash_title: "Install ESP32 OmniBus from your browser",
    start_flash_desc: "Choose a supported ESP32 board and flash the firmware without setting up PlatformIO or a local toolchain.",
    start_flash_btn: "Open Web Flasher →",
    start_tools_eyebrow: "02 USB Web Tools",
    start_tools_title: "Use the Web Serial Terminal",
    start_tools_desc: "Access the terminal CLI directly from your browser without additional software.",
    start_tools_btn: "Browse Web Tools →",

    // Supported Devices
    devices_eyebrow: "Supported devices",
    devices_title: "Choose your board.",
    devices_desc: "Select a board for its pinout and wiring guide.",

    // Community Video
    video_eyebrow: "Community video",
    video_title: "Exploring hardware and UART with the Cardputer ADV.",
    video_intro: "Thank you to Douglas Habian for exploring ESP32 OmniBus and sharing this tutorial video.",

    // Protocol Workbench (Section 03)
    bench_eyebrow: "03 PROTOCOL WORKBENCH",
    bench_title: "Embedded hardware debugging from one ESP32-S3 device.",
    bench_intro: "Use the firmware and browser tools as a compact bench for common wired buses, firmware extraction, signal capture and wireless exploration.",
    bench_c1_title: "I2C, SPI, UART and GPIO bit-bang",
    bench_c1_desc: "Scan devices, read registers, dump memories, bridge serial ports, generate pulses and test boards without writing sketches.",
    bench_c2_title: "Firmware and memory workflows",
    bench_c2_desc: "Flash ESP32 boards, read SPI NOR flash, program AVR targets, explore STM32 bootloaders and keep repeatable backups in browser.",
    bench_c3_title: "Signals, adapters and automation",
    bench_c3_desc: "Use SUMP logic analyzer capture, BPIO2 peripheral control, USB CDC adapters and Python scripts for repeatable lab tests.",
    bench_c4_title: "Wireless and mixed benches",
    bench_c4_desc: "Explore Wi-Fi, BLE, infrared, Sub-GHz, LoRa and companion board features alongside wired protocols.",

    // FAQ Section (Section 04)
    faq_eyebrow: "04 QUICK ANSWERS",
    faq_title: "ESP32 OmniBus FAQ",
    faq_intro: "Short answers for searchers who land here before opening the Wiki, Repo, Recipes or Web Tools.",
    faq_q1: "How can I use the ESP32 OmniBus CLI?",
    faq_a1: "Use the same CLI in three ways: directly over USB Serial, through the Web CLI over Wi-Fi, or with the browser-based Web Serial terminal.",
    faq_q2: "Is it only for one board?",
    faq_a2: "No. The firmware targets several ESP32-S3 boards and companion hardware, including Cardputer, DevKit, T-Embed, T-Display, Super Mini and StampS3.",
    faq_q3: "Can it replace desktop tools?",
    faq_a3: "For many common bench tasks, yes. The browser tools cover serial terminals, ESP32 flashing, SPI flash, AVR/STM32 programming and SUMP logic capture without desktop tools.",
    faq_q4: "Can workflows be automated?",
    faq_a4: "Yes. You can start from CLI or Web Tools for manual debugging, then move repeatable checks to Python scripts for scans, captures, reports and lab automation.",
    faq_q5: "Can I use another ESP32-S3 board?",
    faq_a5: "Yes. Any ESP32-S3 board with at least 4 MB of flash (8 MB recommended) can run ESP32 OmniBus; PSRAM is not required. Check pin mapping before wiring.",
    faq_q6: "Can I use 1.8 V to 5 V logic levels?",
    faq_a6: "The ESP32 itself uses 3.3 V GPIO logic. Use level shifting adapters or the Dock for compatible 1.8 V to 5 V target logic to avoid damaging the chip.",
    faq_q7: "Is it easy to get started?",
    faq_a7: "Yes. The interface is designed for beginners and experienced users alike. Most tasks run directly in the browser with guided workflows and clear controls.",
    faq_q8: "What does it cost?",
    faq_a8: "The software is 100% free and open-source. Compatible hardware boards range from around $5 to $50 depending on screen, enclosure and accessories.",

    // Support & Safety Notes
    support_eyebrow: "OPEN COMMUNITY PROJECT",
    support_title: "Build, share, improve together.",
    support_desc: "ESP32 OmniBus is open source. Browse the source, report issues, contribute commands, document recipes, or reuse the browser-tool patterns.",
    support_btn1: "Source on GitHub ↗",
    support_btn2: "Issues & ideas ↗",
    safety_eyebrow: "LAB SAFE USE",
    safety_title: "Keep the setup intentional and verified.",
    safety_desc: "Use the correct voltage, share ground only when appropriate, avoid unsafe wiring, and work only on devices and frequencies you own or are authorized to test.",

    // Supporters & Footer
    partners_eyebrow: "PROJECT SUPPORTERS",
    partners_title: "Proudly supported by community partners.",
    partners_intro: "ESP32 OmniBus is supported by these premier hardware ecosystem partners.",

    // Web Flasher Page
    wf_eyebrow: "⚡ Browser firmware installer",
    wf_title: "Flash the firmware in one click, then start using it.",
    wf_lead: "Install ESP32 OmniBus firmware on supported ESP32-S3 boards and the ESP32-C5/C6 Bus Expander directly from your browser. Flash the device, open Web Serial terminal, and follow practical recipes or theoretical documentation.",
    wf_btn_flash: "Select board and flash",
    wf_btn_term: "Open Web terminal",
    wf_step1_name: "Flash firmware",
    wf_step1_text: "Select the exact board and launch the Web Serial installer.",
    wf_step2_name: "Open terminal",
    wf_step2_text: "Connect to the flashed board and check the ESP32 OmniBus CLI.",
    wf_step3_name: "Try a recipe",
    wf_step3_text: "Use practical examples for I2C, SPI, UART, GPIO, USB and more.",
    wf_step4_name: "Read the reference",
    wf_step4_text: "Use the wiki for commands, modes and theoretical documentation.",
    wf_select_title: "Select your ESP32 OmniBus target",
    wf_select_desc: "Plug in your board with a USB cable and select the corresponding firmware below. The installer will guide you through the flashing process.",
    wf_compat_note: "ⓘ Any ESP32-S3 with at least 4 MB of flash can run OmniBus with the S3 DevKit or S3 Super Mini firmware. Default pin mapping may vary by board.",
    wf_master_group: "ESP32 OmniBus firmware (ESP32-S3)",
    wf_expander_group: "ESP32 Bus Expander firmware (ESP32-C5 / ESP32-C6)",
    wf_flash_btn: "⚡ Flash selected firmware",
    wf_hint_select: "Select a board above.",
    wf_hint_ready: "Ready: Click Flash.",
    wf_term_title: "Open the Web Serial terminal after flashing",
    wf_term_desc: "After the install, reconnect the board normally and open the terminal from the browser. It is the quickest way to confirm that the firmware booted.",
    wf_before_title: "Make the first flash predictable",
    wf_tip_cable_title: "Use a data USB cable",
    wf_tip_cable_desc: "Charging-only cables can power the board without exposing a serial port. Use a known working data cable.",
    wf_tip_port_title: "Select the right USB port",
    wf_tip_port_desc: "Some ESP32-S3 boards expose native USB and a separate UART bridge. Use the board port intended for flashing.",
    wf_tip_busy_title: "Close other serial tools",
    wf_tip_busy_desc: "Serial monitors, IDEs or previous browser tabs can keep the port busy and prevent the installer from connecting.",
    wf_boot_title: "Board-specific flashing tips",
    wf_faq_title: "Common Web Flasher issues",

    // Web Tools Page
    wt_banner_title: "Web Tools:",
    wt_banner_desc: "Use with OmniBus or other compatible devices. For OmniBus, switch to the correct USB adapter mode before using a tool.",
    wt_term_title: "Serial terminal",
    wt_term_desc: "Read logs, send commands and save serial sessions. Connect an ESP32, Arduino, Bus Pirate or any compatible USB-UART or CDC-ACM device.",
    wt_term_btn: "Open terminal ↗",
    wt_flash_title: "SPI flash programmer",
    wt_flash_desc: "Identify, read and write SPI NOR flash chips with flashrom and a serprog-compatible adapter. Save firmware dumps straight to your computer.",
    wt_flash_btn: "Open flash programmer ↗",
    wt_logic_title: "Logic analyzer",
    wt_logic_desc: "Capture digital signals with SUMP-compatible hardware and inspect waveforms. Export captures as VCD, CSV, raw binary or session JSON.",
    wt_logic_btn: "Open logic analyzer ↗",
    wt_sdr_title: "ESP SDR (2.4 GHz)",
    wt_sdr_desc: "Wideband SDR covering roughly 2.2–2.8 GHz, with spectrum and waterfall views, peak and occupancy tracking, and live signal inspection with the built-in ESP32-S3 radio.",
    wt_sdr_btn: "Open ESP SDR ↗",
    wt_esptool_title: "ESP tool",
    wt_esptool_desc: "Flash firmware, read NVS, extract littleFS, back up memory or erase an ESP chip. Merge binaries offline and work with standard ESP32 layouts.",
    wt_esptool_btn: "Open ESP tool ↗",
    wt_stm32_title: "STM32 programmer",
    wt_stm32_desc: "Flash BIN or Intel HEX firmware, back up memory and erase STM32 targets. Connect through the ROM UART bootloader or an ST-Link adapter.",
    wt_stm32_btn: "Open STM32 programmer ↗",
    wt_avr_title: "AVR programmer",
    wt_avr_desc: "Detect ATmega and ATtiny chips, read memory and write HEX files with AVRDUDE. An experimental tool for the ESP32 OmniBus AVRDUDE adapter.",
    wt_avr_btn: "Open AVR programmer ↗",
    wt_bpio_title: "Bit Bang controller (BPIO2)",
    wt_bpio_desc: "Control GPIOs, scan I2C devices and exchange SPI data with BPIO2-compatible hardware. Build visual sequences to repeat common operations.",
    wt_bpio_btn: "Open Bit Bang controller ↗",
    wt_py_title: "Python lab",
    wt_py_desc: "Run Python with Pyodide and control OmniBus over Web Serial. Start from the ESP32-OmniBus-Scripts examples or write your own CLI and BPIO2 scripts.",
    wt_py_btn: "Open Python lab ↗",
    wt_browser_title: "Supported Browsers",
    wt_browser_desc: "Web Serial works in Chrome, Edge, Brave, Opera and compatible Chromium browsers on desktop. Safari does not currently support Web Serial.",
    wt_privacy_title: "Local Privacy",
    wt_privacy_desc: "Serial logs, flash data and logic analyzer captures are processed locally by these static pages. The application does not upload captures to any server.",
    wt_suggest_eyebrow: "Idea & Request",
    wt_suggest_title: "Need a new web tool?",
    wt_suggest_desc: "Need extra protocol support or a custom workflow? Open an issue on GitHub with your target hardware details.",
    wt_suggest_btn: "Suggest on GitHub ↗",
    wt_companion_eyebrow: "0x Analysis follow-up",
    wt_companion_title: "Inspect hardware data",
    wt_companion_desc: "Use these browser tools after captures, serial logs or firmware reads to inspect bytes, extract ranges, parse structures and study small executable payloads.",
    wt_compat_heading: "Compatibility and Usage Tips",
    wt_compat_subheading: "Works with ESP32 OmniBus and compatible protocol devices",
    wt_compat_desc: "These browser tools are built for ESP32 OmniBus workflows, but they also work with other hardware that exposes the same open interfaces and protocol adapters.",
    wt_faq_b_title: "Supported Browsers",
    wt_faq_b_desc: "Web Serial works in Chrome, Firefox, Edge, Opera and compatible Chromium browsers on desktop. Safari does not currently support Web Serial hardware access.",
    wt_faq_h_title: "Supported Hardware",
    wt_faq_h_desc: "The operating system must recognize your ESP32 board, USB UART adapter, CDC-ACM device or ESP32 OmniBus USB mode before the browser can request access.",
    wt_faq_l_title: "Linux Serial Access",
    wt_faq_l_desc: "If serial access fails on Linux, grant your user access to the device with <code>sudo setfacl -m u:$USER:rw /dev/ttyACM0</code>, then reconnect the board.",
    wt_faq_p_title: "Local Privacy",
    wt_faq_p_desc: "Serial logs, flash data and logic analyzer captures are processed locally by these static pages. The application does not upload captures to a server.",
    wt_os_title: "Open-source hardware debugging in the browser",
    wt_os_p1: "ESP32 OmniBus is an open-source firmware that turns compatible ESP32-S3 devices into a multi-protocol hardware hacking and debugging tool inspired by the Bus Pirate.",
    wt_os_p2: "It supports serial and web command-line workflows for UART, I2C, SPI, 1-Wire, 2-Wire, 3-Wire, CAN, JTAG/SWD, infrared, Wi-Fi, Bluetooth, Sub-GHz, RFID, RF24, FM and USB adapter modes.",
    wt_os_p3: "These web tools strengthen the ESP32 OmniBus ecosystem by making common embedded workflows discoverable from a secure browser page: serial console access, firmware memory work, digital logic capture and protocol investigation.",
    wt_os_cap1_title: "Serial and Web CLI",
    wt_os_cap1_desc: "Use the same command structure over USB serial, Wi-Fi web interface or browser-based Web Serial workflows.",
    wt_os_cap2_title: "Protocol Workbench",
    wt_os_cap2_desc: "Scan, sniff, send, script, dump, explore wired and wireless protocols.",
    wt_os_cap3_title: "Firmware and Memory",
    wt_os_cap3_desc: "Work with EEPROM, flash, smartcard, SIM, iButton, RFID tag, firmware dumps."
  }
};

let currentLang = localStorage.getItem("omnibus_lang") || "vi";

function setLanguage(lang) {
  if (lang !== "vi" && lang !== "en") lang = "vi";
  currentLang = lang;
  localStorage.setItem("omnibus_lang", lang);
  applyTranslations();
  updateLangButtons();
  document.documentElement.lang = lang;
}

function updateLangButtons() {
  const viBtns = document.querySelectorAll(".lang-btn-vi, #lang-vi-btn");
  const enBtns = document.querySelectorAll(".lang-btn-en, #lang-en-btn");
  viBtns.forEach(btn => btn.classList.toggle("active", currentLang === "vi"));
  enBtns.forEach(btn => btn.classList.toggle("active", currentLang === "en"));
}

function applyTranslations() {
  const t = OMNIBUS_I18N[currentLang] || OMNIBUS_I18N.vi;
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  // Special hooks for dynamic elements
  if (typeof window.onLanguageChange === "function") {
    window.onLanguageChange(currentLang, t);
  }
}

// Auto-run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
});
