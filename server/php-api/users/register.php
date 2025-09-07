<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

// Accept JSON or form-encoded
$input = read_json_body();
if (empty($input) && !empty($_POST)) {
    $input = $_POST;
}

// Support minimal payload: email + password
if (isset($input['email']) && isset($input['password'])) {
    $input = [
        'Email' => (string)$input['email'],
        'LastName' => '',
        'FirstName' => '',
        'MiddleName' => '',
        'Course' => '',
        'Password' => (string)$input['password'],
        'is_Admin' => 0,
    ];
}

// Accept either legacy fields or minimal email/password; ensure required exist
if (!isset($input['Email'])) {
    // allow legacy without email but still proceed
    $input['Email'] = isset($input['FirstName']) ? (string)$input['FirstName'] : '';
}

require_fields($input, ['Email','LastName','FirstName','MiddleName','Course','Password']);

try {
    $hash = password_hash((string)$input['Password'], PASSWORD_BCRYPT);

    $stmt = $pdo->prepare('INSERT INTO users (Email, LastName, FirstName, MiddleName, Course, Password, is_Admin) VALUES (:email, :ln, :fn, :mn, :course, :pwd, :admin)');
    $stmt->execute([
        ':email' => (string)$input['Email'],
        ':ln' => (string)$input['LastName'],
        ':fn' => (string)$input['FirstName'],
        ':mn' => (string)$input['MiddleName'],
        ':course' => (string)$input['Course'],
        ':pwd' => $hash,
        ':admin' => isset($input['is_Admin']) ? (int)$input['is_Admin'] : 0,
    ]);

    echo json_encode(['ok' => true, 'user_id' => (int)$pdo->lastInsertId()]);
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Insert failed', 'detail' => $e->getMessage()]);
}


