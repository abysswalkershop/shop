import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    payment_id: string
}

export const sendPaymentRefundedNotificationWorkflow = createWorkflow(
    "send-payment-refunded-notification",
    ({ payment_id }: WorkflowInput) => {
        const { data: payments } = useQueryGraphStep({
            entity: "payment",
            fields: [
                "id",
                "amount",
                "currency_code",
                "payment_collection.*",
            ],
            filters: {
                id: payment_id,
            },
        })

        const notification = sendNotificationStep([{ // @ts-ignore
            to: payments[0]?.payment_collection?.metadata?.customer_email || "",
            channel: "email",
            template: "payment-refunded",
            data: {
                order_id: undefined,
                refund_amount: payments[0]?.amount || 0,
                currency: payments[0]?.currency_code || "USD",
                reason: "Refund processed",
                refund_method: "Original payment method",
            },
        }])

        return new WorkflowResponse(notification)
    }
)