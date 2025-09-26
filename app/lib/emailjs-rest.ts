import { EMAILJS_CONFIG, OTPEmailTemplate } from './emailjs-config';

export class EmailJSRestService {
  /**
   * Send OTP verification email using REST API
   */
  static async sendOTPEmail(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      console.log('EmailJS REST Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
      });

      console.log('EmailJS REST Template Data:', templateData);

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
          template_params: {
            email: templateData.email,
            otp_code: templateData.otp_code,
            user_name: templateData.user_name || 'User',
            app_name: templateData.app_name,
            expiry_minutes: templateData.expiry_minutes,
          },
        }),
      });

      console.log('EmailJS REST response status:', response.status);
      console.log('EmailJS REST response headers:', response.headers);

      // Get response text first to see what we're actually getting
      const responseText = await response.text();
      console.log('EmailJS REST raw response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
        console.log('EmailJS REST parsed response:', result);
      } catch (parseError) {
        console.error('EmailJS REST JSON parse error:', parseError);
        console.error('Raw response that failed to parse:', responseText);
        return false;
      }

      if (response.ok) {
        console.log('EmailJS REST OTP sent successfully');
        return true;
      } else {
        console.error('EmailJS REST Error:', result);
        return false;
      }
    } catch (error) {
      console.error('EmailJS REST Full Error:', error);
      return false;
    }
  }

  /**
   * Test EmailJS REST connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      const testData: OTPEmailTemplate = {
        email: 'test@example.com',
        otp_code: '123456',
        user_name: 'Test User',
        app_name: 'Note2Note',
        expiry_minutes: 10,
      };

      const result = await this.sendOTPEmail(testData);
      return result;
    } catch (error) {
      console.error('EmailJS REST Test Failed:', error);
      return false;
    }
  }
}
