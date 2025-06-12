import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendOrderFulfillmentCreatedNotificationWorkflow } from "../workflows/send-order-fulfillment-created-notification"

export default async function orderFulfillmentCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ order_id: string; no_notification?: boolean }>) {
    // Only send notification if no_notification is not true
    if (!data.no_notification) {
        await sendOrderFulfillmentCreatedNotificationWorkflow(container)
            .run({
                input: {
                    order_id: data.order_id,
                },
            })
    }
}

export const config: SubscriberConfig = {
    event: "order.fulfillment_created",
}
