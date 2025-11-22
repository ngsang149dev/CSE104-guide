problems.push({
    id: 'algo_sales_bonus',
    index: '14',
    name: 'Thưởng Doanh số',
    subtext: 'EIUSALES - Progressive Bonus',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Tính tiền thưởng dựa trên doanh số bán hàng ($S$). Quy tắc thưởng lũy tiến theo từng bậc:</p>
            <ul>
                <li>$0 - 20$ triệu: <b>2%</b></li>
                <li>$20 - 50$ triệu: <b>3%</b></li>
                <li>$50 - 200$ triệu: <b>4%</b></li>
                <li>... (Tăng dần đến 7%)</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Dạng bài:</b> Lũy tiến (Progressive Calculation).</p>
            <p><b>Giải pháp:</b> Tiếp tục sử dụng kỹ thuật <b>Mảng cấu hình (Lookup Table)</b>. Đây là cách tối ưu nhất để xử lý các bài toán có nhiều mức (levels) thay vì viết hàng tá lệnh <code>if-else</code>.</p>
            <p><b>Công thức:</b></p>
            <p>$$ \\text{Thưởng} = \\sum (\\text{Doanh số tại bậc } i \\times \\text{Rate}_i) $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIUSALES {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 1. Input: Doanh số bán hàng
        int sales = sc.nextInt();

        // 2. Cấu hình các mốc doanh số (Ranges)
        // Lưu ý: Dùng Integer.MAX_VALUE cho mốc cuối cùng
        int[] ranges = {
            0, 20, 50, 200, 500, 2000, Integer.MAX_VALUE
        };
        
        // 3. Cấu hình tỉ lệ thưởng (Rates)
        double[] rates = {
            0.02, 0.03, 0.04, 0.05, 0.06, 0.07
        };

        double totalReward = 0;

        // 4. Vòng lặp tính lũy tiến
        for (int i = 0; i &lt; ranges.length - 1; i++) {
            // Nếu doanh số vượt qua mốc hiện tại thì mới tính thưởng ở bậc này
            if (sales &gt; ranges[i]) {
                // Tìm phần giao nhau: min(Doanh số, Mốc sau) - Mốc trước
                double amountInLevel = Math.min(sales, ranges[i+1]) - ranges[i];
                
                totalReward += amountInLevel * rates[i];
            }
        }

        // 5. In kết quả (Làm tròn 1 chữ số thập phân)
        System.out.printf("%.1f", totalReward);    
    }    
}</code></pre>
        </div>
    `
});