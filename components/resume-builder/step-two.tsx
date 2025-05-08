"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { DatePicker } from "@/components/ui/date-picker"
import { PhoneInput } from "@/components/ui/phone-input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StepTwoProps {
  personalInfo: any
  setPersonalInfo: (value: any) => void
  experience: any[]
  setExperience: (value: any[]) => void
  education: any[]
  setEducation: (value: any[]) => void
  skills: string[]
  setSkills: (value: string[]) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

export default function StepTwo({
  personalInfo,
  setPersonalInfo,
  experience,
  setExperience,
  education,
  setEducation,
  skills,
  setSkills,
  goToNextStep,
  goToPreviousStep,
}: StepTwoProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [newSkill, setNewSkill] = useState("")

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  const handlePhoneChange = (value) => {
    setPersonalInfo({
      ...personalInfo,
      phone: value,
    })
  }

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }
    setExperience(updatedExperience)
  }

  const handleExperienceDateChange = (index, field, date) => {
    const updatedExperience = [...experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: date ? date.toISOString() : "",
    }
    setExperience(updatedExperience)
  }

  const addExperience = () => {
    setExperience([...experience, { company: "", position: "", startDate: "", endDate: "", description: "" }])
  }

  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index))
    }
  }

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    setEducation(updatedEducation)
  }

  const handleEducationDateChange = (index, date) => {
    const updatedEducation = [...education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      graduationDate: date ? date.toISOString() : "",
    }
    setEducation(updatedEducation)
  }

  const addEducation = () => {
    setEducation([...education, { institution: "", degree: "", field: "", graduationDate: "" }])
  }

  const removeEducation = (index) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index))
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  // Convertir fechas ISO a objetos Date para los DatePickers
  const getDateFromISO = (isoString) => {
    return isoString ? new Date(isoString) : undefined
  }

  const isNextDisabled =
    !personalInfo.name ||
    !personalInfo.email ||
    experience[0].company === "" ||
    education[0].institution === "" ||
    skills.length === 0

  // Lista de niveles de educación
  const educationLevels = [
    "Bachillerato",
    "Formación Profesional",
    "Grado Universitario",
    "Máster",
    "Doctorado",
    "Certificación",
    "Curso",
    "Otro",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Paso 2: Información personal y profesional</h1>
        <p className="mt-2 text-muted-foreground">
          Introduce tu información personal, experiencia, educación y habilidades
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experiencia</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
              <CardDescription>Introduce tus datos de contacto y ubicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    placeholder="juan.perez@ejemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <PhoneInput value={personalInfo.phone} onChange={handlePhoneChange} placeholder="600 000 000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    name="location"
                    value={personalInfo.location}
                    onChange={handlePersonalInfoChange}
                    placeholder="Madrid, España"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Experiencia laboral</CardTitle>
              <CardDescription>Añade tu experiencia profesional más relevante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Experiencia {index + 1}</h3>
                    {experience.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
                        className="h-8 w-8 p-0 text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${index}`}>Empresa *</Label>
                      <Input
                        id={`company-${index}`}
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                        placeholder="Nombre de la empresa"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`position-${index}`}>Puesto *</Label>
                      <Input
                        id={`position-${index}`}
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                        placeholder="Desarrollador Frontend"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Fecha de inicio</Label>
                      <DatePicker
                        date={getDateFromISO(exp.startDate)}
                        setDate={(date) => handleExperienceDateChange(index, "startDate", date)}
                        placeholder="Seleccionar fecha de inicio"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>Fecha de fin</Label>
                      <DatePicker
                        date={getDateFromISO(exp.endDate)}
                        setDate={(date) => handleExperienceDateChange(index, "endDate", date)}
                        placeholder="Seleccionar fecha de fin"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`description-${index}`}>Descripción</Label>
                      <Textarea
                        id={`description-${index}`}
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        placeholder="Describe tus responsabilidades y logros"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addExperience} className="w-full gap-2">
                <Plus size={16} />
                Añadir experiencia
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Educación</CardTitle>
              <CardDescription>Añade tu formación académica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Educación {index + 1}</h3>
                    {education.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(index)}
                        className="h-8 w-8 p-0 text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`}>Institución *</Label>
                      <Input
                        id={`institution-${index}`}
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                        placeholder="Universidad Complutense de Madrid"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Título</Label>
                      <Select
                        value={edu.degree}
                        onValueChange={(value) => handleEducationChange(index, "degree", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field-${index}`}>Campo de estudio</Label>
                      <Input
                        id={`field-${index}`}
                        value={edu.field}
                        onChange={(e) => handleEducationChange(index, "field", e.target.value)}
                        placeholder="Ingeniería Informática"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`graduationDate-${index}`}>Fecha de graduación</Label>
                      <DatePicker
                        date={getDateFromISO(edu.graduationDate)}
                        setDate={(date) => handleEducationDateChange(index, date)}
                        placeholder="Seleccionar fecha"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addEducation} className="w-full gap-2">
                <Plus size={16} />
                Añadir educación
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
              <CardDescription>Añade tus habilidades técnicas y profesionales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Añade una habilidad (ej. JavaScript, Gestión de proyectos)"
                />
                <Button onClick={addSkill} className="shrink-0 bg-purple-600 hover:bg-purple-700">
                  Añadir
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 rounded-full p-0.5 text-purple-800 hover:bg-purple-200"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {skills.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No has añadido ninguna habilidad todavía. Añade al menos una habilidad para continuar.
                </p>
              )}
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

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button onClick={goToNextStep} disabled={isNextDisabled} className="gap-2 bg-purple-600 hover:bg-purple-700">
            Continuar
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>

      {isNextDisabled && (
        <p className="text-sm text-amber-600">
          Por favor, completa todos los campos obligatorios (*) y añade al menos una habilidad para continuar.
        </p>
      )}
    </div>
  )
}
