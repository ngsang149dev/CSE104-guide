problems.push({
    id: 'math_loan_duration',
    index: '20',
    name: 'Tính thời gian trả nợ',
    subtext: 'EIBANKLOAN2 - Simulation',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Vay ngân hàng $X$ đồng, lãi suất $r\\%$/năm. Mỗi tháng trả cố định $Y$ đồng.</p>
            <p><b>Yêu cầu:</b> Hỏi sau bao nhiêu tháng thì trả hết nợ?</p>
            <p><b>Lưu ý:</b> $Y$ đồng này đã bao gồm cả việc trả nợ gốc và đóng lãi hàng tháng.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tư duy:</b> "Mô phỏng dòng tiền".</p>
            <p>Thay vì nhớ công thức Logarit phức tạp, ta dùng vòng lặp <code>while</code> để mô phỏng từng tháng trôi qua:</p>
            <ul>
                <li>Tháng 1: Nợ tăng thêm do lãi, rồi giảm đi do trả tiền $Y$.</li>
                <li>Tháng 2: Lặp lại với số dư nợ mới...</li>
                <li>... Lặp lại cho đến khi $Dư nợ \\le 0$.</li>
            </ul>
            <p><b>Công thức lặp:</b></p>
            <p>$$ \\text{Nợ mới} = (\\text{Nợ cũ} \\times (1 + \\text{Lãi tháng})) - \\text{Tiền trả} $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIBANKLOAN2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 1. Input
        double loanAmount = sc.nextDouble(); // X: Tổng vay
        double monthlyPay = sc.nextDouble(); // Y: Trả mỗi tháng
        double yearlyRate = sc.nextDouble(); // r: Lãi năm

        // Đổi lãi năm -> lãi tháng (số thập phân)
        double monthlyRate = yearlyRate / 12.0 / 100.0;

        int months = 0;
        double currentDebt = loanAmount;

        // 2. Vòng lặp mô phỏng (Simulation Loop)
        // Chạy cho đến khi trả hết nợ (debt <= 0)
        while (currentDebt > 0) {
            // Bước A: Tính nợ bị đội lên do lãi
            // Nợ mới = Nợ cũ + Tiền lãi
            currentDebt = currentDebt + (currentDebt * monthlyRate);

            // Bước B: Khách trả tiền
            currentDebt = currentDebt - monthlyPay;

            // Bước C: Tăng số tháng
            months++;
        }

        System.out.println(months);
    }
}</code></pre>
        </div>
    `
});