<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['NoteId']);

$stmt = $pdo->prepare('DELETE FROM notes WHERE NoteId = :id');
$stmt->execute([':id' => (int)$input['NoteId']]);

echo json_encode(['ok' => true]);


