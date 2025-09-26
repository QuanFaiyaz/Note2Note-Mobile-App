<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
require_fields($input, ['user_id']);

$userId = (int)$input['user_id'];

// Check if user exists
$checkStmt = $pdo->prepare('SELECT user_id FROM users WHERE user_id = :uid LIMIT 1');
$checkStmt->execute([':uid' => $userId]);
if (!$checkStmt->fetch()) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found']);
    exit;
}

// Build update query dynamically based on provided fields
$updateFields = [];
$params = [':uid' => $userId];

$allowedFields = [
    'FirstName', 'LastName', 'MiddleName', 'Mobile_No', 'Course', 
    'Account_Type', 'date_of_birth', 'gender', 'address', 'emergency_contact'
];

foreach ($allowedFields as $field) {
    if (isset($input[$field])) {
        $updateFields[] = "$field = :$field";
        $params[":$field"] = $input[$field];
    }
}

if (empty($updateFields)) {
    http_response_code(400);
    echo json_encode(['error' => 'No fields to update']);
    exit;
}

// Add updated_at timestamp
$updateFields[] = 'updated_at = NOW()';

$sql = 'UPDATE users SET ' . implode(', ', $updateFields) . ' WHERE user_id = :uid';
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

if ($stmt->rowCount() > 0) {
    echo json_encode(['ok' => true, 'message' => 'Profile updated successfully']);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No changes made']);
}
?>