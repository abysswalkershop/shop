import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    id: string
}

export const sendOrderCanceledNotificationWorkflow = createWorkflow(
    "send-order-canceled-notification",
    ({ id }: WorkflowInput) => {
        const { data: orders } = useQueryGraphStep({
            entity: "order",
            fields: [
                "id",
                "display_id",
                "email",
                "currency_code",
                "customer.*",
            ],
            filters: {
                id,
            },
        })
        const notification = sendNotificationStep([{
            to: orders[0].email ?? "",
            channel: "email",
            template: "order-canceled",
            data: {
                order: orders[0],
            },
        }])

        return new WorkflowResponse(notification)
    }
)
