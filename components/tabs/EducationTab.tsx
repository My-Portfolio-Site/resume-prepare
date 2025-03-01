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
    if (!formData.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = 'Field of study is required'
    }
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required'
    }
    if (!validateDate(formData.startDate.month, formData.startDate.year)) {
      newErrors.startDate = 'Invalid start date'
    }
    if (!validateDate(formData.endDate.month, formData.endDate.year)) {
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
          value={formData.fieldOfStudy}
          onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
        />
        {errors.fieldOfStudy && <p className='text-red-500 text-sm mt-1'>{errors.fieldOfStudy}</p>}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>School Name</label>
          <input
            type='text'
            className={`w-full border rounded p-2 ${errors.schoolName ? 'border-red-500' : ''}`}
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          />
          {errors.schoolName && <p className='text-red-500 text-sm mt-1'>{errors.schoolName}</p>}
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
            value={formData.percentage}
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
            value={formData.cgpa}
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
              value={formData.startDate.month}
              onChange={(e) => setFormData({
                ...formData,
                startDate: { ...formData.startDate, month: Number(e.target.value) }
              })}
              placeholder='Month'
              min={1}
              max={12}
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
              value={formData.endDate.month}
              onChange={(e) => setFormData({
                ...formData,
                endDate: { ...formData.endDate, month: Number(e.target.value) }
              })}
              placeholder='Month'
              min={1}
              max={12}
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
              min={1900}
              max={2100}
            />
          </div>
          {errors.endDate && <p className='text-red-500 text-sm mt-1'>{errors.endDate}</p>}
        </div>
      </div>

      {/* Optional sections */}
      <div>
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

export default function EducationTab({ onEdit }: { onEdit: (item: Education) => void }) {
  const emptyEducation: Education = {
    degree: '',
    fieldOfStudy: '',
    percentage: 0,
    cgpa: 0,
    schoolName: '',
    university: '',
    address: '',
    startDate: { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
    endDate: { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
    achievements: [],
  }

  return (
    <div className='space-y-4'>
      <AddNewSectionButton onClick={() => onEdit(emptyEducation)} />
      {education.map((edu, index) => (
        <div key={index} className='border p-4 rounded-lg bg-white relative'>
          <div className='absolute top-2 right-2'>
            <button onClick={() => onEdit(edu)} className='p-1 hover:text-blue-600'>
              <PencilIcon className='h-5 w-5' />
            </button>
          </div>
          <h3 className='font-bold text-lg'>{edu.degree} in {edu.fieldOfStudy}</h3>
          <p className=''>{edu.schoolName}</p>
          <p className='text-sm '>University: {edu.university}</p>
          <p className='text-sm text-gray-500'>{edu.address}</p>
          <p className='text-sm text-gray-500'>
            {edu.startDate.month}/{edu.startDate.year} - {edu.endDate.month}/{edu.endDate.year}
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
