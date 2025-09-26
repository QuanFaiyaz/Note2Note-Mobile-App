import { EMAILJS_CONFIG, OTPEmailTemplate } from './emailjs-config';

export class EmailJSStrictService {
  /**
   * Send OTP verification email using strict mode with proper private key handling
   */
  static async sendOTPEmail(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      if (!EMAILJS_CONFIG.PRIVATE_KEY) {
        console.error('EmailJS Private Key not configured');
        return false;
      }

      console.log('EmailJS Strict Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
        HAS_PRIVATE_KEY: !!EMAILJS_CONFIG.PRIVATE_KEY,
      });

      console.log('EmailJS Strict Template Data:', templateData);

      // Method 1: Use private_key in body (most common for strict mode)
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

      console.log('EmailJS Strict response status:', response.status);
      console.log('EmailJS Strict response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('EmailJS Strict success response:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS Strict Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS Strict Full Error:', error);
      return false;
    }
  }

  /**
   * Alternative method using accessToken parameter
   */
  static async sendOTPEmailAccessToken(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      if (!EMAILJS_CONFIG.PRIVATE_KEY) {
        console.error('EmailJS Private Key not configured');
        return false;
      }

      console.log('EmailJS AccessToken Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
        HAS_PRIVATE_KEY: !!EMAILJS_CONFIG.PRIVATE_KEY,
      });

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          accessToken: EMAILJS_CONFIG.PRIVATE_KEY,
          template_params: {
            to_email: templateData.to_email,
            otp_code: templateData.otp_code,
            user_name: templateData.user_name || 'User',
            app_name: templateData.app_name,
            expiry_minutes: templateData.expiry_minutes,
          },
        }),
      });

      console.log('EmailJS AccessToken response status:', response.status);
      console.log('EmailJS AccessToken response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('EmailJS AccessToken success response:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS AccessToken Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS AccessToken Full Error:', error);
      return false;
    }
  }

  /**
   * Method using API key parameter
   */
  static async sendOTPEmailAPIKey(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      if (!EMAILJS_CONFIG.PRIVATE_KEY) {
        console.error('EmailJS Private Key not configured');
        return false;
      }

      console.log('EmailJS APIKey Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
        HAS_PRIVATE_KEY: !!EMAILJS_CONFIG.PRIVATE_KEY,
      });

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          api_key: EMAILJS_CONFIG.PRIVATE_KEY,
          template_params: {
            to_email: templateData.to_email,
            otp_code: templateData.otp_code,
            user_name: templateData.user_name || 'User',
            app_name: templateData.app_name,
            expiry_minutes: templateData.expiry_minutes,
          },
        }),
      });

      console.log('EmailJS APIKey response status:', response.status);
      console.log('EmailJS APIKey response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('EmailJS APIKey success response:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS APIKey Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS APIKey Full Error:', error);
      return false;
    }
  }
}
