import { OTPEmailTemplate } from './emailjs-config';

export class EmailJSSecureService {
  /**
   * Send OTP verification email using secure PHP backend
   * This keeps the private key secure on the server side
   */
  static async sendOTPEmail(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      console.log('🔐 Sending OTP via secure PHP backend...');
      console.log('📧 Template Data:', templateData);

      const response = await fetch('http://192.168.1.7/note2note/emailjs/send-otp.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: templateData.email,
          otp_code: templateData.otp_code,
          user_name: templateData.user_name || 'User',
          app_name: templateData.app_name,
          expiry_minutes: templateData.expiry_minutes,
        }),
      });

      console.log('🔐 Secure EmailJS response status:', response.status);
      console.log('🔐 Secure EmailJS response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('🔐 Secure EmailJS success response:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('🔐 Secure EmailJS Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('🔐 Secure EmailJS Full Error:', error);
      return false;
    }
  }

  /**
   * Test the secure endpoint
   */
  static async testSecureEndpoint(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🧪 Testing secure EmailJS endpoint...');
      
      const response = await fetch('http://192.168.1.7/note2note/emailjs/send-otp.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: 'test@example.com',
          otp_code: '123456',
          user_name: 'Test User',
          app_name: 'Note2Note',
          expiry_minutes: 10,
        }),
      });

      const responseText = await response.text();
      console.log('🧪 Secure endpoint test response:', responseText);

      if (response.ok) {
        return { success: true, message: 'Secure endpoint is working!' };
      } else {
        return { success: false, message: `Secure endpoint failed: ${responseText}` };
      }
    } catch (error: any) {
      console.error('🧪 Secure endpoint test error:', error);
      return { success: false, message: `Secure endpoint error: ${error.message}` };
    }
  }
}
