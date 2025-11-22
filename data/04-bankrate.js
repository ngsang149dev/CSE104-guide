problems.push({
    id: 'math_simple_interest',
    index: '04',
    name: 'Tính lãi đơn Ngân hàng',
    subtext: 'EIBANKRATE - Simple Interest',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Gửi $N$ tiền trong $M$ tháng. Lãi 9%/năm (Lãi đơn). Tính tổng tiền.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Công thức</span>
            <p>$$ \\text{Lãi tháng} = 9\\% / 12 $$</p>
            <p>$$ \\text{Tổng} = \\text{Gốc} \\times (1 + \\text{Lãi tháng} \\times \\text{Số tháng}) $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Full Comment)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIBANKRATE {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        double n = sc.nextDouble(); // Tiền gốc
        double m = sc.nextDouble(); // Số tháng định gửi

        // CẢNH BÁO: Đề cho lãi suất theo NĂM (Yearly Rate)
        double YEARLY_RATE = 0.09; 

        // Nhưng gửi theo THÁNG -> Phải quy đổi ra lãi suất tháng
        double monthlyRate = YEARLY_RATE / 12;

        // --- CÔNG THỨC LÃI ĐƠN (SIMPLE INTEREST) ---
        // Tổng tiền = Gốc * (1 + Lãi suất tháng * Số tháng)
        // VD: Gửi 5 tháng thì nhận được 5 lần tiền lãi tháng
        double totalAmount = n * (1 + monthlyRate * m);

        // In kết quả làm tròn 3 chữ số thập phân (printf)
        System.out.printf("%.3f%n", totalAmount);
    }
}</code></pre>
        </div>
    `
});