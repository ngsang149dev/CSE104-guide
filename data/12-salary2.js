problems.push({
    id: 'algo_salary_2',
    index: '12',
    name: 'Tính lương & Làm thêm giờ',
    subtext: 'EISALARY2 - Overtime Calculation',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Công ty có $N$ nhân viên. Mỗi người làm việc 5 ngày/tuần với mức lương giờ $W$.</p>
            <p><b>Quy tắc tính lương:</b></p>
            <ul>
                <li>8 giờ đầu: Tính $100\\%$ lương ($1 \times W$).</li>
                <li>Giờ làm thêm (trên 8h): Tính $150\\%$ lương ($1.5 \times W$).</li>
            </ul>
            <p><b>Output:</b> Lương của từng người VÀ Lương trung bình giờ hành chính / làm thêm của cả công ty.</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tối ưu hóa Code:</b> Thay vì dùng mảng lưu trữ hay tách hàm, ta dùng biến tích lũy (Accumulator) và xử lý ngay khi nhập liệu.</p>
            <p><b>Công thức tách giờ (không dùng if-else):</b></p>
            <ul>
                <li>Giờ hành chính = <code>Math.min(giờ_làm, 8)</code></li>
                <li>Giờ làm thêm = <code>Math.max(0, giờ_làm - 8)</code></li>
            </ul>
            <p><b>Dùng StringBuilder:</b> Để gom toàn bộ kết quả in ra một lần, giúp code gọn và I/O nhanh hơn.</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Optimized)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EISALARY2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder(); // Gom output

        int n = sc.nextInt(); // Số nhân viên

        // Biến tích lũy toàn cục (Global Accumulators)
        double sumOfficePay = 0, sumOfficeHours = 0;
        double sumOvtPay = 0, sumOvtHours = 0;

        // Xử lý từng nhân viên
        while (n-- > 0) {
            double[] days = new double[5];
            for (int i = 0; i < 5; i++) days[i] = sc.nextDouble();
            double wage = sc.nextDouble(); // Lương theo giờ

            double personSalary = 0;

            // Tính toán từng ngày
            for (double h : days) {
                // 1. Tách giờ hành chính và giờ làm thêm
                double officeH = Math.min(h, 8);
                double ovtH = Math.max(0, h - 8);

                // 2. Tính tiền
                double officePay = officeH * wage;
                double ovtPay = ovtH * wage * 1.5;

                // 3. Cộng dồn
                personSalary += (officePay + ovtPay);

                // Cộng vào tổng công ty
                sumOfficePay += officePay;
                sumOfficeHours += officeH;
                sumOvtPay += ovtPay;
                sumOvtHours += ovtH;
            }
            // Lưu lương nhân viên này vào bộ đệm in
            sb.append(String.format("%.2f\\n", personSalary));
        }

        // Tính trung bình lương văn phòng
        if (sumOfficeHours > 0) 
            sb.append(String.format("%.2f\\n", sumOfficePay / sumOfficeHours));
        else 
            sb.append("0.00\\n");

        // Tính trung bình lương làm thêm
        if (sumOvtHours > 0) 
            sb.append(String.format("%.2f\\n", sumOvtPay / sumOvtHours));
        else 
            sb.append("0.00\\n");

        System.out.print(sb);
    }
}</code></pre>
        </div>
    `
});