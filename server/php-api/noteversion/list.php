<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

$noteId = isset($_GET['NoteId']) ? (int)$_GET['NoteId'] : 0;
require_fields(['NoteId' => $noteId], ['NoteId']);

$stmt = $pdo->prepare('SELECT VersionId, NoteId, OCTET_LENGTH(Content) AS ContentLength, UpdatedAt FROM noteversion WHERE NoteId = :nid ORDER BY VersionId DESC');
$stmt->execute([':nid' => $noteId]);
echo json_encode(['data' => $stmt->fetchAll()]);


