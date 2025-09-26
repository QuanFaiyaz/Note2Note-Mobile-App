<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['email']);

$email = (string)$input['email'];
$otp = isset($input['otp']) ? (string)$input['otp'] : null;

try {
    // Check if email already exists
    $checkStmt = $pdo->prepare('SELECT user_id FROM users WHERE Email = :email LIMIT 1');
    $checkStmt->execute([':email' => $email]);
    if ($checkStmt->fetch()) {
        http_response_code(400);
        echo json_encode(['error' => 'Email already registered']);
        exit;
    }

    // Generate 6-digit OTP if not provided (fallback)
    if (!$otp) {
        $otp = str_pad((string)rand(100000, 999999), 6, '0', STR_PAD_LEFT);
    }
    
    // Store OTP in database with expiration using database timezone
    $stmt = $pdo->prepare('INSERT INTO otp_verifications (email, otp_code, purpose, expires_at) VALUES (:email, :otp, :purpose, DATE_ADD(NOW(), INTERVAL 10 MINUTE))');
    $stmt->execute([
        ':email' => $email,
        ':otp' => $otp,
        ':purpose' => 'email_verification'
    ]);

    // Email is sent via EmailJS from frontend, just log for debugging
    error_log("OTP stored for {$email}: {$otp}");

    echo json_encode([
        'ok' => true, 
        'message' => 'OTP sent successfully',
        'otp' => $otp, // Remove this in production
        'expires_in' => 600 // 10 minutes in seconds
    ]);
    
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send OTP', 'detail' => $e->getMessage()]);
}
