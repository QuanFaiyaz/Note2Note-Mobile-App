<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Test data
$testData = [
    'email' => 'test@example.com',
    'password' => 'test123'
];

echo json_encode([
    'received_data' => $_POST,
    'json_data' => json_decode(file_get_contents('php://input'), true),
    'test_data' => $testData,
    'method' => $_SERVER['REQUEST_METHOD']
]);
?>
