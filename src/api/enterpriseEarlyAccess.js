function apiBase() {
  const configured = String(import.meta.env.VITE_API_BASE || "").trim();
  if (configured) return configured.replace(/\/+$/, "");
  const host = window.location.hostname.toLowerCase();
  return ["localhost", "127.0.0.1"].includes(host)
    ? "http://localhost:8080"
    : "https://api.autobroll.io";
}

export async function submitEnterpriseEarlyAccess(values, requestId) {
  const response = await fetch(`${apiBase()}/enterprise/early-access`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, requestId }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.ok || !data?.id) {
    const error = new Error(data?.error || "enterprise_submission_failed");
    error.code = data?.error || "enterprise_submission_failed";
    throw error;
  }
  return data;
}
