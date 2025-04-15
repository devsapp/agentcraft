import { request } from 'utils/clientRequest';

interface IPayload { keyword?: string, sessionId?: number }

export async function getSessionHistory(
  assistantId: number,
  payload: IPayload,
): Promise<any> {
  let count = 0;
  if (payload.keyword) {
    count += 1;
  }
  if (payload.sessionId) {
    count += 1;
  }
  if (count !== 1) {
    throw new Error('keyword or sessionId must be set');
  }

  let qr = `assistant_id=${assistantId}&page=0&limit=20`;
  if (payload.keyword) {
    qr = `${qr}&keyword=${payload.keyword}`
  }
  if (payload.sessionId) {
    qr = `${qr}&session_id=${payload.sessionId}`
  }

  const res = await request(`/api/assistantSession/history?${qr}`);
  return res;
}

export async function getSessionByKeyword(
  assistantId: number,
  keyword: string,
): Promise<any> {
  return await request(`/api/assistantSession/detailByKeyword?assistant_id=${assistantId}&keyword=${keyword}`);
}


export async function removeSessionHistory(agentId: number, sessionId: number): Promise<any> {
  return await request(`/api/assistantSession/remove?session_id=${sessionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
