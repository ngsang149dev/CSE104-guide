problems.push({
    id: 'math_loan_prepay',
    index: '27',
    name: 'Trả nợ trước hạn',
    subtext: 'EIBANKLOAN3 - Prepayment Penalty',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Vay $X$ đồng trong $N$ tháng, lãi suất $r\\%$/năm. Mỗi tháng trả tối đa $Y$ đồng.</p>
            <p><b>Quy tắc đặc biệt:</b> Nếu trả nợ trước hạn (trả nhiều hơn mức gốc chia đều), bạn bị phạt $f\\%$ trên số tiền trả thêm.</p>
            <p><b>Yêu cầu:</b> In ra số dư nợ sau mỗi tháng cho đến khi trả hết.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Phân tích dòng tiền $Y$ (Số tiền khách trả):</b></p>
            <ul>
                <li>Phần 1: Trả lãi ($Interest = Debt \\times r_{month}$).</li>
                <li>Phần 2: Trả gốc đúng hạn ($P_1$). Theo kế hoạch là $X/N$, nhưng nếu nợ còn ít hơn thì $P_1$ là phần nợ còn lại.</li>
                <li>Phần 3: Trả gốc trước hạn ($P_2$). Phần dư ra của $Y$ sau khi trừ lãi và $P_1$, nhưng phải trừ đi cả phí phạt.</li>
            </ul>
            <p><b>Công thức tìm $P_2$:</b></p>
            <p>$$ Y = Interest + P_1 + P_2 + (P_2 \\times f) $$</p>
            <p>$$ \\Rightarrow P_2 = \\frac{Y - Interest - P_1}{1 + f} $$</p>
            <p>Tổng nợ giảm đi trong tháng = $P_1 + P_2$.</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Logic Phức tạp)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIBANKLOAN3 {
    static Scanner sc = new Scanner(System.in);
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) {
        double loanAmount = sc.nextDouble();    // X
        double maxPay = sc.nextDouble();        // Y
        int months = sc.nextInt();              // N
        double monthlyRate = sc.nextDouble() / 100.0 / 12.0; // r (tháng)
        double penaltyRate = sc.nextDouble() / 100.0;        // f

        calculateProcess(loanAmount, maxPay, months, monthlyRate, penaltyRate);
        System.out.print(sb);
    }

    public static void calculateProcess(double debt, double maxPay, int months, double rate, double penalty) {
        double originalPerMonth = debt / months; // Gốc chia đều theo kế hoạch

        for (int i = 1; i &lt;= months; i++) {
            // 1. Tính gốc phải trả theo kế hoạch (Plan)
            // Nợ dự kiến còn lại sau tháng i
            double plannedDebtRemaining = originalPerMonth * (months - i);
            // P1: Số gốc cần trả để đưa nợ về đúng mức dự kiến
            // Nếu nợ hiện tại đã thấp hơn dự kiến rồi thì P1 = 0
            double p1 = Math.max(debt - plannedDebtRemaining, 0);

            // 2. Tính lãi tháng này
            double interest = debt * rate;

            // 3. Tính tiền còn dư để trả thêm (P2)
            // Số tiền còn lại = Tổng tiền trả - P1 - Lãi
            // Số tiền này bao gồm cả P2 và Phí phạt (P2 * f) -> Chia cho (1+f) để ra P2
            double p2 = (maxPay - p1 - interest) / (1 + penalty);
            
            // P2 không được âm (nếu tiền không đủ trả lãi + P1)
            if (p2 &lt; 0) p2 = 0;

            // 4. Trừ nợ
            debt -= (p1 + p2);

            // In kết quả và kiểm tra hết nợ
            if (debt &lt;= 1e-9) { // Dùng epsilon để so sánh số thực
                sb.append(i).append(" 0\\n");
                break; 
            }
            sb.append(i).append(" ").append(Math.round(debt)).append("\\n");
        }
    }
}</code></pre>
        </div>
    `
});