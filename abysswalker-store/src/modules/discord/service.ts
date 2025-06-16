import {
    AbstractNotificationProviderService,
    MedusaError,
} from "@medusajs/framework/utils"
import {
    Logger,
    ProviderSendNotificationDTO,
    ProviderSendNotificationResultsDTO,
} from "@medusajs/framework/types"
import axios from "axios"

type DiscordOptions = {
    webhook_url: string
}

type InjectedDependencies = {
    logger: Logger
}

enum Templates {
    ORDER_PLACED = "order-placed-discord",
}

class DiscordNotificationProviderService extends AbstractNotificationProviderService {
    static identifier = "notification-discord"
    private options: DiscordOptions
    private logger: Logger

    constructor(
        { logger }: InjectedDependencies,
        options: DiscordOptions
    ) {
        super()
        this.options = options
        this.logger = logger
    }

    static validateOptions(options: Record<any, any>) {
        if (!options.webhook_url) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "Option `webhook_url` is required in the Discord provider's options."
            )
        }
    }

    async send(
        notification: ProviderSendNotificationDTO
    ): Promise<ProviderSendNotificationResultsDTO> {
        try {
            if (notification.template !== Templates.ORDER_PLACED) {
                this.logger.warn(`Template ${notification.template} is not supported by Discord provider`)
                return {}
            }

            const message = {
                content: "🛒 **New Order Placed!**\n\nA new order has been placed in your store.",
                embeds: [
                    {
                        title: "Order Notification",
                        description: "A new order has been successfully placed",
                        color: 0x00ff00, // Green color
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: "Abysswalker Store"
                        }
                    }
                ]
            }

            const response = await axios.post(this.options.webhook_url, message, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            this.logger.info(`Discord notification sent successfully for order placed`)

            return {
                id: `discord_${Date.now()}`
            }
        } catch (error) {
            this.logger.error("Failed to send Discord notification", error)
            return {}
        }
    }
}

export default DiscordNotificationProviderService
