<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['NoteId','user_id','reason']);

$stmt = $pdo->prepare('INSERT INTO reports (NoteId, user_id, reason, status, created_at) VALUES (:nid, :uid, :reason, :status, NOW())');
$stmt->execute([
    ':nid' => (int)$input['NoteId'],
    ':uid' => (int)$input['user_id'],
    ':reason' => (string)$input['reason'],
    ':status' => isset($input['status']) ? (string)$input['status'] : 'pending',
]);

echo json_encode(['ok' => true, 'ReportId' => (int)$pdo->lastInsertId()]);


