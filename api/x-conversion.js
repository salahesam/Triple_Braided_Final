export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = process.env.X_PIXEL_TOKEN;
  if (!token) {
    console.error('X_PIXEL_TOKEN is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const pixelId = 'rd6se';
  const url = `https://ads-api.x.com/12/measurement/conversions/${pixelId}`;

  // Automatically extract client IP and user agent
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';

  // Parse body
  const body = req.body || {};
  if (body.conversions && Array.isArray(body.conversions)) {
    body.conversions.forEach(conv => {
      if (!conv.identifiers || conv.identifiers.length === 0) {
        conv.identifiers = [{}];
      }
      conv.identifiers.forEach(ident => {
        if (!ident.ip_address && clientIp) {
          // Get the client IP (first one in x-forwarded-for list)
          ident.ip_address = clientIp.split(',')[0].trim();
        }
        if (!ident.user_agent && userAgent) {
          ident.user_agent = userAgent;
        }
      });
    });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Pixel-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const responseData = await response.json();
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error('Error forwarding conversion event to X:', error);
    return res.status(500).json({ error: 'Failed to forward event to X' });
  }
}
