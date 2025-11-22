problems.push({
    id: 'algo_credit_card',
    index: '25',
    name: 'Thẻ Tín Dụng',
    subtext: 'EICREDIT - Average Daily Balance',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Có $N$ giao dịch trong $T$ ngày. Tính số dư cuối cùng của thẻ tín dụng.</p>
            <p><b>Quy tắc lãi suất (Average Daily Balance):</b></p>
            <ul>
                <li>Chu kỳ tính lãi là 30 ngày (vào đầu ngày 31, 61, 91...).</li>
                <li>Lãi = Lãi suất tháng $\\times$ (Tổng dư nợ âm các ngày trong chu kỳ / 30).</li>
                <li>Lãi được cộng dồn vào nợ gốc.</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tư duy Mô phỏng (Simulation):</b></p>
            <p>Ta chạy vòng lặp từng ngày một (Day-by-Day) để mô phỏng chính xác dòng tiền.</p>
            <ul>
                <li><b>Bước 1 (Đầu ngày):</b> Kiểm tra xem hôm nay có phải ngày chốt lãi không? Nếu có, tính lãi cho chu kỳ trước và cộng vào nợ.</li>
                <li><b>Bước 2 (Trong ngày):</b> Thực hiện các giao dịch (nếu có).</li>
                <li><b>Bước 3 (Cuối ngày):</b> Ghi nhận số dư cuối ngày (End-of-Day Balance) để tích lũy tính lãi cho chu kỳ sau.</li>
            </ul>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Standard Logic)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EICREDIT {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();           
        double rate = sc.nextDouble();  
        int totalDays = sc.nextInt();   

        // 1. Lưu giao dịch vào mảng (Map ngày -> tiền)
        long[] dailyTrans = new long[totalDays + 1];
        for (int i = 0; i < n; i++) {
            int day = sc.nextInt();
            long amount = sc.nextLong();
            dailyTrans[day] += amount;
        }

        double currentBalance = 0;
        double sumDailyDebt = 0; // Tích lũy dư nợ

        // 2. Mô phỏng từng ngày
        for (int day = 1; day <= totalDays; day++) {
            
            // A. ĐẦU NGÀY: Kiểm tra chốt lãi chu kỳ cũ
            // Nếu là ngày 31, 61... -> Tính lãi cho 30 ngày trước đó
            if ((day - 1) % 30 == 0 && day > 1) {
                double avgDebt = sumDailyDebt / 30.0;
                double interest = avgDebt * rate;
                
                currentBalance += interest; // Cộng lãi (lãi âm) vào nợ
                sumDailyDebt = 0;           // Reset cho chu kỳ mới
            }

            // B. TRONG NGÀY: Thực hiện giao dịch
            currentBalance += dailyTrans[day];

            // C. CUỐI NGÀY: Tích lũy dư nợ (nếu đang nợ)
            // Số dư này sẽ được dùng để tính trung bình
            if (currentBalance < 0) {
                sumDailyDebt += currentBalance;
            }
        }

        // In kết quả (Không làm tròn theo yêu cầu đề)
        System.out.println(currentBalance);
    }
}</code></pre>
        </div>
    `
});