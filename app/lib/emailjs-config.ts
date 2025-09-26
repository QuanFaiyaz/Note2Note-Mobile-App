// EmailJS Configuration
// Get these values from your EmailJS dashboard: https://dashboard.emailjs.com/

export const EMAILJS_CONFIG = {
  // Your EmailJS Public Key (safe to expose)
  PUBLIC_KEY: 'VESgaxHK7KT_7I0oi',
  
  // Your EmailJS Private Key (required for strict mode)
  // Get this from: https://dashboard.emailjs.com/admin/account
  PRIVATE_KEY: 'ghNU8-8xD0KYwW6Gwu5EH', // Add your private key here
  
  // Your EmailJS Service ID
  SERVICE_ID: 'service_qv5wd53',
  
  // Your EmailJS Template ID for OTP emails
  TEMPLATE_ID: 'template_4b06ltq',
};

// EmailJS Template Variables
export interface OTPEmailTemplate {
  email: string; // Changed from to_email to email
  otp_code: string;
  user_name?: string;
  app_name: string;
  expiry_minutes: number;
}

// Example template variables for EmailJS dashboard:
/*
Template Variables to use in EmailJS:
- {{email}} - Recipient email
- {{otp_code}} - 6-digit OTP code
- {{user_name}} - User's name (optional)
- {{app_name}} - App name (Note2Note)
- {{expiry_minutes}} - Expiry time in minutes

Example EmailJS Template HTML:
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #1E3A8A; color: white; padding: 20px; text-align: center;">
    <h1>{{app_name}}</h1>
  </div>
  <div style="padding: 30px; background-color: #f9f9f9;">
    <h2 style="color: #333;">Email Verification</h2>
    <p>Hello {{user_name}},</p>
    <p>Your verification code is:</p>
    <div style="background-color: #1E3A8A; color: white; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; margin: 20px 0; border-radius: 8px;">
      {{otp_code}}
    </div>
    <p><strong>This code will expire in {{expiry_minutes}} minutes.</strong></p>
    <p>If you didn't request this code, please ignore this email.</p>
  </div>
  <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
    © 2025 {{app_name}}. All rights reserved.
  </div>
</body>
</html>
*/
