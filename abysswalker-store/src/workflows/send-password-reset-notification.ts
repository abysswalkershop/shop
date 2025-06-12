import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    entity_id: string
    token: string
}

export const sendPasswordResetNotificationWorkflow = createWorkflow(
    "send-password-reset-notification",
    ({ entity_id, token }: WorkflowInput) => {
        // Determine if this is a customer or admin based on email format or other logic
        const isCustomer = true // You might want to implement logic to determine this
        // @ts-ignore
        const notification = sendNotificationStep([{
            to: entity_id, // entity_id is typically the email address
            channel: "email",
            template: "password-reset",
            data: {
                entity_id,
                token,
                is_customer: isCustomer,
                // You can add reset_url from your environment config
                reset_url: isCustomer
                    ? process.env.STORE_URL ? `${process.env.STORE_URL}/reset-password` : undefined
                    : process.env.ADMIN_URL ? `${process.env.ADMIN_URL}/reset-password` : undefined,
            },
        }])

        return new WorkflowResponse(notification)
    }
)
