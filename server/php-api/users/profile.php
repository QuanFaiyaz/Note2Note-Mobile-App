<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

if ($userId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'user_id is required']);
    exit;
}

$stmt = $pdo->prepare('SELECT user_id, Email, FirstName, LastName, MiddleName, Phone, Course, Account_Type, is_Admin, is_active, created_at, updated_at, credibility_score, total_points, level FROM users WHERE user_id = :uid LIMIT 1');
$stmt->execute([':uid' => $userId]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found']);
    exit;
}

// Get user's note count
$noteStmt = $pdo->prepare('SELECT COUNT(*) as note_count FROM notes WHERE user_id = :uid');
$noteStmt->execute([':uid' => $userId]);
$noteCount = $noteStmt->fetch()['note_count'];

// Get user's bookmark count
$bookmarkStmt = $pdo->prepare('SELECT COUNT(*) as bookmark_count FROM bookmarks WHERE user_id = :uid');
$bookmarkStmt->execute([':uid' => $userId]);
$bookmarkCount = $bookmarkStmt->fetch()['bookmark_count'];

$user['note_count'] = (int)$noteCount;
$user['bookmark_count'] = (int)$bookmarkCount;

echo json_encode(['ok' => true, 'user' => $user]);
