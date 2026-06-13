import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/layout/Header'

/* ───── Accordion ───── */
const Accordion: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="border border-gold-classic/20 overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 bg-parchment-old hover:bg-parchment-old transition-colors text-left group"
      >
        <span className="font-playfair text-sepia text-base tracking-[0.1em] font-semibold group-hover:text-ink-old transition-colors">{title}</span>
        <span className={`text-gold-classic/50 transition-transform duration-300 text-lg ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-parchment-old/80 border-t border-gold-classic/10">
          {children}
        </div>
      )}
    </div>
  )
}

/* ───── InfoBox ───── */
const InfoBox: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="border-l-2 border-gold-classic/40 pl-4 py-1 my-4">
    <span className="font-prata text-gold-classic/60 text-[10px] tracking-[0.2em] uppercase block mb-1">{label}</span>
    <div className="font-garamond text-sepia text-lg leading-relaxed">{children}</div>
  </div>
)

/* ───── ThreeCol ───── */
const ThreeCol: React.FC<{ items: { title: string; points: string[] }[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
    {items.map((item, i) => (
      <div key={i} className="relative overflow-hidden rounded-sm p-5"
  style={{
    background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)',
    border: '1px solid rgba(201,168,76,0.35)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)',
  }}>
  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#c9a84c]/40" />
  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#c9a84c]/40" />
  <h4 className="font-playfair text-[#c9a84c] text-sm tracking-[0.12em] uppercase mb-3 font-semibold">{item.title}</h4>
  <div className="w-8 h-px bg-gradient-to-r from-[#c9a84c]/50 to-transparent mb-3" />
  <ul className="space-y-1.5">
    {item.points.map((p, j) => (
      <li key={j} className="font-garamond text-[#c8b99a] text-base flex gap-2">
        <span className="text-[#c9a84c]/50 mt-1 flex-none">·</span>
        <span>{p}</span>
      </li>
    ))}
  </ul>
</div>
    ))}
  </div>
)

/* ───── SectionHeader ───── */
const SH: React.FC<{ num: string; title: string; sub?: string }> = ({ num, title, sub }) => (
  <div className="mb-10">
    <div className="flex items-center gap-4 mb-4">
      <div className="font-playfair text-gold-classic/25 text-4xl font-black">{num}</div>
      <span className="block w-px h-10 bg-[rgba(201,168,76,0.2)]" />
      <div>
        <h2 className="font-playfair text-ink-old text-2xl md:text-3xl font-bold tracking-[0.1em] uppercase">{title}</h2>
        {sub && <p className="font-merriweather italic text-sepia/60 text-base mt-1">{sub}</p>}
      </div>
    </div>
    <span className="block w-24 h-px bg-gradient-to-r from-gold-classic/40 to-transparent" />
  </div>
)

/* ───── Page ───── */
const Theory: React.FC = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } else window.scrollTo(0, 0)
  }, [hash])

  return (
    <div className="min-h-screen bg-parchment-light text-sepia">
      <Header />
      <div style={{ height: 80 }} />

      {/* Page hero */}
      <div className="border-b border-gold-classic/15 py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />
        <span className="font-prata text-gold-classic/60 text-sm tracking-[0.3em] uppercase block mb-3">MLN111 — Nhóm 7</span>
        <h1 className="font-playfair text-ink-old text-3xl md:text-4xl tracking-[0.1em] uppercase mb-4">Lý Thuyết</h1>
        <p className="font-merriweather italic text-sepia/60 text-lg max-w-xl mx-auto">Chủ nghĩa duy vật biện chứng — nền tảng thế giới quan và phương pháp luận của triết học Mác–Lênin</p>
      </div>

      {/* TOC */}
      <nav className="max-w-3xl mx-auto px-6 py-8">
        <div className="border border-gold-classic/20 p-6 bg-parchment-old/80">
          <p className="font-prata text-gold-classic/60 text-xs tracking-[0.3em] uppercase mb-4">Mục Lục</p>
          <div className="space-y-2">
            {[
              ['#vat-chat', 'I. Vật Chất và Ý Thức'],
              ['#bien-chung', 'II. Phép Biện Chứng Duy Vật'],
              ['#nhan-thuc', 'III. Lý Luận Nhận Thức'],
            ].map(([href, label]) => (
              <a key={href} href={href}
                className="flex items-center gap-3 font-garamond text-sepia/70 hover:text-sepia transition-colors text-xl group">
                <span className="block w-4 h-px bg-[rgba(201,168,76,0.2)] group-hover:w-8 group-hover:bg-[#c9a84c]/50 transition-all" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-24">

        {/* ─── PHẦN 1: VẬT CHẤT & Ý THỨC ─── */}
        <section id="vat-chat">
          <SH num="I" title="Vật Chất và Ý Thức" sub="Khái niệm · Phương thức tồn tại · Mối quan hệ biện chứng" />

          <Accordion title="1.1 — Khái Niệm Vật Chất" defaultOpen>
            <InfoBox label="Định nghĩa — V.I. Lenin (1909)">
              "Vật chất là một phạm trù triết học, dùng để chỉ thực tại khách quan, được đem lại cho con người trong cảm giác, được cảm giác của chúng ta chép lại, chụp lại, phản ánh và tồn tại không lệ thuộc vào cảm giác."
            </InfoBox>
            <ThreeCol items={[
              {
                title: 'Phạm trù triết học',
                points: [
                  'Khác hoàn toàn với khái niệm vật chất trong khoa học tự nhiên',
                  'Mức độ khái quát cao nhất — chỉ toàn bộ thực tại khách quan',
                  'Bao gồm cả những sự vật con người chưa nhận thức được',
                ],
              },
              {
                title: 'Thực tại khách quan',
                points: [
                  'Tồn tại ngoài và độc lập với ý thức',
                  'Là nguồn gốc, cơ sở của mọi cảm giác và nhận thức',
                  'Thuộc tính duy nhất triết học quan tâm: tính khách quan',
                ],
              },
              {
                title: 'Có thể nhận thức được',
                points: [
                  'Bác bỏ chủ nghĩa bất khả tri',
                  'Cảm giác "chép lại, chụp lại, phản ánh" thực tại',
                  'Thực tiễn là tiêu chuẩn kiểm nghiệm nhận thức',
                ],
              },
            ]} />
          </Accordion>

          <Accordion title="1.2 — Vận Động — Phương Thức Tồn Tại của Vật Chất">
            <InfoBox label="Định nghĩa — Ph. Engels">
              "Vận động là một phương thức tồn tại của vật chất, là một thuộc tính cố hữu của vật chất, bao gồm tất cả mọi sự thay đổi và mọi quá trình diễn ra trong vũ trụ, kể từ sự thay đổi vị trí đơn giản cho đến tư duy."
            </InfoBox>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              {[
                { k: 'Thuộc tính cố hữu', v: 'Không có vật chất không vận động và không có vận động ngoài vật chất' },
                { k: 'Vận động là tuyệt đối', v: 'Mọi sự vật đều luôn thay đổi — dù ở cấp độ vi mô hay vĩ mô' },
                { k: 'Đứng yên là tương đối', v: 'Chỉ là ổn định trong một quan hệ xác định, một thời điểm nhất định' },
              ].map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm p-4"
                  style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#c9a84c]/40" />
                  <p className="font-playfair text-[#c9a84c] text-sm tracking-[0.1em] font-semibold mb-2">{item.k}</p>
                  <p className="font-garamond text-[#c8b99a] text-base">{item.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-gold-classic/15 p-5 bg-parchment-old">
              <p className="font-playfair text-gold-classic text-sm tracking-[0.12em] uppercase mb-3 font-semibold">5 Hình thức vận động cơ bản (từ thấp → cao)</p>
              <div className="flex flex-wrap gap-2">
                {['Cơ học', 'Vật lý', 'Hóa học', 'Sinh học', 'Xã hội'].map((f, i) => (
                  <span key={i} className="px-4 py-1.5 border border-[rgba(201,168,76,0.2)] font-prata text-xs tracking-[0.1em] text-sepia">
                    {i + 1}. {f}
                  </span>
                ))}
              </div>
            </div>
          </Accordion>

          <Accordion title="1.3 — Không Gian & Thời Gian — Hình Thức Tồn Tại của Vật Chất">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              {[
                {
                  label: 'Không gian',
                  points: [
                    'Là nơi mọi vật tồn tại và sắp xếp với nhau',
                    'Ba chiều: chiều dài, rộng, cao — khách quan và vô tận',
                    'Không gian và vật chất luôn gắn liền không thể tách rời',
                  ],
                },
                {
                  label: 'Thời gian',
                  points: [
                    'Là quá trình vận động và thay đổi của sự vật',
                    'Một chiều: chỉ trôi theo một hướng không có điểm đầu cuối tuyệt đối',
                    'Thể hiện độ dài, tốc độ, nhịp điệu của các quá trình vật chất',
                  ],
                },
              ].map((col, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                  <p className="font-playfair text-gold-classic text-sm tracking-[0.12em] uppercase mb-3 font-semibold">{col.label}</p>
                  <ul className="space-y-2">
                    {col.points.map((p, j) => (
                      <li key={j} className="font-garamond text-[#c8b99a] text-base flex gap-2">
                        <span className="text-gold-classic/40 mt-1 flex-none">·</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="1.4 — Nguồn Gốc, Bản Chất và Kết Cấu của Ý Thức">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                <p className="font-playfair text-gold-classic text-sm tracking-[0.12em] uppercase mb-3 font-semibold">Nguồn gốc của ý thức</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-prata text-[#c9a84c]/70 text-xs uppercase tracking-[0.1em] mb-2">Tự nhiên</p>
                    <p className="font-garamond text-[#c8b99a] text-base">Não bộ + giác quan (thị, thính, xúc giác…) → tiếp nhận & xử lý tín hiệu. Cơ sở sinh học: nơron, liên kết thần kinh, vỏ não.</p>
                  </div>
                  <div>
                    <p className="font-prata text-[#c9a84c]/70 text-xs uppercase tracking-[0.1em] mb-2">Xã hội</p>
                    <p className="font-garamond text-[#c8b99a] text-base">Lao động (thực tiễn) cải tạo tự nhiên, tạo ra quan hệ xã hội. Ngôn ngữ là công cụ truyền tải, hình thành tư duy trừu tượng.</p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                <p className="font-playfair text-gold-classic text-sm tracking-[0.12em] uppercase mb-3 font-semibold">Bản chất của ý thức</p>
                <ul className="space-y-2">
                  {[
                    'Là hình ảnh chủ quan của thực tại khách quan — phản ánh thế giới vật chất qua giác quan và não bộ',
                    'Là sự phản ánh sáng tạo (không thụ động): con người không chỉ "sao chép" mà còn tạo ra khái quát, mô hình, giải pháp mới',
                    'Mối quan hệ biện chứng: Vật chất → Ý thức (quyết định), nhưng Ý thức tác động ngược lại vật chất qua thực tiễn',
                  ].map((p, i) => (
                    <li key={i} className="font-garamond text-[#c8b99a] text-base flex gap-2">
                      <span className="text-gold-classic/40 mt-1 flex-none">·</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Accordion>

          <Accordion title="1.5 — Mối Quan Hệ Giữa Vật Chất và Ý Thức">
            <InfoBox label="Nguyên lý cơ bản">
              Vật chất quyết định ý thức — "tồn tại xã hội quyết định ý thức xã hội". Ý thức không thụ động, mà qua hoạt động thực tiễn (lao động, cách mạng, sáng tạo) tái tạo, cải tạo thực tại vật chất.
            </InfoBox>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {[
                { t: 'Vật chất → Ý thức', ps: ['Vật chất là nguồn gốc và cơ sở', 'Điều kiện vật chất thay đổi → ý thức thay đổi', 'Não tổn thương → tư tưởng rối loạn'] },
                { t: 'Ý thức → Vật chất', ps: ['Khoa học–công nghệ (ý thức mới) → tạo ra vật chất mới (máy tính, AI)', 'Phong trào giáo dục, môi trường thay đổi nhận thức → thay đổi hành vi xã hội', 'Ý chí, kế hoạch đúng đắn thúc đẩy thực tiễn tiến lên'] },
              ].map((col, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                  <p className="font-playfair text-gold-classic text-sm tracking-[0.1em] font-semibold uppercase mb-3">{col.t}</p>
                  <ul className="space-y-1.5">
                    {col.ps.map((p, j) => (
                      <li key={j} className="font-garamond text-[#c8b99a] text-base flex gap-2">
                        <span className="text-gold-classic/40 mt-1 flex-none">·</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* ─── PHẦN 2: PHÉP BIỆN CHỨNG ─── */}
        <section id="bien-chung">
          <SH num="II" title="Phép Biện Chứng Duy Vật" sub="2 Nguyên lý · 3 Quy luật · 6 Cặp Phạm Trù" />

          <Accordion title="2.1 — Hai Loại Hình Biện Chứng" defaultOpen>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              {[
                { t: 'Biện chứng khách quan', d: 'Sự vận động, phát triển của thế giới vật chất (Tự nhiên & Xã hội). Tồn tại độc lập với ý thức con người.' },
                { t: 'Biện chứng chủ quan', d: 'Sự phản ánh biện chứng khách quan vào trong tư duy con người. Là biện chứng của khái niệm, phán đoán, suy luận.' },
              ].map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                  <p className="font-playfair text-gold-classic text-sm tracking-[0.1em] font-semibold uppercase mb-2">{item.t}</p>
                  <p className="font-garamond text-[#c8b99a] text-base">{item.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 p-4 border-l-2 border-gold-classic/40 pl-5">
              <p className="font-garamond text-sepia text-lg"><strong className="font-playfair text-gold-classic text-sm tracking-[0.1em] font-semibold uppercase">Phép biện chứng duy vật</strong> là sự thống nhất giữa biện chứng khách quan và biện chứng chủ quan — tức khoa học về những quy luật phổ biến nhất của tự nhiên, xã hội và tư duy.</p>
            </div>
          </Accordion>

          <Accordion title="2.2 — Hai Nguyên Lý Cơ Bản">
            <div className="space-y-4">
              {[
                {
                  title: 'Nguyên lý về mối liên hệ phổ biến',
                  desc: 'Không có sự vật nào tồn tại cô lập. Mọi thứ tác động, ràng buộc lẫn nhau. → Phải có quan điểm toàn diện: xem xét sự vật trong tất cả các mối liên hệ.',
                },
                {
                  title: 'Nguyên lý về sự phát triển',
                  desc: 'Mọi sự vật luôn vận động đi lên, từ thấp đến cao, từ đơn giản đến phức tạp. → Phải có quan điểm phát triển: không cứng nhắc, không bảo thủ.',
                },
              ].map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                  <p className="font-playfair text-gold-classic text-sm tracking-[0.1em] font-semibold uppercase mb-2">{item.title}</p>
                  <p className="font-garamond text-[#c8b99a] text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="2.3 — Ba Quy Luật Cốt Lõi">
            <div className="space-y-4">
              {[
                {
                  num: '01',
                  title: 'Quy luật Lượng–Chất',
                  role: 'Chỉ ra cách thức phát triển',
                  points: [
                    'Tích lũy dần về lượng (quá trình từ từ)',
                    'Vượt qua điểm nút (ngưỡng tới hạn)',
                    'Tạo ra bước nhảy vọt về chất (đột biến)',
                    'VD: Đun nước 0°C→100°C → bốc hơi (chất mới)',
                  ],
                },
                {
                  num: '02',
                  title: 'Quy luật Mâu thuẫn',
                  role: 'Chỉ ra nguồn gốc và động lực',
                  points: [
                    'Mọi sự vật đều chứa đựng các mặt đối lập',
                    'Sự thống nhất và đấu tranh của các mặt đối lập',
                    'Mâu thuẫn được giải quyết → sự vật mới ra đời',
                    'VD: Lực lượng sản xuất ↔ Quan hệ sản xuất',
                  ],
                },
                {
                  num: '03',
                  title: 'Quy luật Phủ định của phủ định',
                  role: 'Chỉ ra khuynh hướng phát triển',
                  points: [
                    'Sự phát triển đi theo đường xoắn ốc đi lên',
                    'Cái mới phủ định cái cũ nhưng kế thừa tinh hoa',
                    'Không phủ định sạch trơn (biện chứng, không siêu hình)',
                    'VD: Hạt → Cây → Hạt mới (cao hơn về chất)',
                  ],
                },
              ].map((law, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm p-6" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <div className="flex items-start gap-4">
                    <span className="font-playfair text-[#c9a84c]/70 text-3xl font-black flex-none">{law.num}</span>
                    <div>
                      <p className="font-playfair text-[#f0e6cc] text-sm tracking-[0.08em] uppercase font-bold">{law.title}</p>
                      <p className="font-merriweather italic text-[#c9a84c] text-sm mt-0.5 mb-3">{law.role}</p>
                      <ul className="space-y-1.5">
                        {law.points.map((p, j) => (
                          <li key={j} className="font-garamond text-[#c8b99a] text-base flex gap-2">
                            <span className="text-gold-classic/40 flex-none mt-1">·</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="2.4 — Sáu Cặp Phạm Trù Cơ Bản">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { pair: 'Cái chung — Cái riêng', rule: 'Cái chung chỉ tồn tại bên trong cái riêng', ex: '"Sinh viên" là cái chung; "Bạn Nguyễn Văn A" là cái riêng với tính cách riêng biệt' },
                { pair: 'Nguyên nhân — Kết quả', rule: 'Nguyên nhân luôn có trước kết quả', ex: 'Chặt phá rừng đầu nguồn (nguyên nhân) → lũ quét mùa mưa (kết quả)' },
                { pair: 'Tất nhiên — Ngẫu nhiên', rule: 'Tất nhiên bộc lộ qua vô số cái ngẫu nhiên', ex: '"Sinh, lão, bệnh, tử" là tất nhiên; bị cảm cúm ngày thứ Hai là ngẫu nhiên' },
                { pair: 'Nội dung — Hình thức', rule: 'Nội dung quyết định hình thức', ex: 'Cốt truyện (nội dung) quyết định bìa sách, font chữ (hình thức)' },
                { pair: 'Bản chất — Hiện tượng', rule: 'Hiện tượng bộc lộ bản chất', ex: 'Trái đất quay (bản chất) → Mặt trời "mọc đông lặn tây" (hiện tượng)' },
                { pair: 'Khả năng — Hiện thực', rule: 'Cần điều kiện để biến khả năng thành hiện thực', ex: 'Hạt thóc (hiện thực) có khả năng thành cây lúa nếu được gieo trồng' },
              ].map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                  <p className="font-playfair text-[#f0e6cc] text-sm tracking-[0.1em] uppercase font-bold mb-1">{item.pair}</p>
                  <p className="font-prata text-[#c9a84c]/70 text-xs tracking-[0.12em] italic mb-3">{item.rule}</p>
                  <p className="font-garamond text-[#c8b99a] text-base">{item.ex}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* ─── PHẦN 3: LÝ LUẬN NHẬN THỨC ─── */}
        <section id="nhan-thuc">
          <SH num="III" title="Lý Luận Nhận Thức" sub="Lịch sử quan niệm · Nguyên tắc · Chân lý" />

          <Accordion title="3.1 — Quan Niệm Về Nhận Thức Trong Lịch Sử Triết Học" defaultOpen>
            <div className="space-y-3">
              {[
                { t: 'Chủ nghĩa duy tâm', d: 'Khẳng định ý thức, cảm giác có trước và sinh ra thế giới vật chất. Gồm duy tâm chủ quan (Berkeley) và duy tâm khách quan (Hegel).' },
                { t: 'Chủ nghĩa duy vật trước Mác', d: 'Coi nhận thức là quá trình phản ánh máy móc, thụ động. Không lý giải được một cách khoa học về nguồn gốc, bản chất, đặc điểm của nhận thức.' },
                { t: 'Chủ nghĩa hoài nghi và bất khả tri', d: 'Phủ nhận hoàn toàn khả năng con người có thể nhận thức được bản chất đích thực của thế giới khách quan (Hume, Kant).' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-sm"
                  style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.30)' }}>
                  <span className="font-playfair text-[#c9a84c]/40 text-xs flex-none mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-playfair text-[#f0e6cc] text-xs tracking-[0.1em] uppercase mb-1">{item.t}</p>
                    <p className="font-garamond text-[#c8b99a] text-base">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="3.2 — Lý Luận Nhận Thức Duy Vật Biện Chứng">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                <p className="font-playfair text-gold-classic text-sm tracking-[0.12em] uppercase mb-3 font-semibold">Bốn nguyên tắc cơ bản</p>
                <ol className="space-y-2">
                  {[
                    'Thừa nhận thế giới vật chất tồn tại khách quan, độc lập với ý thức con người',
                    'Thừa nhận con người có khả năng nhận thức được thế giới',
                    'Nhận thức là quá trình phản ánh hiện thực khách quan vào bộ óc con người một cách năng động, sáng tạo',
                    'Lấy thực tiễn làm cơ sở, động lực, mục đích của nhận thức và tiêu chuẩn kiểm tra chân lý',
                  ].map((p, i) => (
                    <li key={i} className="font-garamond text-[#c8b99a] text-base flex gap-3">
                      <span className="font-playfair text-gold-classic/50 text-xs flex-none mt-1">{i + 1}.</span> {p}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="relative overflow-hidden rounded-sm p-5" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(201,168,76,0.08)' }}>
                <p className="font-playfair text-gold-classic text-sm tracking-[0.12em] uppercase mb-3 font-semibold">Quy luật của quá trình nhận thức</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      t: 'Trực quan sinh động (Nhận thức cảm tính)',
                      d: 'Giai đoạn đầu: dùng giác quan nắm lấy vẻ bề ngoài. Hình thức: Cảm giác → Tri giác → Biểu tượng.',
                    },
                    {
                      t: 'Tư duy trừu tượng (Nhận thức lý tính)',
                      d: 'Giai đoạn cao hơn: dùng tư duy vạch ra bản chất và quy luật. Hình thức: Khái niệm → Phán đoán → Suy luận.',
                    },
                  ].map((col, i) => (
                    <div key={i}>
                      <p className="font-prata text-[#c9a84c]/80 text-xs uppercase tracking-[0.1em] mb-2">{col.t}</p>
                      <p className="font-garamond text-[#c8b99a] text-base">{col.d}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 border-l-2 border-[#c9a84c]/30 pl-4">
                  <p className="font-merriweather italic text-[#c8b99a]/80">Vòng khâu: Trực quan sinh động → Tư duy trừu tượng → Thực tiễn — đây là con đường biện chứng của sự nhận thức chân lý.</p>
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title="3.3 — Về Chân Lý">
            <InfoBox label="Định nghĩa">
              Chân lý là tri thức phù hợp với hiện thực khách quan mà con người phản ánh và được thực tiễn kiểm nghiệm.
            </InfoBox>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              {[
                { t: 'Tính khách quan', d: 'Chân lý không phụ thuộc vào ý muốn chủ quan của con người — nội dung của chân lý được quyết định bởi hiện thực khách quan' },
                { t: 'Tính tuyệt đối', d: 'Có những chân lý được phản ánh hoàn toàn đầy đủ, vô điều kiện về sự vật' },
                { t: 'Tính tương đối', d: 'Phần lớn chân lý phản ánh đúng nhưng chưa đầy đủ — phát triển từ chân lý tương đối lên tuyệt đối qua thực tiễn' },
              ].map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm p-4" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 100%)', border: '1px solid rgba(201,168,76,0.35)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <p className="font-playfair text-gold-classic text-sm tracking-[0.1em] font-semibold uppercase mb-2">{item.t}</p>
                  <p className="font-garamond text-[#c8b99a]/80 text-sm">{item.d}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </section>
      </div>
    </div>
  )
}

export default Theory
