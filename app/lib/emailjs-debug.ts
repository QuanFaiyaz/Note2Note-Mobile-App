import { EMAILJS_CONFIG, OTPEmailTemplate } from './emailjs-config';

export class EmailJSDebugService {
  /**
   * Comprehensive debug test for all EmailJS methods
   */
  static async debugAllMethods(templateData: OTPEmailTemplate): Promise<void> {
    console.log('🔍 Starting comprehensive EmailJS debug...');
    console.log('📋 Config:', {
      PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
      PRIVATE_KEY: EMAILJS_CONFIG.PRIVATE_KEY ? '***' + EMAILJS_CONFIG.PRIVATE_KEY.slice(-4) : 'NOT SET',
      SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
      TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
    });
    console.log('📧 Template Data:', templateData);

    const methods = [
      { name: 'SDK Method', test: () => this.testSDK(templateData) },
      { name: 'REST API (user_id)', test: () => this.testRESTUserId(templateData) },
      { name: 'REST API (publicKey)', test: () => this.testRESTPublicKey(templateData) },
      { name: 'FormData Method', test: () => this.testFormData(templateData) },
      { name: 'Private Key Auth', test: () => this.testPrivateKeyAuth(templateData) },
      { name: 'Private Key Body', test: () => this.testPrivateKeyBody(templateData) },
      { name: 'Strict Mode (private_key)', test: () => this.testStrictPrivateKey(templateData) },
      { name: 'Strict Mode (accessToken)', test: () => this.testStrictAccessToken(templateData) },
      { name: 'Strict Mode (api_key)', test: () => this.testStrictAPIKey(templateData) },
      { name: 'URL Parameters', test: () => this.testURLParams(templateData) },
      { name: 'Alternative Endpoint', test: () => this.testAlternativeEndpoint(templateData) },
    ];

    for (const method of methods) {
      console.log(`\n🧪 Testing ${method.name}...`);
      try {
        const result = await method.test();
        console.log(`✅ ${method.name}: ${result ? 'SUCCESS' : 'FAILED'}`);
      } catch (error: any) {
        console.log(`❌ ${method.name}: ERROR - ${error.message}`);
      }
    }
  }

  private static async testSDK(templateData: OTPEmailTemplate): Promise<boolean> {
    try {
      const { EmailJSService } = await import('./emailjs-service');
      return await EmailJSService.sendOTPEmail(templateData);
    } catch (error) {
      console.error('SDK Error:', error);
      return false;
    }
  }

  private static async testRESTUserId(templateData: OTPEmailTemplate): Promise<boolean> {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: templateData,
      }),
    });
    
    const responseText = await response.text();
    console.log(`REST (user_id) - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testRESTPublicKey(templateData: OTPEmailTemplate): Promise<boolean> {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: templateData,
      }),
    });
    
    const responseText = await response.text();
    console.log(`REST (publicKey) - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testFormData(templateData: OTPEmailTemplate): Promise<boolean> {
    const formData = new FormData();
    formData.append('service_id', EMAILJS_CONFIG.SERVICE_ID);
    formData.append('template_id', EMAILJS_CONFIG.TEMPLATE_ID);
    formData.append('user_id', EMAILJS_CONFIG.PUBLIC_KEY);
    formData.append('template_params', JSON.stringify(templateData));

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      body: formData,
    });
    
    const responseText = await response.text();
    console.log(`FormData - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testPrivateKeyAuth(templateData: OTPEmailTemplate): Promise<boolean> {
    if (!EMAILJS_CONFIG.PRIVATE_KEY) {
      console.log('Private Key not configured');
      return false;
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EMAILJS_CONFIG.PRIVATE_KEY}`,
      },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: templateData,
      }),
    });
    
    const responseText = await response.text();
    console.log(`Private Key Auth - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testPrivateKeyBody(templateData: OTPEmailTemplate): Promise<boolean> {
    if (!EMAILJS_CONFIG.PRIVATE_KEY) {
      console.log('Private Key not configured');
      return false;
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        private_key: EMAILJS_CONFIG.PRIVATE_KEY,
        template_params: templateData,
      }),
    });
    
    const responseText = await response.text();
    console.log(`Private Key Body - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testURLParams(templateData: OTPEmailTemplate): Promise<boolean> {
    const params = new URLSearchParams({
      service_id: EMAILJS_CONFIG.SERVICE_ID,
      template_id: EMAILJS_CONFIG.TEMPLATE_ID,
      user_id: EMAILJS_CONFIG.PUBLIC_KEY,
      template_params: JSON.stringify(templateData),
    });

    const response = await fetch(`https://api.emailjs.com/api/v1.0/email/send?${params}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    
    const responseText = await response.text();
    console.log(`URL Params - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testStrictPrivateKey(templateData: OTPEmailTemplate): Promise<boolean> {
    if (!EMAILJS_CONFIG.PRIVATE_KEY) {
      console.log('Private Key not configured');
      return false;
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        private_key: EMAILJS_CONFIG.PRIVATE_KEY,
        template_params: templateData,
      }),
    });
    
    const responseText = await response.text();
    console.log(`Strict Mode (private_key) - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testStrictAccessToken(templateData: OTPEmailTemplate): Promise<boolean> {
    if (!EMAILJS_CONFIG.PRIVATE_KEY) {
      console.log('Private Key not configured');
      return false;
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        accessToken: EMAILJS_CONFIG.PRIVATE_KEY,
        template_params: templateData,
      }),
    });
    
    const responseText = await response.text();
    console.log(`Strict Mode (accessToken) - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testStrictAPIKey(templateData: OTPEmailTemplate): Promise<boolean> {
    if (!EMAILJS_CONFIG.PRIVATE_KEY) {
      console.log('Private Key not configured');
      return false;
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        api_key: EMAILJS_CONFIG.PRIVATE_KEY,
        template_params: templateData,
      }),
    });
    
    const responseText = await response.text();
    console.log(`Strict Mode (api_key) - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  private static async testAlternativeEndpoint(templateData: OTPEmailTemplate): Promise<boolean> {
    // Try alternative endpoint
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-template', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: templateData,
      }),
    });
    
    const responseText = await response.text();
    console.log(`Alternative Endpoint - Status: ${response.status}, Response: ${responseText}`);
    return response.ok;
  }

  /**
   * Test EmailJS account status
   */
  static async testAccountStatus(): Promise<void> {
    console.log('🔍 Testing EmailJS account status...');
    
    try {
      // Test with minimal data
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          template_params: {
            to_email: 'test@example.com',
            otp_code: '123456',
          },
        }),
      });

      const responseText = await response.text();
      console.log(`Account Status - Status: ${response.status}`);
      console.log(`Account Status - Response: ${responseText}`);

      if (response.status === 403) {
        console.log('🚨 Account is in STRICT MODE - Private key required');
      } else if (response.status === 400) {
        console.log('⚠️ Account configuration issue - Check service/template IDs');
      } else if (response.status === 401) {
        console.log('🔐 Authentication issue - Check public/private keys');
      } else if (response.ok) {
        console.log('✅ Account is working correctly');
      }
    } catch (error: any) {
      console.error('Account Status Error:', error);
    }
  }
}
