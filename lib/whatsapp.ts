import type { OrderDetails } from "./types"

// Replace with your admin WhatsApp number
const ADMIN_WHATSAPP = "+8801617910378"

export function sendOrderToWhatsApp(orderDetails: OrderDetails) {
    const { productName, productId, price, quantity, color, size } = orderDetails

    // Format the message
    const message = `
*New Order*
Product: ${productName}
ID: ${productId}
Price: $${price.toFixed(2)}
Quantity: ${quantity}
Color: ${color}
Size: ${size}
Total: $${(price * quantity).toFixed(2)}
  `.trim()

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message)

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
}

