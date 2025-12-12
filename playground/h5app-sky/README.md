# h5app-sky

一个基于 Skywork R1V4 API 开发的H5应用，支持文本和图片输入，实时获取模型响应。

## 功能特点

- ✅ 文本输入：支持用户输入文字内容
- ✅ 图片上传：支持常见图片格式（JPG、PNG等）的选择与预览
- ✅ 实时响应：使用流式API，实时显示模型返回的文本回复
- ✅ 响应式设计：适配不同移动设备屏幕尺寸
- ✅ 错误处理：完善的错误提示和处理机制
- ✅ API Key 管理：本地存储API Key，方便下次使用

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)

## 快速开始

### 1. 获取API Key

访问 [Skywork 官方网站](https://www.skyworkmodel.ai/) 注册账号并获取API Key。

### 2. 运行应用

#### 方法一：直接打开

1. 下载项目文件
2. 直接在浏览器中打开 `index.html` 文件
3. 首次使用时，会提示输入API Key
4. 输入API Key后即可开始使用

#### 方法二：本地服务器

1. 克隆项目到本地
2. 在项目目录下启动本地服务器
   ```bash
   # 使用Python 3
   python -m http.server 8000
   
   # 使用Node.js (需要安装http-server)
   npx http-server -p 8000
   ```
3. 在浏览器中访问 `http://localhost:8000`
4. 首次使用时，会提示输入API Key
5. 输入API Key后即可开始使用

## 使用说明

### 文本输入

1. 在文本输入框中输入您的问题或内容
2. 点击「发送」按钮或按 Enter 键发送
3. 等待模型响应，响应会实时显示在上方的响应区域

### 图片上传

1. 点击「图片」按钮选择要上传的图片
2. 图片会显示在预览区域
3. 可以点击预览图右上角的「×」按钮移除图片
4. 输入相关问题后，点击「发送」按钮
5. 模型会同时处理图片和文本内容

### 快捷键

- `Enter`：发送消息
- `Shift + Enter`：换行

## 注意事项

1. 请确保您的API Key有效且有足够的配额
2. 图片大小建议不超过10MB，过大的图片可能会导致请求失败
3. 支持的图片格式：JPEG、PNG、GIF、WebP等
4. 请遵守相关法律法规，不要上传违法违规内容
5. API Key 存储在浏览器的本地存储中，建议不要在公共设备上使用

## API 文档

本应用基于 [Skywork R1V4 API](https://docs.skyworkmodel.ai/r1v4/api-reference/completions.html) 开发。

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- 初始版本
- 支持文本输入
- 支持图片上传和预览
- 支持实时流式响应
- 支持API Key本地存储
- 响应式设计，适配移动端