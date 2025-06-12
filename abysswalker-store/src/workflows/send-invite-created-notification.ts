import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    id: string
}

export const sendInviteCreatedNotificationWorkflow = createWorkflow(
    "send-invite-created-notification",
    ({ id }: WorkflowInput) => {
        // @ts-ignore
        const { data: invites } = useQueryGraphStep({
            entity: "invite",
            fields: [
                "id",
                "email",
                "token",
            ],
            filters: {
                id,
            },
        })        // @ts-ignore
        const notification = sendNotificationStep([{
            // @ts-ignore
            to: invites[0].email,
            channel: "email",
            template: "invite-created",
            data: {
                invite: invites[0],
                // You can add inviter information and accept_url from your environment config
                inviter_name: undefined,
                accept_url: process.env.ADMIN_URL ? `${process.env.ADMIN_URL}/accept-invite` : undefined,
            },
        }])

        return new WorkflowResponse(notification)
    }
)
