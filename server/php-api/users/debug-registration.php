<?php
// Debug registration endpoint
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

echo json_encode([
    'debug' => true,
    'received_data' => $input,
    'otp_verified_value' => $input['otp_verified'] ?? 'NOT_SET',
    'otp_verified_type' => gettype($input['otp_verified'] ?? null),
    'otp_verified_check' => isset($input['otp_verified']) ? ($input['otp_verified'] ? 'TRUE' : 'FALSE') : 'NOT_SET'
]);
?>
