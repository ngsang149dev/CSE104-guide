problems.push({
    id: 'algo_auction',
    index: '17',
    name: 'Đấu giá Black Friday',
    subtext: 'EIAUCTION - Frequency Array',
    type: 'Algorithm',
    badgeClass: 'badge-algo',
    stars: '⭐⭐',
    content: `
        <div class="section-box sec-green">
            <span class="sec-title">1. Tóm tắt Đề bài</span>
            <p>Có $N$ người gieo xúc xắc (giá trị từ 1 đến 6).</p>
            <p><b>Luật thắng cuộc:</b> Người chiến thắng là người có kết quả <b>DUY NHẤT</b> (không bị trùng với ai) và giá trị đó phải <b>LỚN NHẤT</b> trong số các kết quả duy nhất.</p>
            <p><b>Output:</b> In ra chỉ số (index) của người thắng (tính từ 1). Nếu không ai thắng, in "none".</p>
        </div>

        <div class="section-box sec-yellow">
            <span class="sec-title">2. Tư duy & Giải pháp</span>
            <p><b>Tư duy:</b> Do giá trị xúc xắc rất nhỏ (chỉ 1-6), ta dùng kỹ thuật <b>Mảng Tần Suất (Frequency Array)</b>.</p>
            <ul>
                <li>Dùng mảng <code>counts[7]</code> để đếm số lần xuất hiện của mỗi mặt.</li>
                <li>Dùng mảng <code>indices[7]</code> để lưu vị trí của người vừa gieo được mặt đó.</li>
            </ul>
            <p><b>Thuật toán tìm Max Unique:</b></p>
            <p>Thay vì tìm kiếm lằng nhằng, ta duyệt ngược từ 6 về 1. Mặt nào có <code>counts[i] == 1</code> thì đó chính là đáp án (vì ta đang tìm số lớn nhất).</p>
        </div>

        <div class="section-box sec-blue">
            <span class="sec-title">3. Code Java (Clean Code)</span>
            <pre class="language-java"><code class="language-java">
import java.util.*;

public class EIAUCTION {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        // Mảng đếm tần suất (1-6)
        int[] counts = new int[7];
        // Mảng lưu vị trí người gieo (1-6)
        int[] indices = new int[7];

        for (int i = 1; i <= n; i++) {
            int roll = sc.nextInt(); // Kết quả gieo
            
            counts[roll]++;     // Tăng số lần xuất hiện
            indices[roll] = i;  // Lưu vị trí người chơi (index 1-based)
        }
        
        // Chiến thuật: Duyệt ngược từ lớn về nhỏ (6 -> 1)
        // Để tìm số LỚN NHẤT mà DUY NHẤT
        for (int i = 6; i >= 1; i--) {
            if (counts[i] == 1) {
                System.out.println(indices[i]);
                return; // Tìm thấy là dừng ngay
            }
        }
        
        System.out.println("none");
    }    
}</code></pre>
        </div>
    `
});