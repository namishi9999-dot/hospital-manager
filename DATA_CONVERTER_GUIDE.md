# Kintone データコンバーター 使用ガイド

## 📊 概要

**Kintone データコンバーター** は、Kintoneから抽出したExcelファイルと、病院顧客管理アプリ用のCSVファイルを自動変換するツールです。

- **Excel → CSV**: Kintoneの施設管理・医療者在籍管理ファイルをアプリ用CSVに自動変換
- **CSV → Excel**: アプリからエクスポートしたCSVをExcel形式に変換
- **GitHub連携**: 変換後、自動でGitHubにアップロード（オプション）

---

## 🚀 使い方

### 1️⃣ アプリを開く

ブラウザで以下のファイルを開きます：

```
data-converter-kintone.html
```

---

### 2️⃣ Excel → CSV 変換（推奨フロー）

#### ステップ1: 施設管理Excelをアップロード

1. **タブ**: 🔄 Excel → CSV
2. **セクション**: 🏥 施設管理 (Excel → CSV)
3. ファイル選択: `01_施設管理_20260216T190800+0900.xlsx`（Kintoneからダウンロード）
   - ドラッグ&ドロップで選択
   - またはクリックして選択
4. **「CSVに変換」** をクリック
5. プレビューで変換内容を確認
6. **「ダウンロード」** で `hospitals.csv` をダウンロード

#### ステップ2: 医療従事者Excelをアップロード

1. **セクション**: 👥 医療従事者管理 (Excel → CSV)
2. ファイル選択: `03_医療者在籍管理_20260216T190941+0900.xlsx`
3. **「CSVに変換」** をクリック
4. **「ダウンロード」** で `staff_imported.csv` をダウンロード

#### ステップ3: GitHubにアップロード（オプション）

1. **タブ**: ⚙️ 設定
2. GitHub設定を入力:
   - **GitHubユーザー名**: your-username
   - **リポジトリ名**: hospital-manager
   - **Personal Access Token**: ghp_XXXXXXXXX
3. **「設定を保存」** をクリック
4. **「接続をテスト」** で接続確認

---

### 3️⃣ CSV → Excel 変換

1. **タブ**: 📊 CSV → Excel
2. アプリからエクスポートしたCSVファイルをアップロード
   - `hospitals.csv` → **Excelダウンロード**
   - `staff.csv` → **Excelダウンロード**
3. Excelファイルがダウンロードされます

---

## 📋 変換仕様

### Excel → CSV: 施設管理

**入力**: `01_施設管理_*.xlsx`

**変換ルール**:
| Excel列 | 説明 | CSV列 |
|--------|------|--------|
| D | 病院/施設名 | Name |
| G | 住所 | Address |
| E | 都道府県 | Prefecture |
| F | 市区町村 | City |
| H | 電話番号 | Phone |

**出力**: `hospitals.csv` (13列)

```
Name,Address,Prefecture,City,Phone,Other,Memo,Targets,BedCount,ICUBeds,DialysisBeds,DialysisPatients,DialysisRenewalYear
いずみの病院,高知県高知市薊野北町...,高知県,高知市,088-826-5511,,,,,,,,
```

### Excel → CSV: 医療従事者

**入力**: `03_医療者在籍管理_*.xlsx`

**変換ルール**:
| Excel列 | 説明 | CSV列 |
|--------|------|--------|
| B | 病院/施設名 | HospitalName |
| F | 名前 | **Name** ← 実名 |
| G | 部門 | JobType |
| E | 従事者名（正式） | Memo (Specialty:) |
| C | 従事者科 | Memo (Department:) |

**出力**: `staff_imported.csv` (7列)

```
ID,Name,HospitalName,JobType,Phone,Email,Memo
S0001,和多 一,三豊総合病院,医師,,,Specialty: 循環器内科
S0002,松村 敏信,公立学校共済組合四国中央病院,医師,,,Specialty: 消化器外科
```

**重要**: 医療従事者の実名（F列）が正しくName列に配置されます。

### CSV → Excel: シンプル形式

- CSVの全カラムをExcelにそのまま出力
- ヘッダー行は太字背景色で表示
- 列幅は自動調整

---

## ⚙️ GitHub 連携設定

### 設定の入力

