problems.push({
    id: 'math_purchase_rate',
    index: '21',
    name: 'Tính lãi suất trả góp',
    subtext: 'EIPURCHASE / EIPURCHASE1',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài (Chung)</span>
            <p>Mua món hàng giá $V$. Trả trước $N$. Còn lại $X = V - N$ (nợ gốc).</p>
            <p>Mỗi tháng trả góp $M$ đồng trong $T$ tháng.</p>
            <p><b>Yêu cầu:</b> Tìm lãi suất thực $r$ (lãi suất tháng) sao cho sau $T$ tháng thì hết nợ.</p>
            <p><b>Khác biệt Output:</b></p>
            <ul>
                <li><b>EIPURCHASE:</b> Làm tròn 6 số thập phân (hoặc $10^{-7}$ tùy đề).</li>
                <li><b>EIPURCHASE1:</b> Làm tròn 3 số thập phân.</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Công thức nợ (đề cho):</b> $D_{n+1} = D_n \\times (1+r) - M$</p>
            <p>Sau $T$ tháng, dư nợ phải bằng 0. Đây là bài toán tìm nghiệm $r$.</p>
            <p><b>Phương pháp: Binary Search trên tập số thực (Real Number).</b></p>
            <ul>
                <li>Khoảng tìm kiếm: $low = 0$ (0%), $high = 1$ (100%/tháng - lãi cắt cổ).</li>
                <li>Nếu với lãi suất $mid$, sau $T$ tháng vẫn còn nợ $> 0$ $\\rightarrow$ Lãi suất $mid$ quá cao (khiến nợ đẻ lãi nhanh hơn trả) $\\rightarrow$ Giảm $high$. Ngược lại tăng $low$.</li>
                <li>Lặp lại khoảng 100 lần hoặc đến khi $high - low < \\epsilon$.</li>
            </ul>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Binary Search)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIPURCHASE {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        long totalValue = sc.nextLong(); // Giá trị món hàng
        int months = sc.nextInt();       // T: Số tháng trả góp
        long prepaid = sc.nextLong();    // N: Trả trước
        long monthlyPay = sc.nextLong(); // M: Trả mỗi tháng (G)

        long loanAmount = totalValue - prepaid; // Số tiền nợ ban đầu

        // Binary Search tìm lãi suất r
        double low = 0.0;
        double high = 1.0; // Giả sử lãi suất max 100%/tháng
        
        // Lặp 100 lần là đủ độ chính xác tuyệt đối cho double
        for (int i = 0; i < 100; i++) {
            double mid = (low + high) / 2;
            
            // Tính dư nợ cuối kỳ với lãi suất mid
            double remaining = calculateDebt(loanAmount, monthlyPay, months, mid);
            
            // Nếu dư nợ > 0 nghĩa là lãi suất này quá CAO 
            // (khiến nợ tăng nhanh hơn tốc độ trả)
            // -> Cần GIẢM lãi suất xuống
            if (remaining > 0) {
                high = mid;
            } else {
                low = mid;
            }
        }

        // OUTPUT: Tùy đề bài mà chỉnh printf
        // EIPURCHASE: %.7f hoặc %.6f
        // EIPURCHASE1: %.3f
        System.out.printf("%.7f", high); 
    }

    // Hàm tính dư nợ sau k tháng
    public static double calculateDebt(double debt, long pay, int months, double rate) {
        // Cách 1: Dùng vòng lặp (An toàn, dễ hiểu)
        for (int i = 0; i < months; i++) {
            debt = debt * (1 + rate) - pay;
        }
        return debt;
        
        /* Cách 2: Dùng công thức tài chính (Nhanh hơn nhưng khó nhớ)
           R = 1 + rate;
           Debt = P * R^k - G * (R^k - 1) / rate
        */
    }
}</code></pre>
        </div>
    `
});