<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

$sql = 'SELECT NoteId, user_id, Title, Description, SubjectId FROM notes'
     . ($userId > 0 ? ' WHERE user_id = :uid' : '')
     . ' ORDER BY NoteId DESC';
$stmt = $pdo->prepare($sql);
if ($userId > 0) {
    $stmt->bindValue(':uid', $userId, PDO::PARAM_INT);
}
$stmt->execute();
echo json_encode(['data' => $stmt->fetchAll()]);


