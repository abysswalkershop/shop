import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendOrderReturnReceivedNotificationWorkflow } from "../workflows/send-order-return-received-notification"

export default async function orderReturnReceivedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ order_id: string; return_id: string }>) {
    await sendOrderReturnReceivedNotificationWorkflow(container)
        .run({
            input: {
                order_id: data.order_id,
                return_id: data.return_id,
            },
        })
}

export const config: SubscriberConfig = {
    event: "order.return_received",
}
