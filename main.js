// VR Gallery Main JavaScript
import './style.css'

// 全域變數
let currentImageIndex = 0;
let imageUrls = [];
let galleryImages = [];

// 當 DOM 載入完成時初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('VR Gallery 初始化中...');
  
  // 等待 A-Frame 載入完成
  const scene = document.querySelector('a-scene');
  
  if (scene.hasLoaded) {
    initGallery();
  } else {
    scene.addEventListener('loaded', initGallery);
  }
});

// 初始化畫廊
function initGallery() {
  console.log('畫廊初始化完成');
  
  // 獲取所有畫廊圖片元素
  galleryImages = document.querySelectorAll('.gallery-image');
  
  // 設定點擊事件監聽器
  setupEventListeners();
  
  // 載入圖片資料
  loadImageData();
  
  // 設定 Quest 2 特定功能
  setupQuestFeatures();
}

// 設定事件監聽器
function setupEventListeners() {
  // 畫廊圖片點擊事件
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', function(evt) {
      console.log(`點擊圖片 ${index + 1}`);
      expandImage(img, index);
      playClickSound();
    });
    
    // 滑鼠懸停效果（桌面瀏覽器）
    img.addEventListener('mouseenter', function() {
      this.emit('mouseenter');
    });
    
    img.addEventListener('mouseleave', function() {
      this.emit('mouseleave');
    });
  });

  // 控制按鈕事件
  const prevBtn = document.querySelector('#prev-btn');
  const nextBtn = document.querySelector('#next-btn');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      console.log('上一頁');
      previousPage();
      playClickSound();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      console.log('下一頁');
      nextPage();
      playClickSound();
    });
  }
}

// 載入圖片資料
function loadImageData() {
  // 先設定一些預設圖片作為備用
  imageUrls = [
    'https://picsum.photos/512/512?random=1',
    'https://picsum.photos/512/512?random=2', 
    'https://picsum.photos/512/512?random=3',
    'https://picsum.photos/512/512?random=4',
    'https://picsum.photos/512/512?random=5',
    'https://picsum.photos/512/512?random=6',
    'https://picsum.photos/512/512?random=7',
    'https://picsum.photos/512/512?random=8'
  ];
  
  // 先顯示預設圖片
  updateGalleryImages();
  
  // 異步載入 i-love-col 圖片
  loadILoveColImages();
}

// 更新畫廊圖片
function updateGalleryImages() {
  galleryImages.forEach((img, index) => {
    const imageIndex = (currentImageIndex + index) % imageUrls.length;
    const imageUrl = imageUrls[imageIndex];
    
    // 更新圖片來源
    img.setAttribute('src', imageUrl);
    
    // 更新圖片標題
    const textElement = img.parentElement.querySelector('a-text');
    if (textElement) {
      textElement.setAttribute('value', `圖片 ${imageIndex + 1}`);
    }
  });
  
  console.log(`🖼️ 畫廊更新完成，顯示第 ${currentImageIndex + 1}-${Math.min(currentImageIndex + 10, imageUrls.length)} 張圖片`);
}

// 展開圖片（全螢幕檢視）
function expandImage(imgElement, index) {
  const scene = document.querySelector('a-scene');
  
  // 創建全螢幕圖片檢視
  const expandedImg = document.createElement('a-plane');
  expandedImg.setAttribute('id', 'expanded-image');
  expandedImg.setAttribute('position', '0 1.6 -2');
  expandedImg.setAttribute('width', '4');
  expandedImg.setAttribute('height', '4');
  expandedImg.setAttribute('src', imgElement.getAttribute('src'));
  expandedImg.setAttribute('material', 'transparent: true; opacity: 0');
  
  // 添加關閉按鈕
  const closeBtn = document.createElement('a-box');
  closeBtn.setAttribute('position', '2.5 2.5 0.1');
  closeBtn.setAttribute('width', '0.5');
  closeBtn.setAttribute('height', '0.5');
  closeBtn.setAttribute('depth', '0.1');
  closeBtn.setAttribute('color', '#f44336');
  closeBtn.setAttribute('text', 'value: X; align: center; color: white; width: 20');
  closeBtn.classList.add('clickable');
  
  // 關閉事件
  closeBtn.addEventListener('click', function() {
    scene.removeChild(expandedImg);
    playClickSound();
  });
  
  expandedImg.appendChild(closeBtn);
  scene.appendChild(expandedImg);
  
  // 淡入動畫
  expandedImg.setAttribute('animation', 'property: material.opacity; to: 1; dur: 300');
}

