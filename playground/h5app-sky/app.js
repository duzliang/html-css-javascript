// 应用配置
const config = {
    apiUrl: 'https://api.skyworkmodel.ai/api/v1/chat/completions',
    model: 'skywork/r1v4-lite',
    apiKey: 'sk-ZqBxEVMcjHeRrBvZsuhCqotbLwiQzOrE', // 用户需要在这里填入自己的API Key
    stream: true
};

// 全局变量
let uploadedImages = [];

// DOM元素
const elements = {
    textInput: document.getElementById('textInput'),
    imageUpload: document.getElementById('imageUpload'),
    previewArea: document.getElementById('previewArea'),
    responseArea: document.getElementById('responseArea'),
    sendButton: document.getElementById('sendButton')
};

// 初始化应用
function initApp() {
    // 添加事件监听器
    elements.imageUpload.addEventListener('change', handleImageUpload);
    elements.sendButton.addEventListener('click', handleSend);
    elements.textInput.addEventListener('keydown', handleKeyDown);
    
    // 加载保存的API Key
    loadApiKey();
}

// 处理图片上传
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
        alert('请选择图片文件！');
        return;
    }
    
    // 读取图片并生成预览
    const reader = new FileReader();
    reader.onload = (event) => {
        const imageData = {
            file: file,
            url: event.target.result,
            id: `image_${Date.now()}`
        };
        
        uploadedImages.push(imageData);
        renderPreview();
    };
    reader.readAsDataURL(file);
    
    // 重置文件输入，以便可以重新选择同一文件
    e.target.value = '';
}

