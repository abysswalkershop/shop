import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendOrderReturnRequestedNotificationWorkflow } from "../workflows/send-order-return-requested-notification"

export default async function orderReturnRequestedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ order_id: string; return_id: string }>) {
    await sendOrderReturnRequestedNotificationWorkflow(container)
        .run({
            input: {
                order_id: data.order_id,
                return_id: data.return_id,
            },
        })
}

export const config: SubscriberConfig = {
    event: "order.return_requested",
}
