type MedusaErrorLike = {
  response?: {
    data?: { message?: string } | string
    status?: number
    headers?: unknown
  }
  request?: unknown
  config?: {
    url?: string
    baseURL?: string
  }
  message?: string
}

export default function medusaError(error: unknown): never {
  const medusaError = error as MedusaErrorLike

  if (medusaError.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const u = new URL(medusaError.config?.url ?? "", medusaError.config?.baseURL)
    console.error("Resource:", u.toString())
    console.error("Response data:", medusaError.response.data)
    console.error("Status code:", medusaError.response.status)
    console.error("Headers:", medusaError.response.headers)

    // Extracting the error message from the response data
    const rawMessage = medusaError.response.data
    const message =
      typeof rawMessage === "string"
        ? rawMessage
        : rawMessage?.message || "Unknown error"

    throw new Error(message.charAt(0).toUpperCase() + message.slice(1) + ".")
  } else if (medusaError.request) {
    // The request was made but no response was received
    throw new Error("No response received: " + medusaError.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error(
      "Error setting up the request: " + (medusaError.message ?? "Unknown error")
    )
  }
}
