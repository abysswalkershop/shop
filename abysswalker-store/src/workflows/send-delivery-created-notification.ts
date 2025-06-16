import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
    fulfillment_id: string
}

export const sendDeliveryCreatedNotificationWorkflow = createWorkflow(
    "send-delivery-created-notification",
    ({ fulfillment_id }: WorkflowInput) => {
        console.log("Fulfillment ID received:", fulfillment_id)

        // Query fulfillment with expanded order details
        // @ts-ignore
        const { data: fulfillments } = useQueryGraphStep({
            entity: "fulfillment",
            fields: [
                "id",
                "delivered_at",
                "metadata",
                "order_id",
                "order.id",
                "order.display_id",
                "order.email",
                "order.customer.*",
            ],
            filters: {
                id: fulfillment_id,
            },
        }).config({ name: "query-fulfillment-with-order" })

        console.log("Fulfillment data:", fulfillments)

        // @ts-ignore
        const fulfillment = fulfillments?.[0]
        if (!fulfillment) {
            console.error("No fulfillment found for ID:", fulfillment_id)
            return new WorkflowResponse(null)
        }

        // Try to get order info from the expanded query first
        // @ts-ignore
        let orderData = fulfillment.order

        // If order data is not expanded, query separately
        // @ts-ignore
        if (!orderData?.email && fulfillment.order_id) {
            console.log("Order not expanded, querying separately...")
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

        console.log("Final order data:", orderData)

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
            template: "delivery-created",
            data: {
                // @ts-ignore
                order_id: orderData.display_id,
                fulfillment_id: fulfillment_id,
                // @ts-ignore
                delivery_date: fulfillment.delivered_at,
                // @ts-ignore
                delivery_time: fulfillment.delivered_at,
                // @ts-ignore
                customer_email: orderData.email, // For debugging
            },
        }])

        return new WorkflowResponse(notification)
    }
)
