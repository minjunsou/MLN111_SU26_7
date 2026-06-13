import React from 'react'

export const Footer: React.FC = () => (
  <footer className="border-t border-gold-classic/15 bg-parchment-old py-10 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border border-[#c9a84c]/40 flex items-center justify-center">
          <span className="font-playfair text-gold-classic text-[10px] font-bold">M</span>
        </div>
        <span className="font-prata text-sepia/70 text-sm tracking-[0.15em] uppercase">MLN111 — Nhóm 7</span>
      </div>
      <span className="deco-line-center" />
      <p className="font-garamond text-sepia/70 text-base italic text-center">
        "Tính thống nhất của thế giới không phải là sự tồn tại của nó, mà là tính vật chất của nó." — Engels
      </p>
    </div>
  </footer>
)
