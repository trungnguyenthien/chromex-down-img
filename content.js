let lastEnterTime = 0; // Thời gian nhấn Enter lần cuối
let hoveredImage = null; // Ảnh hiện tại con trỏ chuột đang hover

// Theo dõi khi con trỏ di chuyển vào một ảnh
document.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'IMG') {
    hoveredImage = event.target; // Ghi nhận ảnh đang được hover
  }
});

// Theo dõi khi con trỏ rời khỏi ảnh
document.addEventListener('mouseout', (event) => {
  if (event.target.tagName === 'IMG') {
    hoveredImage = null; // Xóa ảnh nếu con trỏ rời khỏi
  }
});

// Lắng nghe sự kiện nhấn phím
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const currentTime = Date.now();
    if (currentTime - lastEnterTime <= 300 && hoveredImage) {
      // Nếu nhấn Enter hai lần trong 0.5 giây và đang hover trên ảnh
      chrome.runtime.sendMessage({ type: 'downloadImage', url: hoveredImage.src });
    }
    lastEnterTime = currentTime; // Cập nhật thời gian nhấn Enter
  }
});
