problems.push({
    id: 'algo_discount_tier_2',
    index: '02',
    name: 'Chiết khấu Gấu Bông (Piccolo)',
    subtext: 'EIDISCOUNT2 - Config Change',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Giống hệt bài trước, nhưng thay đổi bảng giá trị khuyến mãi của shop Piccolo.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Giải pháp</span>
            <p>Copy code bài 1, chỉ sửa mảng <code>ranges</code> và <code>rates</code>.</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIDISCOUNT2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long totalAmount = sc.nextLong();

        // --- THAY ĐỔI DỮ LIỆU Ở ĐÂY (DATA CHANGE) ---
        // Mốc tiền mới của shop Piccolo
        long[] ranges = { 
            0, 5_000_000, 20_000_000, 100_000_000, 
            300_000_000, 600_000_000, 900_000_000, Long.MAX_VALUE 
        };
        
        // Tỷ lệ giảm giá mới
        double[] rates = { 
            0, 0.03, 0.05, 0.07, 0.1, 0.12, 0.15 
        };

        double totalDiscount = 0;

        // --- LOGIC GIỮ NGUYÊN KHÔNG ĐỔI (REUSABLE) ---
        for (int i = 0; i < ranges.length - 1; i++) {
            // Nếu tiền ít hơn mốc hiện tại thì không xét nữa
            if (totalAmount <= ranges[i]) break;

            // Tính phần tiền nằm trong khoảng [i, i+1]
            long upperLimit = Math.min(totalAmount, ranges[i+1]);
            long amountInLevel = upperLimit - ranges[i];

            totalDiscount += amountInLevel * rates[i];
        }

        System.out.println(Math.round(totalAmount - totalDiscount));
    }
}</code></pre>
        </div>
    `
});