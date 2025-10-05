<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$courseId = isset($_GET['course_id']) ? (int)$_GET['course_id'] : 0;

$sql = 'SELECT s.subject_id, s.subject_code, s.subject_name, s.subject_description, s.course, s.is_active FROM subjects s'
     . ($courseId > 0 ? ' WHERE s.course = :course_name' : '')
     . ' ORDER BY s.course, s.subject_name';
     
$stmt = $pdo->prepare($sql);
if ($courseId > 0) {
    $stmt->bindValue(':course_name', $courseId, PDO::PARAM_STR);
}
$stmt->execute();
echo json_encode(['data' => $stmt->fetchAll()]);


