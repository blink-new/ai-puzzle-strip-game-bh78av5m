export interface ClothingItem {
  id: string
  name: string
  type: 'top' | 'bottom' | 'shoes' | 'accessory' | 'hat'
  unlocked: boolean
  level: number
  image?: string
  color: string
}

export interface Character {
  id: string
  name: string
  level: number
  experience: number
  equippedItems: {
    top?: ClothingItem
    bottom?: ClothingItem
    shoes?: ClothingItem
    accessory?: ClothingItem
    hat?: ClothingItem
  }
}

export interface Puzzle {
  id: string
  question: string
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'riddle' | 'math' | 'logic' | 'trivia'
  hint?: string
  reward: ClothingItem
}

export interface GameState {
  character: Character
  currentPuzzle: Puzzle | null
  unlockedItems: ClothingItem[]
  score: number
  streak: number
  level: number
}