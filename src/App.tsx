import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Character, ClothingItem, Puzzle, GameState } from './types/game'
import { clothingItems } from './data/clothing'
import { CharacterAvatar } from './components/CharacterAvatar'
import { PuzzlePanel } from './components/PuzzlePanel'
import { WardrobePanel } from './components/WardrobePanel'
import { GameStats } from './components/GameStats'
import { UnlockModal } from './components/UnlockModal'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Sparkles, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [gameState, setGameState] = useState<GameState>({
    character: {
      id: 'player-1',
      name: 'Fashion Star',
      level: 1,
      experience: 0,
      equippedItems: {
        top: clothingItems.find(item => item.id === 'basic-top'),
        bottom: clothingItems.find(item => item.id === 'basic-bottom'),
        shoes: clothingItems.find(item => item.id === 'basic-shoes')
      }
    },
    currentPuzzle: null,
    unlockedItems: clothingItems.filter(item => item.unlocked),
    score: 0,
    streak: 0,
    level: 1
  })
  
  const [showHint, setShowHint] = useState(false)
  const [isGeneratingPuzzle, setIsGeneratingPuzzle] = useState(false)
  const [unlockedItem, setUnlockedItem] = useState<ClothingItem | null>(null)
  const [showUnlockModal, setShowUnlockModal] = useState(false)

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  // Generate a new puzzle
  const generatePuzzle = async () => {
    setIsGeneratingPuzzle(true)
    setShowHint(false)
    
    try {
      const availableRewards = clothingItems.filter(
        item => !item.unlocked && item.level <= gameState.level + 1
      )
      
      if (availableRewards.length === 0) {
        toast.error('No more items to unlock! You\'ve collected everything!')
        setIsGeneratingPuzzle(false)
        return
      }
      
      const reward = availableRewards[Math.floor(Math.random() * availableRewards.length)]
      const difficulty = reward.level <= 3 ? 'easy' : reward.level <= 6 ? 'medium' : 'hard'
      
      const puzzleType = Math.random() > 0.5 ? 'riddle' : 'trivia'
      const { text } = await blink.ai.generateText({
        prompt: `Create a ${difficulty} ${puzzleType} puzzle. Respond with ONLY a JSON object, no other text or formatting.

Requirements:
- Difficulty: ${difficulty}
- Type: ${puzzleType}
- Fun and engaging
- Clear question with specific answer
- Helpful hint
- Appropriate for all ages

Return this exact JSON structure:
{"question": "Your puzzle question", "answer": "correct answer", "hint": "helpful hint", "type": "${puzzleType}"}`,
        model: 'gpt-4o-mini'
      })
      
      // Extract JSON from potential markdown code blocks
      let jsonText = text.trim()
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      // Additional cleanup for any remaining backticks or formatting
      jsonText = jsonText.replace(/^`+|`+$/g, '').trim()
      
      let puzzleData
      try {
        puzzleData = JSON.parse(jsonText)
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError)
        console.error('Raw text:', text)
        console.error('Cleaned text:', jsonText)
        throw new Error('Failed to parse AI response as JSON')
      }
      
      // Validate required fields
      if (!puzzleData.question || !puzzleData.answer || !puzzleData.type) {
        console.warn('AI response missing required fields, using fallback puzzle')
        // Fallback puzzles
        const fallbackPuzzles = {
          easy: [
            { question: "What has keys but no locks?", answer: "piano", hint: "It makes music!", type: "riddle" },
            { question: "What is 5 + 3?", answer: "8", hint: "Count on your fingers!", type: "trivia" }
          ],
          medium: [
            { question: "I am tall when I am young, and I am short when I am old. What am I?", answer: "candle", hint: "I give light and melt away", type: "riddle" },
            { question: "What is the capital of France?", answer: "paris", hint: "City of lights!", type: "trivia" }
          ],
          hard: [
            { question: "The more you take, the more you leave behind. What am I?", answer: "footsteps", hint: "Think about walking", type: "riddle" },
            { question: "What year did World War II end?", answer: "1945", hint: "Mid-1940s", type: "trivia" }
          ]
        }
        const fallbacks = fallbackPuzzles[difficulty]
        puzzleData = fallbacks[Math.floor(Math.random() * fallbacks.length)]
      }
      
      const newPuzzle: Puzzle = {
        id: `puzzle-${Date.now()}`,
        question: puzzleData.question,
        answer: puzzleData.answer.toLowerCase().trim(),
        difficulty,
        type: puzzleData.type,
        hint: puzzleData.hint || 'Think carefully about the question...',
        reward
      }
      
      setGameState(prev => ({ ...prev, currentPuzzle: newPuzzle }))
    } catch (error) {
      console.error('Error generating puzzle:', error)
      
      // Create a simple fallback puzzle if everything fails
      const simpleFallback = {
        easy: { question: "What color do you get when you mix red and blue?", answer: "purple", hint: "Think about primary colors!", type: "trivia" },
        medium: { question: "I have cities, but no houses. I have mountains, but no trees. What am I?", answer: "map", hint: "I help you find your way", type: "riddle" },
        hard: { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m", hint: "Look at the letters in the words", type: "riddle" }
      }
      
      const availableRewards = clothingItems.filter(
        item => !item.unlocked && item.level <= gameState.level + 1
      )
      
      if (availableRewards.length > 0) {
        const reward = availableRewards[Math.floor(Math.random() * availableRewards.length)]
        const difficulty = reward.level <= 3 ? 'easy' : reward.level <= 6 ? 'medium' : 'hard'
        const fallbackData = simpleFallback[difficulty]
        
        const fallbackPuzzle: Puzzle = {
          id: `puzzle-${Date.now()}`,
          question: fallbackData.question,
          answer: fallbackData.answer,
          difficulty,
          type: fallbackData.type as 'riddle' | 'trivia',
          hint: fallbackData.hint,
          reward
        }
        
        setGameState(prev => ({ ...prev, currentPuzzle: fallbackPuzzle }))
        toast.success('Generated a backup puzzle for you!')
      } else {
        toast.error('No more items to unlock! You\'ve collected everything!')
      }
    } finally {
      setIsGeneratingPuzzle(false)
    }
  }

  // Handle puzzle answer
  const handleAnswer = (userAnswer: string) => {
    if (!gameState.currentPuzzle) return
    
    const isCorrect = userAnswer.toLowerCase().trim() === gameState.currentPuzzle.answer
    
    if (isCorrect) {
      const reward = gameState.currentPuzzle.reward
      const newUnlockedItems = [...gameState.unlockedItems, { ...reward, unlocked: true }]
      const newScore = gameState.score + (gameState.currentPuzzle.difficulty === 'easy' ? 10 : gameState.currentPuzzle.difficulty === 'medium' ? 20 : 30)
      const newStreak = gameState.streak + 1
      const newExperience = Math.min(100, gameState.character.experience + 15)
      const newLevel = newExperience === 100 ? gameState.character.level + 1 : gameState.character.level
      
      setGameState(prev => ({
        ...prev,
        unlockedItems: newUnlockedItems,
        score: newScore,
        streak: newStreak,
        level: newLevel,
        currentPuzzle: null,
        character: {
          ...prev.character,
          experience: newLevel > prev.character.level ? 0 : newExperience,
          level: newLevel
        }
      }))
      
      setUnlockedItem(reward)
      setShowUnlockModal(true)
      toast.success('Correct! New item unlocked!')
    } else {
      setGameState(prev => ({ ...prev, streak: 0 }))
      toast.error('Incorrect answer. Try again!')
    }
  }

  // Equipment management
  const handleEquipItem = (item: ClothingItem) => {
    setGameState(prev => ({
      ...prev,
      character: {
        ...prev.character,
        equippedItems: {
          ...prev.character.equippedItems,
          [item.type]: item
        }
      }
    }))
    toast.success(`Equipped ${item.name}!`)
  }

  const handleUnequipItem = (type: ClothingItem['type']) => {
    setGameState(prev => ({
      ...prev,
      character: {
        ...prev.character,
        equippedItems: {
          ...prev.character.equippedItems,
          [type]: undefined
        }
      }
    }))
    toast.success('Item removed!')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto animate-spin" />
          <p className="text-purple-200">Loading your fashion adventure...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30">
          <CardHeader className="text-center">
            <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <CardTitle className="text-2xl text-purple-100">AI Puzzle Strip Game</CardTitle>
            <p className="text-purple-300">
              Solve puzzles to unlock amazing fashion items and customize your character!
            </p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => blink.auth.login()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Start Playing
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Puzzle Strip Game
        </h1>
        <p className="text-purple-300">Solve puzzles, unlock fashion, customize your style!</p>
      </motion.div>

      {/* Game Stats */}
      <GameStats 
        score={gameState.score}
        streak={gameState.streak}
        level={gameState.level}
        totalUnlocked={gameState.unlockedItems.length}
      />

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character Avatar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CharacterAvatar character={gameState.character} />
        </motion.div>

        {/* Puzzle Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <PuzzlePanel
            puzzle={gameState.currentPuzzle}
            onAnswer={handleAnswer}
            onHint={() => setShowHint(true)}
            showHint={showHint}
            isLoading={isGeneratingPuzzle}
          />
          
          {!gameState.currentPuzzle && (
            <Button
              onClick={generatePuzzle}
              disabled={isGeneratingPuzzle}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGeneratingPuzzle ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Puzzle...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  New Puzzle Challenge
                </>
              )}
            </Button>
          )}
        </motion.div>

        {/* Wardrobe Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <WardrobePanel
            character={gameState.character}
            unlockedItems={gameState.unlockedItems}
            onEquipItem={handleEquipItem}
            onUnequipItem={handleUnequipItem}
          />
        </motion.div>
      </div>

      {/* Unlock Modal */}
      <UnlockModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        unlockedItem={unlockedItem}
      />
    </div>
  )
}

export default App