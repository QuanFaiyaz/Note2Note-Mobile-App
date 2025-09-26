<?php
// Test endpoint that always returns success
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['email']) || !isset($input['otp_code'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing email or otp_code']);
    exit;
}

// Always return success for testing
echo json_encode([
    'ok' => true,
    'message' => 'OTP verified successfully (test)',
    'received_email' => $input['email'],
    'received_otp' => $input['otp_code']
]);
?>
