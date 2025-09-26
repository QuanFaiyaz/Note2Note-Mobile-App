import { EMAILJS_CONFIG, OTPEmailTemplate } from './emailjs-config';

export class EmailJSPrivateService {
  /**
   * Send OTP verification email using private key (for strict mode)
   */
  static async sendOTPEmail(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      if (!EMAILJS_CONFIG.PRIVATE_KEY) {
        console.error('EmailJS Private Key not configured');
        return false;
      }

      console.log('EmailJS Private Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
        HAS_PRIVATE_KEY: !!EMAILJS_CONFIG.PRIVATE_KEY,
      });

      console.log('EmailJS Private Template Data:', templateData);

      // Use private key for strict mode - try different approaches
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Private-Key': EMAILJS_CONFIG.PRIVATE_KEY,
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          private_key: EMAILJS_CONFIG.PRIVATE_KEY,
          template_params: {
            to_email: templateData.to_email,
            otp_code: templateData.otp_code,
            user_name: templateData.user_name || 'User',
            app_name: templateData.app_name,
            expiry_minutes: templateData.expiry_minutes,
          },
        }),
      });

      console.log('EmailJS Private response status:', response.status);
      console.log('EmailJS Private response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('EmailJS Private success response:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS Private Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS Private Full Error:', error);
      return false;
    }
  }

  /**
   * Alternative method using private key in body
   */
  static async sendOTPEmailBody(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      if (!EMAILJS_CONFIG.PRIVATE_KEY) {
        console.error('EmailJS Private Key not configured');
        return false;
      }

      console.log('EmailJS Private Body Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
        HAS_PRIVATE_KEY: !!EMAILJS_CONFIG.PRIVATE_KEY,
      });

      // Include private key in body
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          private_key: EMAILJS_CONFIG.PRIVATE_KEY,
          template_params: {
            to_email: templateData.to_email,
            otp_code: templateData.otp_code,
            user_name: templateData.user_name || 'User',
            app_name: templateData.app_name,
            expiry_minutes: templateData.expiry_minutes,
          },
        }),
      });

      console.log('EmailJS Private Body response status:', response.status);
      console.log('EmailJS Private Body response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('EmailJS Private Body success response:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS Private Body Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS Private Body Full Error:', error);
      return false;
    }
  }
}
