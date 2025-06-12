"use client"
import { placeOrder } from "@lib/data/cart"
import InteractiveLink from "@modules/common/components/interactive-link"
import Spinner from "@modules/common/icons/spinner"
import { useStripe } from "@stripe/react-stripe-js"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CallbackPageClient({ regioncode }: { regioncode: string }) {
    const searchParams = useSearchParams()
    const stripe = useStripe()
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onPaymentCompleted = async () => {
        await placeOrder()
            .catch((err) => {
                if (err?.message === 'NEXT_REDIRECT' || err?.digest?.startsWith?.('NEXT_REDIRECT')) {
                    // This is a redirect, not an actual error - let it proceed
                    return
                }
                setErrorMessage(err.message)
            })
    }

    useEffect(() => {
        const paymentIntent = searchParams.get("payment_intent")
        const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret")

        if (paymentIntent && paymentIntentClientSecret) {
            if (!stripe) {
                return
            }

            // Verify the payment intent
            stripe
                .retrievePaymentIntent(paymentIntentClientSecret)
                .then(({ paymentIntent }) => {
                    if (paymentIntent) {
                        if (
                            paymentIntent.status === "succeeded" ||
                            paymentIntent.status === "requires_capture"
                        ) {
                            onPaymentCompleted()
                        } else if (paymentIntent.status === "requires_action") {
                            console.warn("Additional action required for payment intent.")
                        } else {
                            setErrorMessage("Payment intent status is not successful.")
                        }
                    }
                })
                .catch((err) => {
                    setErrorMessage(err.message || "An error occurred while retrieving the payment intent.")
                })
        }
    }, [searchParams, stripe])

    // Auto-redirect
    useEffect(() => {
        if (errorMessage) {
            router.push(`/${regioncode}/checkout?step=payment&error=${encodeURIComponent(errorMessage)}`)
        }
    }, [errorMessage, router])

    return (
        <div className="flex flex-col items-center justify-center p-8 mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                {!errorMessage ? (
                    <>
                        <Spinner className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h2>
                        <p className="text-gray-600">Please wait while we process your payment...</p>
                    </>) : (
                    <>
                        <div className="text-red-500 text-4xl mb-4">❌</div>
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-4">{errorMessage}</p>
                        <InteractiveLink className="inline-flex mt-5" href={`/${regioncode}/checkout?step=payment&error=${encodeURIComponent(errorMessage)}`}>
                            Go to Checkout Now
                        </InteractiveLink>
                    </>
                )}
            </div>
        </div>
    );
}