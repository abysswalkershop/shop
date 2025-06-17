import type {
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/framework"
import { sendShipmentCreatedNotificationWorkflow } from "../workflows/send-shipment-created-notification"

export default async function shipmentCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string; no_notification?: boolean }>) {
    // Only send notification if no_notification is not true
    if (!data.no_notification) {
        await sendShipmentCreatedNotificationWorkflow(container)
            .run({
                input: {
                    shipment_id: data.id,
                },
            })
    }
}

export const config: SubscriberConfig = {
    event: "shipment.created",
}
