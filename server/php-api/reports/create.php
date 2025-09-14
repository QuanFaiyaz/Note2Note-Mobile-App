<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['reporter_id','report_type','description']);

$stmt = $pdo->prepare('INSERT INTO reports (reporter_id, reported_user_id, reported_note_id, report_type, description, status) VALUES (:reporter_id, :reported_user_id, :reported_note_id, :report_type, :description, :status)');
$stmt->execute([
    ':reporter_id' => (int)$input['reporter_id'],
    ':reported_user_id' => isset($input['reported_user_id']) ? (int)$input['reported_user_id'] : null,
    ':reported_note_id' => isset($input['reported_note_id']) ? (int)$input['reported_note_id'] : null,
    ':report_type' => (string)$input['report_type'],
    ':description' => (string)$input['description'],
    ':status' => isset($input['status']) ? (string)$input['status'] : 'pending',
]);

echo json_encode(['ok' => true, 'report_id' => (int)$pdo->lastInsertId()]);


