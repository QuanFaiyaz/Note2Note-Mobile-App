<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

// Accept JSON or form-encoded
$input = read_json_body();
if (empty($input) && !empty($_POST)) {
    $input = $_POST;
}

// Debug: log what we received
error_log('Received data: ' . json_encode($input));

// Support minimal payload: email + password only
if (isset($input['email']) && isset($input['password'])) {
    $input = [
        'Email' => (string)$input['email'],
        'FirstName' => (string)($input['firstName'] ?? ''),
        'LastName' => (string)($input['lastName'] ?? ''),
        'MiddleName' => (string)($input['middleName'] ?? ''),
        'Mobile_No' => (string)($input['mobileNo'] ?? ''),
        'Course' => (string)($input['course'] ?? ''),
        'Password' => (string)$input['password'],
        'Account_Type' => 'Student',
        'is_Admin' => 0,
        'status' => 'Pending',
        'email_verified' => 0,
    ];
}

// Only require the fields that actually exist
require_fields($input, ['Email','Password','FirstName','LastName']);

try {
    $hash = password_hash((string)$input['Password'], PASSWORD_BCRYPT);

    $stmt = $pdo->prepare('INSERT INTO users (Email, FirstName, LastName, MiddleName, Mobile_No, Course, Account_Type, is_Admin, status, email_verified, Password) VALUES (:email, :fn, :ln, :mn, :mobile, :course, :account_type, :admin, :status, :email_verified, :pwd)');
    $stmt->execute([
        ':email' => (string)$input['Email'],
        ':fn' => (string)$input['FirstName'],
        ':ln' => (string)$input['LastName'],
        ':mn' => (string)$input['MiddleName'],
        ':mobile' => (string)$input['Mobile_No'],
        ':course' => (string)$input['Course'],
        ':account_type' => (string)$input['Account_Type'],
        ':admin' => isset($input['is_Admin']) ? (int)$input['is_Admin'] : 0,
        ':status' => (string)$input['status'],
        ':email_verified' => isset($input['email_verified']) ? (int)$input['email_verified'] : 0,
        ':pwd' => $hash,
    ]);

    echo json_encode(['ok' => true, 'user_id' => (int)$pdo->lastInsertId()]);
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Insert failed', 'detail' => $e->getMessage()]);
}