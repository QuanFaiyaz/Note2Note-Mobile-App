<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Simulate the exact data your app sends
$testData = [
    'email' => 'test@example.com',
    'password' => 'test123'
];

try {
    $dsn = 'mysql:host=127.0.0.1;dbname=note2note;charset=utf8mb4';
    $pdo = new PDO($dsn, 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    $hash = password_hash($testData['password'], PASSWORD_BCRYPT);
    
    $stmt = $pdo->prepare('INSERT INTO users (Email, LastName, FirstName, MiddleName, Course, Password, is_Admin) VALUES (:email, :ln, :fn, :mn, :course, :pwd, :admin)');
    $stmt->execute([
        ':email' => $testData['email'],
        ':ln' => '',
        ':fn' => '',
        ':mn' => '',
        ':course' => '',
        ':pwd' => $hash,
        ':admin' => 0,
    ]);
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Test registration worked',
        'user_id' => (int)$pdo->lastInsertId()
    ]);
    
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Test registration failed',
        'error' => $e->getMessage()
    ]);
}
?>
