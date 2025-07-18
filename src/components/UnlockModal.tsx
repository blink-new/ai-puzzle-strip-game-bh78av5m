import { ClothingItem } from '../types/game'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Sparkles, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

interface UnlockModalProps {
  isOpen: boolean
  onClose: () => void
  unlockedItem: ClothingItem | null
}

export function UnlockModal({ isOpen, onClose, unlockedItem }: UnlockModalProps) {
  if (!unlockedItem) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 border-purple-500/50 max-w-md">
        <DialogTitle className="sr-only">New Item Unlocked</DialogTitle>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6 p-6"
        >
          {/* Celebration Header */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -left-2"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-pink-400" />
            </motion.div>
            
            <Gift className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-100">New Item Unlocked!</h2>
          </div>
          
          {/* Item Display */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-xl p-6 border border-purple-500/30 unlock-animation"
          >
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
              style={{ backgroundColor: unlockedItem.color }}
            />
            
            <h3 className="text-xl font-semibold text-purple-100 mb-2">
              {unlockedItem.name}
            </h3>
            
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-purple-600/50 text-purple-100">
                {unlockedItem.type}
              </Badge>
              <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                Level {unlockedItem.level}
              </Badge>
            </div>
            
            <p className="text-purple-300 text-sm">
              This stylish {unlockedItem.type} has been added to your wardrobe!
            </p>
          </motion.div>
          
          {/* Action Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Continue Playing
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}