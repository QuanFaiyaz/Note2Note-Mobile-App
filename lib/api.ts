// Minimal client for the PHP API

// Change this based on your environment:
// Android emulator: 'http://10.0.2.2/note2note-api'
// iOS simulator: 'http://localhost/note2note-api'  
// Physical device: 'http://YOUR_PC_IP/note2note-api'
const BASE_URL = 'http://localhost/note2note-api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = '';
    try { detail = await res.text(); } catch {}
    throw new Error(`HTTP ${res.status}: ${detail || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function listNotes(userId?: number) {
  const q = userId && userId > 0 ? `?user_id=${userId}` : '';
  return handleResponse<{ data: any[] }>(await fetch(`${BASE_URL}/notes/list.php${q}`));
}

export async function createNote(payload: {
  user_id: number;
  Title: string;
  Description: string;
  SubjectId: number;
}) {
  return handleResponse<{ ok: boolean; NoteId: number }>(
    await fetch(`${BASE_URL}/notes/create.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
}

export async function updateNote(payload: Partial<{ Title: string; Description: string; SubjectId: number }> & { NoteId: number }) {
  return handleResponse<{ ok: boolean }>(
    await fetch(`${BASE_URL}/notes/update.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
}

export async function deleteNote(noteId: number) {
  return handleResponse<{ ok: boolean }>(
    await fetch(`${BASE_URL}/notes/delete.php`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ NoteId: noteId }),
    })
  );
}

export async function registerUserWithEmail(payload: { email: string; password: string }) {
  return handleResponse<{ ok: boolean; user_id: number }>(
    await fetch(`${BASE_URL}/users/register.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
}

export async function loginWithEmail(payload: { email: string; password: string }) {
  return handleResponse<{ ok: boolean; user: any }>(
    await fetch(`${BASE_URL}/users/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
}

export async function listSubjects() {
  return handleResponse<{ data: any[] }>(await fetch(`${BASE_URL}/subjects/list.php`));
}

export async function toggleBookmark(user_id: number, NoteId: number) {
  return handleResponse<{ ok: boolean; bookmarked: boolean }>(
    await fetch(`${BASE_URL}/bookmark/toggle.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, NoteId }),
    })
  );
}

export async function reportNote(payload: { NoteId: number; user_id: number; reason: string; status?: string }) {
  return handleResponse<{ ok: boolean; ReportId: number }>(
    await fetch(`${BASE_URL}/reports/create.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
}

export async function listNoteVersions(NoteId: number) {
  return handleResponse<{ data: any[] }>(await fetch(`${BASE_URL}/noteversion/list.php?NoteId=${NoteId}`));
}

