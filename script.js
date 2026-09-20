// Biến đếm số lần bấm nút "Từ chối"
let noButtonClickCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  setupMinDateTime();
});

// 1. TỰ ĐỘNG KHÓA NGÀY TỐI THIỂU LÀ NGÀY HIỆN TẠI
function setupMinDateTime() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  const minDate = `${year}-${month}-${day}`;
  dateInput.min = minDate;
  dateInput.value = minDate;
}

// 2. XỬ LÝ CHUỖI SỰ KIỆN 3 LẦN BẤM NÚT "TỪ CHỐI"
function handleNoButtonClick() {
  const btnNo = document.getElementById('btn-no');
  if (!btnNo) return;

  noButtonClickCount++;

  if (noButtonClickCount === 1) {
    // Lần 1: Đổi chữ, khung vẫn xám
    btnNo.innerText = "Cho chọn lại á 🙄";
  } 
  else if (noButtonClickCount === 2) {
    // Lần 2: Đổi chữ, khung vẫn xám
    btnNo.innerText = "Bảo chọn lại mà trời 😤";
  } 
  else if (noButtonClickCount === 3) {
    // Lần 3: Đổi chữ + Biến thành màu đỏ hồng + Tạo hiệu ứng rung
    btnNo.innerText = "Phải có, tưởng có lựa chọn hả 😜";
    btnNo.classList.remove('btn-secondary');
    btnNo.classList.add('btn-converted');
  } 
  else {
    // Lần 4 trở đi (khi nút đã biến thành màu đỏ hồng): Chuyển sang Bước 2
    goToStep(2);
  }
}

// 3. CHUYỂN BƯỚC
function goToStep(stepNumber) {
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
  document.getElementById(`step-${stepNumber}`).classList.add('active');
}

// 4. KIỂM TRA & XỬ LÝ LỊCH HẸN
function handleFormSubmit(event) {
  event.preventDefault();

  const errorMsg = document.getElementById('error-msg');
  errorMsg.innerText = '';

  const dateVal = document.getElementById('date').value;
  const timeVal = document.getElementById('time').value;
  const otherVal = document.getElementById('other-activity').value.trim();

  const selectedCheckboxes = document.querySelectorAll('input[name="activity"]:checked');
  let activities = Array.from(selectedCheckboxes).map(cb => cb.value);

  if (otherVal !== '') {
    activities.push(otherVal);
  }

  if (activities.length === 0) {
    errorMsg.innerText = 'Thi chọn ít nhất 1 hoạt động hoặc tự nhập thêm nha! 😊';
    return;
  }

  const now = new Date();
  const selectedDateTime = new Date(`${dateVal}T${timeVal}`);

  if (isNaN(selectedDateTime.getTime())) {
    errorMsg.innerText = 'Vui lòng chọn thời gian hợp lệ!';
    return;
  }

  if (selectedDateTime < now) {
    errorMsg.innerText = 'Thi ơi, không thể du hành về quá khứ chọn giờ đã qua được nè! 😁';
    return;
  }

  const formattedDate = selectedDateTime.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  document.getElementById('res-date').innerText = formattedDate;
  document.getElementById('res-time').innerText = timeVal;
  document.getElementById('res-activity').innerText = activities.join(', ');

  goToStep(3);
}
