import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    order_id: string
}

export const sendOrderFulfillmentCreatedNotificationWorkflow = createWorkflow(
    "send-order-fulfillment-created-notification",
    ({ order_id }: WorkflowInput) => {
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
        })        // @ts-ignore
        const notification = sendNotificationStep([{
            // @ts-ignore
            to: orders[0].email,
            channel: "email",
            template: "order-fulfillment-created",
            data: {
                order_id: orders[0].display_id,
                // You can extend this with tracking information when available
                tracking_number: undefined,
                tracking_url: undefined,
                fulfillment_provider: undefined,
            },
        }])

        return new WorkflowResponse(notification)
    }
)
