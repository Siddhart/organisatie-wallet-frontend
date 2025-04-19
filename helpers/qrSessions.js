// In-memory storage for QR sessions
const sessions = new Map();

export const createSession = () => {
  const sessionId = Math.random().toString(36).substring(2, 15);
  sessions.set(sessionId, {
    id: sessionId,
    data: null,
    createdAt: Date.now()
  });
  return sessionId;
};

export const getSession = (sessionId) => {
  return sessions.get(sessionId);
};

export const updateSession = (sessionId, data) => {
  const session = sessions.get(sessionId);
  if (session) {
    session.data = data;
    return true;
  }
  return false;
}; 