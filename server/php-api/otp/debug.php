<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

// Debug endpoint to check OTP records
header('Content-Type: application/json');

try {
    // Get all recent OTP records
    $stmt = $pdo->query('SELECT * FROM otp_verifications ORDER BY created_at DESC LIMIT 10');
    $otps = $stmt->fetchAll();
    
    echo json_encode([
        'ok' => true,
        'recent_otps' => $otps,
        'total_count' => count($otps)
    ], JSON_PRETTY_PRINT);
    
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch OTP records', 'detail' => $e->getMessage()]);
}
?>
