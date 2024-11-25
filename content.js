document.addEventListener('click', function (event) {
  if (event.shiftKey && event.target.tagName === 'IMG') {
    event.preventDefault(); // Ngăn hành động mặc định (mở link)
    event.stopPropagation(); // Ngăn các sự kiện khác trên thẻ cha
    
    // Gửi URL ảnh về background.js để xử lý tải về
    chrome.runtime.sendMessage({ type: "downloadImage", url: event.target.src });
  }
});
// Lấy URL của ảnh down.png trong thư mục extension
const downloadIconURL = chrome.runtime.getURL('down.png');

// Hàm tạo nút download
function createDownloadButton(imgElement) {
  // Kiểm tra nếu nút đã tồn tại thì không thêm nữa
  if (imgElement.parentElement.querySelector('.download-btn')) return;

  // Tạo nút
  const button = document.createElement('button');
  button.className = 'download-btn';
  button.style.position = 'absolute';
  button.style.left = '0';
  button.style.bottom = '0';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.backgroundColor = 'transparent';
  button.style.border = 'none';
  button.style.padding = '0';
  button.style.cursor = 'pointer';
  button.style.zIndex = '1000';
  button.style.backgroundImage = `url("${downloadIconURL}")`; // Dùng ảnh down.png
  button.style.backgroundRepeat = 'no-repeat';
  button.style.backgroundSize = 'contain';

  // Thêm sự kiện tải ảnh
  button.addEventListener('click', function (event) {
    event.stopPropagation(); // Ngăn sự kiện click ảnh
    event.preventDefault();

    // Gửi ảnh về background để tải xuống
    chrome.runtime.sendMessage({ type: 'downloadImage', url: imgElement.src });
  });

  // Bọc hình ảnh bằng thẻ div để dễ thêm nút
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.display = 'inline-block';

  imgElement.parentNode.insertBefore(wrapper, imgElement);
  wrapper.appendChild(imgElement);
  wrapper.appendChild(button);
}

// Thêm nút download cho mọi hình ảnh
function addDownloadButtons() {
  const images = document.querySelectorAll('img');
  images.forEach(createDownloadButton);
}

// Quan sát DOM để thêm nút khi ảnh mới xuất hiện
const observer = new MutationObserver(addDownloadButtons);
observer.observe(document.body, { childList: true, subtree: true });

// Thêm nút download khi script được chạy lần đầu
addDownloadButtons();
