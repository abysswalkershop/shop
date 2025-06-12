import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    id: string
}

export const sendUserCreatedNotificationWorkflow = createWorkflow(
    "send-user-created-notification",
    ({ id }: WorkflowInput) => {
        // @ts-ignore
        const { data: users } = useQueryGraphStep({
            entity: "user",
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
            to: users[0].email,
            channel: "email",
            template: "user-created",
            data: {
                user: users[0],
                // You can add admin_url from your environment config
                admin_url: process.env.ADMIN_URL,
            },
        }])

        return new WorkflowResponse(notification)
    }
)
