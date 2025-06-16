import {
    AbstractNotificationProviderService,
    MedusaError,
} from "@medusajs/framework/utils"
import {
    Logger,
    ProviderSendNotificationDTO,
    ProviderSendNotificationResultsDTO,
} from "@medusajs/framework/types"
import {
    CreateEmailOptions,
    Resend,
} from "resend"
import { orderPlacedEmail } from "./emails/order-placed"
import { orderCanceledEmail } from "./emails/order-canceled"
import { orderFulfillmentCreatedEmail } from "./emails/order-fulfillment-created"
import { orderReturnRequestedEmail } from "./emails/order-return-requested"
import { customerCreatedEmail } from "./emails/customer-created"
import { shipmentCreatedEmail } from "./emails/shipment-created"
import { deliveryCreatedEmail } from "./emails/delivery-created"
import { paymentRefundedEmail } from "./emails/payment-refunded"
import { OrderReturnReceivedEmail } from "./emails/order-return-received"

type ResendOptions = {
    api_key: string
    from: string
    html_templates?: Record<string, {
        subject?: string
        content: string
    }>
}

type InjectedDependencies = {
    logger: Logger
}

enum Templates {
    ORDER_PLACED = "order-placed",
    ORDER_CANCELED = "order-canceled",
    ORDER_FULFILLMENT_CREATED = "order-fulfillment-created",
    ORDER_RETURN_REQUESTED = "order-return-requested",
    ORDER_RETURN_RECEIVED = "order-return-received",
    CUSTOMER_CREATED = "customer-created",
    SHIPMENT_CREATED = "shipment-created",
    DELIVERY_CREATED = "delivery-created",
    PAYMENT_REFUNDED = "payment-refunded",
}



const templates: { [key in Templates]?: (props: unknown) => React.ReactNode } = {
    [Templates.ORDER_PLACED]: orderPlacedEmail,
    [Templates.ORDER_CANCELED]: orderCanceledEmail,
    [Templates.ORDER_FULFILLMENT_CREATED]: orderFulfillmentCreatedEmail,
    [Templates.ORDER_RETURN_REQUESTED]: orderReturnRequestedEmail,
    [Templates.ORDER_RETURN_RECEIVED]: OrderReturnReceivedEmail,
    [Templates.CUSTOMER_CREATED]: customerCreatedEmail,
    [Templates.SHIPMENT_CREATED]: shipmentCreatedEmail,
    [Templates.DELIVERY_CREATED]: deliveryCreatedEmail,
    [Templates.PAYMENT_REFUNDED]: paymentRefundedEmail,
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
    static identifier = "notification-resend"
    private resendClient: Resend
    private options: ResendOptions
    private logger: Logger

    constructor(
        { logger }: InjectedDependencies,
        options: ResendOptions
    ) {
        super()
        this.resendClient = new Resend(options.api_key)
        this.options = options
        this.logger = logger
    }

    static validateOptions(options: Record<any, any>) {
        if (!options.api_key) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "Option `api_key` is required in the provider's options."
            )
        }
        if (!options.from) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "Option `from` is required in the provider's options."
            )
        }
    }

    getTemplate(template: Templates) {
        if (this.options.html_templates?.[template]) {
            return this.options.html_templates[template].content
        }
        const allowedTemplates = Object.keys(templates)

        if (!allowedTemplates.includes(template)) {
            return null
        } return templates[template]
    }

    getTemplateSubject(template: Templates) {
        if (this.options.html_templates?.[template]?.subject) {
            return this.options.html_templates[template].subject
        } switch (template) {
            case Templates.ORDER_PLACED:
                return "Order Confirmation"
            case Templates.ORDER_CANCELED:
                return "Order Canceled"
            case Templates.ORDER_FULFILLMENT_CREATED:
                return "Your Order is about to be Shipped"
            case Templates.ORDER_RETURN_REQUESTED:
                return "Return Request Received"
            case Templates.CUSTOMER_CREATED:
                return "Welcome to Our Store"
            case Templates.SHIPMENT_CREATED:
                return "Your Order Has Been Shipped"
            case Templates.DELIVERY_CREATED:
                return "Your Order Has Been Delivered"
            case Templates.PAYMENT_REFUNDED:
                return "Refund Processed"
            case Templates.ORDER_RETURN_RECEIVED:
                return "Return Received"
            default:
                return "New Email"
        }
    }

    async send(
        notification: ProviderSendNotificationDTO
    ): Promise<ProviderSendNotificationResultsDTO> {
        const template = this.getTemplate(notification.template as Templates)

        if (!template) {
            this.logger.error(`Couldn't find an email template for ${notification.template}. The valid options are ${Object.values(Templates)}`)
            return {}
        }

        const commonOptions = {
            from: this.options.from,
            to: [notification.to],
            subject: this.getTemplateSubject(notification.template as Templates),
        }

        let emailOptions: CreateEmailOptions
        if (typeof template === "string") {
            emailOptions = {
                ...commonOptions,
                html: template,
            }
        } else {
            emailOptions = {
                ...commonOptions,
                react: template(notification.data),
            }
        }

        const { data, error } = await this.resendClient.emails.send(emailOptions)
        // Mock sending email for testing purposes
        /*const data = {
            id: "mock-email-id",
        }
        const error = null
        this.logger.info(`Sending email to ${notification.to} with template ${notification.template}`)*/


        if (error || !data) {
            if (error) {
                this.logger.error("Failed to send email", error)
            } else {
                this.logger.error("Failed to send email: unknown error")
            }
            return {}
        }

        return { id: data.id }
    }

}

export default ResendNotificationProviderService