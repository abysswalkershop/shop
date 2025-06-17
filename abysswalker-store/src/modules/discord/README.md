# Discord Notification Module

This module provides Discord webhook notifications for order events in your Medusa store.

## Setup

1. Create a Discord webhook in your Discord server:
   - Go to your Discord server settings
   - Navigate to Integrations > Webhooks
   - Click "New Webhook"
   - Copy the webhook URL

2. Add the webhook URL to your environment variables:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
   ```

3. The module is already configured in `medusa-config.ts` and will automatically send Discord notifications when orders are placed.

## Features

- Sends a notification to Discord when a new order is placed
- Simple message format with order confirmation
- Green embed with timestamp and store branding

## Customization

You can customize the Discord message format by editing the `send` method in `src/modules/discord/service.ts`.

## Files Created

- `src/modules/discord/index.ts` - Module entry point
- `src/modules/discord/service.ts` - Discord notification service
- `src/workflows/send-order-placed-discord-notification.ts` - Workflow for Discord notifications
- `src/subscribers/order-placed-discord.ts` - Event subscriber for order placed events
