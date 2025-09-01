import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    id: string
}

export const sendOrderPlacedDiscordNotificationWorkflow = createWorkflow(
    "send-order-placed-discord-notification",
    ({ id }: WorkflowInput) => {
        const { data: orders } = useQueryGraphStep({
            entity: "order",
            fields: [
                "id",
                "display_id",
                "total",
                "currency_code",
            ],
            filters: {
                id,
            },
        })

        const notification = sendNotificationStep([{
            to: "discord", // This is a placeholder since Discord webhooks don't need a specific recipient
            channel: "discord",
            template: "order-placed-discord",
            data: {
                order: orders[0],
            },
        }])

        return new WorkflowResponse(notification)
    }
)
