import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Footer } from './components/layout/Footer'
import { ChatBox } from './components/chat/ChatBox'

const Home = lazy(() => import('./pages/Home'))
const Theory = lazy(() => import('./pages/Theory'))
const Game = lazy(() => import('./pages/Game'))

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="min-h-screen bg-[#0a0906] flex items-center justify-center text-[#c9a84c] font-cinzel text-xl tracking-widest">
          Đang tải...
        </div>
      }>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/theory" element={<Theory />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </main>
          <Footer />
          <ChatBox />
        </div>
      </Suspense>
    </Router>
  )
}

export default App
