problems.push({
    id: 'math_saving_opt',
    index: '10',
    name: 'Gửi tiết kiệm tối ưu',
    subtext: 'EIUSAVING1 - Greedy Strategy',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Gửi $N$ đồng trong $M$ tháng. Bảng lãi suất thay đổi theo kỳ hạn (1 tháng đến 12 tháng).</p>
            <p><b>Mục tiêu:</b> Tìm phương án gửi để nhận được nhiều tiền nhất.</p>
            <p><b>Dữ liệu:</b> Lãi suất 12 tháng là cao nhất (6.92%).</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Chiến thuật Tham lam (Greedy):</b></p>
            <p>Vì kỳ hạn 12 tháng có lãi suất cao nhất, ta nên ưu tiên gửi gói này lặp lại nhiều lần (hưởng lãi kép theo năm).</p>
            <p><b>Quy trình:</b></p>
            <ul>
                <li>Chia tổng số tháng $M$ thành: $Y$ năm chẵn và $R$ tháng lẻ.</li>
                <li>$Y$ năm đầu: Tính lãi kép với lãi suất 12 tháng.</li>
                <li>$R$ tháng cuối: Gửi nốt một kỳ hạn $R$ tháng với lãi suất tương ứng.</li>
            </ul>
            <p><b>Công thức:</b></p>
            <p>$$ \\text{Tổng} = N \\times (1 + \\text{Rate}_{12})^Y \\times (1 + \\frac{\\text{Rate}_R}{12} \\times R) $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EISAVING1 {
    // Bảng lãi suất từ 1 tháng đến 12 tháng (đã đổi sang số thập phân)
    // Index 0 = 1 tháng, Index 11 = 12 tháng
    static double[] RATES = { 
        0.0390, 0.0392, 0.0395, 0.0399, 0.0404, 0.0554, 
        0.0572, 0.0592, 0.0614, 0.0638, 0.0664, 0.0692 
    };

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double money = sc.nextDouble();
        int totalMonths = sc.nextInt();

        System.out.println(Math.round(calculateOptimalInterest(money, totalMonths)));
    }

    public static double calculateOptimalInterest(double money, int months) {
        // 1. Tách thành số năm chẵn và tháng lẻ
        int years = months / 12;
        int remainingMonths = months % 12;

        // 2. Tính lãi kép cho các năm chẵn (Kỳ hạn 12 tháng)
        // Lãi suất năm = RATES[11]
        double yearlyRate = RATES[11]; 
        // Công thức lãi kép: P * (1 + r)^n
        double total = money * Math.pow((1 + yearlyRate), years);

        // 3. Tính lãi cho phần tháng lẻ còn lại (nếu có)
        if (remainingMonths > 0) {
            // Lấy lãi suất tương ứng với kỳ hạn lẻ này
            double termRate = RATES[remainingMonths - 1];
            
            // Công thức lãi đơn cho kỳ hạn ngắn: A = P * (1 + r/12 * months)
            total = total * (1 + (termRate / 12.0) * remainingMonths);
        }
        
        return total;
    }
}</code></pre>
        </div>
    `
});