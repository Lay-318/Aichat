const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 限制请求频率
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP在windowMs内最多100个请求
});

app.use(limiter);

// 聊天接口
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }

    console.log('发送请求到DeepSeek API...');
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个有帮助的AI助手。请用中文回答所有问题。' },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        stream: false
      })
    });

    console.log('API响应状态:', response.status);
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API错误响应:', errorData);
      throw new Error(`API请求失败: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('API响应数据:', JSON.stringify(data, null, 2));
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('API响应格式不正确');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('AI回复:', aiResponse);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('聊天请求失败:', error.message);
    res.status(500).json({ error: '处理请求失败: ' + error.message });
  }
});

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});