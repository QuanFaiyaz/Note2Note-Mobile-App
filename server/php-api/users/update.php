<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['user_id']);

$userId = (int)$input['user_id'];
$fields = [];
$params = [':id' => $userId];

if (isset($input['FirstName'])) { $fields[] = 'FirstName = :fn'; $params[':fn'] = (string)$input['FirstName']; }
if (isset($input['LastName'])) { $fields[] = 'LastName = :ln'; $params[':ln'] = (string)$input['LastName']; }
if (isset($input['MiddleName'])) { $fields[] = 'MiddleName = :mn'; $params[':mn'] = (string)$input['MiddleName']; }
if (isset($input['Mobile_No'])) { $fields[] = 'Mobile_No = :mobile'; $params[':mobile'] = (string)$input['Mobile_No']; }
if (isset($input['Course'])) { $fields[] = 'Course = :course'; $params[':course'] = (string)$input['Course']; }
if (isset($input['profile_picture'])) { $fields[] = 'profile_picture = :pic'; $params[':pic'] = (string)$input['profile_picture']; }
if (isset($input['date_of_birth'])) { $fields[] = 'date_of_birth = :dob'; $params[':dob'] = (string)$input['date_of_birth']; }
if (isset($input['gender'])) { $fields[] = 'gender = :gender'; $params[':gender'] = (string)$input['gender']; }
if (isset($input['address'])) { $fields[] = 'address = :address'; $params[':address'] = (string)$input['address']; }
if (isset($input['emergency_contact'])) { $fields[] = 'emergency_contact = :emergency'; $params[':emergency'] = (string)$input['emergency_contact']; }

if (empty($fields)) {
    echo json_encode(['ok' => true, 'unchanged' => true]);
    exit;
}

$fields[] = 'updated_at = CURRENT_TIMESTAMP';
$sql = 'UPDATE users SET ' . implode(', ', $fields) . ' WHERE user_id = :id';
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode(['ok' => true]);
