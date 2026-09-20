let isNoBtnConverted = false;

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

// 2. XỬ LÝ BẤM NÚT "ĐỂ SUY NGHĨ ĐÃ"
function handleNoButtonClick() {
  const btnNo = document.getElementById('btn-no');
  if (!btnNo) return;

  if (!isNoBtnConverted) {
    // Bấm lần 1: Đổi chữ, biến thành nút màu hồng đỏ + tạo hiệu ứng rung lắc
    btnNo.innerText = "Phải có, tưởng mình được chọn hả trờiii 😾";
    btnNo.classList.remove('btn-secondary');
    btnNo.classList.add('btn-converted');
    isNoBtnConverted = true;
  } else {
    // Bấm lần 2 (khi đã biến hình): Chuyển sang Bước 2 ngay lập tức
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
