import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { matchingPairs } from '../../data/matchingItems'
import type { Feedback, MatchingCard } from './types'

const RESOLVE_DELAY_MS = 1600
const DEFAULT_TIME = 150
const SCORE_MATCH = 100
const SCORE_MISS = 10
const BONUS_PER_SEC = 2

function shuffle(): MatchingCard[] {
  const cards: MatchingCard[] = []
  const shuffled = [...matchingPairs].sort(() => Math.random() - 0.5)
  shuffled.forEach(pair => {
    const idx = matchingPairs.indexOf(pair)
    cards.push({ id: `${idx}-a`, text: pair.term1, pairIndex: idx })
    cards.push({ id: `${idx}-b`, text: pair.term2, pairIndex: idx })
  })
  return cards.sort(() => Math.random() - 0.5)
}

type Phase = 'idle' | 'playing' | 'finished'
type EndState = 'won' | 'timeout'
type Resolution = { indices: [number, number]; result: 'match' | 'mismatch' } | null

export const MatchingGame: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle')
  const [cards, setCards] = useState<MatchingCard[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [isResolving, setIsResolving] = useState(false)
  const [resolution, setResolution] = useState<Resolution>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<{ term1: string; term2: string; explanation: string } | null>(null)
  const [hintsLeft, setHintsLeft] = useState(3)
  const [hinted, setHinted] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME)
  const [score, setScore] = useState(0)
  const scoreRef = useRef(0)
  const [endState, setEndState] = useState<EndState | null>(null)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<Feedback>({
    kind: 'info', title: 'Chờ bắt đầu', body: 'Nhấn nút bên dưới để khởi động trò chơi.',
  })

  const isPlaying = phase === 'playing' && endState === null
  const matchedCount = matched.length
  const totalCards = cards.length

  useEffect(() => { setCards(shuffle()) }, [])
  useEffect(() => { scoreRef.current = score }, [score])

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0 || isModalOpen) return
    const id = setInterval(() => setTimeLeft(p => p <= 1 ? 0 : p - 1), 1000)
    return () => clearInterval(id)
  }, [isPlaying, timeLeft, isModalOpen])

  useEffect(() => {
    if (!isPlaying || timeLeft > 0) return
    setEndState('timeout'); setPhase('finished'); setFinalScore(scoreRef.current)
    setFeedback({ kind: 'error', title: 'Hết giờ!', body: 'Thời gian đã kết thúc. Thử lại để cải thiện điểm số.' })
  }, [timeLeft, isPlaying])

  useEffect(() => {
    if (!isPlaying || totalCards === 0 || matchedCount !== totalCards) return
    const bonus = timeLeft * BONUS_PER_SEC
    const total = scoreRef.current + Math.max(0, bonus)
    setEndState('won'); setPhase('finished'); setFinalScore(total)
    setFeedback({ kind: 'success', title: 'Xuất sắc!', body: 'Bạn đã ghép đúng toàn bộ. Điểm thưởng được cộng theo thời gian còn lại.' })
  }, [isPlaying, matchedCount, totalCards, timeLeft])

  useEffect(() => {
    if (!isPlaying || isResolving || flipped.length !== 2 || timeLeft <= 0 || resolution !== null) return
    setIsResolving(true)
    const [fi, si] = flipped
    const fc = cards[fi]; const sc = cards[si]
    if (!fc || !sc) { setFlipped([]); setIsResolving(false); return }
    const isMatch = fc.pairIndex === sc.pairIndex
    const pair = matchingPairs[fc.pairIndex]
    if (isMatch) {
      setResolution({ indices: [fi, si], result: 'match' })
      setFeedback({ kind: 'success', title: 'Ghép đúng!', body: pair?.explanation ?? '' })
      if (pair) { setModalData({ term1: pair.term1, term2: pair.term2, explanation: pair.explanation }); setIsModalOpen(true) }
      else { setMatched(p => [...p, fi, si]); setScore(p => p + SCORE_MATCH); setFlipped([]); setIsResolving(false); setResolution(null) }
      return
    }
    setResolution({ indices: [fi, si], result: 'mismatch' })
    const cp = matchingPairs[fc.pairIndex]
    setFeedback({ kind: 'error', title: 'Chưa đúng', body: `"${fc.text}" thuộc về "${fc.text === cp.term1 ? cp.term2 : cp.term1}". ${cp.explanation}` })
    setScore(p => Math.max(0, p - SCORE_MISS)); setIsResolving(false)
  }, [cards, flipped, isPlaying, isResolving, timeLeft, resolution])

  const handleContinue = () => {
    setIsModalOpen(false)
    if (flipped.length === 2) {
      const [fi, si] = flipped
      setMatched(p => [...p, fi, si]); setScore(p => p + SCORE_MATCH); setFlipped([])
    }
    setIsResolving(false); setResolution(null)
  }

  const handleCardClick = (idx: number) => {
    if (!isPlaying || timeLeft <= 0 || isResolving || flipped.includes(idx) || matched.includes(idx)) return
    if (flipped.length >= 2) {
      setFlipped([idx]); setResolution(null)
      setFeedback({ kind: 'info', title: 'Chọn thêm 1 thẻ', body: 'Lật thêm một thẻ để kiểm tra cặp tương ứng.' })
      return
    }
    setFlipped(p => {
      const next = [...p, idx]
      if (next.length === 1) setFeedback({ kind: 'info', title: 'Chọn thêm 1 thẻ', body: 'Lật thêm một thẻ nữa.' })
      return next
    })
  }

  const handleHint = () => {
    if (!isPlaying || hintsLeft <= 0) return
    if (flipped.length > 0) { setFlipped([]); setResolution(null) }
    const unmatched = cards.find((c, i) => !matched.includes(i) && !hinted.includes(i))
    if (!unmatched) return
    const indices: number[] = []
    cards.forEach((c, i) => { if (c.pairIndex === unmatched.pairIndex) indices.push(i) })
    if (indices.length === 2) {
      setHintsLeft(p => p - 1); setHinted(indices)
      setTimeout(() => setHinted([]), 2500)
    }
  }

  const reset = (autoStart = false) => {
    setCards(shuffle()); setFlipped([]); setMatched([]); setIsResolving(false); setResolution(null)
    setHinted([]); setIsModalOpen(false); setModalData(null)
    setTimeLeft(DEFAULT_TIME); setHintsLeft(3); setScore(0); scoreRef.current = 0
    setEndState(null); setFinalScore(null)
    setPhase(autoStart ? 'playing' : 'idle')
    setFeedback(autoStart
      ? { kind: 'info', title: 'Bắt đầu!', body: 'Lật 2 thẻ để tìm cặp tương ứng. Đọc giải thích sau mỗi lượt.' }
      : { kind: 'info', title: 'Chờ bắt đầu', body: 'Nhấn nút để khởi động trò chơi.' })
  }

  const bonusPreview = useMemo(() => Math.max(0, timeLeft) * BONUS_PER_SEC, [timeLeft])
  const accent = (idx: number) => {
    if (resolution?.indices.includes(idx)) return resolution.result
    if (matched.includes(idx)) return 'match'
    return null
  }

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  const progress = matchedCount / Math.max(totalCards, 1) * 100

  // Feedback colors
  const fbColors = feedback.kind === 'success'
    ? { border: 'border-emerald-800/40', bg: 'bg-emerald-950/20', icon: '◈', iconColor: 'text-emerald-500' }
    : feedback.kind === 'error'
    ? { border: 'border-rose-800/40', bg: 'bg-rose-950/20', icon: '✕', iconColor: 'text-rose-500' }
    : { border: 'border-[rgba(201,168,76,0.2)]', bg: 'bg-[#12100e]', icon: '◎', iconColor: 'text-[#c9a84c]/50' }

  return (
    <div className="w-full flex flex-col items-center min-h-[calc(100vh-80px)]">
      {/* HUD */}
      <div className="w-full max-w-4xl mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-2 items-center">
          <div className="px-4 py-2 border border-[rgba(201,168,76,0.15)] bg-[#12100e]">
            <span className="font-sc text-xs tracking-[0.2em] uppercase text-[#5c5248]">Thời gian </span>
            <span className={`font-cinzel text-sm font-bold ${timeLeft < 30 && isPlaying ? 'text-rose-400' : 'text-[#c8b99a]'}`}>
              {phase === 'playing' ? fmtTime(timeLeft) : '--:--'}
            </span>
          </div>
          {phase === 'playing' && (
            <button onClick={handleHint} disabled={hintsLeft <= 0}
              className={`px-3 py-2 border font-sc text-xs tracking-[0.15em] uppercase transition-all ${
                hintsLeft > 0
                  ? 'border-[rgba(201,168,76,0.3)] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.08)]'
                  : 'border-[rgba(201,168,76,0.08)] text-[#3d3730] cursor-not-allowed'
              }`}>
              Gợi ý ({hintsLeft})
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="flex-1 max-w-[160px] hidden sm:block">
          <div className="h-px bg-[#1c1916] relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-[#c9a84c]/60 transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
          <p className="font-sc text-xs tracking-[0.15em] uppercase text-[#5c5248] text-center mt-1">
            {matchedCount / 2}/{totalCards / 2} cặp
          </p>
        </div>
        <div className="px-4 py-2 border border-[rgba(201,168,76,0.15)] bg-[#12100e] text-right">
          <span className="font-sc text-xs tracking-[0.2em] uppercase text-[#5c5248]">Điểm </span>
          <span className="font-cinzel text-sm font-bold text-[#c8b99a]">{score}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' ? (
          <motion.div key="idle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="w-full max-w-3xl border border-[rgba(201,168,76,0.15)] bg-[#0d0b09] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#c9a84c]/20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#c9a84c]/20" />
            <p className="font-sc text-[#c9a84c]/50 text-xs tracking-[0.3em] uppercase mb-2">Hướng dẫn</p>
            <h2 className="font-cinzel text-[#ddd0b8] text-2xl tracking-[0.08em] uppercase mb-8">Trò Chơi Ghép Thẻ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'Luật chơi',
                  items: ['Lật 2 thẻ để tìm cặp tương ứng', 'Mỗi lượt có phản hồi đúng/sai rõ ràng', 'Đọc giải thích sau mỗi lần ghép đúng'],
                },
                {
                  title: `Tính điểm (${DEFAULT_TIME}s)`,
                  items: [`Ghép đúng: +${SCORE_MATCH} điểm`, `Ghép sai: −${SCORE_MISS} điểm`, `Bonus thắng: +${BONUS_PER_SEC}/giây còn lại`],
                },
              ].map((col, i) => (
                <div key={i} className="border border-[rgba(201,168,76,0.1)] p-5 bg-[#12100e]">
                  <p className="font-cinzel text-[#c9a84c] text-xs tracking-[0.12em] uppercase mb-3">{col.title}</p>
                  <ul className="space-y-1.5">
                    {col.items.map((item, j) => (
                      <li key={j} className="font-cormorant text-[#8a7660] text-base flex gap-2">
                        <span className="text-[#c9a84c]/40 flex-none">·</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button onClick={() => reset(true)}
              className="btn-gold w-full sm:w-auto text-center">
              Bắt Đầu Chơi
            </button>
          </motion.div>
        ) : (
          <motion.div key="playing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="w-full">
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-stretch h-full">
              {/* Grid */}
              <div className="w-full lg:flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 grid-rows-4 gap-3 perspective-1000 h-full">
                  {cards.map((card, idx) => {
                    const isFlipped = flipped.includes(idx) || matched.includes(idx)
                    const acc = accent(idx)
                    const isMiss = acc === 'mismatch'
                    const isHit = acc === 'match'
                    const isHinted = hinted.includes(idx) && !isFlipped

                    return (
                      <motion.div
                        key={card.id}
                        className={`relative w-full aspect-[4/3] ${isPlaying ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={() => handleCardClick(idx)}
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{
                          rotateY: isFlipped ? 180 : 0,
                          x: isMiss ? [0, -6, 6, -4, 4, 0] : 0,
                        }}
                        transition={{
                          rotateY: { duration: 0.55, type: 'spring', stiffness: 220, damping: 22 },
                          x: { duration: 0.4 },
                        }}
                      >
                        {/* Card back */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-all
                            ${isHinted ? 'border-2 border-[#c9a84c] shadow-[0_0_16px_rgba(201,168,76,0.3)]' : 'border border-[rgba(201,168,76,0.2)]'}
                            ${isMiss ? 'border-rose-700/50' : isHit ? 'border-emerald-700/50' : ''}
                            bg-[#12100e] hover:border-[rgba(201,168,76,0.4)]`}
                          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                        >
                          <div className="absolute inset-2 border border-dashed border-[rgba(201,168,76,0.08)]" />
                          <span className="font-cinzel text-[#c9a84c]/25 text-3xl font-black">M</span>
                        </div>
                        {/* Card front */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center p-2 text-center
                            ${isMiss ? 'border border-rose-700/60 bg-rose-950/20' : isHit ? 'border border-emerald-700/60 bg-emerald-950/20' : 'border border-[rgba(201,168,76,0.3)] bg-[#1c1916]'}`}
                          style={{ transform: 'rotateY(180deg) translateZ(1px)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                        >
                          <div className="absolute inset-1 border border-solid border-[rgba(201,168,76,0.08)]" />
                          <span className="font-cormorant text-[#c8b99a] text-sm md:text-base leading-tight px-1">
                            {card.text}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Sidebar feedback */}
              <aside className="w-full lg:w-[340px] lg:flex-none lg:h-full lg:self-stretch">
                <div className={`border ${fbColors.border} ${fbColors.bg} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[rgba(201,168,76,0.15)]" />
                  <div className="flex items-start gap-3">
                    <div className={`flex-none w-10 h-10 border border-current ${fbColors.iconColor} flex items-center justify-center text-xl`}>
                      {fbColors.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-cinzel text-[#c8b99a] text-sm tracking-[0.08em] uppercase mb-1">{feedback.title}</p>
                      <p className="font-cormorant text-[#8a7660] text-base leading-relaxed">{feedback.body}</p>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[rgba(201,168,76,0.08)]">
                    <div className="flex justify-between font-sc text-xs tracking-[0.15em] uppercase text-[#5c5248]">
                      <span>Tiến độ: {matchedCount / 2}/{totalCards / 2} cặp</span>
                      {phase === 'playing' && <span>Bonus: +{bonusPreview}</span>}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Match modal */}
      <AnimatePresence>
        {isModalOpen && modalData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 250 }}
              className="max-w-md w-full bg-[#0d0b09] border border-emerald-800/40 p-8 relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-emerald-700/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-emerald-700/40" />
              <div className="text-center mb-6">
                <div className="font-cinzel text-emerald-500 text-3xl mb-2">◈</div>
                <p className="font-cinzel text-[#ddd0b8] text-sm tracking-[0.1em] uppercase">Ghép Đúng Rồi!</p>
              </div>
              <div className="border border-emerald-900/40 bg-emerald-950/10 p-5 mb-6">
                <p className="font-cinzel text-[#c8b99a] text-sm text-center mb-1">
                  <span className="text-emerald-400">{modalData.term1}</span>
                  <span className="text-[#5c5248] mx-2">↔</span>
                  <span className="text-emerald-400">{modalData.term2}</span>
                </p>
                <span className="block w-12 h-px bg-emerald-800/40 mx-auto my-3" />
                <p className="font-cormorant text-[#8a7660] text-base leading-relaxed">{modalData.explanation}</p>
              </div>
              <button onClick={handleContinue}
                className="w-full py-3 border border-emerald-700/40 text-emerald-400 font-sc text-xs tracking-[0.2em] uppercase hover:bg-emerald-950/30 transition-colors">
                Tiếp Tục
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End screen */}
      <AnimatePresence>
        {endState !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0906]/95 p-4">
            <div className="max-w-2xl w-full text-center px-8">
              <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring' }} className="mb-10">
                <div className="font-cinzel text-[#c9a84c]/30 text-6xl mb-4">{endState === 'won' ? '♛' : '⌛'}</div>
                <h2 className="font-cinzel text-[#ddd0b8] text-4xl md:text-5xl tracking-[0.1em] uppercase">
                  {endState === 'won' ? 'Chiến Thắng' : 'Game Over'}
                </h2>
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                className="border border-[rgba(201,168,76,0.15)] bg-[#0d0b09] p-10 mb-8 relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[rgba(201,168,76,0.2)]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[rgba(201,168,76,0.2)]" />
                <p className="font-sc text-[#5c5248] text-xs tracking-[0.25em] uppercase mb-2">Tổng điểm</p>
                <p className="font-cinzel text-[#c9a84c] text-6xl font-black tracking-wider">{finalScore ?? score}</p>
                <span className="block w-12 h-px bg-[rgba(201,168,76,0.2)] mx-auto mt-6 mb-4" />
                <p className="font-fell italic text-[#5c5248]">
                  {endState === 'won'
                    ? `Thời gian còn lại: ${timeLeft}s · Bonus: +${Math.max(0, timeLeft) * BONUS_PER_SEC}`
                    : 'Hãy thử lại để cải thiện thành tích của bạn.'}
                </p>
              </motion.div>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                onClick={() => reset(false)} className="btn-gold">
                Chơi Lại
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.perspective-1000 { perspective: 1000px; }`}</style>
    </div>
  )
}