// 渲染预览
function renderPreview() {
    elements.previewArea.innerHTML = '';
    
    // 渲染图片预览
    uploadedImages.forEach(image => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
            <img src="${image.url}" alt="预览" class="preview-image">
            <span class="file-name">${image.file.name}</span>
            <button class="remove-btn" onclick="removePreview('${image.id}')">×</button>
        `;
        elements.previewArea.appendChild(previewItem);
    });
}

// 移除预览项
function removePreview(id) {
    uploadedImages = uploadedImages.filter(image => image.id !== id);
    renderPreview();
}

// 处理发送按钮点击
function handleSend() {
    const text = elements.textInput.value.trim();
    
    // 检查是否有内容要发送
    if (!text && uploadedImages.length === 0) {
        alert('请输入内容或上传图片！');
        return;
    }
    
    // 显示用户消息
    displayMessage(text, 'user');
    
    // 清空输入
    elements.textInput.value = '';
    
    // 调用API
    callApi(text);
}

// 处理键盘事件（Enter发送，Shift+Enter换行）
function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
}

// 基本的Markdown处理函数
function processMarkdown(content) {
    let processed = content
        // 处理换行符
        .replace(/\n/g, '<br>')
        // 处理粗体 **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // 处理斜体 *text*
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // 处理标题 # H1 到 ###### H6
        .replace(/^(#{1,6})\s+(.*$)/gm, (match, hashes, text) => {
            const level = hashes.length;
            return `<h${level} style="margin: 0.5rem 0; font-size: ${1.5 - level * 0.15}rem;">${text}</h${level}>`;
        })
        // 处理无序列表 - item
        .replace(/^-\s+(.*$)/gm, '<li style="margin-left: 1rem;">$1</li>')
        // 处理有序列表 1. item
        .replace(/^\d+\.\s+(.*$)/gm, '<li style="margin-left: 1rem;">$1</li>')
        // 处理代码块 ```code```
        .replace(/```([\s\S]*?)```/g, '<pre style="background-color: #f0f0f0; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>$1</code></pre>')
        // 处理行内代码 `code`
        .replace(/`(.*?)`/g, '<code style="background-color: #f0f0f0; padding: 0.2rem 0.4rem; border-radius: 3px;">$1</code>')
        // 处理链接 [text](url)
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: #4a90e2; text-decoration: underline;">$1</a>')
        // 处理引用 > quote
        .replace(/^>\s+(.*$)/gm, '<blockquote style="border-left: 3px solid #4a90e2; padding-left: 1rem; color: #666;">$1</blockquote>');
    
    // 处理列表包装
    processed = processed.replace(/(<li[^>]*>.*?<\/li>)<br>/g, '$1');
    processed = processed.replace(/(<br>)*(<li[^>]*>.*?<\/li>)(<br>)*/g, '<ul style="margin: 0.5rem 0; padding-left: 1rem;">$2</ul>');
    
    return processed.trim();
}

// 显示消息
function displayMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    // 处理内容，添加基本的Markdown支持
    const processedContent = processMarkdown(content);
    
    messageDiv.innerHTML = processedContent;
    elements.responseArea.appendChild(messageDiv);
    
    // 滚动到底部
    elements.responseArea.scrollTop = elements.responseArea.scrollHeight;
}

// 显示加载状态
function showLoading() {
    elements.sendButton.disabled = true;
    elements.sendButton.innerHTML = '<div class="loading"></div> 发送中...';
}

// 隐藏加载状态
function hideLoading() {
    elements.sendButton.disabled = false;
    elements.sendButton.textContent = '发送';
}

// 显示错误消息
function displayError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `错误: ${message}`;
    elements.responseArea.appendChild(errorDiv);
    elements.responseArea.scrollTop = elements.responseArea.scrollHeight;
}

// 将图片转换为base64
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 调用API
async function callApi(text) {
    showLoading();
    
    try {
        // 准备消息内容
        const contents = [];
        
        // 添加图片
        for (const image of uploadedImages) {
            const base64 = await imageToBase64(image.file);
            contents.push({
                type: 'image_url',
                image_url: {
                    url: base64
                }
            });
        }
        
        // 添加文本
        if (text) {
            contents.push({
                type: 'text',
                text: text
            });
        }
        
        // 准备请求数据
        const requestData = {
            model: config.model,
            messages: [{
                role: 'user',
                content: contents
            }],
            stream: config.stream
        };
        
        // 准备请求头
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        };
        
        // 根据是否使用流来处理请求
        if (config.stream) {
            headers['Accept'] = 'text/event-stream';
            await handleStreamRequest(requestData, headers);
        } else {
            await handleNonStreamRequest(requestData, headers);
        }
        
        // 清空上传的文件
        uploadedImages = [];
        uploadedFiles = [];
        renderPreview();
        
    } catch (error) {
        console.error('API调用错误:', error);
        displayError(error.message || 'API调用失败，请检查网络或API Key是否正确。');
    } finally {
        hideLoading();
    }
}

// 处理流式请求
async function handleStreamRequest(requestData, headers) {
    // 创建助手消息容器
    const assistantMessageDiv = document.createElement('div');
    assistantMessageDiv.className = 'message assistant-message';
    elements.responseArea.appendChild(assistantMessageDiv);
    
    const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP错误! 状态: ${response.status}`);
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let currentContent = '';
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        // 处理流数据
        const lines = buffer.split('\n');
        buffer = lines.pop(); // 保留不完整的行
        
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                    return;
                }
                
                try {
                    const json = JSON.parse(data);
                    const content = json.choices[0]?.delta?.content;
                    if (content) {
                        currentContent += content;
                        // 使用processMarkdown处理内容
                        const processedContent = processMarkdown(currentContent);
                        assistantMessageDiv.innerHTML = processedContent;
                        elements.responseArea.scrollTop = elements.responseArea.scrollHeight;
                    }
                } catch (e) {
                    console.error('解析流数据错误:', e);
                }
            }
        }
    }
}

// 处理非流式请求
async function handleNonStreamRequest(requestData, headers) {
    const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP错误! 状态: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    if (content) {
        displayMessage(content, 'assistant');
    }
}

// 保存API Key到本地存储
function saveApiKey() {
    const apiKey = prompt('请输入您的API Key:');
    if (apiKey) {
        config.apiKey = apiKey;
        localStorage.setItem('skywork_api_key', apiKey);
        alert('API Key已保存！');
    }
}

// 从本地存储加载API Key
function loadApiKey() {
    const savedKey = localStorage.getItem('skywork_api_key');
    if (savedKey) {
        config.apiKey = savedKey;
    } else {
        // 如果没有保存的API Key，提示用户输入
        saveApiKey();
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);