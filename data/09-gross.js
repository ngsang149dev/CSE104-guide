problems.push({
    id: 'math_gross_salary',
    index: '09',
    name: 'Tính Thuế từ Lương Net',
    subtext: 'EIGROSS - Reverse Calculation',
    type: 'Math',
    badgeClass: 'badge-math',
    stars: '⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Công ty trả lương thực nhận (NET) cho nhân viên. Biết rằng công ty phải đóng thay <b>10% tiền thuế</b> (tính trên lương Gross).</p>
            <p><b>Yêu cầu:</b> Nhập vào lương NET, tính số tiền Thuế mà công ty phải đóng.</p>
            <p><b>Ví dụ:</b> Nhân viên nhận 9 đồng. Thuế 10%. $\\rightarrow$ Lương gốc là 10 đồng, Thuế là 1 đồng.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Công thức & Giải pháp</span>
            <p>Gọi $G$ là Gross (Lương gốc), $N$ là Net (Thực nhận), $T$ là Tax (Thuế).</p>
            <p>Theo đề bài: $T = 0.1 \\times G$</p>
            <p>Ta có công thức: $N = G - T = G - 0.1G = 0.9G$</p>
            <p>$$ \\Rightarrow G = \\frac{N}{0.9} $$</p>
            <p>Số tiền thuế cần tìm:</p>
            <p>$$ T = G - N = \\frac{N}{0.9} - N = N \\times (\\frac{1}{0.9} - 1) = N \\times \\frac{1}{9} = \\frac{N}{9} $$</p>
            <p><b>Mẹo nhớ:</b> "Lương Net chiếm 9 phần, Thuế chiếm 1 phần". Lấy Net chia 9 là ra Thuế.</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIGROSS {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder(); // Gom kết quả in 1 lần
        
        int n = sc.nextInt(); // Số lượng nhân viên
        
        for (int i = 0; i < n; i++) {
            double netSalary = sc.nextDouble();
            
            // --- ÁP DỤNG CÔNG THỨC SUY DIỄN ---
            // Vì Net = 90% Gross -> Tax (10% Gross) = Net / 9
            double tax = netSalary / 9.0;
            
            sb.append(tax).append("\\n");
        }
        
        System.out.println(sb);
    }
}</code></pre>
        </div>
    `
});