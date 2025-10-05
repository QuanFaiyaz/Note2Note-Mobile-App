<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$filePath = isset($_GET['file']) ? $_GET['file'] : '';

// Debug logging
error_log("File serving request - file parameter: " . $filePath);
error_log("File serving request - raw GET: " . print_r($_GET, true));

if (empty($filePath)) {
    http_response_code(400);
    echo json_encode(['error' => 'file parameter is required']);
    exit;
}

// Security check - only allow files in uploads directory
if (strpos($filePath, 'uploads/') !== 0) {
    error_log("Security check failed - file path: " . $filePath);
    http_response_code(403);
    echo json_encode(['error' => 'Access denied - invalid file path', 'file_path' => $filePath]);
    exit;
}

$fullPath = __DIR__ . '/../' . $filePath;
error_log("Full file path: " . $fullPath);

if (!file_exists($fullPath)) {
    error_log("File not found: " . $fullPath);
    http_response_code(404);
    echo json_encode(['error' => 'File not found', 'full_path' => $fullPath]);
    exit;
}

// Get file info
$fileInfo = pathinfo($fullPath);
$mimeType = mime_content_type($fullPath);

// Set appropriate headers
header('Content-Type: ' . $mimeType);
header('Content-Length: ' . filesize($fullPath));
header('Content-Disposition: inline; filename="' . basename($filePath) . '"');
header('Cache-Control: public, max-age=3600');

// Output the file
readfile($fullPath);
?>
