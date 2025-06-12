import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendUserCreatedNotificationWorkflow } from "../workflows/send-user-created-notification"

export default async function userCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }[]>) {
    // Handle array of user creations
    for (const user of data) {
        await sendUserCreatedNotificationWorkflow(container)
            .run({
                input: {
                    id: user.id,
                },
            })
    }
}

export const config: SubscriberConfig = {
    event: "user.created",
}
