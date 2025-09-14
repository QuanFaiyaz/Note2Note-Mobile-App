// Minimal client for the PHP API

// Use your computer's IP address instead of localhost for mobile/emulator access
// PHP files are now copied to C:\xampp\htdocs\note2note
const BASE_URL = 'http://192.168.1.2/note2note';

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

export async function registerUser(payload: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  mobileNo?: string;
  course?: string;
}) {
  return handleResponse<{ ok: boolean; user_id: number }>(
    await fetch(`${BASE_URL}/users/registration.php`, {
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

export async function listSubjects(courseId?: number) {
  const q = courseId && courseId > 0 ? `?course_id=${courseId}` : '';
  return handleResponse<{ data: any[] }>(await fetch(`${BASE_URL}/subjects/list.php${q}`));
}

export async function listCourses() {
  return handleResponse<{ data: any[] }>(await fetch(`${BASE_URL}/courses/list.php`));
}

export async function testConnection() {
  return handleResponse<{ ok: boolean; message: string; timestamp: string; server_ip: string }>(
    await fetch(`${BASE_URL}/test-connection.php`)
  );
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


