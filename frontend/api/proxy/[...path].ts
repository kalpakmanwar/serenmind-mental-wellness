// Target: Railway TCP proxy (HTTP)
const TARGET_BASE = process.env.RAILWAY_PROXY_TARGET || 'http://ballast.proxy.rlwy.net:17126/api';

export default async function handler(req: any, res: any) {
  try {
    // Handle CORS preflight and allow common headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const segments = (req.query?.path ?? []) as string[];
    const url = `${TARGET_BASE}/${Array.isArray(segments) ? segments.join('/') : ''}`;

    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') headers[key] = value;
    }
    if (req.method && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
      headers['content-type'] = headers['content-type'] || 'application/json';
    }

    // Use Node fetch; req.body may be object or string
    const bodyNeeded = req.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
    const body = bodyNeeded
      ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {}))
      : undefined;

    const resp = await fetch(url, {
      method: req.method,
      headers,
      body,
    } as any);

    // Pipe response back
    const arrayBuf = await resp.arrayBuffer();
    resp.headers.forEach((v, k) => res.setHeader(k, v));
    res.status(resp.status).send(Buffer.from(arrayBuf));
  } catch (err: any) {
    res.status(502).json({ message: 'Proxy error', error: err?.message || String(err) });
  }
}


