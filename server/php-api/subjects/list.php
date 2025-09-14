<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$courseId = isset($_GET['course_id']) ? (int)$_GET['course_id'] : 0;

$sql = 'SELECT s.subject_id, s.subject_code, s.subject_name, s.subject_description, s.credits, s.semester, s.is_active, c.course_code, c.course_name FROM subjects s LEFT JOIN courses c ON s.course_id = c.course_id'
     . ($courseId > 0 ? ' WHERE s.course_id = :course_id' : '')
     . ' ORDER BY c.course_name, s.semester, s.subject_name';
     
$stmt = $pdo->prepare($sql);
if ($courseId > 0) {
    $stmt->bindValue(':course_id', $courseId, PDO::PARAM_INT);
}
$stmt->execute();
echo json_encode(['data' => $stmt->fetchAll()]);


