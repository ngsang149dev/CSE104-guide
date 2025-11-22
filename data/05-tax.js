problems.push({
    id: 'algo_tax_calc',
    index: '05',
    name: 'Tính thuế Thu nhập Cá nhân',
    subtext: 'EITAX - Progressive Tax',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Nhập vào tổng thu nhập $N$. Tính thuế TNCN phải đóng theo quy tắc lũy tiến.</p>
            <p><b>Quy tắc quan trọng:</b></p>
            <ul>
                <li>Được miễn trừ gia cảnh: <b>9 triệu đồng</b>.</li>
                <li>Thuế chỉ tính trên phần dư ra (Thu nhập tính thuế).</li>
                <li>Nếu $N \\le 9$ triệu $\\rightarrow$ Không phải đóng thuế (0 đồng).</li>
            </ul>
            <p><b>Bảng thuế suất (trên phần dư):</b></p>
            <ul>
                <li>Đến 5tr: 5%</li>
                <li>Trên 5tr - 10tr: 10%</li>
                <li>... (Tăng dần đến 35%)</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Công thức & Giải pháp</span>
            <p><b>Bước 1:</b> Tính thu nhập chịu thuế ($T$).</p>
            <p>$$ T = \\text{Tổng thu nhập} - 9.000.000 $$</p>
            <p><i>(Nếu $T \\le 0$ thì in ra 0 và kết thúc).</i></p>
            <br>
            <p><b>Bước 2:</b> Áp dụng kỹ thuật <b>"Mảng Cấu Hình"</b> (giống bài EIDISCOUNT).</p>
            <p>Ta chia $T$ thành từng khúc (lớp bánh) và nhân với % tương ứng.</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Full Comment)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EITAX {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 1. Nhập tổng thu nhập
        long totalIncome = sc.nextLong();

        // 2. Tính thu nhập chịu thuế (Taxable Income)
        // Trừ đi 9 triệu tiền giảm trừ gia cảnh
        long taxableIncome = totalIncome - 9_000_000;

        // Nếu lương < 9tr thì không phải đóng xu nào
        if (taxableIncome <= 0) {
            System.out.println(0);
            return;
        }

        // 3. Cấu hình Bậc thuế (Tax Brackets)
        // Lưu ý: Các mốc này áp dụng cho phần 'taxableIncome'
        long[] brackets = { 
            0, 5_000_000, 10_000_000, 18_000_000, 
            32_000_000, 52_000_000, 80_000_000, Long.MAX_VALUE 
        };
        
        // Phần trăm thuế tương ứng (Tax Rates)
        double[] rates = { 
            0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35 
        };

        double totalTax = 0;

        // 4. Logic tính lũy tiến (Giống bài Discount)
        for (int i = 0; i < brackets.length - 1; i++) {
            // Nếu thu nhập chịu thuế chưa chạm tới mốc này -> Dừng
            if (taxableIncome <= brackets[i]) break;

            // Tìm phần giao nhau giữa Thu nhập và Khoảng thuế hiện tại
            // Math.min(Thu nhập, Mốc sau) - Mốc trước
            double upper = Math.min(taxableIncome, brackets[i+1]);
            double amountInBracket = upper - brackets[i];

            totalTax += amountInBracket * rates[i];
        }

        // 5. Kết quả làm tròn
        System.out.println(Math.round(totalTax));
    }
}</code></pre>
        </div>
    `
});