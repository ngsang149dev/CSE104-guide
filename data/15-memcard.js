problems.push({
    id: 'algo_memcard',
    index: '15',
    name: 'Thẻ Thành Viên Siêu Thị',
    subtext: 'EIMEMCARD - State Management',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Hệ thống siêu thị tính chiết khấu cho từng món hàng dựa trên <b>Tổng tiền đã tích lũy trước đó</b>.</p>
            <p><b>Các hạng thẻ và mức giảm:</b></p>
            <ul>
                <li>Dưới 1 triệu: <b>0%</b></li>
                <li>1tr - 20tr: <b>2%</b> (Starter)</li>
                <li>20tr - 50tr: <b>3%</b> (Gold)</li>
                <li>50tr - 200tr: <b>5%</b> (Diamond)</li>
                <li>Trên 200tr: <b>7%</b> (Platinum)</li>
            </ul>
            <p><b>Lưu ý:</b> Hạng thẻ được cập nhật ngay lập tức khi tổng tiền chạm mốc.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Vấn đề:</b> Với $N$ món hàng ($N=10^5$), nếu mỗi lần mua ta lại dùng <code>if-else</code> để kiểm tra lại từ đầu xem khách đang ở hạng nào thì code sẽ rất dài dòng.</p>
            <p><b>Giải pháp tối ưu:</b> Kỹ thuật <b>"Con trỏ đơn điệu"</b>.</p>
            <ul>
                <li>Vì tổng tiền tích lũy (<code>sum</code>) chỉ tăng dần, nên hạng thẻ (<code>levelIndex</code>) cũng chỉ có thể đi lên.</li>
                <li>Ta dùng biến <code>currentLevel</code> để nhớ vị trí hiện tại. Khi tiền tăng, ta chỉ cần nhích <code>currentLevel</code> lên mức tiếp theo, không cần quay lại kiểm tra mức thấp hơn.</li>
            </ul>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIMEMCARD {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder();
        
        int n = sc.nextInt(); // Số lượng món hàng
        
        // 1. Cấu hình các mốc thăng hạng (Thresholds)
        // Mẹo: Dùng Long.MAX_VALUE ở cuối để chặn trên
        long[] thresholds = { 
            1_000_000, 20_000_000, 50_000_000, 200_000_000, Long.MAX_VALUE 
        };
        
        // 2. Mức chiết khấu tương ứng (0%, 2%, 3%, 5%, 7%)
        double[] rates = { 0, 0.02, 0.03, 0.05, 0.07 };

        long totalAccumulated = 0; // Tổng tiền tích lũy
        int currentLevel = 0;      // Chỉ số hạng thẻ hiện tại

        for (int i = 0; i < n; i++) {
            long price = sc.nextLong();

            // 3. Cập nhật hạng thẻ (Nếu tổng tiền vượt mốc hiện tại -> Tăng hạng)
            // Dùng while để có thể nhảy cóc nhiều hạng cùng lúc (nếu món hàng quá đắt)
            while (totalAccumulated >= thresholds[currentLevel]) {
                currentLevel++;
            }

            // 4. Tính chiết khấu theo hạng hiện tại
            // Lưu ý: Đề bài yêu cầu tính dựa trên giá bán món hàng hiện tại
            double discount = price * rates[currentLevel];
            
            // In ra số nguyên (ép kiểu long)
            sb.append((long)discount).append(" ");

            // 5. Cộng dồn doanh số
            totalAccumulated += price;
        }
        
        System.out.println(sb);
    }
}</code></pre>
        </div>
    `
});