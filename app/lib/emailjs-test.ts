import { EMAILJS_CONFIG } from './emailjs-config';

export class EmailJSTestService {
  /**
   * Test EmailJS credentials with minimal request
   */
  static async testCredentials(): Promise<{ success: boolean; error?: string; response?: any }> {
    try {
      console.log('Testing EmailJS credentials:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
      });

      // Minimal test request
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          template_params: {
            to_email: 'test@example.com',
            otp_code: '123456',
            user_name: 'Test User',
            app_name: 'Note2Note',
            expiry_minutes: 10,
          },
        }),
      });

      const responseText = await response.text();
      console.log('EmailJS Test Response Status:', response.status);
      console.log('EmailJS Test Response Text:', responseText);

      if (response.ok) {
        return { success: true, response: responseText };
      } else {
        return { success: false, error: responseText };
      }
    } catch (error: any) {
      console.error('EmailJS Test Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Test with different parameter names
   */
  static async testParameterNames(): Promise<void> {
    const testParams = [
      { user_id: EMAILJS_CONFIG.PUBLIC_KEY },
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY },
      { public_key: EMAILJS_CONFIG.PUBLIC_KEY },
      { accessToken: EMAILJS_CONFIG.PUBLIC_KEY },
      { api_key: EMAILJS_CONFIG.PUBLIC_KEY },
    ];

    for (const params of testParams) {
      try {
        console.log('Testing with params:', params);
        
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: EMAILJS_CONFIG.SERVICE_ID,
            template_id: EMAILJS_CONFIG.TEMPLATE_ID,
            ...params,
            template_params: {
              to_email: 'test@example.com',
              otp_code: '123456',
            },
          }),
        });

        const responseText = await response.text();
        console.log(`Params ${JSON.stringify(params)} - Status: ${response.status}, Response: ${responseText}`);
      } catch (error) {
        console.error(`Params ${JSON.stringify(params)} - Error:`, error);
      }
    }
  }
}
