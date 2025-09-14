<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'user_id is required']);
    exit;
}

$sql = 'SELECT b.bookmark_id, b.created_at, n.note_id, n.title, n.content, n.file_path, n.file_type, n.is_public, n.download_count, n.view_count, n.rating, n.tags, n.created_at as note_created, s.subject_code, s.subject_name, c.course_code, c.course_name, u.FirstName, u.LastName 
        FROM bookmarks b 
        JOIN notes n ON b.note_id = n.note_id 
        LEFT JOIN subjects s ON n.subject_id = s.subject_id 
        LEFT JOIN courses c ON s.course_id = c.course_id 
        LEFT JOIN users u ON n.user_id = u.user_id 
        WHERE b.user_id = :uid 
        ORDER BY b.created_at DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute([':uid' => $userId]);
echo json_encode(['data' => $stmt->fetchAll()]);
