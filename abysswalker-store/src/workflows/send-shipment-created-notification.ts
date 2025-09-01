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
        // 
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
                "labels.*"
            ],
            filters: {
                id: shipment_id,
            },
        }).config({ name: "query-fulfillment-with-order" })

        const fulfillment = fulfillments?.[0]
        if (!fulfillment) {
            console.error("No fulfillment found for shipment ID:", shipment_id)
            return new WorkflowResponse(null)
        }        // Try to get order info from the expanded query first
        let orderData = fulfillment.order

        // If order data is not expanded, query separately
        // @ts-ignore
        if (!orderData?.email && fulfillment.order_id) {
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

            orderData = orders?.[0]
        }

        if (!orderData?.email) {
            // @ts-ignore
            console.error("No email found for order:", fulfillment.order_id)
            return new WorkflowResponse(null)
        }

        const notification = sendNotificationStep([{
            to: orderData.email,
            channel: "email",
            template: "shipment-created",
            data: {
                // @ts-ignore
                order_id: orderData.display_id,
                shipment_id: shipment_id,
                tracking_number: fulfillment.labels[0].tracking_number,
                tracking_url: fulfillment.labels[0].tracking_url,
                carrier: fulfillment.provider_id,
                shipped_at: fulfillment.shipped_at,
                customer_email: orderData.email, // For debugging
            },
        }])

        return new WorkflowResponse(notification)
    }
)
