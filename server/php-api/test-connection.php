<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

// Simple test endpoint to verify API connection
echo json_encode([
    'ok' => true,
    'message' => 'API connection successful',
    'timestamp' => date('Y-m-d H:i:s'),
    'server_ip' => $_SERVER['SERVER_ADDR'] ?? 'unknown'
]);
