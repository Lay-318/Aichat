import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Chat from './pages/Chat'
import './App.css'

const { Content } = Layout

function App() {
  return (
    <Layout className="app-container">
      <Content className="main-content">
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App 