import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendOrderCompletedNotificationWorkflow } from "../workflows/send-order-completed-notification"

export default async function orderCompletedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }[]>) {
    // Handle array of order completions
    for (const order of data) {
        await sendOrderCompletedNotificationWorkflow(container)
            .run({
                input: {
                    id: order.id,
                },
            })
    }
}

export const config: SubscriberConfig = {
    event: "order.completed",
}
