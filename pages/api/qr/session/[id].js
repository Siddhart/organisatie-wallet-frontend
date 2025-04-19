import { updateSession, getSession } from '../../../../helpers/qrSessions';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    const success = updateSession(id, data);
    if (success) {
      return res.status(200).json({ message: 'Data updated successfully' });
    }
    return res.status(404).json({ message: 'Session not found' });
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    const session = getSession(id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    return res.status(200).json(session);
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 