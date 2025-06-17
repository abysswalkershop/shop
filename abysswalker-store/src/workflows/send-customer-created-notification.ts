import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    id: string
}

export const sendCustomerCreatedNotificationWorkflow = createWorkflow(
    "send-customer-created-notification",
    ({ id }: WorkflowInput) => {
        // @ts-ignore
        const { data: customers } = useQueryGraphStep({
            entity: "customer",
            fields: [
                "id",
                "email",
                "first_name",
                "last_name",
            ],
            filters: {
                id,
            },
        })        // @ts-ignore
        const notification = sendNotificationStep([{
            // @ts-ignore
            to: customers[0].email,
            channel: "email",
            template: "customer-created",
            data: {
                customer: customers[0],
                // You can add store_url from your environment config
                store_url: process.env.STORE_URL,
            },
        }])

        return new WorkflowResponse(notification)
    }
)
