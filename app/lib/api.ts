// Minimal client for the PHP API

// Use your computer's IP address instead of localhost for mobile/emulator access
// PHP files are now copied to C:\xampp\htdocs\note2note
const BASE_URL = 'http://192.168.1.14/note2note';

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

export async function uploadFile(file: any, userId: number) {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.mimeType,
    name: file.name,
  } as any);
  formData.append('user_id', userId.toString());

  return handleResponse<{ ok: boolean; file_path: string; file_name: string; file_size: number; file_type: string }>(
    await fetch(`${BASE_URL}/files/upload.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
  );
}

export async function createNote(payload: {
  user_id: number;
  title: string;
  content: string;
  subject_id: number;
  file_path?: string;
  file_type?: string;
  file_size?: number;
  is_public?: boolean;
}) {
  return handleResponse<{ ok: boolean; note_id: number }>(
    await fetch(`${BASE_URL}/notes/create.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
}

export async function updateNote(payload: Partial<{ title: string; content: string; subject_id: number; file_path?: string; file_type?: string; file_size?: number; is_public?: boolean; is_featured?: boolean; tags?: string }> & { note_id: number }) {
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
      body: JSON.stringify({ note_id: noteId }),
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
  otp_verified: boolean;
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

export async function getUserProfile(userId: number) {
  return handleResponse<{ ok: boolean; user: any }>(
    await fetch(`${BASE_URL}/users/profile.php?user_id=${userId}`)
  );
}

export async function getUserCount() {
  return handleResponse<{ data: any[] }>(await fetch(`${BASE_URL}/users/list.php`));
}

export async function updateUserProfile(userId: number, profileData: any) {
  return handleResponse<{ ok: boolean; message?: string; error?: string }>(
    await fetch(`${BASE_URL}/users/update.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, ...profileData }),
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

export async function sendOTP(email: string) {
  // Generate OTP locally
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Send OTP via EmailJS (try multiple methods)
  const { EmailJSService } = await import('./emailjs-service');
  const { EmailJSRestService } = await import('./emailjs-rest');
  const { EmailJSSimpleService } = await import('./emailjs-simple');
  
  const emailData = {
    email: email,
    otp_code: otp,
    app_name: 'Note2Note',
    expiry_minutes: 10,
  };

  let emailSent = await EmailJSService.sendOTPEmail(emailData);
  
  if (!emailSent) {
    console.log('SDK failed, trying REST API...');
    emailSent = await EmailJSRestService.sendOTPEmail(emailData);
  }
  
  if (!emailSent) {
    console.log('REST API failed, trying Simple API...');
    emailSent = await EmailJSSimpleService.sendOTPEmail(emailData);
  }
  
  if (!emailSent) {
    console.log('Simple API failed, trying FormData API...');
    emailSent = await EmailJSSimpleService.sendOTPEmailFormData(emailData);
  }
  
  if (!emailSent) {
    console.log('EmailJS failed, trying secure PHP EmailJS...');
    const { EmailJSSecureService } = await import('./emailjs-secure');
    emailSent = await EmailJSSecureService.sendOTPEmail(emailData);
  }
  
  if (!emailSent) {
    console.log('Secure EmailJS failed, trying PHP fallback...');
    const { EmailFallbackService } = await import('./email-fallback');
    emailSent = await EmailFallbackService.sendOTPViaPHP(emailData);
  }
  
  if (!emailSent) {
    console.log('PHP fallback failed, using mock service for testing...');
    const { EmailFallbackService } = await import('./email-fallback');
    emailSent = await EmailFallbackService.sendOTPMock(emailData);
  }

  if (!emailSent) {
    throw new Error('Failed to send OTP email via all methods (EmailJS, PHP, Mock)');
  }

  // Store OTP in backend for verification
  return handleResponse<{ ok: boolean; message: string; otp: string; expires_in: number }>(
    await fetch(`${BASE_URL}/otp/send.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })
  );
}

export async function verifyOTP(email: string, otpCode: string) {
  return handleResponse<{ ok: boolean; message: string }>(
    await fetch(`${BASE_URL}/otp/verify.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp_code: otpCode }),
    })
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


