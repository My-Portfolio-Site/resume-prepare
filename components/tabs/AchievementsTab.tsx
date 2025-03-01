'use client'

import { useState } from 'react'
import { achievements } from '@/lib/cv-data'
import { PencilIcon } from '@/components/Icons'
import AddNewSectionButton from '@/components/AddNewSectionButton'

type AchievementsEditFormProps = {
  editingItem: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const AchievementsEditForm = ({ editingItem, onSave, onCancel }: AchievementsEditFormProps) => {
  const [formData, setFormData] = useState(editingItem)

  return (
    <form className='space-y-4' onSubmit={(e) => {
      e.preventDefault()
      onSave(formData)
    }}>
      <div>
        <label className='block text-sm font-medium mb-1'>Name</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className='block text-sm font-medium mb-1'>Issuer</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={formData.issuer}
          onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
        />
      </div>
      <div className='flex justify-end gap-2'>
        <button type='button' onClick={onCancel} className='px-4 py-2 border rounded'>
          Cancel
        </button>
        <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>
          Save
        </button>
      </div>
    </form>
  )
}

export default function AchievementsTab({ onEdit }: { onEdit: (item: any) => void }) {
  return (
    <div className='space-y-4'>
      <AddNewSectionButton onClick={() => onEdit({ name: '', issuer: '' })} />
      {achievements.map((achievement, index) => (
        <div key={index} className='border p-4 rounded-lg bg-white relative'>
          <div className='absolute top-2 right-2'>
            <button onClick={() => onEdit(achievement)} className='p-1 hover:text-blue-600'>
              <PencilIcon className='h-5 w-5' />
            </button>
          </div>
          <h3 className='font-bold'>{achievement.name}</h3>
          <p className='text-gray-600'>{achievement.issuer}</p>
        </div>
      ))}
    </div>
  )
}
