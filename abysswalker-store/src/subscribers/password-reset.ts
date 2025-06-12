import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendPasswordResetNotificationWorkflow } from "../workflows/send-password-reset-notification"

export default async function passwordResetHandler({
    event: { data },
    container,
}: SubscriberArgs<{ entity_id: string; token: string }>) {
    await sendPasswordResetNotificationWorkflow(container)
        .run({
            input: {
                entity_id: data.entity_id,
                token: data.token,
            },
        })
}

export const config: SubscriberConfig = {
    event: "auth.password_reset",
}
