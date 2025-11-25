problems.push({
    id: 'algo_financial_freedom',
    index: '26',
    name: 'Tự do Tài chính',
    subtext: 'EIUFF - Binary Search Result',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Cần chuẩn bị bao nhiêu tiền ($X$) để nghỉ hưu?</p>
            <ul>
                <li>Đem $X$ đi đầu tư lãi suất $r\\%$/tháng.</li>
                <li>Tháng đầu rút $Y$ để chi tiêu.</li>
                <li>Các tháng sau, số tiền rút tăng thêm $f\\%$ (lạm phát).</li>
                <li>Mục tiêu: Đủ tiền rút trong $N-1$ lần (theo đề bài).</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tại sao dùng Binary Search?</b></p>
            <p>Bài toán này có tính chất đơn điệu: Nếu vốn gốc $X$ càng lớn $\\rightarrow$ Số dư cuối kỳ càng lớn. Do đó, ta có thể "đoán" $X$ bằng chặt nhị phân.</p>
            <p><b>Quy trình kiểm tra (Simulation):</b></p>
            <p>Với một mức vốn $X$ giả định, ta chạy vòng lặp mô phỏng qua từng tháng:</p>
            <ul>
                <li>Bước 1: Tiền sinh lãi $\\rightarrow$ $Balance = Balance \\times (1+r)$.</li>
                <li>Bước 2: Rút tiền chi tiêu $\\rightarrow$ $Balance = Balance - Withdraw$.</li>
                <li>Bước 3: Cập nhật mức rút tháng sau do lạm phát $\\rightarrow$ $Withdraw = Withdraw \\times (1+f)$.</li>
            </ul>
            <p>Nếu sau $N-1$ tháng mà $Balance \\ge 0$ nghĩa là $X$ này đủ (thử tìm $X$ nhỏ hơn). Ngược lại thì cần tăng $X$.</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Simulation + Binary Search)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIUFF {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        // 1. Input: Lưu ý chia 100 cho các tỷ lệ phần trăm
        double monthlyRate = sc.nextDouble() / 100.0; // r
        double inflationRate = sc.nextDouble() / 100.0; // f
        double firstWithdraw = sc.nextDouble(); // Y
        int months = sc.nextInt(); // N

        // 2. Binary Search tìm vốn gốc (X)
        // Khoảng tìm kiếm: 0 đến 1 số rất lớn (VD: 10^18)
        double low = 0;
        double high = 1e18; 
        
        // Lặp 100 lần để đạt độ chính xác cao cho số thực
        for (int i = 0; i < 100; i++) {
            double mid = (low + high) / 2;
            
            // Kiểm tra xem vốn 'mid' có đủ tiêu không
            if (checkPossible(mid, months, firstWithdraw, monthlyRate, inflationRate)) {
                high = mid; // Đủ -> Thử tìm mức vốn thấp hơn
            } else {
                low = mid; // Thiếu -> Phải tăng vốn lên
            }
        }
        
        System.out.printf("%.4f", high);
    }

    // Hàm mô phỏng dòng tiền
    public static boolean checkPossible(double money, int months, double withdraw, double rate, double inflation) {
        double currentBalance = money;
        
        // Đề bài yêu cầu rút N-1 lần (months - 1)
        for (int i = 0; i < months - 1; i++) {
            // 1. Tiền sinh lãi trước
            currentBalance *= (1 + rate);
            
            // 2. Rút tiền ra tiêu
            currentBalance -= withdraw;
            
            // Nếu nợ quá nhiều thì dừng sớm (False)
            if (currentBalance < 0) return false;

            // 3. Cập nhật mức rút tháng sau (do lạm phát)
            withdraw *= (1 + inflation);
        }
        
        return currentBalance >= 0;
    }
}</code></pre>
        </div>
    `
});