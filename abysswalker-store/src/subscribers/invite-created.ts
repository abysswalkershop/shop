import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendInviteCreatedNotificationWorkflow } from "../workflows/send-invite-created-notification"

export default async function inviteCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }[]>) {
    // Handle array of invite creations
    for (const invite of data) {
        await sendInviteCreatedNotificationWorkflow(container)
            .run({
                input: {
                    id: invite.id,
                },
            })
    }
}

export const config: SubscriberConfig = {
    event: "invite.created",
}
