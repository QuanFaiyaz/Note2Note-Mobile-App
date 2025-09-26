<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

// Simple email sending function using PHP's mail()
function sendOTPEmail($toEmail, $otpCode, $userName, $appName, $expiryMinutes) {
    $subject = "Your {$appName} Verification Code";
    
    $message = "
    <html>
    <head>
        <title>Email Verification</title>
    </head>
    <body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background-color: #1E3A8A; color: white; padding: 20px; text-align: center;'>
            <h1>{$appName}</h1>
        </div>
        <div style='padding: 30px; background-color: #f9f9f9;'>
            <h2 style='color: #333;'>Email Verification</h2>
            <p>Hello {$userName},</p>
            <p>Your verification code is:</p>
            <div style='background-color: #1E3A8A; color: white; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; margin: 20px 0; border-radius: 8px;'>
                {$otpCode}
            </div>
            <p><strong>This code will expire in {$expiryMinutes} minutes.</strong></p>
            <p>If you didn't request this code, please ignore this email.</p>
        </div>
        <div style='background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;'>
            © 2025 {$appName}. All rights reserved.
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: noreply@note2note.com" . "\r\n";
    $headers .= "Reply-To: noreply@note2note.com" . "\r\n";
    
    return mail($toEmail, $subject, $message, $headers);
}

try {
    $input = read_json_body();
    require_fields($input, ['to_email', 'otp_code']);
    
    $toEmail = (string)$input['to_email'];
    $otpCode = (string)$input['otp_code'];
    $userName = (string)($input['user_name'] ?? 'User');
    $appName = (string)($input['app_name'] ?? 'Note2Note');
    $expiryMinutes = (int)($input['expiry_minutes'] ?? 10);
    
    // Validate email
    if (!filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit;
    }
    
    // Send email
    $emailSent = sendOTPEmail($toEmail, $otpCode, $userName, $appName, $expiryMinutes);
    
    if ($emailSent) {
        echo json_encode([
            'ok' => true,
            'message' => 'OTP email sent successfully',
            'to_email' => $toEmail,
            'otp_code' => $otpCode
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email']);
    }
    
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'detail' => $e->getMessage()]);
}
?>