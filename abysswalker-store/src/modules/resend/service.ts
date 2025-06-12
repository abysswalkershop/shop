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
import { orderCompletedEmail } from "./emails/order-completed"
import { orderFulfillmentCreatedEmail } from "./emails/order-fulfillment-created"
import { orderReturnRequestedEmail } from "./emails/order-return-requested"
import { customerCreatedEmail } from "./emails/customer-created"
import { userCreatedEmail } from "./emails/user-created"
import { inviteCreatedEmail } from "./emails/invite-created"
import { passwordResetEmail } from "./emails/password-reset"

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
    ORDER_COMPLETED = "order-completed",
    ORDER_FULFILLMENT_CREATED = "order-fulfillment-created",
    ORDER_RETURN_REQUESTED = "order-return-requested",
    CUSTOMER_CREATED = "customer-created",
    USER_CREATED = "user-created",
    INVITE_CREATED = "invite-created",
    PASSWORD_RESET = "password-reset",
}



const templates: { [key in Templates]?: (props: unknown) => React.ReactNode } = {
    [Templates.ORDER_PLACED]: orderPlacedEmail,
    [Templates.ORDER_CANCELED]: orderCanceledEmail,
    [Templates.ORDER_COMPLETED]: orderCompletedEmail,
    [Templates.ORDER_FULFILLMENT_CREATED]: orderFulfillmentCreatedEmail,
    [Templates.ORDER_RETURN_REQUESTED]: orderReturnRequestedEmail,
    [Templates.CUSTOMER_CREATED]: customerCreatedEmail,
    [Templates.USER_CREATED]: userCreatedEmail,
    [Templates.INVITE_CREATED]: inviteCreatedEmail,
    [Templates.PASSWORD_RESET]: passwordResetEmail,
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
        }
        switch (template) {
            case Templates.ORDER_PLACED:
                return "Order Confirmation"
            case Templates.ORDER_CANCELED:
                return "Order Canceled"
            case Templates.ORDER_COMPLETED:
                return "Order Completed"
            case Templates.ORDER_FULFILLMENT_CREATED:
                return "Your Order is Shipping"
            case Templates.ORDER_RETURN_REQUESTED:
                return "Return Request Received"
            case Templates.CUSTOMER_CREATED:
                return "Welcome to Our Store"
            case Templates.USER_CREATED:
                return "Admin Access Granted"
            case Templates.INVITE_CREATED:
                return "You're Invited to Join Our Team"
            case Templates.PASSWORD_RESET:
                return "Reset Your Password"
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