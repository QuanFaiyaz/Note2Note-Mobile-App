<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['email', 'otp_code']);

$email = (string)$input['email'];
$otpCode = (string)$input['otp_code'];

try {
    // Find valid OTP
    $stmt = $pdo->prepare('SELECT id, expires_at FROM otp_verifications WHERE email = :email AND otp_code = :otp AND purpose = :purpose AND is_used = 0 AND expires_at > NOW() LIMIT 1');
    $stmt->execute([
        ':email' => $email,
        ':otp' => $otpCode,
        ':purpose' => 'email_verification'
    ]);
    
    $otpRecord = $stmt->fetch();
    
    if (!$otpRecord) {
        // For debugging, let's check if the OTP exists but is used
        $checkStmt = $pdo->prepare('SELECT id, is_used, expires_at FROM otp_verifications WHERE email = :email AND otp_code = :otp AND purpose = :purpose LIMIT 1');
        $checkStmt->execute([
            ':email' => $email,
            ':otp' => $otpCode,
            ':purpose' => 'email_verification'
        ]);
        $checkRecord = $checkStmt->fetch();
        
        if ($checkRecord) {
            if ($checkRecord['is_used'] == 1) {
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
    
    // Mark OTP as used
    $updateStmt = $pdo->prepare('UPDATE otp_verifications SET is_used = 1 WHERE id = :id');
    $updateStmt->execute([':id' => $otpRecord['id']]);
    
    echo json_encode(['ok' => true, 'message' => 'OTP verified successfully']);
    
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to verify OTP', 'detail' => $e->getMessage()]);
}
