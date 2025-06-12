import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendCustomerCreatedNotificationWorkflow } from "../workflows/send-customer-created-notification"


export default async function customerCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }[]>) {
    // Handle array of customer creations
    for (const customer of data) {
        await sendCustomerCreatedNotificationWorkflow(container)
            .run({
                input: {
                    id: customer.id,
                },
            })
    }
}

export const config: SubscriberConfig = {
    event: "customer.created",
}
