import { useState } from 'react'
import { Puzzle } from '../types/game'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Lightbulb, Brain, Calculator, HelpCircle, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface PuzzlePanelProps {
  puzzle: Puzzle | null
  onAnswer: (answer: string) => void
  onHint: () => void
  showHint: boolean
  isLoading?: boolean
}

const puzzleIcons = {
  riddle: Brain,
  math: Calculator,
  logic: Zap,
  trivia: HelpCircle
}

const difficultyColors = {
  easy: 'bg-green-600/20 text-green-400 border-green-500/30',
  medium: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
  hard: 'bg-red-600/20 text-red-400 border-red-500/30'
}

export function PuzzlePanel({ puzzle, onAnswer, onHint, showHint, isLoading }: PuzzlePanelProps) {
  const [userAnswer, setUserAnswer] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userAnswer.trim()) {
      onAnswer(userAnswer.trim())
      setUserAnswer('')
    }
  }

  if (!puzzle) {
    return (
      <Card className="h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <Brain className="w-16 h-16 text-purple-400 mx-auto" />
            <p className="text-purple-200">Ready for your next challenge?</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const Icon = puzzleIcons[puzzle.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 game-glow">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-purple-100">
              <Icon className="w-5 h-5" />
              Puzzle Challenge
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={difficultyColors[puzzle.difficulty]}>
                {puzzle.difficulty.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                {puzzle.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Question */}
          <div className="bg-purple-800/20 rounded-lg p-4 border border-purple-500/20">
            <p className="text-lg text-purple-100 leading-relaxed">
              {puzzle.question}
            </p>
          </div>
          
          {/* Hint */}
          {showHint && puzzle.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30"
            >
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-yellow-200">{puzzle.hint}</p>
              </div>
            </motion.div>
          )}
          
          {/* Answer Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="bg-purple-800/20 border-purple-500/30 text-purple-100 placeholder-purple-400"
              disabled={isLoading}
            />
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={!userAnswer.trim() || isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLoading ? 'Checking...' : 'Submit Answer'}
              </Button>
              
              {puzzle.hint && !showHint && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onHint}
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Lightbulb className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
          
          {/* Reward Preview */}
          <div className="bg-gradient-to-r from-purple-800/20 to-pink-800/20 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: puzzle.reward.color }}
              />
              <div>
                <p className="text-sm text-purple-300">Reward:</p>
                <p className="font-medium text-purple-100">{puzzle.reward.name}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}