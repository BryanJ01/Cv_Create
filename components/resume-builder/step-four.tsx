"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import MinimalTemplate from "./cv-templates/minimal-template"
import ModernTemplate from "./cv-templates/modern-template"
import CreativeTemplate from "./cv-templates/creative-template"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ApiService } from "@/lib/api-services"
import type { ResumeData } from "@/types/api-types"

interface StepFourProps {
  personalInfo: any
  experience: any[]
  education: any[]
  skills: string[]
  keywordMatches: any[]
  generatedResume: any
  setGeneratedResume: (value: any) => void
  goToPreviousStep: () => void
}

export default function StepFour({
  personalInfo,
  experience,
  education,
  skills,
  keywordMatches,
  generatedResume,
  setGeneratedResume,
  goToPreviousStep,
}: StepFourProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState("preview")
  const [resumeVersion, setResumeVersion] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState("minimal")
  const [error, setError] = useState<string | null>(null)
  const [generationComplete, setGenerationComplete] = useState(false)

  // Generar el CV
  useEffect(() => {
    if (!generatedResume || resumeVersion > 1) {
      generateResume()
    }
  }, [resumeVersion, selectedTemplate])

  const generateResume = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const resumeData: ResumeData = {
        personalInfo,
        experience,
        education,
        skills,
        jobDescription: "", // Se llenaría con la descripción del trabajo actual
        template: selectedTemplate,
      }

      // Intentar generar el CV con la API
      const result = await ApiService.generateCV(resumeData)

      if (result) {
        setGeneratedResume(result)
        setGenerationComplete(true)
      } else {
        // Fallback si la API falla
        simulateResumeGeneration()
      }
    } catch (error) {
      console.error("Error generando CV:", error)
      setError("No pudimos conectar con nuestro servicio. Usando generación local en su lugar.")
      simulateResumeGeneration()
    } finally {
      setIsGenerating(false)
    }
  }

  // Simulación como fallback
  const simulateResumeGeneration = () => {
    setTimeout(() => {
      const matchedSkills = keywordMatches.filter((match) => match.isMatch).map((match) => match.skill)
      const suggestedSkills = keywordMatches.filter((match) => match.isSuggestion).map((match) => match.skill)

      const resumeData = {
        personalInfo,
        experience,
        education,
        skills: [...matchedSkills, ...skills.filter((skill) => !matchedSkills.includes(skill))],
        suggestedSkills,
        version: resumeVersion,
        template: selectedTemplate,
        resume_id: `resume-${Date.now()}`, // Generar un ID único
      }

      setGeneratedResume(resumeData)
      setGenerationComplete(true)
      setIsGenerating(false)
    }, 2000)
  }

  const regenerateResume = () => {
    setResumeVersion(resumeVersion + 1)
    setGenerationComplete(false)
  }

  const downloadResume = async () => {
    if (!generatedResume?.resume_id) {
      alert("No se ha generado ningún CV para descargar.")
      return
    }

    setIsDownloading(true)

    try {
      // Intentar descargar con la API
      const pdfBlob = await ApiService.downloadCV(generatedResume.resume_id)

      if (pdfBlob) {
        // Crear URL para el blob y descargarlo
        const url = window.URL.createObjectURL(pdfBlob)
        const a = document.createElement("a")
        a.href = url
        a.download = `CV-${personalInfo.name}-${Date.now()}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        a.remove()
      } else {
        // Fallback si la API falla
        alert("En una aplicación real, esto descargaría el CV en formato PDF.")
      }
    } catch (error) {
      console.error("Error al descargar el CV:", error)
      alert("Hubo un problema al descargar el CV. Por favor, intenta de nuevo más tarde.")
    } finally {
      setIsDownloading(false)
    }
  }

  const generateCoverLetter = () => {
    // En una aplicación real, esto navegaría a un generador de carta de presentación
    alert("En una aplicación real, esto te llevaría a un generador de carta de presentación.")
  }

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template)
    // Regenerar CV con nueva plantilla
    setResumeVersion(resumeVersion + 1)
  }

  // Renderizar la plantilla seleccionada
  const renderSelectedTemplate = () => {
    const props = {
      personalInfo,
      experience,
      education,
      skills: generatedResume?.skills || skills,
      keywordMatches,
    }

    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate {...props} />
      case "creative":
        return <CreativeTemplate {...props} />
      case "minimal":
      default:
        return <MinimalTemplate {...props} />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Paso 4: Tu CV optimizado</h1>
        <p className="mt-2 text-muted-foreground">Revisa y descarga tu CV personalizado para esta oferta de trabajo</p>
      </div>

      {isGenerating ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
            <p className="text-center text-lg font-medium">Generando tu CV optimizado...</p>
            <p className="text-center text-sm text-muted-foreground">
              Estamos personalizando tu CV para destacar las habilidades más relevantes para esta oferta.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {error && <div className="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">{error}</div>}

          {generationComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center justify-center"
            >
              <div className="flex items-center justify-center rounded-full bg-green-100 p-4 text-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Vista previa</TabsTrigger>
              <TabsTrigger value="download">Descargar</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vista previa de tu CV</CardTitle>
                  <CardDescription>
                    Versión {resumeVersion} - Optimizado para destacar tus habilidades relevantes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selector de plantillas */}
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium">Estilo de plantilla</h3>
                    <RadioGroup
                      value={selectedTemplate}
                      onValueChange={handleTemplateChange}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="minimal" id="minimal" className="peer sr-only" />
                        <Label
                          htmlFor="minimal"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 [&:has([data-state=checked])]:border-purple-600"
                        >
                          <div className="mb-2 h-6 w-6 rounded-full bg-purple-600"></div>
                          <span className="text-sm font-medium">Minimalista</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="modern" id="modern" className="peer sr-only" />
                        <Label
                          htmlFor="modern"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 [&:has([data-state=checked])]:border-purple-600"
                        >
                          <div className="mb-2 h-6 w-6 rounded-md bg-purple-600"></div>
                          <span className="text-sm font-medium">Moderno</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="creative" id="creative" className="peer sr-only" />
                        <Label
                          htmlFor="creative"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 [&:has([data-state=checked])]:border-purple-600"
                        >
                          <div className="mb-2 h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-purple-400"></div>
                          <span className="text-sm font-medium">Creativo</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Vista previa del CV */}
                  <div className="overflow-hidden rounded-lg border">{generatedResume && renderSelectedTemplate()}</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="download" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Opciones de descarga</CardTitle>
                  <CardDescription>Descarga tu CV o genera una carta de presentación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col items-center justify-center space-y-4 p-6">
                          <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                            <Download size={24} />
                          </div>
                          <h3 className="text-center text-lg font-medium">Descargar CV</h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Descarga tu CV optimizado en formato PDF
                          </p>
                          <Button
                            onClick={downloadResume}
                            className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                            disabled={isDownloading}
                          >
                            {isDownloading ? "Descargando..." : "Descargar PDF"}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col items-center justify-center space-y-4 p-6">
                          <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                            <FileText size={24} />
                          </div>
                          <h3 className="text-center text-lg font-medium">Carta de presentación</h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Genera una carta de presentación personalizada
                          </p>
                          <Button onClick={generateCoverLetter} variant="outline" className="w-full gap-2">
                            Generar carta
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                            <RefreshCw size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium">¿Quieres una versión diferente?</h3>
                            <p className="text-sm text-muted-foreground">
                              Puedes generar una nueva versión de tu CV con un enfoque diferente
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button
                            onClick={regenerateResume}
                            variant="outline"
                            className="w-full gap-2"
                            disabled={isGenerating}
                          >
                            <RefreshCw size={16} />
                            Regenerar CV
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={goToPreviousStep} variant="outline" className="gap-2">
                <ArrowLeft size={16} />
                Anterior
              </Button>
            </motion.div>
          </div>
        </>
      )}
    </div>
  )
}
