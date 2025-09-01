import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendCustomerCreatedNotificationWorkflow } from "../workflows/send-customer-created-notification"


export default async function customerCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    await sendCustomerCreatedNotificationWorkflow(container)
        .run({
            input: {
                id: data.id,
            },
        })
}

export const config: SubscriberConfig = {
    event: "customer.created",
}
