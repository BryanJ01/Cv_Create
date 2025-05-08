/**
 * Interfaces para comunicación con el backend
 */

export interface JobDescription {
  job_description: string
}

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
}

export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  graduationDate: string
}

export interface KeywordMatch {
  skill: string
  isMatch: boolean
  isSuggestion?: boolean
}

export interface KeywordExtractionResponse {
  keywords: string[]
  job_title?: string
  industry?: string
}

export interface AnalysisResponse {
  matches: KeywordMatch[]
  match_score: number
  suggestions: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: string[]
  jobDescription: string
  template: string
}

export interface GenerateCVResponse {
  resume_id: string
  resume_content: string
  optimized_sections?: {
    experience?: Experience[]
    skills?: string[]
  }
}
