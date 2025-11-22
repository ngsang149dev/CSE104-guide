problems.push({
    id: 'algo_discount_3',
    index: '16',
    name: 'Giảm giá Tết (Combo)',
    subtext: 'EIUDISCOUNT3 - Cumulative Discount',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Tính tiền khách phải trả qua 2 giai đoạn giảm giá:</p>
            <ul>
                <li><b>Giai đoạn 1:</b> Giảm giá lũy tiến theo mốc tiền (Giống hệt bài Piccolo/EIUDISCOUNT2).</li>
                <li><b>Giai đoạn 2:</b> Giảm thêm <b>2%</b> trên số tiền <i>còn lại</i> cho mỗi ưu đãi đạt được (Online, VIP, Thẻ).</li>
            </ul>
            <p><b>Quy tắc:</b> Ưu đãi sau tính trên số tiền sau khi đã trừ ưu đãi trước.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tư duy:</b> Chia bài toán làm 2 phần tách biệt.</p>
            <p><b>Phần 1:</b> Copy code bài EIUDISCOUNT2 để tính ra giá sau khi giảm bậc thang ($P_1$).</p>
            <p><b>Phần 2:</b> Dùng vòng lặp hoặc <code>if</code> để trừ tiếp 2%.</p>
            <p>$$ P_{new} = P_{old} - (P_{old} \\times 0.02) $$</p>
            <p><i>Lưu ý: Vì đề yêu cầu kết quả là số nguyên và xử lý tiền tệ, việc ép kiểu <code>(long)</code> ở từng bước trừ là rất quan trọng để khớp với test case.</i></p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIUDISCOUNT3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long totalAmount = sc.nextLong();

        // --- GIAI ĐOẠN 1: GIẢM GIÁ LŨY TIẾN (BẬC THANG) ---
        // Cấu hình của shop Piccolo (Bài 02)
        long[] ranges = { 
            0, 5_000_000, 20_000_000, 100_000_000, 
            300_000_000, 600_000_000, 900_000_000, Long.MAX_VALUE 
        };
        double[] rates = { 
            0, 0.03, 0.05, 0.07, 0.1, 0.12, 0.15 
        };

        double progressiveDiscount = 0;
        for (int i = 0; i < ranges.length - 1; i++) {
            if (totalAmount <= ranges[i]) break;
            long upper = Math.min(totalAmount, ranges[i+1]);
            long amountInLevel = upper - ranges[i];
            progressiveDiscount += amountInLevel * rates[i];
        }

        // Tiền sau khi hết Giai đoạn 1
        long currentPrice = totalAmount - (long)progressiveDiscount;

        // --- GIAI ĐOẠN 2: GIẢM GIÁ THÊM (CUMULATIVE) ---
        // Có 3 loại ưu đãi (Online, VIP, Thẻ), mỗi loại giảm 2%
        for (int i = 0; i < 3; i++) {
            int hasDiscount = sc.nextInt(); // Nhập 1 (Có) hoặc 0 (Không)
            
            if (hasDiscount == 1) {
                // Công thức: Giảm 2% trên số tiền HIỆN TẠI
                // Dùng phép -= và ép kiểu tự động của Java để làm tròn xuống
                currentPrice -= (long)(currentPrice * 0.02);
            }
        }

        System.out.println(currentPrice);
    }
}</code></pre>
        </div>
    `
});