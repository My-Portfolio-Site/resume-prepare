'use client'

import { useState } from 'react'
import { education } from '@/lib/cv-data'
import { DeleteIcon, PencilIcon, PlusIcon } from '@/components/Icons'
import AddNewSectionButton from '@/components/AddNewSectionButton'
import { Education } from '@/lib/types'

type EducationEditFormProps = {
  editingItem: Education;
  onSave: (data: Education) => void;
  onCancel: () => void;
}

const validateDate = (month: number, year: number): boolean => {
  return month >= 1 && month <= 12 && year >= 1900 && year <= 2100
}

export const EducationEditForm = ({ editingItem, onSave, onCancel }: EducationEditFormProps) => {
  const [formData, setFormData] = useState<Education>(editingItem)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required'
    }
    if (!formData.field_of_study.trim()) {
      newErrors.fieldOfStudy = 'Field of study is required'
    }
    if (!formData.school_name.trim()) {
      newErrors.schoolName = 'School name is required'
    }
    if (!validateDate(formData.start_month || 0, formData.start_year)) {
      newErrors.startDate = 'Invalid start date'
    }
    if (!validateDate(formData.end_month || 0, formData.end_year || 0)) {
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
        <label className='block text-sm font-medium mb-1'>Degree</label>
        <input
          type='text'
          className={`w-full border rounded p-2 ${errors.degree ? 'border-red-500' : ''}`}
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
        />
        {errors.degree && <p className='text-red-500 text-sm mt-1'>{errors.degree}</p>}
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Field of Study</label>
        <input
          type='text'
          className={`w-full border rounded p-2 ${errors.fieldOfStudy ? 'border-red-500' : ''}`}
          value={formData.field_of_study}
          onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
        />
        {errors.field_of_study && <p className='text-red-500 text-sm mt-1'>{errors.field_of_study}</p>}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>School Name</label>
          <input
            type='text'
            className={`w-full border rounded p-2 ${errors.schoolName ? 'border-red-500' : ''}`}
            value={formData.school_name}
            onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
          />
          {errors.school_name && <p className='text-red-500 text-sm mt-1'>{errors.school_name}</p>}
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>University</label>
          <input
            type='text'
            className='w-full border rounded p-2'
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Percentage</label>
          <input
            type='number'
            className='w-full border rounded p-2'
            value={formData.percentage || 0}
            onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
            step='0.01'
            min='0'
            max='100'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>CGPA</label>
          <input
            type='number'
            className='w-full border rounded p-2'
            value={formData.cgpa || 0}
            onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
            step='0.01'
            min='0'
            max='10'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Address</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Start Date</label>
          <div className='grid grid-cols-2 gap-2'>
            <input
              type='number'
              className={`border rounded p-2 ${errors.startDate ? 'border-red-500' : ''}`}
              value={formData.start_month || 0}
              onChange={(e) => setFormData({
                ...formData,
                start_month: Number(e.target.value)
              })}
              placeholder='Month'
              min={1}
              max={12}
            />
            <input
              type='number'
              className={`border rounded p-2 ${errors.startDate ? 'border-red-500' : ''}`}
              value={formData.start_year}
              onChange={(e) => setFormData({
                ...formData,
                start_year: Number(e.target.value)
              })}
              placeholder='Year'
              min={1900}
              max={2100}
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
              value={formData.end_month || 0}
              onChange={(e) => setFormData({
                ...formData,
                end_month: Number(e.target.value)
              })}
              placeholder='Month'
              min={1}
              max={12}
            />
            <input
              type='number'
              className={`border rounded p-2 ${errors.endDate ? 'border-red-500' : ''}`}
              value={formData.end_year || 0}
              onChange={(e) => setFormData({
                ...formData,
                end_year: Number(e.target.value)
              })}
              placeholder='Year'
              min={1900}
              max={2100}
            />
          </div>
          {errors.endDate && <p className='text-red-500 text-sm mt-1'>{errors.endDate}</p>}
        </div>
      </div>

      {/* Optional sections */}
      {/* <div>
        <label className='block text-sm font-medium mb-1'>Achievements</label>
        {(formData.achievements || []).map((achievement, index) => (
          <div key={index} className='flex gap-2 mb-2'>
            <input
              type='text'
              className='w-full border rounded p-2'
              value={achievement}
              onChange={(e) => {
                const newAchievements = [...(formData.achievements || [])]
                newAchievements[index] = e.target.value
                setFormData({ ...formData, achievements: newAchievements })
              }}
            />
            <button
              type='button'
              onClick={() => {
                const newAchievements = (formData.achievements || []).filter((_, i) => i !== index)
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
            achievements: [...(formData.achievements || []), '']
          })}
          className='px-4 py-2 border rounded hover:bg-gray-100'
        >
          <PlusIcon/>
        </button>
      </div> */}

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

export default function EducationTab({ onEdit, onDelete }: { onEdit: (item: Education) => void, onDelete: (item: Education) => void}) {
  const emptyEducation: Education = {
    id: '',
    user_id: '', // IMPORTANT: Placeholder, set correct user_id before saving
    is_current: false,
    degree: '',
    field_of_study: '',
    percentage: null,
    cgpa: null,
    school_name: '',
    university: '',
    address: '',
    start_month: null,
    start_year: 0,
    end_month: null,
    end_year: null,
    created_at: '', // DB managed
    updated_at: '', // DB managed
  }

  return (
    <div className='space-y-4 min-w-[450px]'>
      <AddNewSectionButton onClick={() => onEdit(emptyEducation)} />
      {education.map((edu, index) => (
        <div key={index} className=' p-4 rounded-lg bg-white dark:bg-gray-700 relative'>
          <div className='absolute top-2 right-2'>
          <button
              onClick={() => onDelete(edu)}
              className='p-1 text-red-500 hover:text-red-700'
            >
              <DeleteIcon className='h-5 w-5 mr-2' />
            </button>
            <button onClick={() => onEdit(edu)} className='p-1 hover:text-blue-600'>
              <PencilIcon className='h-5 w-5' />
            </button>
          </div>
          <h3 className='font-bold text-lg'>{edu.degree} in {edu.field_of_study}</h3>
          <p className=''>{edu.school_name}</p>
          <p className='text-sm '>University: {edu.university}</p>
          <p className='text-sm text-gray-500 dark:text-gray-300'>{edu.address}</p>
          <p className='text-sm text-gray-500 dark:text-gray-300'>
            {edu.start_month}/{edu.start_year} - {edu.is_current ? 'On Going': edu.end_month+'/'+edu.end_year}
          </p>
          <div className='mt-2 flex gap-4'>
            <p className='text-sm'>Percentage: {edu.percentage}%</p>
            <p className='text-sm'>CGPA: {edu.cgpa}</p>
          </div>
          

        </div>
      ))}
    </div>
  )
}
