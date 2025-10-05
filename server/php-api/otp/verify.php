<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['email', 'otp_code']);

$email = (string)$input['email'];
$otpCode = (string)$input['otp_code'];

try {
    // Find valid OTP
    $stmt = $pdo->prepare('SELECT id, expiry_time FROM otp_requests WHERE email = :email AND otp_code = :otp AND purpose = :purpose AND status = :status AND expiry_time > NOW() LIMIT 1');
    $stmt->execute([
        ':email' => $email,
        ':otp' => $otpCode,
        ':purpose' => 'signup',
        ':status' => 'sent'
    ]);
    
    $otpRecord = $stmt->fetch();
    
    if (!$otpRecord) {
        // For debugging, let's check if the OTP exists but is used/expired
        $checkStmt = $pdo->prepare('SELECT id, status, expiry_time FROM otp_requests WHERE email = :email AND otp_code = :otp AND purpose = :purpose LIMIT 1');
        $checkStmt->execute([
            ':email' => $email,
            ':otp' => $otpCode,
            ':purpose' => 'signup'
        ]);
        $checkRecord = $checkStmt->fetch();
        
        if ($checkRecord) {
            if ($checkRecord['status'] == 'verified') {
                http_response_code(400);
                echo json_encode(['error' => 'OTP code has already been used']);
                exit;
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'OTP code has expired']);
                exit;
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid OTP code']);
            exit;
        }
    }
    
    // Mark OTP as verified
    $updateStmt = $pdo->prepare('UPDATE otp_requests SET status = :status, verified_at = NOW() WHERE id = :id');
    $updateStmt->execute([
        ':status' => 'verified',
        ':id' => $otpRecord['id']
    ]);
    
    echo json_encode(['ok' => true, 'message' => 'OTP verified successfully']);
    
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to verify OTP', 'detail' => $e->getMessage()]);
}
