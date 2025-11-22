problems.push({
    id: 'algo_gross_salary_2',
    index: '13',
    name: 'Tính lương Gross (Từ Net)',
    subtext: 'EIGROSS2 - Binary Search vs Math',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Cho lương Net ($N$). Tính lương Gross ($G$).</p>
            <p>Quy tắc thuế lũy tiến (giống bài EITAX) và miễn trừ gia cảnh 11 triệu.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. So sánh Tư duy</span>
            <p><b>Cách 1: Binary Search (Tìm kiếm nhị phân)</b></p>
            <ul>
                <li>Đoán $G$, tính xuôi ra $N'$, so sánh với $N$ đề bài.</li>
                <li>Ưu điểm: Code "tái sử dụng" lại hàm tính thuế xuôi. Dễ hiểu.</li>
            </ul>
            <p><b>Cách 2: Direct Math (Tính ngược từng bậc)</b></p>
            <ul>
                <li>Chia Net thành các phần tương ứng với từng bậc thuế.</li>
                <li>Công thức: $\\Delta Gross = \\Delta Net / (1 - rate)$.</li>
                <li>Ưu điểm: Chạy 1 vòng lặp là ra ($O(1)$ với số bậc thuế cố định).</li>
            </ul>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3.1. Code Cách 1: Binary Search (Khuyên dùng)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIGROSS2_BS {
    static Scanner sc = new Scanner(System.in);
    
    // Mảng cấu hình (Lưu ý: Long.MAX_VALUE để chặn trên cùng)
    static final long[] LADDER = { 
        0, 5_000_000, 10_000_000, 18_000_000, 32_000_000, 52_000_000, 80_000_000, Long.MAX_VALUE 
    };
    static final double[] RATES = { 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35 };
    
    public static void main(String[] args) {
        long targetNet = sc.nextLong();
        
        // Tìm kiếm nhị phân trong khoảng [Net, 2*Net]
        long low = targetNet; 
        long high = targetNet * 2; 
        long ans = high;

        while (low <= high) {
            long mid = low + (high - low) / 2;
            
            // Tính thử Net từ Gross giả định (mid)
            long calculatedNet = calculateNetFromGross(mid);

            if (calculatedNet >= targetNet) {
                ans = mid;      // Có thể là đáp án, thử tìm số nhỏ hơn
                high = mid - 1;
            } else {
                low = mid + 1;  // Gross thấp quá, tăng lên
            }
        }
        System.out.println(ans);
    }

    // Hàm tính xuôi (Copy từ bài EITAX nhưng thêm 11tr miễn trừ)
    public static long calculateNetFromGross(long gross) {
        long taxable = gross - 11_000_000;
        if (taxable <= 0) return gross;

        double tax = 0;
        for (int i = 0; i < LADDER.length - 1; i++) {
            if (taxable <= LADDER[i]) break;
            double rangeAmount = Math.min(taxable, LADDER[i+1]) - LADDER[i];
            tax += rangeAmount * RATES[i];
        }
        return gross - Math.round(tax);
    }
}</code></pre>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3.2. Code Cách 2: Toán học (Math / Bucket Filling)</span>
            <p>Tư duy: Lấp đầy từng "thùng" Net để quy đổi ra Gross.</p>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIGROSS2_Math {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long inputNet = sc.nextLong();

        // 1. Tách phần miễn trừ gia cảnh (11 triệu)
        // Phần này Gross = Net (không mất thuế)
        long gross = 11_000_000;
        long remainingNet = inputNet - 11_000_000;

        if (remainingNet <= 0) {
            System.out.println(inputNet);
            return;
        }

        long[] ladder = { 
            0, 5_000_000, 10_000_000, 18_000_000, 32_000_000, 52_000_000, 80_000_000, Long.MAX_VALUE 
        };
        double[] rates = { 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35 };

        // 2. Duyệt từng bậc thuế để quy đổi Net -> Gross
        for (int i = 0; i < rates.length; i++) {
            // Độ rộng của bậc thuế (Gross)
            long grossWidth = ladder[i+1] - ladder[i];
            
            // Quy đổi độ rộng đó ra Net tối đa có thể chứa trong bậc này
            // Công thức: Net = Gross * (1 - rate)
            double maxNetInBracket = grossWidth * (1 - rates[i]);

            if (remainingNet > maxNetInBracket) {
                // Nếu Net dư thừa -> Lấp đầy bậc này
                gross += grossWidth;
                remainingNet -= maxNetInBracket;
            } else {
                // Nếu Net nằm trọn trong bậc này -> Tính Gross và Dừng
                // Công thức ngược: Gross = Net / (1 - rate)
                gross += remainingNet / (1 - rates[i]);
                remainingNet = 0;
                break;
            }
        }
        
        System.out.println(Math.round(gross));
    }
}</code></pre>
        </div>
    `
});