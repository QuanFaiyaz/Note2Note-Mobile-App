<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$stmt = $pdo->query('SELECT course_id, course_code, course_name, course_description, duration_years, credits_required, is_active FROM courses WHERE is_active = 1 ORDER BY course_name');
echo json_encode(['data' => $stmt->fetchAll()]);
