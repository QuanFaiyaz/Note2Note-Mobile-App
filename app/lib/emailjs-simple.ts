import { EMAILJS_CONFIG, OTPEmailTemplate } from './emailjs-config';

export class EmailJSSimpleService {
  /**
   * Send OTP verification email using a simpler approach
   */
  static async sendOTPEmail(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      console.log('EmailJS Simple Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
      });

      console.log('EmailJS Simple Template Data:', templateData);

      // Try the older API endpoint
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

      console.log('EmailJS Simple response status:', response.status);
      console.log('EmailJS Simple response ok:', response.ok);

      if (response.ok) {
        console.log('EmailJS Simple OTP sent successfully');
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS Simple Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS Simple Full Error:', error);
      return false;
    }
  }

  /**
   * Alternative method using form data
   */
  static async sendOTPEmailFormData(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      console.log('EmailJS FormData Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
      });

      // Create form data
      const formData = new FormData();
      formData.append('service_id', EMAILJS_CONFIG.SERVICE_ID);
      formData.append('template_id', EMAILJS_CONFIG.TEMPLATE_ID);
      formData.append('publicKey', EMAILJS_CONFIG.PUBLIC_KEY);
      formData.append('template_params', JSON.stringify({
        email: templateData.email,
        otp_code: templateData.otp_code,
        user_name: templateData.user_name || 'User',
        app_name: templateData.app_name,
        expiry_minutes: templateData.expiry_minutes,
      }));

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        body: formData,
      });

      console.log('EmailJS FormData response status:', response.status);
      console.log('EmailJS FormData response ok:', response.ok);

      if (response.ok) {
        console.log('EmailJS FormData OTP sent successfully');
        return true;
      } else {
        const errorText = await response.text();
        console.error('EmailJS FormData Error Response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('EmailJS FormData Full Error:', error);
      return false;
    }
  }
}
