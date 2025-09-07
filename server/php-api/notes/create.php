<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['user_id','Title','Description','SubjectId']);

$stmt = $pdo->prepare('INSERT INTO notes (user_id, Title, Description, SubjectId) VALUES (:uid, :title, :desc, :sid)');
$stmt->execute([
    ':uid' => (int)$input['user_id'],
    ':title' => (string)$input['Title'],
    ':desc' => (string)$input['Description'],
    ':sid' => (int)$input['SubjectId'],
]);

echo json_encode(['ok' => true, 'NoteId' => (int)$pdo->lastInsertId()]);


