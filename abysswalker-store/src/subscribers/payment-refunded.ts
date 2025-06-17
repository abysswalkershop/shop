import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendPaymentRefundedNotificationWorkflow } from "../workflows/send-payment-refunded-notification"

export default async function paymentRefundedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    await sendPaymentRefundedNotificationWorkflow(container)
        .run({
            input: {
                payment_id: data.id,
            },
        })
}

export const config: SubscriberConfig = {
    event: "payment.refunded",
}
