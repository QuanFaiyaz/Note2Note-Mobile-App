<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

// Debug OTP verification
header('Content-Type: application/json');

$input = read_json_body();
require_fields($input, ['email', 'otp_code']);

$email = (string)$input['email'];
$otpCode = (string)$input['otp_code'];

echo "Debug OTP Verification:\n";
echo "Email: {$email}\n";
echo "OTP Code: {$otpCode}\n";
echo "Current time: " . date('Y-m-d H:i:s') . "\n";
echo "Current timestamp: " . time() . "\n\n";

try {
    // First, let's see what OTPs exist for this email
    $checkStmt = $pdo->prepare('SELECT * FROM otp_verifications WHERE email = :email ORDER BY created_at DESC LIMIT 3');
    $checkStmt->execute([':email' => $email]);
    $otps = $checkStmt->fetchAll();
    
    echo "OTPs for this email:\n";
    foreach ($otps as $otp) {
        echo "- ID: {$otp['id']}, Code: {$otp['otp_code']}, Expires: {$otp['expires_at']}, Used: {$otp['is_used']}\n";
    }
    echo "\n";
    
    // Now try to find the exact OTP
    $stmt = $pdo->prepare('SELECT id, expires_at, created_at FROM otp_verifications WHERE email = :email AND otp_code = :otp AND purpose = :purpose AND is_used = 0 LIMIT 1');
    $stmt->execute([
        ':email' => $email,
        ':otp' => $otpCode,
        ':purpose' => 'email_verification'
    ]);
    
    $otpRecord = $stmt->fetch();
    
    if (!$otpRecord) {
        echo "❌ No matching OTP found\n";
        echo "Checking if OTP exists but is used...\n";
        
        $usedStmt = $pdo->prepare('SELECT * FROM otp_verifications WHERE email = :email AND otp_code = :otp AND purpose = :purpose');
        $usedStmt->execute([
            ':email' => $email,
            ':otp' => $otpCode,
            ':purpose' => 'email_verification'
        ]);
        $usedRecord = $usedStmt->fetch();
        
        if ($usedRecord) {
            echo "Found OTP but it's used: " . ($usedRecord['is_used'] ? 'YES' : 'NO') . "\n";
        } else {
            echo "No OTP found with this code\n";
        }
        
        http_response_code(400);
        echo json_encode(['error' => 'Invalid or expired OTP code']);
        exit;
    }
    
    echo "✅ Found matching OTP: ID {$otpRecord['id']}\n";
    echo "Expires at: {$otpRecord['expires_at']}\n";
    echo "Created at: {$otpRecord['created_at']}\n";
    
    // Check if expired
    $expiresAt = strtotime($otpRecord['expires_at']);
    $now = time();
    
    echo "Expires timestamp: {$expiresAt}\n";
    echo "Current timestamp: {$now}\n";
    echo "Time difference: " . ($now - $expiresAt) . " seconds\n";
    
    if ($now > $expiresAt) {
        echo "❌ OTP is expired\n";
        http_response_code(400);
        echo json_encode(['error' => 'OTP has expired']);
        exit;
    }
    
    echo "✅ OTP is valid and not expired\n";
    
    // Mark OTP as used
    $updateStmt = $pdo->prepare('UPDATE otp_verifications SET is_used = 1 WHERE id = :id');
    $updateStmt->execute([':id' => $otpRecord['id']]);
    
    echo "✅ OTP marked as used\n";
    echo json_encode(['ok' => true, 'message' => 'OTP verified successfully']);
    
} catch (Throwable $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    http_response_code(500);
    echo json_encode(['error' => 'Failed to verify OTP', 'detail' => $e->getMessage()]);
}
?>
