<?php
// Simple test endpoint for OTP verification
header('Content-Type: application/json');

// Simple JSON body reader
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['email']) || !isset($input['otp_code'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing email or otp_code']);
    exit;
}

$email = (string)$input['email'];
$otpCode = (string)$input['otp_code'];

echo json_encode([
    'ok' => true,
    'message' => 'OTP verification test successful',
    'received_email' => $email,
    'received_otp' => $otpCode,
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
