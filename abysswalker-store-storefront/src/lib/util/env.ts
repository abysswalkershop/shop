const trimTrailingSlash = (value: string) => value.replace(/\/$/, "")

const getRequiredEnv = (name: string | string[]) => {
  const envNames = Array.isArray(name) ? name : [name]

  for (const envName of envNames) {
    const value = process.env[envName]?.trim()

    if (value) {
      return value
    }
  }

  throw new Error(
    `Missing required environment variable: ${envNames.join(" or ")}`
  )
}

const normalizeUrl = (value: string, envName: string) => {
  try {
    return trimTrailingSlash(new URL(value).toString())
  } catch {
    throw new Error(
      `Environment variable ${envName} must be a valid absolute URL.`
    )
  }
}

const normalizePathname = (pathname: string) => {
  if (!pathname || pathname === "/") {
    return "/"
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`
}

export const getBaseURL = () => {
  return normalizeUrl(
    getRequiredEnv("NEXT_PUBLIC_BASE_URL"),
    "NEXT_PUBLIC_BASE_URL"
  )
}

export const getAdminURL = () => {
  return normalizeUrl(
    getRequiredEnv(["MEDUSA_ADMIN_URL", "NEXT_PUBLIC_MEDUSA_ADMIN_URL"]),
    "MEDUSA_ADMIN_URL"
  )
}

export const getSiteUrl = (pathname = "/") => {
  return new URL(normalizePathname(pathname), `${getBaseURL()}/`).toString()
}

export const getLocalizedUrl = (countryCode: string, pathname = "") => {
  const localizedPath =
    pathname && pathname !== "/"
      ? `/${countryCode}${normalizePathname(pathname)}`
      : `/${countryCode}`

  return getSiteUrl(localizedPath)
}

export const getAllowed3DModelHosts = () => {
  const configuredHosts = (process.env.ALLOWED_3D_MODEL_HOSTS ?? "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)

  configuredHosts.push(new URL(getBaseURL()).hostname.toLowerCase())

  return new Set(configuredHosts)
}
