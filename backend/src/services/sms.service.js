/**
 * SMS Notification Service
 * Integrates with Fast2SMS Quick Route (no TRAI DLT registration required).
 */

export const sendAdminSMSNotification = async (booking) => {
  const apiKey = process.env.FAST2SMS_API_KEY || process.env.SMS_API_KEY;
  const adminPhone = process.env.ADMIN_NOTIFICATION_PHONE || "7358443545";

  if (!apiKey) {
    console.warn("[SMS Service] FAST2SMS_API_KEY not configured. Skipping SMS alert.");
    return { success: false, reason: "API key not set" };
  }

  if (!adminPhone) {
    console.warn("[SMS Service] ADMIN_NOTIFICATION_PHONE not set. Skipping SMS alert.");
    return { success: false, reason: "Admin phone not set" };
  }

  // Format a clean, concise SMS alert
  const customerName = booking.customerName || booking.name || "Customer";
  const customerPhone = booking.phone || "Not provided";
  const sareeType = booking.sareeType || "Old Pattu Saree";
  const location = booking.location || booking.pickupAddress || "Chennai";
  const pickupTime = booking.pickupTime ? `Time: ${booking.pickupTime}` : "";

  const lines = [
    "Arumugam Pattu: New Pickup Request!",
    `Customer: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Saree: ${sareeType}`,
    `Location: ${location}`,
  ];
  if (pickupTime) lines.push(pickupTime);

  const messageText = lines.join("\n");

  try {
    const cleanNumbers = adminPhone.replace(/[^0-9]/g, "").slice(-10);

    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": apiKey.trim(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "q",
        message: messageText,
        language: "english",
        flash: 0,
        numbers: cleanNumbers,
      }),
    });

    const result = await response.json();
    if (result.return === true || result.status_code === 200) {
      console.log(`[SMS Service] Alert sent successfully to ${cleanNumbers}:`, result.message || "OK");
      return { success: true, data: result };
    } else {
      console.warn(`[SMS Service] Fast2SMS response (${result.status_code}):`, result.message);
      return { success: false, error: result.message, code: result.status_code };
    }
  } catch (error) {
    console.error("[SMS Service] Network error sending SMS:", error.message);
    return { success: false, error: error.message };
  }
};
