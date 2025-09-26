import { OTPEmailTemplate } from './emailjs-config';

export class EmailFallbackService {
  /**
   * Fallback email service using a simple HTTP email API
   * This is a backup solution if EmailJS fails
   */
  static async sendOTPEmail(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      console.log('📧 Trying fallback email service...');
      console.log('📋 Template Data:', templateData);

      // Option 1: Use a free email API service
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Note2Note-App/1.0',
        },
        body: JSON.stringify({
          service_id: 'service_qv5wd53',
          template_id: 'template_4b06ltq',
          user_id: 'VESgaxHK7KT_7I0oi',
          template_params: {
            to_email: templateData.to_email,
            otp_code: templateData.otp_code,
            user_name: templateData.user_name || 'User',
            app_name: templateData.app_name,
            expiry_minutes: templateData.expiry_minutes,
          },
        }),
      });

      console.log('Fallback response status:', response.status);
      const responseText = await response.text();
      console.log('Fallback response:', responseText);

      if (response.ok) {
        console.log('✅ Fallback email sent successfully');
        return true;
      } else {
        console.log('❌ Fallback email failed:', responseText);
        return false;
      }
    } catch (error) {
      console.error('Fallback email error:', error);
      return false;
    }
  }

  /**
   * Alternative: Use your own PHP backend to send emails
   */
  static async sendOTPViaPHP(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      console.log('📧 Trying PHP backend email service...');
      
      const response = await fetch('http://192.168.1.7/note2note/email/send-otp.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: templateData.to_email,
          otp_code: templateData.otp_code,
          user_name: templateData.user_name || 'User',
          app_name: templateData.app_name,
          expiry_minutes: templateData.expiry_minutes,
        }),
      });

      console.log('PHP email response status:', response.status);
      const responseText = await response.text();
      console.log('PHP email response:', responseText);

      if (response.ok) {
        const result = JSON.parse(responseText);
        if (result.ok) {
          console.log('✅ PHP email sent successfully');
          return true;
        }
      }
      
      console.log('❌ PHP email failed:', responseText);
      return false;
    } catch (error) {
      console.error('PHP email error:', error);
      return false;
    }
  }

  /**
   * Mock email service for testing (always succeeds)
   */
  static async sendOTPMock(templateData: OTPEmailTemplate): Promise<boolean> {
    console.log('📧 Mock email service (for testing)...');
    console.log('📋 Would send email to:', templateData.to_email);
    console.log('📋 OTP Code:', templateData.otp_code);
    console.log('📋 User Name:', templateData.user_name);
    console.log('📋 App Name:', templateData.app_name);
    console.log('✅ Mock email "sent" successfully');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  }
}
