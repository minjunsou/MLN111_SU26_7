import React from 'react'
import { Header } from '../components/layout/Header'
import { MatchingGame } from '../components/matching/MatchingGame'

const Game: React.FC = () => (
  <div className="min-h-screen bg-parchment-light text-sepia">
    <Header />
    <div style={{ height: 80 }} />

    <div className="border-b border-gold-classic/15 py-8 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />
      <span className="font-prata text-gold-classic/60 text-sm tracking-[0.3em] uppercase block mb-3">Kiểm tra kiến thức</span>
      <h1 className="font-playfair text-ink-old text-3xl tracking-[0.1em] uppercase mb-3">Trò Chơi Ghép Thẻ</h1>
      <p className="font-merriweather italic text-sepia/50 max-w-lg mx-auto">Ghép đúng khái niệm với định nghĩa trong thời gian giới hạn — luyện tập phép biện chứng duy vật</p>
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <MatchingGame />
    </div>
  </div>
)

export default Game
