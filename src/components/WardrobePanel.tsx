import { ClothingItem, Character } from '../types/game'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Shirt, Zap, Crown, Watch, Footprints, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

interface WardrobePanelProps {
  character: Character
  unlockedItems: ClothingItem[]
  onEquipItem: (item: ClothingItem) => void
  onUnequipItem: (type: ClothingItem['type']) => void
}

const typeIcons = {
  top: Shirt,
  bottom: Zap,
  shoes: Footprints,
  hat: Crown,
  accessory: Watch
}

const typeLabels = {
  top: 'Tops',
  bottom: 'Bottoms',
  shoes: 'Shoes',
  hat: 'Hats',
  accessory: 'Accessories'
}

export function WardrobePanel({ character, unlockedItems, onEquipItem, onUnequipItem }: WardrobePanelProps) {
  const groupedItems = unlockedItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {} as Record<ClothingItem['type'], ClothingItem[]>)

  const isEquipped = (item: ClothingItem) => {
    return character.equippedItems[item.type]?.id === item.id
  }

  return (
    <Card className="h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-100">
          <Shirt className="w-5 h-5" />
          Wardrobe
        </CardTitle>
        <p className="text-sm text-purple-300">
          {unlockedItems.length} items unlocked
        </p>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="top" className="h-full">
          <TabsList className="grid w-full grid-cols-5 bg-purple-800/20 mx-4 mb-4">
            {Object.entries(typeLabels).map(([type, label]) => {
              const Icon = typeIcons[type as ClothingItem['type']]
              const count = groupedItems[type as ClothingItem['type']]?.length || 0
              
              return (
                <TabsTrigger 
                  key={type} 
                  value={type}
                  className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-purple-100"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{count}</span>
                  </div>
                </TabsTrigger>
              )
            })}
          </TabsList>
          
          {Object.entries(typeLabels).map(([type, label]) => {
            const items = groupedItems[type as ClothingItem['type']] || []
            
            return (
              <TabsContent key={type} value={type} className="px-4 pb-4 space-y-3">
                <h3 className="font-medium text-purple-200">{label}</h3>
                
                {items.length === 0 ? (
                  <div className="text-center py-8 text-purple-400">
                    <Lock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No {label.toLowerCase()} unlocked yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-3 rounded-lg border transition-all ${
                          isEquipped(item)
                            ? 'bg-purple-600/30 border-purple-400/50 ring-2 ring-purple-400/30'
                            : 'bg-purple-800/20 border-purple-500/20 hover:bg-purple-700/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-purple-100 truncate">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="outline" 
                                className="text-xs border-purple-500/50 text-purple-300"
                              >
                                Level {item.level}
                              </Badge>
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            variant={isEquipped(item) ? "destructive" : "default"}
                            onClick={() => 
                              isEquipped(item) 
                                ? onUnequipItem(item.type)
                                : onEquipItem(item)
                            }
                            className={
                              isEquipped(item)
                                ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                                : "bg-purple-600/50 hover:bg-purple-600/70"
                            }
                          >
                            {isEquipped(item) ? 'Remove' : 'Equip'}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}