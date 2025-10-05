<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$noteId = isset($_GET['note_id']) ? (int)$_GET['note_id'] : 0;

if ($noteId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'note_id is required']);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT note_id, title, file_path, file_type, file_size FROM notes WHERE note_id = :note_id LIMIT 1');
    $stmt->execute([':note_id' => $noteId]);
    $note = $stmt->fetch();

    if (!$note) {
        http_response_code(404);
        echo json_encode(['error' => 'Note not found']);
        exit;
    }

    // Construct the full file URL
    $fileUrl = '';
    if ($note['file_path']) {
        $fileUrl = 'http://192.168.1.14/note2note/' . $note['file_path'];
    }

    echo json_encode([
        'ok' => true,
        'note' => [
            'note_id' => $note['note_id'],
            'title' => $note['title'],
            'file_path' => $note['file_path'],
            'file_type' => $note['file_type'],
            'file_size' => $note['file_size'],
            'file_url' => $fileUrl,
            'file_exists' => $note['file_path'] ? file_exists(__DIR__ . '/../' . $note['file_path']) : false
        ]
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'detail' => $e->getMessage()]);
}
?>
