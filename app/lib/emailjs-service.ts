import { EmailJSResponseStatus, init, send } from '@emailjs/react-native';
import { EMAILJS_CONFIG, OTPEmailTemplate } from './emailjs-config';

export class EmailJSService {
  private static initialized = false;

  /**
   * Initialize EmailJS (call once)
   */
  private static initialize() {
    if (!this.initialized) {
      console.log('Initializing EmailJS with public key:', EMAILJS_CONFIG.PUBLIC_KEY);
      init(EMAILJS_CONFIG.PUBLIC_KEY);
      this.initialized = true;
    }
  }

  /**
   * Send OTP verification email
   */
  static async sendOTPEmail(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      // Ensure EmailJS is initialized
      this.initialize();

      console.log('EmailJS Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
        INITIALIZED: this.initialized
      });

      console.log('EmailJS Template Data:', templateData);

      const response = await send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          email: templateData.email,
          otp_code: templateData.otp_code,
          user_name: templateData.user_name || 'User',
          app_name: templateData.app_name,
          expiry_minutes: templateData.expiry_minutes,
        },
        {
          publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
        }
      );

      console.log('EmailJS OTP sent successfully:', response);
      return true;
    } catch (error) {
      console.error('EmailJS Full Error:', error);
      
      if (error instanceof EmailJSResponseStatus) {
        console.error('EmailJS Request Failed:', {
          status: error.status,
          text: error.text,
          details: error
        });
      } else {
        console.error('EmailJS Error:', error);
      }
      return false;
    }
  }

  /**
   * Test EmailJS connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      const testData: OTPEmailTemplate = {
        to_email: 'test@example.com',
        otp_code: '123456',
        user_name: 'Test User',
        app_name: 'Note2Note',
        expiry_minutes: 10,
      };

      const result = await this.sendOTPEmail(testData);
      return result;
    } catch (error) {
      console.error('EmailJS Test Failed:', error);
      return false;
    }
  }
}
