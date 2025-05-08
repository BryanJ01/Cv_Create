"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { ApiService } from "@/lib/api-services"
import type { KeywordMatch } from "@/types/api-types"

interface StepThreeProps {
  jobDescription: string
  skills: string[]
  keywordMatches: KeywordMatch[]
  setKeywordMatches: (value: KeywordMatch[]) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

export default function StepThree({
  jobDescription,
  skills,
  keywordMatches,
  setKeywordMatches,
  goToNextStep,
  goToPreviousStep,
}: StepThreeProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [matchScore, setMatchScore] = useState(0)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  // Realizar análisis de coincidencias
  useEffect(() => {
    const performAnalysis = async () => {
      if (!jobDescription || skills.length === 0) {
        setIsAnalyzing(false)
        return
      }

      setIsAnalyzing(true)
      setAnalysisError(null)

      try {
        // Primera opción: usar la API
        const response = await ApiService.analyzeMatch(jobDescription, skills)

        if (response) {
          setKeywordMatches(response.matches)
          setMatchScore(response.match_score)
        } else {
          // Fallback si la API falla: simulación
          simulateAnalysis()
        }
      } catch (error) {
        console.error("Error al analizar coincidencias:", error)
        setAnalysisError("No pudimos conectar con nuestro servicio de análisis. Usando análisis básico en su lugar.")
        simulateAnalysis()
      } finally {
        setIsAnalyzing(false)
      }
    }

    performAnalysis()
  }, [jobDescription, skills, setKeywordMatches])

  // Simulación de análisis como fallback
  const simulateAnalysis = () => {
    // Código de simulación (fallback por si falla la API)
    setTimeout(() => {
      const jobDescLower = jobDescription.toLowerCase()
      const extractedKeywords = [
        "javascript",
        "react",
        "frontend",
        "desarrollo web",
        "html",
        "css",
        "responsive",
        "ui/ux",
        "typescript",
        "next.js",
        "tailwind",
      ].filter((keyword) => jobDescLower.includes(keyword))

      const matches = skills.map((skill) => {
        const skillLower = skill.toLowerCase()
        const isMatch = extractedKeywords.some(
          (keyword) => skillLower.includes(keyword) || keyword.includes(skillLower),
        )
        return {
          skill,
          isMatch,
        }
      })

      const matchCount = matches.filter((m) => m.isMatch).length
      const score = Math.round((matchCount / Math.max(skills.length, extractedKeywords.length)) * 100)

      setKeywordMatches([
        ...matches,
        ...extractedKeywords
          .filter((keyword) => !matches.some((m) => m.skill.toLowerCase().includes(keyword)))
          .map((keyword) => ({ skill: keyword, isMatch: false, isSuggestion: true })),
      ])
      setMatchScore(score)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Paso 3: Análisis de coincidencias</h1>
        <p className="mt-2 text-muted-foreground">
          Revisa cómo tus habilidades coinciden con las palabras clave de la oferta
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coincidencia de habilidades</CardTitle>
          <CardDescription>Análisis de tus habilidades en relación con la descripción del trabajo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isAnalyzing ? (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
              <p>Analizando la descripción del trabajo...</p>
            </div>
          ) : (
            <>
              {analysisError && (
                <div className="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">{analysisError}</div>
              )}

              <div className="space-y-2 text-center">
                <h3 className="text-lg font-medium">Puntuación de coincidencia</h3>
                <div className="relative mx-auto h-36 w-36">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{matchScore}%</span>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={matchScore > 70 ? "#10b981" : matchScore > 40 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="10"
                      strokeDasharray={`${matchScore * 2.83} ${283 - matchScore * 2.83}`}
                      strokeDashoffset="70.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  {matchScore > 70
                    ? "¡Excelente coincidencia! Tus habilidades se alinean bien con este trabajo."
                    : matchScore > 40
                      ? "Buena coincidencia. Considera destacar más tus habilidades relevantes."
                      : "Coincidencia baja. Recomendamos añadir más habilidades relevantes."}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tus habilidades</h3>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {keywordMatches
                    .filter((match) => !match.isSuggestion)
                    .map((match, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 rounded-md border p-2 ${
                          match.isMatch ? "border-green-200 bg-green-50" : "border-gray-200"
                        }`}
                      >
                        {match.isMatch && <CheckCircle2 size={16} className="text-green-500" />}
                        <span>{match.skill}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Palabras clave sugeridas</h3>
                <p className="text-sm text-muted-foreground">
                  Considera añadir estas habilidades a tu CV si son relevantes para ti:
                </p>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {keywordMatches
                    .filter((match) => match.isSuggestion)
                    .map((match, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 p-2"
                      >
                        <span>{match.skill}</span>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button onClick={goToPreviousStep} variant="outline" className="gap-2">
            <ArrowLeft size={16} />
            Anterior
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button onClick={goToNextStep} disabled={isAnalyzing} className="gap-2 bg-purple-600 hover:bg-purple-700">
            Continuar
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
