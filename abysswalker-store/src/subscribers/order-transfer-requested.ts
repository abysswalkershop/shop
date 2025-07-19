import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendOrderTransferRequestedNotificationWorkflow } from "../workflows/send-order-transfer-requested-notification"


export default async function orderTransferRequestedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string, order_change_id: string }>) {
    await sendOrderTransferRequestedNotificationWorkflow(container)
        .run({
            input: {
                id: data.id,
                order_change_id: data.order_change_id,
            },
        })
}

export const config: SubscriberConfig = {
    event: "order.transfer_requested",
}
