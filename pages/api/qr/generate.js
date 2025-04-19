import { createSession } from '../../../helpers/qrSessions';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const sessionId = createSession();
    res.status(200).json({ sessionId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating session' });
  }
} 