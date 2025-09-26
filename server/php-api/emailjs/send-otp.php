<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

// EmailJS configuration
$EMAILJS_CONFIG = [
    'PUBLIC_KEY' => 'VESgaxHK7KT_7I0oi',
    'PRIVATE_KEY' => 'ghNU8-8xD0KYwW6Gwu5EH',
    'SERVICE_ID' => 'service_qv5wd53',
    'TEMPLATE_ID' => 'template_4b06ltq',
];

function sendOTPViaEmailJS($toEmail, $otpCode, $userName, $appName, $expiryMinutes) {
    global $EMAILJS_CONFIG;
    
    $url = 'https://api.emailjs.com/api/v1.0/email/send';
    
    $data = [
        'service_id' => $EMAILJS_CONFIG['SERVICE_ID'],
        'template_id' => $EMAILJS_CONFIG['TEMPLATE_ID'],
        'user_id' => $EMAILJS_CONFIG['PUBLIC_KEY'],
        'template_params' => [
            'email' => $toEmail,
            'otp_code' => $otpCode,
            'user_name' => $userName,
            'app_name' => $appName,
            'expiry_minutes' => $expiryMinutes,
        ],
    ];
    
    // Use cURL instead of file_get_contents for better HTTP handling
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'User-Agent: Note2Note-PHP/1.0'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($result === false || !empty($error)) {
        error_log("EmailJS cURL Error: " . $error);
        return false;
    }
    
    if ($httpCode !== 200) {
        error_log("EmailJS HTTP Error: " . $httpCode . " - " . $result);
        return false;
    }
    
    $response = json_decode($result, true);
    return $response !== null && !isset($response['error']);
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
    
    // Send email via EmailJS
    $emailSent = sendOTPViaEmailJS($toEmail, $otpCode, $userName, $appName, $expiryMinutes);
    
    if ($emailSent) {
        echo json_encode([
            'ok' => true,
            'message' => 'OTP email sent successfully via EmailJS',
            'to_email' => $toEmail,
            'otp_code' => $otpCode
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email via EmailJS']);
    }
    
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'detail' => $e->getMessage()]);
}
?>
