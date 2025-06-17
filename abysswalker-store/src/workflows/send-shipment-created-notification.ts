import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    shipment_id: string
}

export const sendShipmentCreatedNotificationWorkflow = createWorkflow(
    "send-shipment-created-notification",
    ({ shipment_id }: WorkflowInput) => {

        // Query fulfillment with expanded order details
        // @ts-ignore
        const { data: fulfillments } = useQueryGraphStep({
            entity: "fulfillment",
            fields: [
                "id",
                "tracking_numbers",
                "metadata",
                "provider_id",
                "order_id",
                "shipped_at",
                "order.id",
                "order.display_id",
                "order.email",
                "order.customer.*",
            ],
            filters: {
                id: shipment_id,
            },
        }).config({ name: "query-fulfillment-with-order" })

        // @ts-ignore
        const fulfillment = fulfillments?.[0]
        if (!fulfillment) {
            console.error("No fulfillment found for shipment ID:", shipment_id)
            return new WorkflowResponse(null)
        }        // Try to get order info from the expanded query first
        // @ts-ignore
        let orderData = fulfillment.order

        // If order data is not expanded, query separately
        // @ts-ignore
        if (!orderData?.email && fulfillment.order_id) {
            // @ts-ignore
            const { data: orders } = useQueryGraphStep({
                entity: "order",
                fields: [
                    "id",
                    "display_id",
                    "email",
                    "customer.*",
                ],
                filters: {
                    // @ts-ignore
                    id: fulfillment.order_id,
                },
            }).config({ name: "query-order-separate" })

            // @ts-ignore
            orderData = orders?.[0]
        }

        if (!orderData?.email) {
            // @ts-ignore
            console.error("No email found for order:", fulfillment.order_id)
            return new WorkflowResponse(null)
        }

        // @ts-ignore
        const notification = sendNotificationStep([{
            // @ts-ignore
            to: orderData.email,
            channel: "email",
            template: "shipment-created",
            data: {
                // @ts-ignore
                order_id: orderData.display_id,
                shipment_id: shipment_id,
                // @ts-ignore
                tracking_number: fulfillment.lables?.[0].tracking_number,
                // @ts-ignore
                tracking_url: fulfillment.lables?.[0].tracking_url,
                // @ts-ignore
                carrier: fulfillment.provider_id,
                // @ts-ignore
                shipped_at: fulfillment.shipped_at,
                // @ts-ignore
                customer_email: orderData.email, // For debugging
            },
        }])

        return new WorkflowResponse(notification)
    }
)
