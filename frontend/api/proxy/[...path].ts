// Target: Railway TCP proxy (HTTP)
const TARGET_BASE = process.env.RAILWAY_PROXY_TARGET || 'http://ballast.proxy.rlwy.net:17126/api';

export default async function handler(req: any, res: any) {
  try {
    const { path = [] } = req.query as { path?: string[] };
    const url = `${TARGET_BASE}/${Array.isArray(path) ? path.join('/') : ''}`;

    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') headers[key] = value;
    }
    // Ensure JSON content-type for POST/PUT/PATCH when body exists
    if (req.method && ['POST', 'PUT', 'PATCH'].includes(req.method) && !headers['content-type']) {
      headers['content-type'] = 'application/json';
    }

    const init: RequestInit = {
      method: req.method,
      headers,
      body: req.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)
        ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {}))
        : undefined,
    } as RequestInit;

    const resp = await fetch(url, init as any);
    const buf = Buffer.from(await resp.arrayBuffer());

    // Forward status and headers
    resp.headers.forEach((v, k) => res.setHeader(k, v));
    res.status(resp.status).send(buf);
  } catch (err: any) {
    res.status(502).json({ message: 'Proxy error', error: err?.message || String(err) });
  }
}


