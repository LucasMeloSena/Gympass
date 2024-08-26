import { Check } from 'lucide-react'

interface CardItemData {
  text: string
}

export function CardItem({ text }: CardItemData) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Check size={20} />
      <h4 className="text-center font-poppins text-sm">{text}</h4>
    </div>
  )
}
