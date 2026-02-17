# アイコンBase64設定ガイド

## 概要

このガイドでは、Base64エンコードされたアイコン画像をHTMLアプリケーションに統合する方法を説明します。

## ファイル構成

```
files/
├── hospital-icon-base64.txt          # 病院管理アプリ用アイコン (0011.png)
├── converter-icon-base64.txt         # データコンバーター用アイコン (0022.png)
├── icon-base64-loader.js             # アイコン読み込みスクリプト
├── hospital-manager-github.html      # 病院管理アプリ (統合対象)
└── data-converter-kintone.html       # データコンバーター (統合対象)
```

## アイコン情報

### 0011 - Hospital Icon (病院管理アプリ用)
- **ファイル**: hospital-icon-base64.txt
- **変数名**: HOSPITAL_ICON_BASE64_0011
- **用途**: hospital-manager-github.html の apple-touch-icon
- **サイズ**: Base64エンコード後 748KB

### 0022 - Converter Icon (データコンバーター用)
- **ファイル**: converter-icon-base64.txt
- **変数名**: CONVERTER_ICON_BASE64_0022
- **用途**: data-converter-kintone.html の apple-touch-icon
- **サイズ**: Base64エンコード後 837KB

## 統合方法

### 方法1: HTMLファイル内に直接組み込む

#### 病院管理アプリの場合 (hospital-manager-github.html)

```html
<head>
  <!-- ... その他のメタタグ ... -->
  
  <script>
    // Base64アイコンデータを設定
    const HOSPITAL_ICON_BASE64_0011 = "iVBORw0KGgoAAAANSUhEUgAAAiYAAAISCAYAAAD4JQT9...";
    
    // アイコンをDOMに設定
    window.addEventListener('DOMContentLoaded', function() {
      const dataUrl = 'data:image/png;base64,' + HOSPITAL_ICON_BASE64_0011;
      
      // apple-touch-icon を設定
      let link = document.querySelector('link[rel="apple-touch-icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'apple-touch-icon';
        document.head.appendChild(link);
      }
      link.href = dataUrl;
      
      // favicon を設定
      let favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        document.head.appendChild(favicon);
      }
      favicon.href = dataUrl;
    });
  </script>
</head>
```

#### データコンバーターの場合 (data-converter-kintone.html)

```html
<head>
  <!-- ... その他のメタタグ ... -->
  
  <script>
    // Base64アイコンデータを設定
    const CONVERTER_ICON_BASE64_0022 = "iVBORw0KGgoAAAANSUhEUgAAAiQAAAH2CAYAAABA7ZfJ...";
    
    // アイコンをDOMに設定
    window.addEventListener('DOMContentLoaded', function() {
      const dataUrl = 'data:image/png;base64,' + CONVERTER_ICON_BASE64_0022;
      
      // apple-touch-icon を設定
      let link = document.querySelector('link[rel="apple-touch-icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'apple-touch-icon';
        document.head.appendChild(link);
      }
      link.href = dataUrl;
      
      // favicon を設定
      let favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        document.head.appendChild(favicon);
      }
      favicon.href = dataUrl;
    });
  </script>
</head>
```

### 方法2: icon-base64-loader.js を使用

#### ステップ1: HTMLファイルにスクリプトを追加

```html
<head>
  <!-- ... その他のメタタグ ... -->
  <script src="icon-base64-loader.js"></script>
</head>
```

#### ステップ2: アイコンを動的に設定

スクリプト読み込み後、グローバル関数 `IconLoader` が利用可能になります：

```javascript
// 病院管理アプリの場合
const hospitalBase64 = "iVBORw0KGgoAAAANSUhEUgAAAiYAAAISCAYAAAD4JQT9...";
window.IconLoader.setIcon('hospital', hospitalBase64);

// データコンバーターの場合
const converterBase64 = "iVBORw0KGgoAAAANSUhEUgAAAiQAAAH2CAYAAABA7ZfJ...";
window.IconLoader.setIcon('converter', converterBase64);
```

### 方法3: 外部ファイルから読み込む（推奨）

Base64データが外部ファイル（hospital-icon-base64.txt など）に存在する場合：

```javascript
// 初期化時に自動的に読み込む
async function initializeIcons() {
  const hospitalBase64 = await window.IconLoader.loadBase64FromFile('hospital-icon-base64.txt');
  const converterBase64 = await window.IconLoader.loadBase64FromFile('converter-icon-base64.txt');
  
  if (hospitalBase64) {
    window.IconLoader.setIcon('hospital', hospitalBase64);
  }
  
  if (converterBase64) {
    window.IconLoader.setIcon('converter', converterBase64);
  }
}

initializeIcons();
```

## 実装チェックリスト

### hospital-manager-github.html の場合
- [ ] hospital-icon-base64.txt を確認
- [ ] アイコン統合スクリプトを <head> 内に追加
- [ ] ブラウザのデベロッパーツールでアイコンが表示されることを確認
- [ ] スマートフォンのホーム画面に追加したときアイコンが表示されることを確認

### data-converter-kintone.html の場合
- [ ] converter-icon-base64.txt を確認
- [ ] アイコン統合スクリプトを <head> 内に追加
- [ ] ブラウザのデベロッパーツールでアイコンが表示されることを確認
- [ ] スマートフォンのホーム画面に追加したときアイコンが表示されることを確認

## トラブルシューティング

### アイコンが表示されない場合

1. **ブラウザコンソールでエラーを確認**
   ```
   F12キーを押してデベロッパーツールを開き、
   コンソールタブでエラーメッセージを確認してください
   ```

2. **Base64データが正しく設定されているか確認**
   - `hospital-icon-base64.txt` と `converter-icon-base64.txt` 
     が正しい場所にあるか確認
   - ファイルの内容が `KEY=VALUE` 形式か確認

3. **メタタグが正しく挿入されているか確認**
   ```javascript
   // コンソールで実行
   document.querySelector('link[rel="apple-touch-icon"]');
   document.querySelector('link[rel="icon"]');
   ```

4. **キャッシュをクリア**
   - ブラウザのキャッシュをクリア（Ctrl+Shift+Delete）
   - またはブラウザを再起動

## データURL仕様

生成されるData URLは以下の形式です：

```
data:image/png;base64,[Base64エンコードされた画像データ]
```

例：
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAAISCAYAAAD4JQT9...
```

## ブラウザ互換性

| ブラウザ | apple-touch-icon | icon (favicon) |
|---------|------------------|----------------|
| Chrome  | ✅               | ✅            |
| Firefox | ✅               | ✅            |
| Safari  | ✅               | ✅            |
| Edge    | ✅               | ✅            |
| Safari iOS | ✅ (推奨)     | ✅            |

## 参考資料

- [apple-touch-icon - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#adding_custom_icons_to_your_website)
- [Data URIs - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
- [favicon - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/Favicon)

