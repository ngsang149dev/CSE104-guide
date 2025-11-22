problems.push({
    id: 'math_saving_accumulate',
    index: '11',
    name: 'Gửi tiết kiệm định kỳ',
    subtext: 'EIUSAVING2 - Accumulation',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Kế hoạch gửi tiết kiệm trong $N$ tháng. Mỗi tháng gửi vào một số tiền khác nhau ($M_1, M_2, ..., M_N$).</p>
            <p><b>Yêu cầu:</b> Tính tổng số tiền thu được cuối kỳ (lãi kép theo cơ chế tối ưu).</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tư duy "Chia để trị":</b></p>
            <p>Coi mỗi khoản tiền gửi là một sổ tiết kiệm riêng biệt với thời hạn giảm dần:</p>
            <ul>
                <li>Khoản tháng 1: Gửi $N$ tháng.</li>
                <li>Khoản tháng 2: Gửi $N-1$ tháng.</li>
                <li>...</li>
            </ul>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Modular)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIUSAVING2 {
    // Bảng lãi suất (Index 0 -> 1 tháng, Index 11 -> 12 tháng)
    static double[] RATES = { 
        0.0390, 0.0392, 0.0395, 0.0399, 0.0404, 0.0554, 
        0.0572, 0.0592, 0.0614, 0.0638, 0.0664, 0.0692 
    };

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int totalMonths = sc.nextInt(); // Tổng thời gian (N)
        double totalReceived = 0;

        // Vòng lặp xử lý từng khoản tiền (đã sửa lỗi dấu >= thành &gt;=)
        // duration: Thời gian khoản tiền này nằm trong ngân hàng
        for (int duration = totalMonths; duration &gt;= 1; duration--) {
            double money = sc.nextDouble(); 

            // Tái sử dụng logic tính lãi tối ưu
            totalReceived += calculateOptimalInterest(money, duration);
        }

        System.out.println(Math.round(totalReceived));
    }

    // --- HÀM TÍNH LÃI TỪ BÀI TRƯỚC (REUSABLE) ---
    public static double calculateOptimalInterest(double money, int months) {
        int years = months / 12;
        int remainingMonths = months % 12;

        // 1. Tính lãi năm chẵn (Lãi kép)
        double total = money * Math.pow((1 + RATES[11]), years);

        // 2. Tính lãi tháng lẻ (Lãi đơn)
        // (đã sửa dấu > thành &gt; để không lỗi HTML)
        if (remainingMonths &gt; 0) {
            double termRate = RATES[remainingMonths - 1];
            total = total * (1 + (termRate / 12.0) * remainingMonths);
        }
        
        return total;
    }
}</code></pre>
        </div>
    `
});