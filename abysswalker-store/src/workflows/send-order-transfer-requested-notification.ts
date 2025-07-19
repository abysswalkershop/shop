import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"
import { ChangeActionType } from "@medusajs/framework/utils"

type WorkflowInput = {
    id: string
    order_change_id: string
}

export const sendOrderTransferRequestedNotificationWorkflow = createWorkflow(
    "send-order-transfer-requested-notification",
    ({ id, order_change_id }: WorkflowInput) => {
        const { data: order } = useQueryGraphStep({
            entity: "order",
            fields: [
                "id",
                "display_id",
                "email",
                "created_at",
            ],
            filters: {
                id,
            },
        })

        if (!order || order.length === 0) {
            console.error(`Order with id ${id} not found`)
            return new WorkflowResponse(null)
        }

        if (!order[0].email) {
            console.error(`Order with id ${id} does not have an email associated`)
            return new WorkflowResponse(null)
        }

        // Query the order_change to get the transfer token

        const { data: orderChange } = useQueryGraphStep({
            entity: "order_change",
            fields: [
                "id",
                "actions.*"
            ],
            filters: {
                id: order_change_id,
            },
        }).config({ name: "order-transfer-order-change-query" })

        if (!orderChange || orderChange.length === 0) {
            console.error(`Order change with id ${order_change_id} not found`)
            return new WorkflowResponse(null)
        }


        const notification = sendNotificationStep([{
            to: order[0].email,
            channel: "email",
            template: "transfer-requested",
            data: {
                order: order[0],
                storeurl: process.env.STORE_URL,
                transferToken: orderChange[0]?.actions?.[0]?.details?.token ?? "",
                id
            },
        }])

        return new WorkflowResponse(notification)
    }
)
