'use client'

import { useState } from 'react'
import { Profile } from '@/lib/types'
import { PencilIcon } from '@/components/Icons'

type ProfileEditFormProps = {
  profile: Profile | null
  editingItem: Profile
  onSave: (data: Profile) => void
  onCancel: () => void
}

export const ProfileEditForm = ({
  profile,
  editingItem,
  onSave,
  onCancel,
}: ProfileEditFormProps) => {
  const [formData, setFormData] = useState<Profile>(editingItem)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required'
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
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
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>First Name</label>
          <input
            type='text'
            className={`w-full border rounded p-2 ${
              errors.first_name ? 'border-red-500' : ''
            }`}
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          {errors.first_name && (
            <p className='text-red-500 text-sm mt-1'>{errors.first_name}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Last Name</label>
          <input
            type='text'
            className={`w-full border rounded p-2 ${
              errors.last_name ? 'border-red-500' : ''
            }`}
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          {errors.last_name && (
            <p className='text-red-500 text-sm mt-1'>{errors.last_name}</p>
          )}
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>
          Professional Headline
        </label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={formData.headline || ''}
          onChange={(e) =>
            setFormData({ ...formData, headline: e.target.value })
          }
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>
          Professional Summary
        </label>
        <textarea
          className='w-full border rounded p-2'
          rows={3}
          value={formData.summary || ''}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>About Me</label>
        <textarea
          className='w-full border rounded p-2'
          rows={3}
          value={formData.about_me || ''}
          onChange={(e) =>
            setFormData({ ...formData, about_me: e.target.value })
          }
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Email</label>
        <input
          type='email'
          className={`w-full border rounded p-2 ${
            errors.email ? 'border-red-500' : ''
          }`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Phone</label>
        <input
          type='tel'
          className='w-full border rounded p-2'
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Address</label>
        <input
          type='text'
          className='w-full border rounded p-2'
          value={formData.address || ''}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Country</label>
          <input
            type='text'
            className='w-full border rounded p-2'
            value={formData.country || ''}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Postal Code</label>
          <input
            type='text'
            className='w-full border rounded p-2'
            value={formData.postal_code || ''}
            onChange={(e) =>
              setFormData({ ...formData, postal_code: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>LinkedIn URL</label>
        <input
          type='url'
          className='w-full border rounded p-2'
          value={formData.linkedin_url || ''}
          onChange={(e) =>
            setFormData({ ...formData, linkedin_url: e.target.value })
          }
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>GitHub URL</label>
        <input
          type='url'
          className='w-full border rounded p-2'
          value={formData.github_url || ''}
          onChange={(e) =>
            setFormData({ ...formData, github_url: e.target.value })
          }
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Portfolio URL</label>
        <input
          type='url'
          className='w-full border rounded p-2'
          value={formData.portfolio_url || ''}
          onChange={(e) =>
            setFormData({ ...formData, portfolio_url: e.target.value })
          }
        />
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

export default function ProfileTab({
  profile,
  onEdit,
}: {
  profile: Profile | null
  onEdit: (item: Profile) => void
}) {
  // You'll need to fetch the actual profile data from your backend
  if (!profile) return
  return (
    <div className='p-4 rounded-lg bg-white dark:bg-gray-700'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-2xl font-bold'>
            {profile.first_name} {profile.last_name}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>{profile.headline}</p>
        </div>
        <button
          onClick={() => onEdit(profile)}
          className='p-2 hover:text-blue-600'
        >
          <PencilIcon className='h-5 w-5' />
        </button>
      </div>

      <div className='mt-4 space-y-4'>
          <div>
            <h3 className='font-semibold'>Professional Summary</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {profile?.summary}
            </p>
          </div>

          <div>
            <h3 className='font-semibold'>About Me</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {profile?.about_me}
            </p>
          </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h3 className='font-semibold'>Contact Information</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Email: {profile?.email}
            </p>

            <p className='text-gray-600 dark:text-gray-300'>
              Phone: {profile?.phone}
            </p>
          </div>

          <div>
            <h3 className='font-semibold'>Location</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {profile?.address}
            </p>
            <p className='text-gray-600 dark:text-gray-300'>
              {profile?.country} {profile?.postal_code}
            </p>
          </div>
        </div>

        <div>
          <h3 className='font-semibold'>Professional Links</h3>
          <div className='space-y-1'>
            <p className=''>LinkedIn: {profile?.linkedin_url}</p>
            <p className=''>GitHub: {profile?.github_url}</p>
            <p className=''>Portfolio: {profile?.portfolio_url}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
