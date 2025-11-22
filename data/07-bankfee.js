problems.push({
    id: 'algo_bank_fee',
    index: '07',
    name: 'Tính phí Ngân hàng',
    subtext: 'EIBANKFEE - Conditionals',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Tính phí dịch vụ ngân hàng dựa trên <b>Số dư tài khoản</b> ($N$) và <b>Số tấm séc</b> ($M$) đã viết.</p>
            <p><b>Bảng phí quy định:</b></p>
            <ul>
                <li>$N < 500$: Phí tháng $12, Phí mỗi séc $0.20.</li>
                <li>$500 \\le N < 2000$: Phí tháng $7.5, Phí mỗi séc $0.20.</li>
                <li>$2000 \\le N < 5000$: Phí tháng $5.0, Phí mỗi séc $0.10.</li>
                <li>$N \\ge 5000$: Miễn phí hoàn toàn.</li>
            </ul>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Giải pháp:</b> Sử dụng cấu trúc <code>if - else if</code> để phân loại số dư vào đúng khoảng.</p>
            <p><b>Lưu ý:</b> Do các khoảng loại trừ nhau, ta chỉ cần kiểm tra cận trên (Upper Bound) theo thứ tự tăng dần.</p>
            <p>$$ \\text{Tổng phí} = \\text{Phí tháng} + (\\text{Số séc} \\times \\text{Giá mỗi séc}) $$</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIBANKFEE {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 1. Input: Số dư (Balance) & Số lượng séc (Check count)
        double balance = sc.nextDouble();
        int checkCount = sc.nextInt();

        double monthlyFee = 0.0; // Phí hàng tháng
        double checkRate = 0.0;  // Phí cho mỗi tấm séc

        // 2. Logic phân loại (Classification)
        // Kiểm tra từ thấp lên cao
        if (balance < 500) {
            monthlyFee = 12.00;
            checkRate = 0.20;
        } 
        else if (balance < 2000) { // Tương đương 500 <= balance < 2000
            monthlyFee = 7.50;
            checkRate = 0.20;
        } 
        else if (balance < 5000) { // Tương đương 2000 <= balance < 5000
            monthlyFee = 5.00;
            checkRate = 0.10;
        } 
        // else: Trường hợp >= 5000 thì phí vẫn là 0.0 (như khởi tạo)

        // 3. Tính tổng và in kết quả
        double totalFee = monthlyFee + (checkCount * checkRate);
        System.out.println(totalFee);
    }
}</code></pre>
        </div>
    `
});