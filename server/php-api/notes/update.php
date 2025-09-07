<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['NoteId']);

$noteId = (int)$input['NoteId'];
$fields = [];
$params = [':id' => $noteId];

if (isset($input['Title'])) { $fields[] = 'Title = :title'; $params[':title'] = (string)$input['Title']; }
if (isset($input['Description'])) { $fields[] = 'Description = :desc'; $params[':desc'] = (string)$input['Description']; }
if (isset($input['SubjectId'])) { $fields[] = 'SubjectId = :sid'; $params[':sid'] = (int)$input['SubjectId']; }

if (empty($fields)) {
    echo json_encode(['ok' => true, 'unchanged' => true]);
    exit;
}

$sql = 'UPDATE notes SET ' . implode(', ', $fields) . ' WHERE NoteId = :id';
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode(['ok' => true]);


