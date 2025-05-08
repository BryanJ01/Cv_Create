"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import StepOne from "@/components/resume-builder/step-one"
import StepTwo from "@/components/resume-builder/step-two"
import StepThree from "@/components/resume-builder/step-three"
import StepFour from "@/components/resume-builder/step-four"
import SidebarNav from "@/components/resume-builder/sidebar-nav"
import ProgressBar from "@/components/resume-builder/progress-bar"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [jobDescription, setJobDescription] = useState("")
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })
  const [experience, setExperience] = useState([
    { company: "", position: "", startDate: "", endDate: "", description: "" },
  ])
  const [education, setEducation] = useState([{ institution: "", degree: "", field: "", graduationDate: "" }])
  const [skills, setSkills] = useState([])
  const [keywordMatches, setKeywordMatches] = useState([])
  const [generatedResume, setGeneratedResume] = useState(null)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const goToStep = (step) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-b dark:border-white/10 dark:bg-black/80">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-full bg-purple-600"></div>
            <span className="text-stone-900 dark:text-white">ResumeAI</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!isDesktop && <ProgressBar currentStep={currentStep} totalSteps={4} />}
          </div>
        </div>
      </header>

      <div className="container flex flex-1 gap-8 py-8">
        {isDesktop && (
          <div className="w-64 shrink-0">
            <SidebarNav currentStep={currentStep} goToStep={goToStep} />
          </div>
        )}

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentStep === 1 && (
                <StepOne
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                  goToNextStep={goToNextStep}
                />
              )}
              {currentStep === 2 && (
                <StepTwo
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                  experience={experience}
                  setExperience={setExperience}
                  education={education}
                  setEducation={setEducation}
                  skills={skills}
                  setSkills={setSkills}
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  jobDescription={jobDescription}
                  skills={skills}
                  keywordMatches={keywordMatches}
                  setKeywordMatches={setKeywordMatches}
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep}
                />
              )}
              {currentStep === 4 && (
                <StepFour
                  personalInfo={personalInfo}
                  experience={experience}
                  education={education}
                  skills={skills}
                  keywordMatches={keywordMatches}
                  generatedResume={generatedResume}
                  setGeneratedResume={setGeneratedResume}
                  goToPreviousStep={goToPreviousStep}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
