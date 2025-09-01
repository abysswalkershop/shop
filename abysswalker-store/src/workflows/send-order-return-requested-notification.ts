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

export const sendOrderReturnRequestedNotificationWorkflow = createWorkflow(
    "send-order-return-requested-notification",
    ({ order_id, return_id }: WorkflowInput) => {
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
        const notification = sendNotificationStep([{
            to: orders[0].email ?? "",
            channel: "email",
            template: "order-return-requested",
            data: { // @ts-ignore
                order_id: orders[0].display_id,
                customer_name: orders[0].customer?.first_name,
                // You can extend this with return reason when available
                reason: undefined,
            },
        }])

        return new WorkflowResponse(notification)
    }
)
