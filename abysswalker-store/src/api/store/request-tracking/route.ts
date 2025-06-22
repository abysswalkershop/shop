import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const fulfillmentId = req.query.id as string
    if (!fulfillmentId) {
        return res.status(400).json({
            error: "Fulfillment ID is required"
        });
    }

    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

    // @ts-ignore
    const { data: fulfillment } = await query.graph(
        {
            entity: "fulfillment",
            fields: [
                "id",
                "order_id",
                "labels.tracking_number"
            ],
            filters: {
                id: fulfillmentId,
            },
        }

    )

    if (!fulfillment || fulfillment.length === 0) {
        return res.status(404).json({
            error: "Fulfillment not found"
        });
    }

    res.json({
        fulfillment: {
            id: fulfillment[0].id,
            order_id: fulfillment[0].order?.id,
            tracking_number: fulfillment[0].labels[0]?.tracking_number
        }
    })
}