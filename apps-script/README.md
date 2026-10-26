# 行政系統登入入口

此 Apps Script Web App 只保護首頁的行政系統入口。登入成功後，三個 Streamlit 網址會顯示給訪客；它們本身仍可直接存取，並未加上登入限制。

## 部署

1. 在 [Google Apps Script](https://script.google.com/) 建立新專案。
2. 將 `Code.gs` 貼到專案的 `Code.gs`，新增 HTML 檔案並命名為 `AdminPortal`，再貼上 `AdminPortal.html` 的內容。
3. 開啟「專案設定」中的「指令碼屬性」，新增：
   - 屬性：`ADMIN_PASSWORD`
   - 值：自行設定的管理密碼
4. 選擇「部署」→「新增部署作業」→「網頁應用程式」：
   - 執行身分：我
   - 誰可以存取：任何人
5. 完成授權與部署，複製 Web App 網址（`/exec` 結尾）。
6. 將部署網址提供給網站維護者，接入首頁「行政系統」連結。

不要將管理密碼、服務帳戶金鑰或其他私密憑證加入 GitHub 專案。登入驗證失敗達五次後，該訪客將暫停登入 15 分鐘。
