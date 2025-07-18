import { Character } from '../types/game'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Crown, Sparkles } from 'lucide-react'

interface CharacterAvatarProps {
  character: Character
  className?: string
}

export function CharacterAvatar({ character, className = '' }: CharacterAvatarProps) {
  return (
    <Card className={`p-6 bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 ${className}`}>
      <div className="text-center space-y-4">
        {/* Character Level & Name */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-yellow-400" />
          <Badge variant="secondary" className="bg-purple-600/50 text-purple-100">
            Level {character.level}
          </Badge>
        </div>
        
        <h2 className="text-xl font-semibold text-purple-100">{character.name}</h2>
        
        {/* Avatar Display */}
        <div className="relative mx-auto w-48 h-64 bg-gradient-to-b from-purple-800/30 to-purple-900/30 rounded-2xl border-2 border-purple-500/40 overflow-hidden">
          {/* Character Base */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="w-32 h-40 bg-gradient-to-t from-pink-300 to-pink-200 rounded-t-full relative">
              {/* Face */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-200 rounded-full">
                {/* Eyes */}
                <div className="absolute top-5 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                <div className="absolute top-5 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                {/* Smile */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-b-full"></div>
              </div>
            </div>
          </div>
          
          {/* Equipped Items Visualization */}
          {character.equippedItems.hat && (
            <div 
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-8 rounded-t-full opacity-80"
              style={{ backgroundColor: character.equippedItems.hat.color }}
            />
          )}
          
          {character.equippedItems.top && (
            <div 
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-28 h-20 rounded-t-lg opacity-80"
              style={{ backgroundColor: character.equippedItems.top.color }}
            />
          )}
          
          {character.equippedItems.bottom && (
            <div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-16 opacity-80"
              style={{ backgroundColor: character.equippedItems.bottom.color }}
            />
          )}
          
          {character.equippedItems.shoes && (
            <div 
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-6 rounded-b-lg opacity-80"
              style={{ backgroundColor: character.equippedItems.shoes.color }}
            />
          )}
          
          {character.equippedItems.accessory && (
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <Sparkles className="w-4 h-4 text-yellow-400 sparkle" />
            </div>
          )}
        </div>
        
        {/* Experience Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-purple-200">
            <span>Experience</span>
            <span>{character.experience}/100</span>
          </div>
          <div className="w-full bg-purple-900/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${character.experience}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}