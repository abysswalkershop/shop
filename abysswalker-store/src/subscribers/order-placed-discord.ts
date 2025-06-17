import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendOrderPlacedDiscordNotificationWorkflow } from "../workflows/send-order-placed-discord-notification"

export default async function orderPlacedDiscordHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    await sendOrderPlacedDiscordNotificationWorkflow(container)
        .run({
            input: {
                id: data.id,
            },
        })
}

export const config: SubscriberConfig = {
    event: "order.placed",
}
