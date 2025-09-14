<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['note_id']);

$stmt = $pdo->prepare('DELETE FROM notes WHERE note_id = :id');
$stmt->execute([':id' => (int)$input['note_id']]);

echo json_encode(['ok' => true]);


