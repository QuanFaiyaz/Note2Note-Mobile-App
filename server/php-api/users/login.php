<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$input = read_json_body();
if (empty($input) && !empty($_POST)) { $input = $_POST; }

// Support email/password minimal payload
if (isset($input['email']) && isset($input['password'])) {
    $input = [
        'Email' => (string)$input['email'],
        'Password' => (string)$input['password'],
    ];
}

require_fields($input, ['Email','Password']);

$stmt = $pdo->prepare('SELECT user_id, Email, FirstName, LastName, MiddleName, Mobile_No, Course, Account_Type, is_Admin, status, email_verified, profile_picture, date_of_birth, gender, address, emergency_contact, created_at, last_login, Password FROM users WHERE Email = :email LIMIT 1');
$stmt->execute([':email' => (string)$input['Email']]);
$user = $stmt->fetch();

if (!$user || !password_verify((string)$input['Password'], (string)$user['Password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// Check if user account is active
if ($user['status'] !== 'Active') {
    http_response_code(403);
    echo json_encode(['error' => 'Account is ' . $user['status']]);
    exit;
}

// Update last login timestamp
$updateStmt = $pdo->prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = :user_id');
$updateStmt->execute([':user_id' => $user['user_id']]);

unset($user['Password']);
echo json_encode(['ok' => true, 'user' => $user]);
?>