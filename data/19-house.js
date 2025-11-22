problems.push({
    id: 'math_house_loan',
    index: '19',
    name: 'Vay tiền mua nhà',
    subtext: 'EIUBHOUSE - Reducing Balance',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Mua nhà giá $N$, trả trước $M$. Vay ngân hàng khoản còn lại ($N-M$).</p>
            <p>Lãi suất $X\\%$/tháng. Thời hạn $K$ tháng.</p>
            <p><b>Quy tắc trả nợ:</b> Dư nợ giảm dần.</p>
            <ul>
                <li><b>Tiền gốc:</b> Trả đều nhau mỗi tháng (Tổng vay / Số tháng).</li>
                <li><b>Tiền lãi:</b> Tính trên số <i>dư nợ thực tế còn lại</i> của tháng đó.</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Công thức & Giải pháp</span>
            <p><b>Tư duy:</b> Gốc cố định, lãi giảm dần $\\rightarrow$ Tổng tiền phải trả giảm dần theo thời gian.</p>
            <p><b>Công thức:</b></p>
            <p>$$ \\text{Gốc hàng tháng} = \\frac{\\text{Tổng tiền vay}}{\\text{Số tháng}} $$</p>
            <p>$$ \\text{Lãi tháng } i = \\text{Dư nợ hiện tại} \\times \\text{Lãi suất} $$</p>
            <p>$$ \\text{Phải trả tháng } i = \\text{Gốc hàng tháng} + \\text{Lãi tháng } i $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIUBHOUSE {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder();

        // 1. Input
        double housePrice = sc.nextDouble();     // N: Giá nhà
        double availableMoney = sc.nextDouble(); // M: Tiền có sẵn
        int months = sc.nextInt();               // K: Kỳ hạn vay
        double rate = sc.nextDouble() / 100.0;   // X: Lãi suất %

        // 2. Tính toán số liệu ban đầu
        double totalDebt = housePrice - availableMoney; // Tổng tiền vay
        
        // Tiền gốc phải trả cố định hàng tháng (Principal)
        // Đây là phần trả đều (Divided equally)
        double principalPerMonth = totalDebt / months;
        
        double currentDebt = totalDebt; // Dư nợ hiện tại (sẽ giảm dần)

        // 3. Vòng lặp trả nợ từng tháng
        for (int i = 1; i &lt;= months; i++) {
            // Tiền lãi của tháng này = Dư nợ hiện tại * Lãi suất
            double interest = currentDebt * rate;
            
            // Tổng phải trả = Gốc cố định + Lãi biến đổi
            double monthlyPayment = principalPerMonth + interest;

            // In kết quả (Làm tròn)
            sb.append(i).append(" ").append(Math.round(monthlyPayment)).append("\\n");

            // Cập nhật dư nợ: Trừ đi phần gốc đã trả
            currentDebt -= principalPerMonth;
        }
        
        System.out.print(sb);
    }
}</code></pre>
        </div>
    `
});