export interface Food {
  id: number
  name: string
  category: string
  icon: string
  pantry: string | null
  pantryTip: string
  refrigerated: string | null
  fridgeTip: string
  frozen: string | null
  freezerTip: string
  spoilSigns: string[]
}
