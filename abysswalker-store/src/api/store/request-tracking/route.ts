import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const orderId = req.query.id as string
    if (!orderId) {
        return res.status(400).json({
            error: "Order ID is required"
        });
    }

    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

    const { data: order } = await query.graph(
        {
            entity: "order",
            fields: [
                "id",
                "fulfillments.labels.tracking_number"
            ],
            filters: {
                id: orderId
            }
        }
    )

    if (!order || order.length === 0) {
        return res.status(404).json({
            error: "Order not found"
        });
    }

    if (!order[0].fulfillments) {
        return res.status(404).json({
            error: "Fulfillment not found"
        });
    }

    res.json({
        order_id: order[0].id,
        tracking_number: order[0].fulfillments[0]?.labels[0]?.tracking_number
    })
}