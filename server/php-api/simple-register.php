<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Get the raw input
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

// Log everything for debugging
error_log('Raw input: ' . $rawInput);
error_log('Parsed input: ' . json_encode($input));
error_log('POST data: ' . json_encode($_POST));
error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);

// Try to register if we have valid data
if ($input && isset($input['email']) && isset($input['password'])) {
    try {
        $dsn = 'mysql:host=127.0.0.1;dbname=note2note;charset=utf8mb4';
        $pdo = new PDO($dsn, 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        
        $hash = password_hash($input['password'], PASSWORD_BCRYPT);
        
        $stmt = $pdo->prepare('INSERT INTO users (Email, LastName, FirstName, MiddleName, Course, Password, is_Admin) VALUES (:email, :ln, :fn, :mn, :course, :pwd, :admin)');
        $stmt->execute([
            ':email' => $input['email'],
            ':ln' => '',
            ':fn' => '',
            ':mn' => '',
            ':course' => '',
            ':pwd' => $hash,
            ':admin' => 0,
        ]);
        
        echo json_encode(['ok' => true, 'user_id' => (int)$pdo->lastInsertId()]);
        
    } catch (Throwable $e) {
        http_response_code(400);
        echo json_encode(['error' => 'Registration failed', 'detail' => $e->getMessage()]);
    }
} else {
    // Debug response
    echo json_encode([
        'status' => 'debug',
        'raw_input' => $rawInput,
        'parsed_input' => $input,
        'post_data' => $_POST,
        'method' => $_SERVER['REQUEST_METHOD'],
        'error' => 'Missing email or password'
    ]);
}
?>
