<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Get the raw input
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

// Log everything for debugging
error_log('Raw input: ' . $rawInput);
error_log('Parsed input: ' . json_encode($input));
error_log('POST data: ' . json_encode($_POST));
error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);

// Simple test - just return what we received
echo json_encode([
    'status' => 'debug',
    'raw_input' => $rawInput,
    'parsed_input' => $input,
    'post_data' => $_POST,
    'method' => $_SERVER['REQUEST_METHOD']
]);
?>
