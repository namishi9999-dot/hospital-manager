/**
 * Icon Base64 Loader
 * 
 * このスクリプトは、Base64エンコードされたアイコンをHTMLファイル内に動的に読み込み、
 * apple-touch-iconとしてブラウザのメタタグに設定します。
 * 
 * 使用方法:
 * 1. HTMLファイルの<head>タグ内に以下を追加：
 *    <script src="icon-base64-loader.js"></script>
 * 
 * 2. または、このファイルの内容をHTMLファイル内に直接埋め込み
 */

(function() {
  'use strict';

  // Base64エンコードされたアイコンデータ
  // 設定ファイルから読み込むか、以下に直接指定します
  
  const iconConfig = {
    hospital: {
      id: '0011',
      description: '病院管理アプリ用アイコン',
      // Base64データはここに設定されます
      base64: null
    },
    converter: {
      id: '0022',
      description: 'データコンバーター用アイコン',
      // Base64データはここに設定されます
      base64: null
    }
  };

  /**
   * Base64文字列からData URLを生成
   * @param {string} base64 - Base64エンコードされた画像データ
   * @param {string} mimeType - MIMEタイプ（デフォルト: image/png）
   * @returns {string} - Data URL
   */
  function createDataURL(base64, mimeType = 'image/png') {
    return `data:${mimeType};base64,${base64}`;
  }

  /**
   * メタタグを追加または更新
   * @param {string} name - メタタグの名前属性値
   * @param {string} content - メタタグのcontent属性値
   */
  function setMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    
    meta.content = content;
  }

  /**
   * link rel アイコンを追加または更新
   * @param {string} rel - link要素のrel属性値
   * @param {string} href - link要素のhref属性値
   * @param {Object} attributes - 追加属性
   */
  function setLinkTag(rel, href, attributes = {}) {
    let link = document.querySelector(`link[rel="${rel}"]`);
    
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
    
    link.href = href;
    
    // 追加属性を設定
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        link.setAttribute(key, value);
      }
    });
  }

  /**
   * 指定されたアイコンをHTMLに設定
   * @param {string} type - アイコンタイプ ('hospital' または 'converter')
   * @param {string} base64Data - Base64エンコードされた画像データ
   */
  function setIcon(type, base64Data) {
    if (!base64Data) {
      console.warn(`[IconLoader] ${type}アイコンのBase64データが指定されていません`);
      return;
    }

    const config = iconConfig[type];
    if (!config) {
      console.error(`[IconLoader] 未知のアイコンタイプ: ${type}`);
      return;
    }

    // Data URLを生成
    const dataUrl = createDataURL(base64Data);

    // 複数のメタタグとリンクタグを設定
    setLinkTag('apple-touch-icon', dataUrl, {
      'data-icon-id': config.id,
      'data-icon-type': type
    });

    setLinkTag('icon', dataUrl, {
      'type': 'image/png',
      'data-icon-id': config.id,
      'data-icon-type': type
    });

    setMetaTag(`app-icon-${type}`, dataUrl);

    console.log(`[IconLoader] ${config.description} (${config.id}) が設定されました`);
  }

  /**
   * 外部ファイルからBase64データを読み込む
   * @param {string} filePath - ファイルパス
   * @returns {Promise<string>} - Base64データ
   */
  async function loadBase64FromFile(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const text = await response.text();
      // ファイル形式が "KEY=VALUE" の場合、VALUEを抽出
      const match = text.match(/=(.+)$/);
      return match ? match[1].trim() : text.trim();
    } catch (error) {
      console.error(`[IconLoader] ファイル読み込みエラー (${filePath}):`, error);
      return null;
    }
  }

  /**
   * 初期化関数
   * HTMLドキュメントが完全に読み込まれた後に実行
   */
  async function initialize() {
    // ここでBase64データを読み込むか、直接設定します
    // 例: ファイルから読み込む場合
    // const hospitalBase64 = await loadBase64FromFile('hospital-icon-base64.txt');
    // const converterBase64 = await loadBase64FromFile('converter-icon-base64.txt');
    
    // または、直接設定する場合は、以下のようにiconConfig内でも可能です
    // window.setIcon = setIcon;
  }

  // グローバルに関数をエクスポート
  window.IconLoader = {
    setIcon: setIcon,
    loadBase64FromFile: loadBase64FromFile,
    createDataURL: createDataURL,
    setMetaTag: setMetaTag,
    setLinkTag: setLinkTag
  };

  // DOMContentLoaded時に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
