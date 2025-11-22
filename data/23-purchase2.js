problems.push({
    id: 'math_annuity_payment',
    index: '23',
    name: 'Tính tiền trả góp (Cố định)',
    subtext: 'EIUPURCHASE3 - Annuity Formula',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Mua hàng giá $P$, trả trước $M$. Số tiền nợ lại là $Loan = P - M$.</p>
            <p>Vay trong $N$ tháng với lãi suất $R$ (số thập phân). Mỗi tháng trả một số tiền $X$ <b>cố định</b>.</p>
            <p><b>Yêu cầu:</b> Tính $X$ (Làm tròn xuống).</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Công thức Niên kim (Annuity):</b></p>
            <p>Đây là công thức dùng để tính số tiền phải trả đều đặn hàng kỳ để trả hết nợ gốc và lãi:</p>
            <p>$$ X = \\text{Loan} \\times \\frac{R \\times (1+R)^N}{(1+R)^N - 1} $$</p>
            <p><b>Trường hợp đặc biệt:</b> Nếu lãi suất $R = 0$, thì mỗi tháng chỉ cần trả đều $\\text{Loan} / N$.</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIUPURCHASE3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 1. Input
        double productPrice = sc.nextDouble(); // P
        double prepaid = sc.nextDouble();      // M
        int months = sc.nextInt();             // N
        double rate = sc.nextDouble();         // R (Dạng số thập phân, vd: 0.045)

        double principal = productPrice - prepaid; // Số tiền nợ gốc

        // 2. Tính toán
        double monthlyPayment = calculateMonthlyPayment(principal, months, rate);

        // 3. Output (Làm tròn xuống theo đề bài)
        System.out.println((long) Math.floor(monthlyPayment));
    }

    public static double calculateMonthlyPayment(double principal, int months, double rate) {
        // Edge case: Không lãi suất
        if (rate == 0) {
            return principal / months;
        }

        // Áp dụng công thức Annuity
        // X = P * (r * (1+r)^n) / ((1+r)^n - 1)
        double factor = Math.pow(1 + rate, months);
        
        return (principal * rate * factor) / (factor - 1);
    }
}</code></pre>
        </div>
    `
});