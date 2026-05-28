export type MatchingCard = {
  id: string
  text: string
  pairIndex: number
}

export type FeedbackKind = 'info' | 'success' | 'error'

export type Feedback = {
  kind: FeedbackKind
  title: string
  body: string
}

