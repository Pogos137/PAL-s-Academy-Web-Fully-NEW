const wrap = (inner: string) => `
<div style="font-family:Georgia,serif;background:#082A23;padding:48px 16px;color:#FAF8F4;">
  <div style="max-width:560px;margin:0 auto;background:#0C3D32;border:1px solid rgba(201,154,42,0.25);border-radius:18px;padding:40px;">
    <div style="font-family:Georgia,serif;font-size:22px;letter-spacing:-0.01em;color:#C99A2A;">PAL's Academy</div>
    <hr style="border:none;border-top:1px solid rgba(201,154,42,0.3);margin:18px 0 28px;"/>
    ${inner}
    <p style="margin-top:36px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(250,248,244,0.5);">
      Private Tutoring · Greater Toronto Area
    </p>
  </div>
</div>`;

export function leadConfirmationHTML(name: string) {
  return wrap(`
    <h1 style="font-family:Georgia,serif;font-size:28px;margin:0 0 12px;">Thank you, ${escapeHtml(name)}.</h1>
    <p style="font-size:15px;line-height:1.6;color:#DCEDE5;">
      We've received your consultation request. A real human on our team will read this
      personally and follow up within 24 hours with next steps.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#DCEDE5;">
      If you booked a time on Calendly, your call is confirmed — you'll get a Google
      Meet link separately.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#DCEDE5;margin-top:20px;">
      — The PAL's Academy team
    </p>
  `);
}

export function adminLeadHTML(data: Record<string, unknown>) {
  return wrap(`
    <h1 style="font-family:Georgia,serif;font-size:24px;margin:0 0 12px;">New lead</h1>
    <pre style="font-family:ui-monospace,monospace;font-size:13px;background:#082A23;border-radius:10px;padding:16px;color:#DCEDE5;white-space:pre-wrap;">${escapeHtml(
      JSON.stringify(data, null, 2)
    )}</pre>
  `);
}

export function applicationConfirmationHTML(name: string) {
  return wrap(`
    <h1 style="font-family:Georgia,serif;font-size:28px;margin:0 0 12px;">Application received, ${escapeHtml(name)}.</h1>
    <p style="font-size:15px;line-height:1.6;color:#DCEDE5;">
      Thank you for applying to teach with PAL's Academy. We read every application
      personally. If your background fits a current need, we'll reach out within 7
      business days to schedule a teaching interview.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#DCEDE5;margin-top:20px;">
      — The PAL's Academy team
    </p>
  `);
}

export function adminApplicationHTML(data: Record<string, unknown>) {
  return wrap(`
    <h1 style="font-family:Georgia,serif;font-size:24px;margin:0 0 12px;">New tutor application</h1>
    <pre style="font-family:ui-monospace,monospace;font-size:13px;background:#082A23;border-radius:10px;padding:16px;color:#DCEDE5;white-space:pre-wrap;">${escapeHtml(
      JSON.stringify(data, null, 2)
    )}</pre>
  `);
}

export function accountApprovedHTML(name: string) {
  return wrap(`
    <h1 style="font-family:Georgia,serif;font-size:28px;margin:0 0 12px;">You're in, ${escapeHtml(name)}.</h1>
    <p style="font-size:15px;line-height:1.6;color:#DCEDE5;">
      Your PAL's Academy portal account has been approved. You can now sign in to view
      your classes, assignments, and tutor messages.
    </p>
  `);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
