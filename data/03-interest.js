problems.push({
    id: 'math_interest_rate',
    index: '03',
    name: 'Lãi suất tiền gửi (Lãi kép)',
    subtext: 'EIDINRATE - Compound Interest',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Gửi gốc $N$, lãi $L\\%$/năm (lãi kép). Hỏi sau bao lâu tiền đạt mốc $M$?</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Công thức (Logarit)</span>
            <p>$$ Y = \\lceil \\log_{1+rate} (M/N) \\rceil $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Full Comment)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIDINRATE {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // StringBuilder giúp gom kết quả in ra 1 lần -> Tối ưu tốc độ
        StringBuilder sb = new StringBuilder(); 

        int testCases = sc.nextInt(); // Số lượng bộ test
        while (testCases-- > 0) {
            // Nhập dữ liệu: Gốc (N), Lãi suất (Rate), Mục tiêu (M)
            double n = sc.nextDouble(); 
            double rate = sc.nextDouble() / 100.0; // Nhớ chia 100 để ra số thập phân (5% -> 0.05)
            double m = sc.nextDouble(); 

            // --- ÁP DỤNG CÔNG THỨC LOGARIT ---
            // Tìm số mũ Y sao cho: N * (1 + rate)^Y >= M
            // => Y >= Log cơ số (1+rate) của (M/N)
            
            // Vì Java không có hàm log cơ số bất kỳ, ta dùng công thức đổi cơ số:
            // log_a(b) = ln(b) / ln(a)
            double tuSo = Math.log(m / n);      // ln(M/N)
            double mauSo = Math.log(1 + rate);  // ln(1 + rate)

            // Chia ra số năm thực (VD: 5.2 năm)
            double exactYears = tuSo / mauSo;

            // Ngân hàng tính lãi theo năm tròn -> Phải làm tròn LÊN
            // VD: 5.2 năm -> Phải chờ hết năm thứ 6 mới đủ tiền -> Kết quả là 6
            int years = (int) Math.ceil(exactYears);

            sb.append(years).append("\\n");
        }
        System.out.print(sb);
    }
}</code></pre>
        </div>
    `
});