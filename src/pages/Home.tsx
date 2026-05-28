import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'

const CHAPTERS = [
  {
    num: 'I',
    title: 'Vật Chất & Ý Thức',
    sub: 'Khái niệm · Vận động · Không gian · Thời gian',
    href: '/theory#vat-chat',
    icon: '◈',
  },
  {
    num: 'II',
    title: 'Phép Biện Chứng Duy Vật',
    sub: '2 Nguyên lý · 3 Quy luật · 6 Cặp Phạm Trù',
    href: '/theory#bien-chung',
    icon: '⬡',
  },
  {
    num: 'III',
    title: 'Lý Luận Nhận Thức',
    sub: 'Lịch sử · Nguyên tắc · Chân lý',
    href: '/theory#nhan-thuc',
    icon: '◎',
  },
]

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0906] text-[#c8b99a]">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
        </div>

        {/* Ornamental top line */}
        <div className="relative z-10 anim-fade-up flex items-center gap-4 mb-12">
          <span className="block w-16 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
          <span className="font-sc text-[#c9a84c]/60 text-xs tracking-[0.3em] uppercase">Triết học Mác – Lênin</span>
          <span className="block w-16 h-px bg-gradient-to-l from-transparent to-[#c9a84c]" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <p className="anim-fade-up-1 font-fell italic text-[#8a7660] text-lg mb-4 tracking-wide">
            Chủ nghĩa duy vật
          </p>
          <h1 className="anim-fade-up-2 font-cinzel font-black text-[#ddd0b8] mb-6 leading-[1.1]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '0.05em' }}>
            Biện Chứng
          </h1>
          <p className="anim-fade-up-3 font-cormorant text-[#8a7660] text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Khám phá nền tảng triết học Mác – Lênin: từ bản chất của vật chất và ý thức đến những quy luật vận động phổ biến nhất của thế giới.
          </p>
          <div className="anim-fade-up-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/theory" className="btn-gold">Bắt Đầu Học</Link>
            <Link to="/game"
              className="font-sc text-xs tracking-[0.2em] uppercase text-[#5c5248] hover:text-[#c9a84c] transition-colors py-3 px-6 border border-[rgba(201,168,76,0.12)] hover:border-[rgba(201,168,76,0.3)]">
              Chơi Trò Chơi
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade-up-4">
          <span className="font-sc text-[10px] tracking-[0.3em] uppercase text-[#3d3730]">Cuộn xuống</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#3d3730] to-transparent" />
        </div>
      </section>

      {/* Chapters */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="deco-line-center mb-6" />
          <h2 className="font-cinzel text-[#ddd0b8] text-2xl tracking-[0.15em] uppercase mb-3">Nội Dung Trình Bày</h2>
          <p className="font-fell italic text-[#5c5248]">Ba chủ đề cốt lõi của chủ nghĩa duy vật biện chứng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHAPTERS.map((ch, i) => (
            <Link key={i} to={ch.href}
              className="chapter-card p-8 group block relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c9a84c]/20 group-hover:border-[#c9a84c]/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c9a84c]/20 group-hover:border-[#c9a84c]/50 transition-colors" />

              <div className="font-cinzel text-[#c9a84c]/30 text-4xl mb-4 group-hover:text-[#c9a84c]/60 transition-colors">{ch.icon}</div>
              <div className="font-sc text-[#5c5248] text-xs tracking-[0.2em] uppercase mb-2">Chương {ch.num}</div>
              <h3 className="font-cinzel text-[#c8b99a] text-lg tracking-[0.08em] mb-3 group-hover:text-[#ddd0b8] transition-colors">{ch.title}</h3>
              <p className="font-cormorant italic text-[#5c5248] text-sm leading-relaxed">{ch.sub}</p>
              <div className="mt-6 flex items-center gap-2 text-[#c9a84c]/50 group-hover:text-[#c9a84c] transition-colors">
                <span className="font-sc text-[10px] tracking-[0.2em] uppercase">Xem chi tiết</span>
                <span className="text-sm">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="border-t border-[rgba(201,168,76,0.08)] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-cinzel text-[#c9a84c]/20 text-6xl mb-6 leading-none">"</div>
          <blockquote className="font-fell italic text-[#c8b99a] text-xl md:text-2xl leading-loose mb-6">
            Vật chất là một phạm trù triết học, dùng để chỉ thực tại khách quan, được đem lại cho con người trong cảm giác, được cảm giác của chúng ta chép lại, chụp lại, phản ánh và tồn tại không lệ thuộc vào cảm giác.
          </blockquote>
          <span className="deco-line-center mb-4" />
          <p className="font-sc text-[#5c5248] text-xs tracking-[0.2em] uppercase">V. I. Lenin, 1909</p>
        </div>
      </section>

      {/* Game CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="border border-[rgba(201,168,76,0.15)] p-12 md:p-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(28,25,22,0.8) 0%, rgba(10,9,6,0.95) 100%)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5"
            style={{ background: 'radial-gradient(circle at top right, #c9a84c, transparent)' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-sc text-[#c9a84c]/60 text-xs tracking-[0.3em] uppercase mb-2">Kiểm tra kiến thức</p>
              <h3 className="font-cinzel text-[#ddd0b8] text-2xl md:text-3xl tracking-[0.08em] mb-3">Trò Chơi Ghép Thẻ</h3>
              <p className="font-cormorant italic text-[#5c5248] max-w-md">Ghép đúng các khái niệm, quy luật và phạm trù của phép biện chứng duy vật trong thời gian giới hạn.</p>
            </div>
            <Link to="/game" className="btn-gold flex-none">Chơi Ngay</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
