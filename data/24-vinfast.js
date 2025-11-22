problems.push({
    id: 'math_leasing_battery',
    index: '24',
    name: 'Cho thuê Pin Vinfast',
    subtext: 'EIVINFASTBATERY - Leasing Formula',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Vinfast mua pin giá $N$. Cho khách thuê $X$ đồng/tháng.</p>
            <p>Sau $T$ tháng, thu hồi pin về bán sắt vụn được $M$ đồng.</p>
            <p>Lãi suất ngân hàng $r\\%$/tháng. Tìm giá cho thuê $X$ thấp nhất để không lỗ.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tư duy Tài chính:</b> Tổng giá trị tương lai (Future Value - FV) của dòng tiền thu về phải bằng FV của vốn bỏ ra.</p>
            <ul>
                <li>FV của vốn gốc $N$: $N \\times (1+r)^T$</li>
                <li>FV của xác pin $M$: $M$ (vì nhận ở cuối kỳ)</li>
                <li>FV của dòng tiền thu thuê $X$: Dùng công thức <i>Future Value of Annuity</i>.</li>
            </ul>
            <p><b>Công thức rút gọn (tương đương vay trả góp):</b></p>
            <p>$$ X = \\frac{(N \\times (1+r)^T - M) \\times r}{(1+r)^T - 1} $$</p>
            <p><i>Trường hợp đặc biệt $r=0$: $X = (N - M) / T$</i></p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIVINFASTBATERY {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        double cost = sc.nextDouble();       // N: Giá mua pin
        double scrapValue = sc.nextDouble(); // M: Giá trị thu hồi
        int months = sc.nextInt();           // T: Thời gian
        double rate = sc.nextDouble() / 100.0; // r: Lãi suất

        double rentPrice = calculateRent(cost, scrapValue, months, rate);
        
        System.out.println(Math.round(rentPrice));
    }

    public static double calculateRent(double N, double M, int T, double r) {
        // Edge case: Không có lãi suất -> Chia đều khấu hao
        if (r == 0) {
            return (N - M) / T;
        }

        double R_pow = Math.pow(1 + r, T); // (1+r)^T
        
        // Công thức: (N*(1+r)^T - M) * r / ((1+r)^T - 1)
        // Ý nghĩa: (Tổng nợ bao gồm lãi - Giá trị thu hồi) * Hệ số trả góp
        return ((N * R_pow - M) * r) / (R_pow - 1);
    }
}</code></pre>
        </div>
    `
});