// 上一頁
function previousPage() {
  currentImageIndex = Math.max(0, currentImageIndex - 10);
  updateGalleryImages();
  console.log(`⬅️ 上一頁，當前起始圖片: ${currentImageIndex + 1}`);
}

// 下一頁  
function nextPage() {
  if (currentImageIndex + 10 < imageUrls.length) {
    currentImageIndex += 10;
    updateGalleryImages();
    console.log(`➡️ 下一頁，當前起始圖片: ${currentImageIndex + 1}`);
  } else {
    console.log(`📄 已經是最後一頁了`);
  }
}

// 播放點擊音效
function playClickSound() {
  const sound = document.querySelector('#clickSound');
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log('無法播放音效:', e));
  }
}

// 設定 Quest 2 特定功能
function setupQuestFeatures() {
  // 檢測是否在 Quest 2 中運行
  if (isQuest()) {
    console.log('偵測到 Quest 2 環境');
    
    // 啟用手部追蹤
    enableHandTracking();
    
    // 最佳化 Quest 2 效能
    optimizeForQuest();
  }
}

// 檢測是否在 Quest 2 中運行
function isQuest() {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('oculusbrowser') || 
         userAgent.includes('quest') ||
         (navigator.xr && window.DeviceOrientationEvent);
}

// 啟用手部追蹤
function enableHandTracking() {
  const leftHand = document.querySelector('#leftHand');
  const rightHand = document.querySelector('#rightHand');
  
  if (leftHand && rightHand) {
    // 添加手勢識別
    leftHand.setAttribute('hand-tracking-controls', '');
    rightHand.setAttribute('hand-tracking-controls', '');
    
    console.log('手部追蹤已啟用');
  }
}

// Quest 2 效能最佳化
function optimizeForQuest() {
  const scene = document.querySelector('a-scene');
  
  // 設定適合 Quest 2 的渲染參數
  scene.setAttribute('renderer', 'antialias: false; colorManagement: true; sortObjects: true; physicallyCorrectLights: true');
  scene.setAttribute('vr-mode-ui', 'cardboardUI: false; enterVRButton: #enterVRButton');
  
  console.log('Quest 2 效能最佳化完成');
}

// 載入 i-love-col 圖片（從 JSON 檔案載入）
async function loadILoveColImages() {
  try {
    const baseUrl = 'https://future801113.github.io/i-love-col';
    let loadedImages = [];
    
    // 載入 images 目錄的圖片
    try {
      console.log('載入 images 目錄的圖片...');
      const imagesResponse = await fetch(`${baseUrl}/images/images.json`);
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        if (imagesData && Array.isArray(imagesData)) {
          const images = imagesData
            .filter(item => item.url) // 確保有 url 欄位
            .map(item => `${baseUrl}/${item.url}`);
          loadedImages = [...loadedImages, ...images];
          console.log(`從 images 載入了 ${images.length} 張圖片`);
        }
      }
    } catch (e) {
      console.log('載入 images 目錄圖片失敗:', e.message);
    }
    
    // 載入 colne_icol_images 目錄的圖片
    try {
      console.log('載入 colne_icol_images 目錄的圖片...');
      const colneResponse = await fetch(`${baseUrl}/colne_icol_images/images.json`);
      if (colneResponse.ok) {
        const colneData = await colneResponse.json();
        if (colneData && Array.isArray(colneData)) {
          const colneImages = colneData
            .filter(item => item.url) // 確保有 url 欄位
            .map(item => `${baseUrl}/${item.url}`);
          loadedImages = [...loadedImages, ...colneImages];
          console.log(`從 colne_icol_images 載入了 ${colneImages.length} 張圖片`);
        }
      }
    } catch (e) {
      console.log('載入 colne_icol_images 目錄圖片失敗:', e.message);
    }
    
    // 如果成功載入了圖片，替換現有的圖片陣列
    if (loadedImages.length > 0) {
      // 將載入的圖片放在前面，範例圖片放在後面作為備用
      imageUrls = [...loadedImages, ...imageUrls];
      console.log(`✅ 總共載入了 ${loadedImages.length} 張 i-love-col 圖片`);
      console.log('圖片載入完成，更新畫廊顯示...');
      updateGalleryImages(); // 立即更新畫廊顯示
    } else {
      console.log('⚠️ 沒有載入到任何 i-love-col 圖片，使用預設圖片');
    }
    
  } catch (error) {
    console.error('❌ 載入圖片時發生錯誤:', error);
    console.log('使用預設圖片繼續運行');
  }
}

// 匯出主要函數（供其他模組使用）
export {
  initGallery,
  loadImageData,
  expandImage,
  isQuest
};
