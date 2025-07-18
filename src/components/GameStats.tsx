import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Trophy, Zap, Target, Star } from 'lucide-react'

interface GameStatsProps {
  score: number
  streak: number
  level: number
  totalUnlocked: number
}

export function GameStats({ score, streak, level, totalUnlocked }: GameStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardContent className="p-4 text-center">
          <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-100">{score}</p>
          <p className="text-sm text-purple-300">Score</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardContent className="p-4 text-center">
          <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-100">{streak}</p>
          <p className="text-sm text-orange-300">Streak</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardContent className="p-4 text-center">
          <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-100">{level}</p>
          <p className="text-sm text-green-300">Level</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-pink-500/30">
        <CardContent className="p-4 text-center">
          <Star className="w-6 h-6 text-pink-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-pink-100">{totalUnlocked}</p>
          <p className="text-sm text-pink-300">Items</p>
        </CardContent>
      </Card>
    </div>
  )
}