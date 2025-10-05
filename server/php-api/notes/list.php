<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

$sql = 'SELECT n.note_id, n.user_id, n.title, n.content, n.file_path, n.file_type, n.file_size, n.is_public, n.download_count, n.view_count, n.upvotes, n.downvotes, n.created_at, n.updated_at, s.subject_code, s.subject_name, s.course, u.FirstName, u.LastName FROM notes n LEFT JOIN subjects s ON n.subject_id = s.subject_id LEFT JOIN users u ON n.user_id = u.user_id'
     . ($userId > 0 ? ' WHERE n.user_id = :uid' : '')
     . ' ORDER BY n.created_at DESC';
$stmt = $pdo->prepare($sql);
if ($userId > 0) {
    $stmt->bindValue(':uid', $userId, PDO::PARAM_INT);
}
$stmt->execute();
echo json_encode(['data' => $stmt->fetchAll()]);


