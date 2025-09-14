<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['user_id','note_id']);

$userId = (int)$input['user_id'];
$noteId = (int)$input['note_id'];

// Check if exists
$stmt = $pdo->prepare('SELECT bookmark_id FROM bookmarks WHERE user_id = :uid AND note_id = :nid LIMIT 1');
$stmt->execute([':uid' => $userId, ':nid' => $noteId]);
$row = $stmt->fetch();

if ($row) {
    $del = $pdo->prepare('DELETE FROM bookmarks WHERE bookmark_id = :id');
    $del->execute([':id' => (int)$row['bookmark_id']]);
    echo json_encode(['ok' => true, 'bookmarked' => false]);
} else {
    $ins = $pdo->prepare('INSERT INTO bookmarks (user_id, note_id) VALUES (:uid, :nid)');
    $ins->execute([':uid' => $userId, ':nid' => $noteId]);
    echo json_encode(['ok' => true, 'bookmarked' => true]);
}


