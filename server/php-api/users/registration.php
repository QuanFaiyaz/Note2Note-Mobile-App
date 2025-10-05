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
        'Phone' => (string)($input['mobileNo'] ?? ''),
        'Course' => (string)($input['course'] ?? ''),
        'Password' => (string)$input['password'],
        'Account_Type' => 'Student',
        'is_Admin' => 0,
        'otp_verified' => $input['otp_verified'] ?? false, // Preserve the otp_verified flag
    ];
}

// Only require the fields that actually exist
require_fields($input, ['Email','Password','FirstName','LastName']);

// Check if OTP was verified by looking in the database
$email = (string)$input['Email'];
$otpCheckStmt = $pdo->prepare('SELECT id FROM otp_requests WHERE email = :email AND status = :status AND purpose = :purpose LIMIT 1');
$otpCheckStmt->execute([
    ':email' => $email,
    ':status' => 'verified',
    ':purpose' => 'signup'
]);
$verifiedOtp = $otpCheckStmt->fetch();

if (!$verifiedOtp) {
    http_response_code(400);
    echo json_encode(['error' => 'Email must be verified with OTP first. Please complete OTP verification.']);
    exit;
}

try {
    $hash = password_hash((string)$input['Password'], PASSWORD_BCRYPT);

    $stmt = $pdo->prepare('INSERT INTO users (Email, FirstName, LastName, MiddleName, Phone, Course, Account_Type, is_Admin, Password) VALUES (:email, :fn, :ln, :mn, :phone, :course, :account_type, :admin, :pwd)');
    $stmt->execute([
        ':email' => (string)$input['Email'],
        ':fn' => (string)$input['FirstName'],
        ':ln' => (string)$input['LastName'],
        ':mn' => (string)$input['MiddleName'],
        ':phone' => (string)$input['Phone'],
        ':course' => (string)$input['Course'],
        ':account_type' => (string)$input['Account_Type'],
        ':admin' => isset($input['is_Admin']) ? (int)$input['is_Admin'] : 0,
        ':pwd' => $hash,
    ]);

    echo json_encode(['ok' => true, 'user_id' => (int)$pdo->lastInsertId()]);
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Insert failed', 'detail' => $e->getMessage()]);
}