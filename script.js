// CẤU HÌNH DANH SÁCH NHÓM
const groups = {
    "Mua sắm & Khuyến mãi": [
        "algo_discount_tier", "algo_discount_tier_2", "algo_markup", 
        "algo_sales_bonus", "algo_memcard", "algo_discount_3", 
        "algo_auction", "algo_christmas_discount"
    ],
    "Ngân hàng & Tiết kiệm": [
        "math_interest_rate", "math_simple_interest", "algo_bank_fee", 
        "algo_bank_fee_2", "math_saving_opt", "math_saving_accumulate", 
        "math_saving_reverse", "algo_credit_card", "algo_financial_freedom"
    ],
    "Lương, Thuế & Thu nhập": [
        "algo_tax_calc", "math_gross_salary", "algo_salary_2", "algo_gross_salary_2"
    ],
    "Vay & Trả Góp": [
        "math_house_loan", "math_loan_duration", "math_purchase_rate", 
        "math_annuity_payment", "math_leasing_battery", "math_loan_prepay"
    ]
};

// HÀM RENDER CHÍNH (Có hỗ trợ tìm kiếm)
function renderApp(searchTerm = "") {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; 
    
    // Chuẩn hóa từ khóa tìm kiếm (chữ thường, bỏ khoảng trắng)
    const term = searchTerm.toLowerCase().trim();

    for (const [groupName, problemIDs] of Object.entries(groups)) {
        
        // 1. Lọc bài toán theo ID
        let groupProblems = problemIDs.map(id => problems.find(p => p.id === id)).filter(p => p);

        // 2. Lọc theo từ khóa tìm kiếm (Tìm trong Tên, Subtext, Index)
        if (term) {
            groupProblems = groupProblems.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.subtext.toLowerCase().includes(term) ||
                p.index.includes(term)
            );
        }

        // 3. SẮP XẾP (Sorting): Theo số thứ tự Index tăng dần
        groupProblems.sort((a, b) => parseInt(a.index) - parseInt(b.index));

        // Chỉ hiển thị nhóm nếu có bài toán phù hợp
        if (groupProblems.length > 0) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group-container';
            
            const title = document.createElement('div');
            title.className = 'group-title';
            title.innerText = groupName;
            groupDiv.appendChild(title);

            const tableBox = document.createElement('div');
            tableBox.className = 'table-box';

            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th class="col-id">#</th>
                        <th>Tên Bài / Chủ đề</th>
                        <th>Dạng bài</th>
                        <th>Đánh giá</th>
                        <th class="col-action">Chi tiết</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            
            const tbody = table.querySelector('tbody');

            groupProblems.forEach(p => {
                const row = document.createElement('tr');
                row.onclick = () => openModal(p.id);
                row.innerHTML = `
                    <td class="col-id">${p.index}</td>
                    <td><b>${p.name}</b><br><small>${p.subtext}</small></td>
                    <td><span class="badge ${p.badgeClass}">${p.type}</span></td>
                    <td>${p.stars}</td>
                    <td class="col-action"><button class="btn-view">Xem</button></td>
                `;
                tbody.appendChild(row);
            });

            tableBox.appendChild(table);
            groupDiv.appendChild(tableBox);
            mainContent.appendChild(groupDiv);
        }
    }

    // Thông báo nếu không tìm thấy gì
    if (mainContent.innerHTML === '') {
        mainContent.innerHTML = '<div style="text-align:center; color:#888; padding:20px;">Không tìm thấy bài toán nào phù hợp.</div>';
    }
}

// LẮNG NGHE SỰ KIỆN TÌM KIẾM
const searchBox = document.getElementById('search-box');
searchBox.addEventListener('input', (e) => {
    renderApp(e.target.value);
});

// Logic Modal (Giữ nguyên)
const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function openModal(id) {
    const problem = problems.find(p => p.id === id);
    if(problem) {
        modalTitle.innerText = problem.name;
        modalBody.innerHTML = problem.content;
        modal.style.display = "block";
        
        if(window.MathJax) MathJax.typesetPromise();
        if(window.Prism) {
            const codeBlocks = modalBody.querySelectorAll('pre code'); 
            codeBlocks.forEach(block => Prism.highlightElement(block));
        }
    }
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) closeModal();
}

// Chạy lần đầu
document.addEventListener('DOMContentLoaded', () => renderApp());