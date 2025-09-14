<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['note_id']);

$noteId = (int)$input['note_id'];
$fields = [];
$params = [':id' => $noteId];

if (isset($input['title'])) { $fields[] = 'title = :title'; $params[':title'] = (string)$input['title']; }
if (isset($input['content'])) { $fields[] = 'content = :content'; $params[':content'] = (string)$input['content']; }
if (isset($input['subject_id'])) { $fields[] = 'subject_id = :sid'; $params[':sid'] = (int)$input['subject_id']; }
if (isset($input['file_path'])) { $fields[] = 'file_path = :file_path'; $params[':file_path'] = (string)$input['file_path']; }
if (isset($input['file_type'])) { $fields[] = 'file_type = :file_type'; $params[':file_type'] = (string)$input['file_type']; }
if (isset($input['file_size'])) { $fields[] = 'file_size = :file_size'; $params[':file_size'] = (int)$input['file_size']; }
if (isset($input['is_public'])) { $fields[] = 'is_public = :is_public'; $params[':is_public'] = (int)$input['is_public']; }
if (isset($input['is_featured'])) { $fields[] = 'is_featured = :is_featured'; $params[':is_featured'] = (int)$input['is_featured']; }
if (isset($input['tags'])) { $fields[] = 'tags = :tags'; $params[':tags'] = (string)$input['tags']; }

if (empty($fields)) {
    echo json_encode(['ok' => true, 'unchanged' => true]);
    exit;
}

$fields[] = 'updated_at = CURRENT_TIMESTAMP';
$sql = 'UPDATE notes SET ' . implode(', ', $fields) . ' WHERE note_id = :id';
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode(['ok' => true]);


