problems.push({
    id: 'algo_markup',
    index: '06',
    name: 'Hóa đơn tiền hàng (Markup)',
    subtext: 'EIUMARKUP - Batch Processing',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Mua $N$ sản phẩm. Giá bán giảm dần theo số lượng mua:</p>
            <ul>
                <li>100 cái đầu tiên: <b>200</b> đồng/cái.</li>
                <li>100 cái tiếp theo: <b>199</b> đồng/cái.</li>
                <li>... Cứ mỗi 100 cái giá giảm đi 1 đồng.</li>
                <li><b>Quy tắc sàn:</b> Giá không bao giờ thấp hơn <b>180</b> đồng.</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tư duy:</b> "Bán theo lô". Hãy tưởng tượng bạn gói hàng thành từng gói 100 cái để tính tiền.</p>
            <p><b>Thuật toán:</b></p>
            <ul>
                <li>Dùng vòng lặp <code>while</code> để bán từng lô 100 cái.</li>
                <li>Sau mỗi vòng lặp, giảm giá đi 1 đơn vị.</li>
                <li>Dừng vòng lặp khi: Hết hàng ($N=0$) <b>HOẶC</b> Giá chạm sàn ($Price=180$).</li>
                <li>Nếu còn dư hàng sau khi giá chạm sàn, bán tất cả số còn lại với giá 180.</li>
            </ul>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Full Comment)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIMARKUP {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 1. Input: Số lượng hàng muốn mua
        int n = sc.nextInt();

        long totalCost = 0; // Tổng tiền phải trả
        int currentPrice = 200; // Giá khởi điểm
        int FLOOR_PRICE = 180;  // Giá sàn thấp nhất

        // 2. Xử lý bán từng lô (Batch Processing)
        // Điều kiện lặp: Còn hàng (n > 0) VÀ Giá vẫn cao hơn sàn (> 180)
        while (n > 0 && currentPrice > FLOOR_PRICE) {
            
            // Mỗi lần chỉ tính tối đa 100 cái (hoặc ít hơn nếu n < 100)
            int amountToBuy = Math.min(n, 100);

            // Cộng tiền: Số lượng * Giá hiện tại
            totalCost += amountToBuy * currentPrice;

            // Cập nhật lại số hàng còn lại và giá cho đợt sau
            n -= amountToBuy;
            currentPrice--; 
        }

        // 3. Xử lý phần còn dư (nếu có) với giá sàn
        // Khi vòng lặp kết thúc mà n vẫn > 0, nghĩa là giá đã chạm 180
        if (n > 0) {
            totalCost += (long) n * FLOOR_PRICE;
        }

        System.out.println(totalCost);
    }
}</code></pre>
        </div>
    `
});