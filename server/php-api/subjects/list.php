<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$stmt = $pdo->query('SELECT SubjectId, SubjectCode, SubjectName FROM subjects ORDER BY SubjectName');
echo json_encode(['data' => $stmt->fetchAll()]);


