problems.push({
    id: 'math_saving_reverse',
    index: '22',
    name: 'Kế hoạch gửi tiết kiệm (Ngược)',
    subtext: 'EIUSAVING3 - Math vs Binary Search',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Muốn có $N$ đồng sau $M$ tháng. Mỗi tháng gửi vào số tiền $X$ (giống nhau). Tính $X$.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. So sánh Giải pháp</span>
            <p><b>Cách 1: Toán học (Growth Factor) - <span style="color:red">Khuyên dùng</span></b></p>
            <ul>
                <li>Tư duy: $X$ là nhân tử chung. $N = X \\times (\\sum \\text{Hệ số lãi})$.</li>
                <li>Công thức: $X = N / \\sum \\text{Hệ số}$.</li>
                <li>Độ phức tạp: Tính tổng 1 lần là xong.</li>
            </ul>
            <br>
            <p><b>Cách 2: Tìm kiếm nhị phân (Binary Search)</b></p>
            <ul>
                <li>Tư duy: "Đoán" thử số tiền gửi hàng tháng là $mid$. Tính tổng nhận được.</li>
                <li>Nếu Tổng < Mục tiêu $\\rightarrow$ Gửi ít quá $\\rightarrow$ Tăng tiền ($low = mid$).</li>
                <li>Ưu điểm: Không cần biến đổi công thức toán, chỉ cần tái sử dụng hàm tính lãi xuôi.</li>
            </ul>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3.1. Code Cách 1: Toán học (Nhanh & Gọn)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EISAVING3_Math {
    static double[] RATES = { 
        0.0390, 0.0392, 0.0395, 0.0399, 0.0404, 0.0554, 
        0.0572, 0.0592, 0.0614, 0.0638, 0.0664, 0.0692 
    };

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double target = sc.nextDouble();
        int months = sc.nextInt();

        double totalFactor = 0;
        // Tính tổng hệ số sinh lời của từng khoản tiền
        for (int i = 1; i &lt;= months; i++) {
            totalFactor += getGrowthFactor(i);
        }

        // Công thức O(1): Tổng = Tiền * Hệ số -> Tiền = Tổng / Hệ số
        System.out.printf("%.4f", target / totalFactor);
    }

    // Hàm tính hệ số sinh lời (1 đồng sau k tháng thành bao nhiêu?)
    public static double getGrowthFactor(int k) {
        int y = k / 12;
        int m = k % 12;
        double factor = Math.pow(1 + RATES[11], y);
        if (m &gt; 0) factor *= (1 + (RATES[m-1]/12.0) * m);
        return factor;
    }
}</code></pre>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3.2. Code Cách 2: Binary Search (Dễ hiểu logic)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EISAVING3_BS {
    static double[] RATES = { 
        0.0390, 0.0392, 0.0395, 0.0399, 0.0404, 0.0554, 
        0.0572, 0.0592, 0.0614, 0.0638, 0.0664, 0.0692 
    };

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double target = sc.nextDouble();
        int months = sc.nextInt();

        // Tìm kiếm số tiền cần gửi trong khoảng [0, Target]
        double low = 0, high = target;
        
        // Lặp 100 lần để đạt độ chính xác tuyệt đối
        for (int i = 0; i &lt; 100; i++) {
            double mid = (low + high) / 2; // Giả sử mỗi tháng gửi mid đồng
            
            // Tính thử xem sau 'months' tháng được bao nhiêu tiền
            if (calculateTotalReceived(mid, months) &lt; target) {
                low = mid; // Chưa đủ mục tiêu -> Phải gửi nhiều hơn
            } else {
                high = mid; // Đã đạt/vượt -> Thử gửi ít hơn xem sao
            }
        }
        System.out.printf("%.4f", high);
    }

    // Hàm xuôi: Biết tiền gửi hàng tháng, tính tổng thu được (giống bài SAVING2)
    public static double calculateTotalReceived(double monthlyDeposit, int n) {
        double total = 0;
        for (int duration = n; duration &gt;= 1; duration--) {
            // Tái sử dụng hàm tính hệ số lãi (nhân với số tiền gửi)
            total += monthlyDeposit * getGrowthFactor(duration);
        }
        return total;
    }

    public static double getGrowthFactor(int k) {
        int y = k / 12;
        int m = k % 12;
        double factor = Math.pow(1 + RATES[11], y);
        if (m &gt; 0) factor *= (1 + (RATES[m-1]/12.0) * m);
        return factor;
    }
}</code></pre>
        </div>
    `
});