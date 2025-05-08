import ApiClient from "./api-client"
import type { AnalysisResponse, GenerateCVResponse, KeywordExtractionResponse, ResumeData } from "@/types/api-types"

/**
 * Servicios para comunicarse con el backend
 */
export const ApiService = {
  /**
   * Extrae las palabras clave de una descripción de trabajo
   */
  extractKeywords: async (jobDescription: string): Promise<KeywordExtractionResponse | null> => {
    const response = await ApiClient.post<KeywordExtractionResponse>("/keywords/extract", {
      job_description: jobDescription,
    })

    if (!response.success) {
      console.error("Error extrayendo palabras clave:", response.error)
      return null
    }

    return response.data || null
  },

  /**
   * Analiza la coincidencia entre habilidades del usuario y palabras clave del trabajo
   */
  analyzeMatch: async (jobDescription: string, skills: string[]): Promise<AnalysisResponse | null> => {
    const response = await ApiClient.post<AnalysisResponse>("/keywords/analyze", {
      job_description: jobDescription,
      skills: skills,
    })

    if (!response.success) {
      console.error("Error analizando coincidencias:", response.error)
      return null
    }

    return response.data || null
  },

  /**
   * Genera un CV optimizado
   */
  generateCV: async (resumeData: ResumeData): Promise<GenerateCVResponse | null> => {
    const response = await ApiClient.post<GenerateCVResponse>("/cv-generator/generate", resumeData)

    if (!response.success) {
      console.error("Error generando CV:", response.error)
      return null
    }

    return response.data || null
  },

  /**
   * Descarga un CV en formato PDF
   */
  downloadCV: async (resumeId: string): Promise<Blob | null> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cv-generator/download/${resumeId}`)

      if (!response.ok) {
        throw new Error("Error al descargar el CV")
      }

      return await response.blob()
    } catch (error) {
      console.error("Error descargando CV:", error)
      return null
    }
  },
}
