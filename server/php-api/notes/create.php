<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['user_id','title','content','subject_id']);

$stmt = $pdo->prepare('INSERT INTO notes (user_id, subject_id, title, content, file_path, file_type, file_size, is_public, is_featured, tags) VALUES (:uid, :sid, :title, :content, :file_path, :file_type, :file_size, :is_public, :is_featured, :tags)');
$stmt->execute([
    ':uid' => (int)$input['user_id'],
    ':sid' => (int)$input['subject_id'],
    ':title' => (string)$input['title'],
    ':content' => (string)$input['content'],
    ':file_path' => isset($input['file_path']) ? (string)$input['file_path'] : null,
    ':file_type' => isset($input['file_type']) ? (string)$input['file_type'] : null,
    ':file_size' => isset($input['file_size']) ? (int)$input['file_size'] : null,
    ':is_public' => isset($input['is_public']) ? (int)$input['is_public'] : 1,
    ':is_featured' => isset($input['is_featured']) ? (int)$input['is_featured'] : 0,
    ':tags' => isset($input['tags']) ? (string)$input['tags'] : null,
]);

echo json_encode(['ok' => true, 'note_id' => (int)$pdo->lastInsertId()]);