1. **GitHubユーザー名**: `username`
2. **リポジトリ名**: `hospital-manager`
3. **Personal Access Token**: GitHub個人アクセストークン
   - [GitHub Settings > Developer settings > Personal access tokens (classic)](https://github.com/settings/tokens) から生成
   - スコープ: `repo` を選択

### 接続テスト

1. 「接続をテスト」をクリック
2. 結果が表示されます:
   - ✅ **成功**: GitHub接続可能
   - ❌ **失敗**: ユーザー名、リポジトリ名、トークンを確認

### 設定の保存

- 設定は **ブラウザのlocalStorage** に自動保存されます
- 同じブラウザ・端末では再入力不要

---

## 📁 ファイル一覧

```
D:\soft\ソフト開発\ソフト開発テスト\顧客管理アプリ\files\
├── data-converter-kintone.html ★ (新規)
│  └── Kintone ↔ App CSV データコンバーター
├── hospital-manager-github.html
│  └── 病院顧客管理メインアプリ
└── [CSVサンプルファイル]
   ├── hospitals.csv (97件)
   ├── hospitals_imported.csv (96件)
   ├── staff.csv (サンプル2件)
   ├── staff_imported.csv (616件) ← このファイルが目標出力
   ├── targets.csv
   ├── jobtypes.csv
   ├── schedules.csv
   └── appointments.csv
```

---

## 🎯 おすすめの使い方

### 初回セットアップ

1. **Excelファイル 2つ をダウンロード** (Kintone)
   - `01_施設管理_*.xlsx`
   - `03_医療者在籍管理_*.xlsx`

2. **コンバーターでCSV変換**
   - 施設管理 → `hospitals.csv`
   - 医療従事者 → `staff_imported.csv`

3. **アプリにインポート**
   - アプリ → ⚙️ 設定タブ
   - 📤 CSVインポート → ダウンロードしたCSVを選択

4. **GitHub同期**
   - 自動でGitHubに保存

### 定期更新

1. **Kintoneで更新されたExcelをダウンロード**
2. **コンバーターで新しいCSVに変換**
3. **アプリで 再度インポート**（古いデータは上書き）

### バックアップ・確認用

1. **アプリからCSVエクスポート**
2. **コンバーターでExcelに変換**
3. **Excelで確認・修正可能**

---

## ⚠️ 注意事項

### データの確認

- Excel読み込み後、**必ずプレビューで確認**してください
- 列が不正な場合、「CSVに変換」ボタンが無効になります

### 重複排除

- 同じデータを複数回インポートすると重複します
- 既存データを上書きしたい場合は、先にアプリで削除してください

### ファイル形式

- **入力**: `.xlsx` または `.xls` (Excelのみ)
- **出力**: `.csv` (UTF-8 BOM付き, Excel互換)

### ブラウザ互換性

- Chrome, Firefox, Safari, Edge ✅
- Internet Explorer ❌（非対応）

---

## 🆘 トラブルシューティング

### Q1. Excelファイルが読み込めない

**A**: 以下を確認してください：
- ファイル形式が `.xlsx` または `.xls` か
- ファイルが破損していないか
- ブラウザのコンソール(F12) でエラーを確認

### Q2. 変換後のデータがおかしい

**A**: 以下を確認してください：
- プレビューで元データが正しく表示されているか
- 列番号が正しいか（施設管理の列D, E, F, G, H を確認）
- 医療従事者の場合、F列に実名が入っているか

### Q3. GitHub連携ができない

**A**: 以下を確認してください：
- Personal Access Token が正しいか
- トークンのスコープに `repo` が含まれているか
- ユーザー名、リポジトリ名が正しいか
- インターネット接続があるか

### Q4. ダウンロードしたCSVがExcelで文字化けする

**A**: ファイルを開く際に、エンコーディングを **UTF-8** に設定してください。本アプリが出力するCSVはUTF-8 BOM付きのため、ほぼのExcelで自動判定されます。

---

## 💡 ヒント

- **ドラッグ&ドロップ** でファイル選択が簡単です
- **複数のファイルを順序に関係なく処理** できます
- **設定を保存** しておけば、GitHub連携も1クリック
- **プレビューで確認** して、不安な場合は修正後にもう一度アップロード

---

## 📞 サポート

問題がある場合は、以下をご確認ください：

1. このガイドの該当セクション
2. ブラウザのコンソール (F12 キー) でエラーを確認
3. ファイル形式・内容の確認

---

**アプリバージョン**: v1.0
**作成日**: 2026年2月17日
**更新日**: 2026年2月17日
