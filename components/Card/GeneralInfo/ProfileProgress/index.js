import { CheckCircleIcon } from '@heroicons/react/solid'
import React from 'react'

export default function ProfileProgress({
  filledPersonalData,
  filledSocialData,
  filledProfessionalData,
}) {
  return (
    <div
      className="flex w-96 max-w-sm flex-col items-center justify-center"
      data-testid="profile-progress"
    >
      <div className="flex flex-col items-center justify-center text-lg lg:text-xs">
        <span className="">Dados Pessoais</span>
        <CheckCircleIcon
          className="mb-4 mt-1"
          fill={filledPersonalData ? '#4CE310' : 'currentColor'}
          width="24"
          data-testid='personal-data-icon'
        />
        <span className="">Dados Sociais</span>
        <CheckCircleIcon
          className="mb-4 mt-1"
          fill={filledSocialData ? '#4CE310' : 'currentColor'}
          width="24"
          data-testid='social-data-icon'
        />
        <span className="">Dados Profissionais</span>
        <CheckCircleIcon
          className="mb-4 mt-1"
          fill={filledProfessionalData ? '#4CE310' : 'currentColor'}
          width="24"
          data-testid='professional-data-icon'
        />
      </div>
    </div>
  )
}