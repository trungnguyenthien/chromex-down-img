chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "downloadImage") {
    chrome.downloads.download({
      url: message.url,
      filename: `images/${new URL(message.url).pathname.split('/').pop()}`, // Tạo thư mục và đặt tên file
      conflictAction: "uniquify", // Đảm bảo không ghi đè file
      saveAs: false // Không yêu cầu xác nhận đường dẫn
    });
  }
});
