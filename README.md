# AI ·探索 — 私密工具导航站

银河星空风格的个人工具导航，部署在 GitHub Pages 上对外访问，进入前需要输入访问密码（默认 `1688`）。

线上地址：`https://atwu5.github.io/ai-explore/`

## 项目结构

```
ai-explore/
├── index.html                  # 页面 + 全部逻辑（单文件，无框架）
├── data/
│   └── tools.json              # 工具列表数据（唯一数据源，管理员维护）
├── scripts/
│   └── hash-password.mjs       # 改密工具：生成新密码的哈希
├── .github/workflows/deploy.yml# GitHub Actions 自动部署
└── .nojekyll
```

## 功能说明

- **访问密码门**：打开网站先输入密码（默认 `1688`），同一浏览器会话内只需输一次（关闭标签页后重新要求输入）。页面只存密码的 SHA-256 哈希，不存明文。
- **工具数据**：全部来自 `data/tools.json`，页面每次打开都带时间戳请求最新数据，访客总能看到最新发布的列表。
- **增删工具**：只需编辑 `data/tools.json` 并推送，无需改任何页面代码。`icon` 可选值：`chart` / `calculator` / `paw` / `book` / `spark`。
- **收藏与最近使用**：保存在访客自己的浏览器 localStorage 里，不进公共数据源；排序规则 = 有使用记录的按最近使用时间倒序，未使用的按「金融工具 → 生活工具」。
- **访客权限**：访客只能浏览、搜索、收藏、打开工具；原「收录新工具 / 编辑」入口已移除，工具列表只由管理员通过修改 JSON 维护。

## 部署步骤（GitHub Pages）

1. **创建仓库**：在 GitHub 上新建公开仓库 `atwu5/ai-explore`（不要勾选自动生成 README）。

2. **推送代码**（本机 github.com:443 不通，推送一律走 SSH）：

   ```bash
   cd /Users/wujl-local/ai-explore
   git init   # 若已 init 可跳过
   git add -A
   git commit -m "init: AI·探索 工具导航站"
   git branch -M main
   git remote add origin git@github.com:atwu5/ai-explore.git   # 已设置过可跳过
   git push -u origin main
   ```

3. **开启 Pages**：仓库 `Settings → Pages → Build and deployment → Source` 选择 **GitHub Actions**。

4. 等待 Actions 跑完（约 1 分钟），访问 `https://atwu5.github.io/ai-explore/`，输入密码 `1688` 即可进入。

5. **以后更新**：改 `data/tools.json`（或改页面）→ `git add -A && git commit -m "..." && git push`，Actions 自动重新部署。

## 修改密码

```bash
node scripts/hash-password.mjs 新密码
# 输出形如 006a1a89f3...，整行替换 index.html 中 JS 顶部的：
# const PASS_HASH='…'
```

替换后提交推送即可生效。

## 本地预览

页面通过 `fetch` 加载 JSON，直接双击打开 `index.html`（file:// 协议）会加载失败，需要起一个本地静态服务：

```bash
cd /Users/wujl-local/ai-explore
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 安全说明（重要）

静态网站没有服务器端会话，密码门是**客户端轻量门槛**：能防止普通访客随手翻看，但无法防住懂技术的人（例如从控制台绕过）。密码哈希虽不可反推明文，但校验逻辑在前端。如果将来需要真正的权限隔离，需迁移到带后端鉴权的方案（如 Cloudflare Access、Vercel 密码保护或自建服务）。
