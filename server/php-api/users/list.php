<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$stmt = $pdo->query('SELECT user_id, Email, LastName, FirstName, MiddleName, Course, is_Admin FROM users ORDER BY user_id DESC');
echo json_encode(['data' => $stmt->fetchAll()]);