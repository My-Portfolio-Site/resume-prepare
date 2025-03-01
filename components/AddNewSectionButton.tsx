import { PlusIcon } from '@/components/Icons'

interface AddNewSectionButtonProps {
  onClick: () => void;
}

export default function AddNewSectionButton({ onClick }: AddNewSectionButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
