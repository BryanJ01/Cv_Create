"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ArrowRight, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { ApiService } from "@/lib/api-services"

interface StepOneProps {
  jobDescription: string
  setJobDescription: (value: string) => void
  goToNextStep: () => void
}

export default function StepOne({ jobDescription, setJobDescription, goToNextStep }: StepOneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([])

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type === "text/plain") {
      const reader = new FileReader()
      reader.onload = (event) => {
        setJobDescription(event.target.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setJobDescription(event.target.result as string)
      }
      reader.readAsText(file)
    }
  }

  // Analizar la descripción del trabajo cuando cambia
  useEffect(() => {
    const analyzeJobDescription = async () => {
      if (jobDescription.trim().length >= 50) {
        setIsAnalyzing(true)
        try {
          const result = await ApiService.extractKeywords(jobDescription)
          if (result) {
            setExtractedKeywords(result.keywords)
          }
        } catch (error) {
          console.error("Error al extraer palabras clave:", error)
        } finally {
          setIsAnalyzing(false)
        }
      } else {
        setExtractedKeywords([])
      }
    }

    // Debounce para evitar llamadas excesivas a la API
    const timeoutId = setTimeout(() => {
      analyzeJobDescription()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [jobDescription])

  const isNextDisabled = jobDescription.trim().length < 50

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Paso 1: Descripción del trabajo</h1>
        <p className="mt-2 text-muted-foreground">
          Ingresa o carga la descripción del trabajo para analizar las palabras clave
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Descripción del puesto</CardTitle>
          <CardDescription>
            Copia y pega la descripción completa del trabajo o carga un archivo de texto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`relative rounded-md border-2 border-dashed p-6 transition-colors ${
              isDragging ? "border-purple-500 bg-purple-50" : "border-muted-foreground/20"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <FileText size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Arrastra y suelta un archivo de texto aquí</p>
                <p className="text-xs text-muted-foreground">o</p>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="inline-flex items-center gap-1 rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700">
                    <Upload size={14} />
                    Seleccionar archivo
                  </span>
                  <input id="file-upload" type="file" accept=".txt" className="sr-only" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          </div>

          <Textarea
            placeholder="Pega aquí la descripción del trabajo..."
            className="min-h-[200px] resize-none"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          {/* Análisis en tiempo real */}
          {jobDescription.trim().length >= 50 && (
            <div className="rounded-lg border bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium">Análisis en tiempo real</h3>
                {isAnalyzing && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                )}
              </div>

              {isAnalyzing ? (
                <div className="flex justify-center py-8">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
                </div>
              ) : extractedKeywords.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3">
                  {extractedKeywords.slice(0, 9).map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-md bg-purple-100 px-2 py-1 text-sm text-purple-700"
                    >
                      <span className="mr-1 h-2 w-2 rounded-full bg-purple-500"></span>
                      {keyword}
                    </div>
                  ))}
                  {extractedKeywords.length > 9 && (
                    <div className="flex items-center rounded-md bg-purple-50 px-2 py-1 text-sm text-purple-700">
                      +{extractedKeywords.length - 9} más
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Se analizará la descripción para extraer las palabras clave relevantes.
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={goToNextStep}
                disabled={isNextDisabled}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Continuar
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {isNextDisabled && (
        <p className="text-sm text-amber-600">
          Por favor, ingresa una descripción del trabajo más detallada para continuar (mínimo 50 caracteres).
        </p>
      )}
    </div>
  )
}
