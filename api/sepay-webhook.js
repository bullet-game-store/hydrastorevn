export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  const expected = process.env.SEPAY_WEBHOOK_API_KEY || '';
  const auth = (req.headers.authorization || '').trim();

  if (expected) {
    const expectedHeader = `Apikey ${expected}`;
    if (auth !== expectedHeader) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
  }

  try {
    const data = req.body || {};
    console.log('SePay webhook payload:', data);

    return res.status(200).json({
      success: true,
      received: true,
      sepayId: data.id ?? null
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}
