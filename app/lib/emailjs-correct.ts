import { EMAILJS_CONFIG, OTPEmailTemplate } from './emailjs-config';

export class EmailJSCorrectService {
  /**
   * Send OTP verification email using the correct EmailJS API format
   */
  static async sendOTPEmail(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      console.log('EmailJS Correct Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
      });

      console.log('EmailJS Correct Template Data:', templateData);

      // Use the correct EmailJS API format
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          accessToken: EMAILJS_CONFIG.PUBLIC_KEY,
          template_params: {
            to_email: templateData.to_email,
            otp_code: templateData.otp_code,
            user_name: templateData.user_name || 'User',
            app_name: templateData.app_name,
            expiry_minutes: templateData.expiry_minutes,
          },
        }),
      });

      console.log('EmailJS Correct response status:', response.status);
      console.log('EmailJS Correct response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('EmailJS Correct success response:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS Correct Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS Correct Full Error:', error);
      return false;
    }
  }

  /**
   * Alternative method using URL parameters
   */
  static async sendOTPEmailURL(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      console.log('EmailJS URL Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
      });

      // Build URL with parameters
      const params = new URLSearchParams({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: JSON.stringify({
          to_email: templateData.to_email,
          otp_code: templateData.otp_code,
          user_name: templateData.user_name || 'User',
          app_name: templateData.app_name,
          expiry_minutes: templateData.expiry_minutes,
        }),
      });

      const response = await fetch(`https://api.emailjs.com/api/v1.0/email/send?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('EmailJS URL response status:', response.status);
      console.log('EmailJS URL response ok:', response.ok);

      if (response.ok) {
        const result = await response.text();
        console.log('EmailJS URL success response:', result);
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS URL Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS URL Full Error:', error);
      return false;
    }
  }
}
