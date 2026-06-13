import React from 'react'

export const Footer: React.FC = () => (
  <footer className="border-t border-[#c9a84c]/20 py-16 px-6"
    style={{ background: 'linear-gradient(180deg, #f4f1ea 0%, #ece6d9 100%)' }}>
    <div className="max-w-6xl mx-auto">

      {/* Top divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-[#c9a84c]/60" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

        {/* Col 1 — Project info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 border border-[#c9a84c]/50 flex items-center justify-center">
              <span className="font-playfair text-gold-classic text-xs font-bold">M</span>
            </div>
            <span className="font-prata text-sepia tracking-[0.18em] uppercase text-sm font-semibold">MLN111 — Nhóm 7</span>
          </div>
          <p className="font-garamond text-sepia/60 text-base italic leading-relaxed">
            "Tính thống nhất của thế giới không phải là sự tồn tại của nó, mà là tính vật chất của nó."
          </p>
          <p className="font-prata text-[#c9a84c]/70 text-xs tracking-[0.15em] mt-2">— Engels</p>
        </div>

        {/* Col 2 — Members */}
        <div>
          <p className="font-prata text-sepia text-xs tracking-[0.25em] uppercase mb-5 font-semibold">Thành Viên Nhóm</p>
          <div className="space-y-3">
            {[
              { name: 'Lê Thành Minh Trung', id: 'SE183752' },
              { name: 'Lê Nguyễn Tuấn Khoa', id: 'SE194755' },
              { name: 'Nguyễn Bá Anh Tuấn',  id: 'SE190905' },
              { name: 'Huỳnh Hoàng Long',     id: 'SE194246' },
            ].map((m) => (
              <div key={m.id} className="flex items-baseline justify-between gap-4 border-b border-[#c9a84c]/10 pb-2">
                <span className="font-garamond text-sepia text-base">{m.name}</span>
                <span className="font-prata text-[#c9a84c] text-xs tracking-[0.1em] flex-none font-semibold">{m.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3 — Claude credit */}
        <div>
          <p className="font-prata text-sepia text-xs tracking-[0.25em] uppercase mb-5 font-semibold">Hỗ Trợ Bởi</p>
          <div className="relative overflow-hidden rounded-sm p-4"
            style={{
              background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)',
              border: '1px solid rgba(201,168,76,0.35)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}>
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#c9a84c]/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#c9a84c]/40" />
            <p className="font-playfair text-[#f0e6cc] text-sm font-bold tracking-wide mb-2">Claude AI</p>
            <div className="w-8 h-px bg-gradient-to-r from-[#c9a84c]/60 to-transparent mb-3" />
            <p className="font-garamond text-[#c8b99a] text-sm leading-relaxed">
              Hỗ trợ team xây dựng layout, style, xác thực thông tin kiến thức và bổ sung các nội dung, ý tưởng sáng tạo trong suốt quá trình phát triển.
            </p>
            <p className="font-prata text-[#c9a84c]/50 text-[10px] tracking-[0.15em] uppercase mt-3">Powered by Anthropic</p>
          </div>
        </div>

      </div>

      {/* Bottom divider */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
        <p className="font-prata text-sepia/40 text-xs tracking-[0.2em] uppercase">FPT University · 2025</p>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      </div>

    </div>
  </footer>
)