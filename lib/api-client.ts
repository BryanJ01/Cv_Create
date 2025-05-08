/**
 * Cliente API para comunicarse con el backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

/**
 * Cliente para hacer peticiones al backend
 */
class ApiClient {
  /**
   * Realiza una petición GET
   */
  static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { success: false, error: errorData.detail || "Error en la petición" }
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("Error en la petición:", error)
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }

  /**
   * Realiza una petición POST
   */
  static async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { success: false, error: errorData.detail || "Error en la petición" }
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("Error en la petición:", error)
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }
}

export default ApiClient
