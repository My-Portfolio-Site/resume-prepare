'use client'

import { useState } from 'react'
import Tab from '@/components/Tab'
import Modal from '@/components/Modal'
import ExperienceTab, {
  ExperienceEditForm,
} from '@/components/tabs/ExperienceTab'
import EducationTab, { EducationEditForm } from '@/components/tabs/EducationTab'
import SkillsTab, { SkillsEditForm } from '@/components/tabs/SkillsTab'
import AchievementsTab, {
  AchievementsEditForm,
} from '@/components/tabs/AchievementsTab'
import CertificationsTab, {
  CertificationsEditForm,
} from '@/components/tabs/CertificationsTab'
import CoursesTab, { CoursesEditForm } from '@/components/tabs/CoursesTab'
import ProfileTab, { ProfileEditForm } from '@/components/tabs/ProfileTab'

// import {profile} from '@lib/cv-data'

import { Profile } from '@/lib/types'

export default function UserDetails({profile}: {profile: Profile}) {
  const [activeTab, setActiveTab] = useState('Profile')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const tabs = [
    'Profile',
    'Experience',
    'Education',
    'Skills',
    'Achievements',
    'Certifications',
    'Courses',
  ]


  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsModalOpen(true)
    return
  }

  const handleSave = (updatedData: any) => {
    // Handle save logic here
    console.log(updatedData)

    setIsModalOpen(false)
    setEditingItem(null)
    return
  }

  const handleDelete = (item: any) => {
    console.log('deleting: ', item, activeTab)
    const name =
      item.title || item.name || item.degree + ' in ' + item.field_of_study
    if (confirm(`Delete ${activeTab} "${name}"?`)) {
      console.log(`${activeTab} "${name} Deleted!!!`)
    } else {
      console.log('Delete Cancelled')
    }
    return
  }

  const renderEditForm = () => {
    if (!editingItem) return null

    switch (activeTab) {
      case 'Profile':
        return (
          <ProfileEditForm
            profile={profile}
            editingItem={editingItem}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        )
      case 'Experience':
        return (
          <ExperienceEditForm
            editingItem={editingItem}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        )
      case 'Education':
        return (
          <EducationEditForm
            editingItem={editingItem}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        )
      case 'Skills':
        return (
          <SkillsEditForm
            editingItem={editingItem}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        )
      case 'Achievements':
        return (
          <AchievementsEditForm
            editingItem={editingItem}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        )
      case 'Certifications':
        return (
          <CertificationsEditForm
            editingItem={editingItem}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        )
      case 'Courses':
        return (
          <CoursesEditForm
            editingItem={editingItem}
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
          />
        )
    }
    return
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileTab profile={profile} onEdit={handleEdit} />
      case 'Experience':
        return <ExperienceTab onEdit={handleEdit} onDelete={handleDelete} />
      case 'Education':
        return <EducationTab onEdit={handleEdit} onDelete={handleDelete} />
      case 'Skills':
        return <SkillsTab onEdit={handleEdit} onDelete={handleDelete} />
      case 'Achievements':
        return <AchievementsTab onEdit={handleEdit} onDelete={handleDelete} />
      case 'Certifications':
        return <CertificationsTab onEdit={handleEdit} onDelete={handleDelete} />
      case 'Courses':
        return <CoursesTab onEdit={handleEdit} onDelete={handleDelete} />
    }
    return
  }

  return (
    <>
      <div className='overflow-x-scroll w-full max-w-[470px] lg:max-w-[680px] scrollbar-hidden'>
        <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className='mt-4'>{renderContent()}</div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Edit ${activeTab}`}
      >
        {renderEditForm()}
      </Modal>
    </>
  )
}
