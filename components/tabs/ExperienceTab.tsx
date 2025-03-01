'use client'

import { useState } from 'react'
import { experiences } from '@/lib/cv-data'
import { DeleteIcon, PencilIcon, PlusIcon } from '@/components/Icons'
import AddNewSectionButton from '@/components/AddNewSectionButton'
import { Experience } from '@/lib/types'

type ExperienceEditFormProps = {
  editingItem: Experience;
  onSave: (data: Experience) => void;
  onCancel: () => void;
}

const validateDate = (month: number, year: number): boolean => {
  return month >= 1 && month <= 12 && year >= 1900 && year <= 2100
}

export const ExperienceEditForm = ({ editingItem, onSave, onCancel }: ExperienceEditFormProps) => {
  const [formData, setFormData] = useState<Experience>(editingItem)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.company.name.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    if (!validateDate(formData.startDate.month, formData.startDate.year)) {
      newErrors.startDate = 'Invalid start date'
    }
    if (!formData.isCurrent && !validateDate(formData.endDate.month, formData.endDate.year)) {
      newErrors.endDate = 'Invalid end date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <div>
        <label className='block text-sm font-medium mb-1'>Title</label>
        <input
          type='text'
          className={`w-full border rounded p-2 ${errors.title ? 'border-red-500' : ''}`}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}
      </div>
      
      <div>
        <label className='block text-sm font-medium mb-1'>Company Name</label>
        <input
          type='text'
          className={`w-full border rounded p-2 ${errors.companyName ? 'border-red-500' : ''}`}
          value={formData.company.name}
          onChange={(e) => setFormData({ 
            ...formData, 
            company: { ...formData.company, name: e.target.value }
          })}
        />
        {errors.companyName && <p className='text-red-500 text-sm mt-1'>{errors.companyName}</p>}
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Location</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={formData.company.location}
          onChange={(e) => setFormData({ 
            ...formData, 
            company: { ...formData.company, location: e.target.value }
          })}
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Industry</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={formData.company.industry}
          onChange={(e) => setFormData({ 
            ...formData, 
            company: { ...formData.company, industry: e.target.value }
          })}
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Start Date</label>
          <div className='grid grid-cols-2 gap-2'>
            <input
              type='number'
              className={`border rounded p-2 ${errors.startDate ? 'border-red-500' : ''}`}
              value={formData.startDate.month}
              onChange={(e) => setFormData({
                ...formData,
                startDate: { ...formData.startDate, month: Number(e.target.value) }
              })}
              placeholder='Month'
            />
            <input
              type='number'
              className={`border rounded p-2 ${errors.startDate ? 'border-red-500' : ''}`}
              value={formData.startDate.year}
              onChange={(e) => setFormData({
                ...formData,
                startDate: { ...formData.startDate, year: Number(e.target.value) }
              })}
              placeholder='Year'
            />
          </div>
          {errors.startDate && <p className='text-red-500 text-sm mt-1'>{errors.startDate}</p>}
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>End Date</label>
          <div className='grid grid-cols-2 gap-2'>
            <input
              type='number'
              className={`border rounded p-2 ${errors.endDate ? 'border-red-500' : ''}`}
              value={formData.endDate.month}
              onChange={(e) => setFormData({
                ...formData,
                endDate: { ...formData.endDate, month: Number(e.target.value) }
              })}
              placeholder='Month'
              disabled={formData.isCurrent}
            />
            <input
              type='number'
              className={`border rounded p-2 ${errors.endDate ? 'border-red-500' : ''}`}
              value={formData.endDate.year}
              onChange={(e) => setFormData({
                ...formData,
                endDate: { ...formData.endDate, year: Number(e.target.value) }
              })}
              placeholder='Year'
              disabled={formData.isCurrent}
            />
          </div>
          {errors.endDate && <p className='text-red-500 text-sm mt-1'>{errors.endDate}</p>}
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>
          <input
            type='checkbox'
            checked={formData.isCurrent}
            onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
            className='mr-2'
          />
          Current Position
        </label>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Summary</label>
        <textarea
          className='w-full border rounded p-2'
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Achievements</label>
        {formData.achievements.map((achievement: string, index: number) => (
          <div key={index} className='flex gap-2 mb-2'>
            <input
              type='text'
              className='w-full border rounded p-2'
              value={achievement}
              onChange={(e) => {
                const newAchievements = [...formData.achievements]
                newAchievements[index] = e.target.value
                setFormData({ ...formData, achievements: newAchievements })
              }}
            />
            <button
              type='button'
              onClick={() => {
                const newAchievements = formData.achievements.filter((_, i) => i !== index)
                setFormData({ ...formData, achievements: newAchievements })
              }}
              className='px-2 py-1 bg-red-500 text-white rounded'
            >
              <DeleteIcon className='h-4 w-4'/>
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={() => setFormData({
            ...formData,
            achievements: [...formData.achievements, '']
          })}
          className='px-4 py-2 border rounded hover:bg-gray-100'
        >
          <PlusIcon/>
        </button>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Technologies</label>
        {formData.technologies.map((tech: string, index: number) => (
          <div key={index} className='flex gap-2 mb-2'>
            <input
              type='text'
              className='w-full border rounded p-2'
              value={tech}
              onChange={(e) => {
                const newTech = [...formData.technologies]
                newTech[index] = e.target.value
                setFormData({ ...formData, technologies: newTech })
              }}
            />
            <button
              type='button'
              onClick={() => {
                const newTech = formData.technologies.filter((_, i) => i !== index)
                setFormData({ ...formData, technologies: newTech })
              }}
              className='px-2 py-1 bg-red-500 text-white rounded'
            >
              <DeleteIcon className='h-4 w-4'/>
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={() => setFormData({
            ...formData,
            technologies: [...formData.technologies, '']
          })}
          className='px-4 py-2 border rounded hover:bg-gray-100'
        >
          <PlusIcon/>
        </button>
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

export default function ExperienceTab({ onEdit }: { onEdit: (item: Experience) => void }) {
  const emptyExperience: Experience = {
    isCurrent: false,
    summary: '',
    title: '',
    startDate: { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
    endDate: { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
    company: { name: '', location: '', industry: '' },
    achievements: [],
    technologies: [],
  }

  return (
    <div className='space-y-4'>
      <AddNewSectionButton onClick={() => onEdit(emptyExperience)} />
      {experiences.map((exp, index) => (
        <div key={index} className='border p-4 rounded-lg bg-white relative'>
          <div className='absolute top-2 right-2'>
            <button onClick={() => onEdit(exp)} className='p-1 hover:text-blue-600'>
              <PencilIcon className='h-5 w-5' />
            </button>
          </div>
          <h3 className='font-bold text-lg'>{exp.title}</h3>
          <p className='text-gray-600'>{exp.company.name}</p>
          <p className='text-sm text-gray-500'>
            {exp.company.location} • {exp.company.industry}
          </p>
          <p className='text-sm text-gray-500'>
            {exp.startDate.month}/{exp.startDate.year} - 
            {exp.isCurrent ? 'Present' : `${exp.endDate.month}/${exp.endDate.year}`}
          </p>
          <p className='mt-2'>{exp.summary}</p>
          
          {exp.achievements.length > 0 && (
            <div className='mt-3'>
              <h4 className='font-semibold'>Key Achievements:</h4>
              <ul className='list-disc list-inside'>
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
          
          {exp.technologies.length > 0 && (
            <div className='mt-3'>
              <h4 className='font-semibold'>Technologies:</h4>
              <div className='flex flex-wrap gap-2 mt-1'>
                {exp.technologies.map((tech, i) => (
                  <span key={i} className='px-2 py-1 bg-gray-100 rounded-full text-sm'>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
