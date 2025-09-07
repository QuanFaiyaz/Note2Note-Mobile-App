<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['user_id','NoteId']);

$userId = (int)$input['user_id'];
$noteId = (int)$input['NoteId'];

// Check if exists
$stmt = $pdo->prepare('SELECT BookmarkId FROM bookmark WHERE user_id = :uid AND NoteId = :nid LIMIT 1');
$stmt->execute([':uid' => $userId, ':nid' => $noteId]);
$row = $stmt->fetch();

if ($row) {
    $del = $pdo->prepare('DELETE FROM bookmark WHERE BookmarkId = :id');
    $del->execute([':id' => (int)$row['BookmarkId']]);
    echo json_encode(['ok' => true, 'bookmarked' => false]);
} else {
    $ins = $pdo->prepare('INSERT INTO bookmark (user_id, NoteId, created_at) VALUES (:uid, :nid, NOW())');
    $ins->execute([':uid' => $userId, ':nid' => $noteId]);
    echo json_encode(['ok' => true, 'bookmarked' => true]);
}


