import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * PROFESSIONAL SECURE VERSION
 * No hardcoded secrets. Uses Supabase Project Secrets (Edge Function Variables).
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function getShopifyToken(domain: string, clientId: string, clientSecret: string) {
  const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Shopify Token Exchange failed (${res.status}): ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SHOPIFY_DOMAIN = Deno.env.get("SHOPIFY_STORE_DOMAIN");
    const SHOPIFY_CLIENT_ID = Deno.env.get("SHOPIFY_CLIENT_ID");
    const SHOPIFY_CLIENT_SECRET = Deno.env.get("SHOPIFY_CLIENT_SECRET");

    if (!SHOPIFY_DOMAIN || !SHOPIFY_CLIENT_ID || !SHOPIFY_CLIENT_SECRET) {
      throw new Error("Missing Shopify environment variables in Supabase project.");
    }

    const { name, email, subject, message } = await req.json();
    if (!email) throw new Error("Email is required");

    const token = await getShopifyToken(SHOPIFY_DOMAIN, SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET);
    const apiVersion = "2024-04";

    // 1. Search for existing customer
    const searchUrl = `https://${SHOPIFY_DOMAIN}/admin/api/${apiVersion}/customers/search.json?query=email:${encodeURIComponent(email)}`;
    
    const searchRes = await fetch(searchUrl, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    if (!searchRes.ok) {
        const errorText = await searchRes.text();
        throw new Error(`Shopify Search Failed (${searchRes.status}): ${errorText}`);
    }

    const { customers } = await searchRes.json();
    const customerId = customers?.[0]?.id;

    let shopifyRes;
    const bodyText = `[Website Contact Form Submission]\nSubject: ${subject}\n\nMessage: ${message}`;

    if (customerId) {
      // 2a. Update existing customer (Append to note)
      const existingNote = customers[0].note || "";
      const updatedNote = `${existingNote}\n\n--- New Message (${new Date().toLocaleDateString()}) ---\n${bodyText}`;
      
      shopifyRes = await fetch(
        `https://${SHOPIFY_DOMAIN}/admin/api/${apiVersion}/customers/${customerId}.json`,
        {
          method: "PUT",
          headers: {
            "X-Shopify-Access-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: {
              id: customerId,
              note: updatedNote,
              tags: `${customers[0].tags || ""}, Website Contact`.replace(/^, /, ""),
            },
          }),
        }
      );
    } else {
      // 2b. Create new customer
      const nameParts = (name || "Anonymous").trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "Customer";
      
      shopifyRes = await fetch(
        `https://${SHOPIFY_DOMAIN}/admin/api/${apiVersion}/customers.json`,
        {
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: {
              first_name: firstName,
              last_name: lastName,
              email: email,
              note: bodyText,
              tags: "Website Contact",
              accepts_marketing: true,
              verified_email: true
            },
          }),
        }
      );
    }

    if (!shopifyRes.ok) {
      const errorData = await shopifyRes.text();
      throw new Error(`Shopify Sync Failed (${shopifyRes.status}): ${errorData}`);
    }

    // Notify store owner — fire-and-forget so a Resend failure never breaks the contact save
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const esc = (s: string) =>
        String(s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

      // Only allow email in href if it looks like an actual email address
      const safeEmailHref = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : "#";

      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "One4Health Website <noreply@one4health.com>",
          to: ["info@one4health.com"],
          reply_to: email,
          subject: `New Contact Form: ${esc(subject)}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
              <h2 style="color:#2d6a4f;margin-bottom:4px">New Contact Form Submission</h2>
              <p style="color:#888;margin-top:0;font-size:14px">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#6b7280;width:100px">Name</td><td style="padding:8px 0;font-weight:600">${esc(name)}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="${safeEmailHref}" style="color:#2d6a4f">${esc(email)}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">Subject</td><td style="padding:8px 0">${esc(subject)}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
              <p style="color:#374151;white-space:pre-wrap;line-height:1.6">${esc(message)}</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
              <p style="font-size:12px;color:#9ca3af">Hit reply to respond directly to ${esc(name)}. Message saved to Shopify customer notes.</p>
            </div>
          `,
        }),
      }).catch((err) => console.error("[Resend] Email notification failed:", err));
    }

    return new Response(JSON.stringify({ success: true, message: "Synced successfully" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Function Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
