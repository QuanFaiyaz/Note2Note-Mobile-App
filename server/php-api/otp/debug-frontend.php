<?php
// Debug version of OTP verification with detailed logging
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

$input = read_json_body();
$email = isset($input['email']) ? (string)$input['email'] : '';
$otpCode = isset($input['otp_code']) ? (string)$input['otp_code'] : '';

// Log the request
error_log("OTP Verification Request - Email: {$email}, OTP: {$otpCode}");

echo json_encode([
    'debug' => true,
    'received_email' => $email,
    'received_otp' => $otpCode,
    'email_length' => strlen($email),
    'otp_length' => strlen($otpCode),
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
