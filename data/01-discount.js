problems.push({
    id: 'algo_discount_tier',
    index: '01',
    name: 'Tính tiền giảm giá Bậc thang',
    subtext: 'EIDISCOU - Progressive Method',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Cửa hàng giảm giá lũy tiến theo mốc tiền ($N$). Tính số tiền thực trả.</p>
            <ul>
                <li>$0 - 2$ triệu: <b>0%</b></li>
                <li>$2 - 10$ triệu: <b>3%</b></li>
                <li>... (Các mốc cao hơn)</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Công thức & Giải pháp</span>
            <p><b>Giải pháp:</b> Dùng 2 mảng cấu hình (Mốc & Tỷ lệ) để code gọn gàng, dễ sửa đổi.</p>
            <p>$$ \\text{Tiền mức } i = \\min(\\text{Tổng}, \\text{Mốc}_{i+1}) - \\text{Mốc}_i $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Full Comment)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIDISCOUNT {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Nhập tổng số tiền khách mua (Input)
        long totalAmount = sc.nextLong();

        // --- CẤU HÌNH (CONFIGURATION) ---
        // 1. Các mốc tiền (Thresholds) - Giống như các vạch chia trên thước kẻ
        long[] ranges = { 
            0, 2_000_000, 10_000_000, 50_000_000, 
            100_000_000, 200_000_000, 500_000_000, Long.MAX_VALUE 
        };
        
        // 2. Phần trăm giảm tương ứng cho từng khoảng (Rates)
        double[] rates = { 
            0, 0.03, 0.05, 0.07, 0.1, 0.12, 0.15 
        };

        double totalDiscount = 0; // Biến tích lũy tổng tiền được giảm

        // --- XỬ LÝ LOGIC (CORE LOGIC) ---
        // Duyệt qua từng khoảng tiền (Khoảng 0->2tr, 2tr->10tr, ...)
        for (int i = 0; i < ranges.length - 1; i++) {
            
            // Mẹo tối ưu: Nếu tổng tiền của khách còn nhỏ hơn mốc hiện tại
            // nghĩa là không đụng tới các mức cao hơn -> Dừng luôn.
            if (totalAmount <= ranges[i]) break; 

            // Công thức tính phần giao nhau (Intersection):
            // Lấy số nhỏ hơn giữa (Tổng tiền) và (Mốc kế tiếp) làm giới hạn trên
            long upperLimit = Math.min(totalAmount, ranges[i+1]);
            
            // Số tiền nằm trọn trong khoảng này = Giới hạn trên - Mốc hiện tại
            long amountInLevel = upperLimit - ranges[i];

            // Cộng dồn tiền giảm giá của khoảng này
            totalDiscount += amountInLevel * rates[i];
        }

        // Kết quả: Tiền phải trả = Tổng - Giảm giá (Làm tròn số nguyên)
        System.out.println(Math.round(totalAmount - totalDiscount));
    }
}</code></pre>
        </div>
    `
});