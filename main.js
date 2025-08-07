// VR Gallery Main JavaScript
import './style.css'

// 全域變數
let imageUrls = [];
let galleryImages = [];
let isInitialized = false;

// 當 DOM 載入完成時初始化
document.addEventListener('DOMContentLoaded', function() {
  if (isInitialized) return;
  isInitialized = true;
  
  console.log('VR Gallery 初始化中...');
  
  // 簡單的延遲初始化，避免 A-Frame 衝突
  setTimeout(() => {
    initGallery();
  }, 1000);
});

// 初始化畫廊
function initGallery() {
  console.log('畫廊初始化完成');
  
  // 獲取所有畫廊圖片元素
  galleryImages = document.querySelectorAll('.gallery-image');
  console.log(`找到 ${galleryImages.length} 張圖片元素`);
  
  // 設定簡單的點擊事件
  setupSimpleEventListeners();
  
  // 載入圖片資料
  loadImageData();
}

// 設定簡單的事件監聽器
function setupSimpleEventListeners() {
  galleryImages.forEach((img, index) => {
    // 只綁定點擊事件，移除懸停效果
    img.addEventListener('click', function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      console.log(`點擊圖片 ${index + 1}`);
    });
  });
}

// 載入圖片資料
function loadImageData() {
  imageUrls = [];
  loadILoveColImages();
}

// 更新畫廊圖片
function updateGalleryImages() {
  console.log(`準備更新 ${galleryImages.length} 張圖片`);
  
  galleryImages.forEach((img, index) => {
    if (index < imageUrls.length) {
      const imageUrl = imageUrls[index];
      console.log(`設定圖片 ${index + 1}: ${imageUrl}`);
      img.setAttribute('src', imageUrl);
    }
  });
  
  console.log(`🖼️ 畫廊更新完成`);
}

// 載入 i-love-col 圖片（簡化版本）
async function loadILoveColImages() {
  try {
    const baseUrl = 'https://future801113.github.io/i-love-col';
    let loadedImages = [];
    
    // 載入 images 目錄的圖片（限制 3 張）
    try {
      console.log('載入 images 目錄的圖片...');
      const imagesResponse = await fetch(`${baseUrl}/images/images.json`);
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        if (imagesData && Array.isArray(imagesData)) {
          const images = imagesData
            .filter(item => item.url)
            .slice(0, 3)
            .map(item => `${baseUrl}/${item.url}`);
          loadedImages = [...loadedImages, ...images];
          console.log(`從 images 載入了 ${images.length} 張圖片`);
        }
      }
    } catch (e) {
      console.log('載入 images 目錄圖片失敗:', e.message);
    }
    
    // 載入 colne_icol_images 目錄的圖片（限制 3 張）
    try {
      console.log('載入 colne_icol_images 目錄的圖片...');
      const colneResponse = await fetch(`${baseUrl}/colne_icol_images/images.json`);
      if (colneResponse.ok) {
        const colneData = await colneResponse.json();
        if (colneData && Array.isArray(colneData)) {
          const colneImages = colneData
            .filter(item => item.url)
            .slice(0, 3)
            .map(item => {
              // colne_icol_images 的 URL 處理
              if (item.url.startsWith('colne_icol_images/')) {
                return `${baseUrl}/${item.url}`;
              } else {
                return `${baseUrl}/colne_icol_images/${item.url}`;
              }
            });
          loadedImages = [...loadedImages, ...colneImages];
          console.log(`從 colne_icol_images 載入了 ${colneImages.length} 張圖片`);
        }
      }
    } catch (e) {
      console.log('載入 colne_icol_images 目錄圖片失敗:', e.message);
    }
    
    // 設定圖片陣列
    if (loadedImages.length > 0) {
      imageUrls = loadedImages;
      console.log(`✅ 總共載入了 ${imageUrls.length} 張圖片`);
      updateGalleryImages();
    } else {
      console.log('⚠️ 沒有載入到任何圖片，使用預設圖片');
    }
    
  } catch (error) {
    console.error('❌ 載入圖片時發生錯誤:', error);
  }
}

// 匯出主要函數
export {
  initGallery,
  loadImageData
};
