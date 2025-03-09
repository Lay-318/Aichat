import React, { useState } from 'react'
import { Input, Button, List, Avatar, message } from 'antd'
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import './Chat.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        message: input
      })

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('发送消息失败:', error);
      message.error('发送消息失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-container">
      <List
        className="message-list"
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={item => (
          <List.Item className={`message-item ${item.role}`}>
            <List.Item.Meta
              avatar={
                <Avatar icon={item.role === 'user' ? <UserOutlined /> : <RobotOutlined />} />
              }
              description={
                <div className="message-content">
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <div className="input-container">
        <Input.TextArea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="输入您的问题..."
          autoSize={{ minRows: 1, maxRows: 6 }}
          onKeyPress={handleKeyPress}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={sendMessage}
          loading={loading}
        >
          发送
        </Button>
      </div>
    </div>
  )
}

export default Chat 