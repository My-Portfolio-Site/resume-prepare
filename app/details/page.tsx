'use client'

import { useState } from 'react'
import Tab from '@/components/Tab'
import Modal from '@/components/Modal'
import ExperienceTab, { ExperienceEditForm } from '@/components/tabs/ExperienceTab'
import EducationTab, { EducationEditForm } from '@/components/tabs/EducationTab'
import SkillsTab, { SkillsEditForm } from '@/components/tabs/SkillsTab'
import AchievementsTab, { AchievementsEditForm } from '@/components/tabs/AchievementsTab'
import CertificationsTab, { CertificationsEditForm } from '@/components/tabs/CertificationsTab'
import CoursesTab, { CoursesEditForm } from '@/components/tabs/CoursesTab'

export default function Details() {
  const [activeTab, setActiveTab] = useState('Experience')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const tabs = [
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
  }

  const handleSave = (updatedData: any) => {
    // Handle save logic here
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const renderEditForm = () => {
    if (!editingItem) return null

    switch (activeTab) {
      case 'Experience':
        return <ExperienceEditForm 
          editingItem={editingItem}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      case 'Education':
        return <EducationEditForm 
          editingItem={editingItem}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      case 'Skills':
        return <SkillsEditForm 
          editingItem={editingItem}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      case 'Achievements':
        return <AchievementsEditForm 
          editingItem={editingItem}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      case 'Certifications':
        return <CertificationsEditForm 
          editingItem={editingItem}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      case 'Courses':
        return <CoursesEditForm 
          editingItem={editingItem}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Experience':
        return <ExperienceTab onEdit={handleEdit} />
      case 'Education':
        return <EducationTab onEdit={handleEdit} />
      case 'Skills':
        return <SkillsTab onEdit={handleEdit} />
      case 'Achievements':
        return <AchievementsTab onEdit={handleEdit} />
      case 'Certifications':
        return <CertificationsTab onEdit={handleEdit} />
      case 'Courses':
        return <CoursesTab onEdit={handleEdit} />
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      <p className='text-center text-blue-600 dark:text-white text-2xl font-bold'>
        Details
      </p>
      <div className='w-[600px]'>
        <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className='mt-4'>{renderContent()}</div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Edit ${activeTab}`}
      >
        {renderEditForm()}
      </Modal>
    </div>
  )
}
