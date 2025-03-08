'use client'

import { useState } from 'react'
import { courses } from '@/lib/cv-data'
import { PencilIcon, DeleteIcon, PlusIcon } from '@/components/Icons'
import AddNewSectionButton from '@/components/AddNewSectionButton'
import { Course } from '@/lib/types'

type CoursesEditFormProps = {
  editingItem: any
  onSave: (data: any) => void
  onCancel: () => void
}

export const CoursesEditForm = ({
  editingItem,
  onSave,
  onCancel,
}: CoursesEditFormProps) => {
  const [formData, setFormData] = useState(editingItem)

  return (
    <form
      className='space-y-4'
      onSubmit={(e) => {
        e.preventDefault()
        onSave(formData)
      }}
    >
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
      <div>
        <label className='block text-sm font-medium mb-1'>Completed Year</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={formData.completed}
          onChange={(e) =>
            setFormData({ ...formData, completed: e.target.value })
          }
        />
      </div>
      <div>
              <label className='block text-sm font-medium mb-1'>Skills</label>
              {formData.skills &&
                formData.skills.map((tech: string, index: number) => (
                  <div key={index} className='flex gap-2 mb-2'>
                    <input
                      type='text'
                      className='w-full border rounded p-2'
                      value={tech}
                      onChange={(e) => {
                        const newSkill = [...formData.skills]
                        newSkill[index] = e.target.value
                        setFormData({ ...formData, skills: newSkill })
                      }}
                    />
                    <button
                      type='button'
                      onClick={() => {
                        const newSkill: string[] = formData.skills.filter(
                          (_: any, i: number) => i !== index
                        )
                        setFormData({ ...formData, skills: newSkill })
                      }}
                      className='px-2 py-1 bg-red-500 text-white rounded'
                    >
                      <DeleteIcon className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              <button
                type='button'
                onClick={() => {
                  const currentskills = formData.skills || []
                  setFormData({
                    ...formData,
                    skills: [...currentskills, ''],
                  })
                }}
                className='px-4 py-2 border rounded hover:bg-gray-100'
              >
                <PlusIcon />
              </button>
            </div>
      <div className='flex justify-end gap-2'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 border rounded'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-600 text-white rounded'
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default function CoursesTab({
  onEdit,
  onDelete
}: {
  onEdit: (item: Course) => void
  onDelete: (item: Course) => void
}) {
  const emptyCourse: Course = {
    id: '',
    user_id: '',
    type: 'course' as const,
    name: '',
    issuer: '',
    completed: '',
    created_at: '',
    skills: []
  }
  return (
    <div className='space-y-4 min-w-[450px]'>
      <AddNewSectionButton onClick={() => onEdit(emptyCourse)} />
      {courses.map((course, index) => (
        <div key={index} className=' p-4 rounded-lg bg-white dark:bg-gray-700 relative'>
          <div className='absolute top-2 right-2'>
            <button
              onClick={() => onDelete(course)}
              className='p-1 text-red-500 hover:text-red-700'
            >
              <DeleteIcon className='h-5 w-5 mr-2' />
            </button>
            <button
              onClick={() => onEdit(course)}
              className='p-1 hover:text-blue-600'
            >
              <PencilIcon className='h-5 w-5' />
            </button>
          </div>
          <h3 className='font-bold'>{course.name}</h3>
          <p className='text-gray-600 dark:text-gray-200'>{course.issuer}</p>
          <p className='text-sm text-gray-500 dark:text-gray-300'>Completed: {course.completed}</p>
          <div className='flex flex-wrap gap-2 mt-2'>
            {course.skills.length < 1 && (
              <span className='italic text-gray-500 dark:text-gray-300 text-sm'>
                No SKills added
              </span>
            )}
            {course.skills?.map((item, i) => (
              <span
                key={i}
                className='px-2 py-1 text-sm bg-gray-100 dark:text-black rounded-full'
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
