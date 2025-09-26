/**
 * EmailJS Configuration Guide
 * 
 * Your EmailJS Account Details:
 * - Public Key: VESgaxHK7KT_7I0oi
 * - Private Key: ghNU8-8xD0KYwW6Gwu5EH
 * - Service ID: service_qv5wd53
 * - Template ID: template_4b06ltq
 * 
 * Current Issue: Account is in STRICT MODE
 * 
 * SOLUTION 1: Disable Strict Mode (Recommended)
 * 1. Go to: https://dashboard.emailjs.com/admin/account
 * 2. Look for "Security" or "API Settings" section
 * 3. Find "Use Private Key (recommended)" or "Strict Mode"
 * 4. UNCHECK/DISABLE this option
 * 5. Save changes
 * 6. This will allow public key only access
 * 
 * SOLUTION 2: Use Secure PHP Backend (Current Implementation)
 * - Private key is stored securely on your PHP server
 * - Client calls your PHP backend instead of EmailJS directly
 * - PHP backend uses private key to authenticate with EmailJS
 * 
 * SOLUTION 3: Alternative Email Service
 * - Use PHP's built-in mail() function
 * - Configure SMTP server in XAMPP
 * - Send emails directly without EmailJS
 */

export class EmailJSGuide {
  static getAccountInfo() {
    return {
      dashboard: 'https://dashboard.emailjs.com/admin/account',
      publicKey: 'VESgaxHK7KT_7I0oi',
      privateKey: 'ghNU8-8xD0KYwW6Gwu5EH',
      serviceId: 'service_qv5wd53',
      templateId: 'template_4b06ltq',
      currentIssue: 'STRICT MODE ENABLED',
      recommendedSolution: 'DISABLE STRICT MODE',
    };
  }

  static getSolutions() {
    return [
      {
        name: 'Disable Strict Mode',
        description: 'Uncheck "Use Private Key" in EmailJS dashboard',
        difficulty: 'Easy',
        security: 'Good',
        recommended: true,
      },
      {
        name: 'Secure PHP Backend',
        description: 'Use PHP server to handle private key',
        difficulty: 'Medium',
        security: 'Excellent',
        recommended: false,
      },
      {
        name: 'PHP Mail Function',
        description: 'Use XAMPP mail() function directly',
        difficulty: 'Hard',
        security: 'Good',
        recommended: false,
      },
    ];
  }
}
