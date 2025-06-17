import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendDeliveryCreatedNotificationWorkflow } from "../workflows/send-delivery-created-notification"

export default async function deliveryCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    await sendDeliveryCreatedNotificationWorkflow(container)
        .run({
            input: {
                fulfillment_id: data.id,
            },
        })
}

export const config: SubscriberConfig = {
    event: "delivery.created",
}
