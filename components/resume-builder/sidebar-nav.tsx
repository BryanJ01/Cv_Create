"use client"

import { motion } from "framer-motion"
import { CheckCircle, Circle } from "lucide-react"

interface SidebarNavProps {
  currentStep: number
  goToStep: (step: number) => void
}

export default function SidebarNav({ currentStep, goToStep }: SidebarNavProps) {
  const steps = [
    { id: 1, title: "Descripción del trabajo" },
    { id: 2, title: "Información personal" },
    { id: 3, title: "Análisis de coincidencias" },
    { id: 4, title: "Generación del CV" },
  ]

  return (
    <div className="sticky top-24 space-y-1">
      <h2 className="mb-4 font-semibold">Progreso</h2>
      {steps.map((step) => {
        const isActive = currentStep === step.id
        const isCompleted = currentStep > step.id

        return (
          <motion.button
            key={step.id}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm ${
              isActive
                ? "bg-purple-100 text-purple-900"
                : isCompleted
                  ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                  : "text-muted-foreground"
            }`}
            onClick={() => isCompleted && goToStep(step.id)}
            whileHover={isCompleted ? { x: 4 } : {}}
            disabled={!isCompleted && !isActive}
          >
            <span className="flex h-5 w-5 items-center justify-center">
              {isCompleted ? (
                <CheckCircle size={18} className="text-purple-600" />
              ) : (
                <Circle
                  size={18}
                  className={isActive ? "text-purple-600" : "text-muted-foreground"}
                  fill={isActive ? "#e9d5ff" : "transparent"}
                />
              )}
            </span>
            <span>{step.title}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
