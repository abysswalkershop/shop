import {
    ModuleProvider,
    Modules,
} from "@medusajs/framework/utils"
import DiscordNotificationProviderService from "./service"

export default ModuleProvider(Modules.NOTIFICATION, {
    services: [DiscordNotificationProviderService],
})
