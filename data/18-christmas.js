problems.push({
    id: 'algo_christmas_discount',
    index: '18',
    name: 'Giảm giá Giáng sinh',
    subtext: 'EIUCHRMS - Flat Rate Discount',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Cửa hàng giảm giá dựa trên tổng giá trị hóa đơn. Nhập danh sách các hóa đơn và tính tổng doanh thu thực tế.</p>
            <p><b>Quy tắc:</b> Giá trị hóa đơn rơi vào mức nào thì <b>toàn bộ</b> hóa đơn đó được giảm theo % mức đó.</p>
            <ul>
                <li>$\\le 2$ triệu: 3%</li>
                <li>$2 - 5$ triệu: 4%</li>
                <li>... (Tăng dần lên 10%)</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Phân biệt Quan trọng</span>
            <p><b>Khác biệt với bài Thuế/Điện (Lũy tiến):</b></p>
            <ul>
                <li><b>Lũy tiến:</b> Tiền được cắt nhỏ, mỗi khúc chịu 1 mức phí khác nhau.</li>
                <li><b>Theo mức (Bài này):</b> Cả cục tiền chỉ chịu đúng 1 mức phí duy nhất.</li>
            </ul>
            <p><b>Giải pháp:</b> Dùng mảng cấu hình. Duyệt qua các mốc, nếu hóa đơn nằm trong khoảng nào thì <code>break</code> và tính tiền ngay.</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIUCHRMS {
    // 1. Cấu hình Mốc giá (Upper Bounds)
    // Dùng Long.MAX_VALUE để chặn trường hợp lớn hơn 200tr
    static double[] thresholds = { 
        2_000_000, 5_000_000, 10_000_000, 20_000_000, 
        50_000_000, 100_000_000, 200_000_000, Long.MAX_VALUE 
    };

    // 2. Cấu hình Phần trăm giảm tương ứng
    static double[] rates = {
        0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10
    };

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); // Số lượng hóa đơn
        double totalRevenue = 0;

        while (n-- > 0) {
            double bill = sc.nextDouble();

            // Duyệt qua các mốc để tìm tỷ lệ giảm phù hợp
            for (int i = 0; i < thresholds.length; i++) {
                // Nếu hóa đơn nằm trong mức này (nhỏ hơn hoặc bằng ngưỡng trên)
                if (bill <= thresholds[i]) {
                    // Tính tiền sau giảm: Bill * (1 - rate)
                    // LƯU Ý: Tính trên TOÀN BỘ hóa đơn
                    totalRevenue += bill * (1.0 - rates[i]);
                    
                    break; // Tìm thấy mức rồi thì thoát vòng lặp ngay
                }
            }
        }
        
        // In kết quả làm tròn
        System.out.println((long) totalRevenue);
    }
}</code></pre>
        </div>
    `
});