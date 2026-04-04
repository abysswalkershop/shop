import c from "ansi-colors"

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
  {
    key: "MEDUSA_BACKEND_URL",
    description:
      "Set this to the Medusa backend origin used by the storefront server.",
  },
  {
    key: "NEXT_PUBLIC_BASE_URL",
    description:
      "Set this to the public storefront origin, for example https://store.example.com.",
  },
  {
    key: "NEXT_PUBLIC_STRIPE_KEY",
    description:
      "Set this to your Stripe publishable key so checkout can initialize payment elements.",
  },
]

export default function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env.key])

  if (missingEnvs.length > 0) {
    console.error(
      c.red.bold("\n🚫 Error: Missing required environment variables\n")
    )

    missingEnvs.forEach((env) => {
      console.error(c.yellow(`  ${c.bold(env.key)}`))
      if (env.description) {
        console.error(c.dim(`    ${env.description}\n`))
      }
    })

    console.error(
      c.yellow(
        "\nPlease set these variables in your .env file or environment before starting the application.\n"
      )
    )

    process.exit(1)
  }
}