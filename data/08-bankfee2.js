problems.push({
    id: 'algo_bank_fee_2',
    index: '08',
    name: 'Phí trung bình mỗi Séc',
    subtext: 'EIBANKFEE2 - Average Calculation',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Có $N$ tài khoản ngân hàng. Mỗi tài khoản có số dư và số lượng séc khác nhau.</p>
            <p><b>Yêu cầu:</b> Tính tổng phí của tất cả tài khoản, sau đó chia cho tổng số lượng séc đã dùng để ra <b>Phí trung bình cho mỗi tấm séc</b>.</p>
            <p><i>(Bảng phí áp dụng giống hệt bài EIBANKFEE trước đó).</i></p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tư duy:</b> Đây là bài toán "Tính tổng rồi chia".</p>
            <p>Chúng ta cần 2 biến cộng dồn (Accumulators) chạy xuyên suốt vòng lặp:</p>
            <ul>
                <li><code>totalFees</code>: Tổng tiền phí của tất cả mọi người.</li>
                <li><code>totalChecks</code>: Tổng số lượng séc của tất cả mọi người.</li>
            </ul>
            <p><b>Công thức cuối cùng:</b></p>
            <p>$$ \\text{Kết quả} = \\frac{\\text{totalFees}}{\\text{totalChecks}} $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIBANKFEE2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Số lượng tài khoản cần tính (Test cases)
        int n = sc.nextInt();

        double totalFees = 0;   // Tổng phí tích lũy
        int totalChecks = 0;    // Tổng số séc tích lũy

        // Duyệt qua từng tài khoản
        for (int i = 0; i < n; i++) {
            double balance = sc.nextDouble();
            int checkCount = sc.nextInt();

            // --- TÁI SỬ DỤNG LOGIC CŨ (EIBANKFEE) ---
            double monthlyFee = 0;
            double checkRate = 0;

            if (balance < 500) {
                monthlyFee = 12.00;
                checkRate = 0.20;
            } else if (balance < 2000) {
                monthlyFee = 7.50;
                checkRate = 0.20;
            } else if (balance < 5000) {
                monthlyFee = 5.00;
                checkRate = 0.10;
            }
            // else: balance >= 5000 thì miễn phí

            // Tính phí cho tài khoản hiện tại
            double currentFee = monthlyFee + (checkCount * checkRate);

            // --- BƯỚC CỘNG DỒN QUAN TRỌNG ---
            totalFees += currentFee;
            totalChecks += checkCount;
        }

        // Tính trung bình: Tổng phí / Tổng số séc
        if (totalChecks > 0) {
            System.out.println(totalFees / totalChecks);
        } else {
            System.out.println(0); // Tránh lỗi chia cho 0
        }
    }
}</code></pre>
        </div>
    `
});