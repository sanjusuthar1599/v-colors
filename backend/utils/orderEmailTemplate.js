import { getApiPublicUrl, getClientUrl } from './appUrls.js'

function absoluteMediaUrl(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  const base = getApiPublicUrl()
  return `${base}${url.startsWith('/') ? url : `/${url}`}`
}

function formatCurrency(amount) {
  return `INR ${Number(amount || 0).toLocaleString('en-IN')}`
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function buildOrderConfirmationEmail(order) {
  const customerName = escapeHtml(order.shippingAddress?.fullName || 'Customer')
  const orderNumber = escapeHtml(order.orderNumber)
  const paymentLabel = order.paymentMethod === 'stripe' ? 'Online Payment' : 'Cash On Delivery'
  const paymentStatus = escapeHtml(order.paymentStatus || 'pending')
  const trackUrl = `${getClientUrl()}/track-order`

  const itemRows = (order.items || []).map((item) => {
    const productId = escapeHtml(item.product || '—')
    const imageUrl = absoluteMediaUrl(item.image)
    const name = escapeHtml(item.name)
    const category = escapeHtml(item.categoryName || 'Fabric')
    const qty = Number(item.quantity || 1)
    const lineTotal = formatCurrency(item.price * qty)

    return `
      <tr>
        <td style="padding:16px 12px;border-bottom:1px solid #eef2f7;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align:top;">
                <img src="${imageUrl}" alt="${name}" width="72" height="72" style="display:block;border-radius:14px;object-fit:cover;background:#f1f5f9;" />
              </td>
              <td style="vertical-align:top;padding-left:14px;">
                <p style="margin:0;font-size:15px;font-weight:700;color:#082247;">${name}</p>
                <p style="margin:6px 0 0;font-size:12px;color:#64748b;">${category}</p>
                <p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">Product ID: <span style="color:#475569;font-weight:600;">${productId}</span></p>
                <p style="margin:6px 0 0;font-size:12px;color:#475569;">Qty ${qty}</p>
              </td>
            </tr>
          </table>
        </td>
        <td align="right" style="padding:16px 12px;border-bottom:1px solid #eef2f7;font-size:15px;font-weight:700;color:#082247;vertical-align:top;">${lineTotal}</td>
      </tr>
    `
  }).join('')

  const address = order.shippingAddress || {}

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order ${orderNumber} Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Inter,Arial,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7fb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 24px 60px rgba(8,34,71,0.12);">
          <tr>
            <td style="padding:32px 32px 24px;background:linear-gradient(135deg,#082247 0%,#159fe8 55%,#ed1e8f 100%);">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:rgba(255,255,255,0.78);">V.Colors</p>
              <h1 style="margin:10px 0 0;font-size:30px;line-height:1.2;color:#ffffff;font-weight:800;">Order Confirmed</h1>
              <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.9);">Hi ${customerName}, your fabric order is placed successfully. Expected delivery within 3-5 working days.</p>
              <div style="margin-top:22px;padding:14px 18px;border-radius:18px;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.18);">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.72);">Order Number</p>
                <p style="margin:6px 0 0;font-size:24px;font-weight:800;color:#ffffff;">${orderNumber}</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:10px;font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">Your Items</td>
                  <td align="right" style="padding-bottom:10px;font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">Amount</td>
                </tr>
                ${itemRows}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border-radius:22px;padding:18px;">
                <tr>
                  <td style="padding:8px 18px;font-size:14px;color:#64748b;">Subtotal</td>
                  <td align="right" style="padding:8px 18px;font-size:14px;font-weight:700;color:#082247;">${formatCurrency(order.subtotal)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 18px;font-size:14px;color:#64748b;">Shipping</td>
                  <td align="right" style="padding:8px 18px;font-size:14px;font-weight:700;color:#082247;">${order.shippingCharge ? formatCurrency(order.shippingCharge) : 'Free'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 18px 8px;font-size:16px;font-weight:800;color:#082247;">Total</td>
                  <td align="right" style="padding:12px 18px 8px;font-size:20px;font-weight:800;color:#082247;">${formatCurrency(order.total)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="50%" style="vertical-align:top;padding-right:8px;">
                    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:20px;padding:18px;">
                      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#c2410c;">Delivery Address</p>
                      <p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:#334155;">
                        ${escapeHtml(address.fullName)}<br />
                        ${escapeHtml(address.addressLine)}<br />
                        ${escapeHtml(address.city)}, ${escapeHtml(address.state)} - ${escapeHtml(address.pincode)}<br />
                        ${escapeHtml(address.country || 'India')}
                      </p>
                    </div>
                  </td>
                  <td width="50%" style="vertical-align:top;padding-left:8px;">
                    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;padding:18px;">
                      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#1d4ed8;">Payment</p>
                      <p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:#334155;">
                        Method: <b>${paymentLabel}</b><br />
                        Status: <b>${paymentStatus}</b><br />
                        Email: ${escapeHtml(address.email)}<br />
                        Phone: ${escapeHtml(address.phone)}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px;" align="center">
              <a href="${trackUrl}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:linear-gradient(135deg,#159fe8,#ed1e8f);color:#ffffff;text-decoration:none;font-size:14px;font-weight:800;">Track Your Order</a>
              <p style="margin:18px 0 0;font-size:12px;line-height:1.7;color:#94a3b8;">Need help? Reply to this email or contact V.Colors support.</p>
            </td>
          </tr>
        </table>
        <p style="margin:18px 0 0;font-size:11px;color:#94a3b8;">Powered by V.Colors • Premium Fabrics & Textiles</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
