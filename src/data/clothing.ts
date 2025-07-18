import { ClothingItem } from '../types/game'

export const clothingItems: ClothingItem[] = [
  // Level 1 - Basic items
  { id: 'basic-top', name: 'Casual T-Shirt', type: 'top', unlocked: true, level: 1, color: '#8B5CF6' },
  { id: 'basic-bottom', name: 'Jeans', type: 'bottom', unlocked: true, level: 1, color: '#3B82F6' },
  { id: 'basic-shoes', name: 'Sneakers', type: 'shoes', unlocked: true, level: 1, color: '#EF4444' },
  
  // Level 2-3 - Casual wear
  { id: 'hoodie', name: 'Cozy Hoodie', type: 'top', unlocked: false, level: 2, color: '#F59E0B' },
  { id: 'skirt', name: 'Denim Skirt', type: 'bottom', unlocked: false, level: 2, color: '#8B5CF6' },
  { id: 'cap', name: 'Baseball Cap', type: 'hat', unlocked: false, level: 2, color: '#EF4444' },
  { id: 'watch', name: 'Smart Watch', type: 'accessory', unlocked: false, level: 3, color: '#6B7280' },
  
  // Level 4-5 - Stylish items
  { id: 'blouse', name: 'Silk Blouse', type: 'top', unlocked: false, level: 4, color: '#EC4899' },
  { id: 'dress-pants', name: 'Dress Pants', type: 'bottom', unlocked: false, level: 4, color: '#1F2937' },
  { id: 'heels', name: 'High Heels', type: 'shoes', unlocked: false, level: 4, color: '#DC2626' },
  { id: 'necklace', name: 'Pearl Necklace', type: 'accessory', unlocked: false, level: 5, color: '#F3F4F6' },
  
  // Level 6-8 - Elegant wear
  { id: 'blazer', name: 'Business Blazer', type: 'top', unlocked: false, level: 6, color: '#1F2937' },
  { id: 'pencil-skirt', name: 'Pencil Skirt', type: 'bottom', unlocked: false, level: 6, color: '#374151' },
  { id: 'beret', name: 'French Beret', type: 'hat', unlocked: false, level: 7, color: '#7C2D12' },
  { id: 'earrings', name: 'Diamond Earrings', type: 'accessory', unlocked: false, level: 8, color: '#F9FAFB' },
  
  // Level 9-10 - Premium items
  { id: 'evening-dress', name: 'Evening Gown', type: 'top', unlocked: false, level: 9, color: '#7C3AED' },
  { id: 'designer-shoes', name: 'Designer Pumps', type: 'shoes', unlocked: false, level: 9, color: '#B91C1C' },
  { id: 'tiara', name: 'Crystal Tiara', type: 'hat', unlocked: false, level: 10, color: '#FCD34D' },
  { id: 'bracelet', name: 'Gold Bracelet', type: 'accessory', unlocked: false, level: 10, color: '#F59E0B' }
]