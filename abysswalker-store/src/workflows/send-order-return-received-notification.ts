import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    order_id: string
    return_id: string
}

export const sendOrderReturnReceivedNotificationWorkflow = createWorkflow(
    "send-order-return-received-notification",
    ({ order_id, return_id }: WorkflowInput) => {
        // @ts-ignore
        const { data: orders } = useQueryGraphStep({
            entity: "order",
            fields: [
                "id",
                "display_id",
                "email",
                "customer.*",
            ],
            filters: {
                id: order_id,
            },
        })

        // @ts-ignore
        const { data: returns } = useQueryGraphStep({
            entity: "return",
            fields: [
                "id",
                "status",
                "metadata",
                "received_at",
            ],
            filters: {
                id: return_id,
            },
        }).config({ name: "query-return-for-received" })

        // @ts-ignore
        const notification = sendNotificationStep([{
            // @ts-ignore
            to: orders[0].email,
            channel: "email",
            template: "order-return-received",
            data: {
                // @ts-ignore
                order_id: orders[0].display_id,
                // @ts-ignore
                received_at: returns[0]?.received_at,
                // @ts-ignore
                customer_name: orders[0].customer?.first_name || "Customer",
            },
        }])

        return new WorkflowResponse(notification)
    }
)
