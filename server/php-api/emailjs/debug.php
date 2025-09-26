<?php
// Simple debug script to test EmailJS API
header('Content-Type: application/json');

$EMAILJS_CONFIG = [
    'PUBLIC_KEY' => 'VESgaxHK7KT_7I0oi',
    'PRIVATE_KEY' => 'ghNU8-8xD0KYwW6Gwu5EH',
    'SERVICE_ID' => 'service_qv5wd53',
    'TEMPLATE_ID' => 'template_4b06ltq',
];

$url = 'https://api.emailjs.com/api/v1.0/email/send';

$data = [
    'service_id' => $EMAILJS_CONFIG['SERVICE_ID'],
    'template_id' => $EMAILJS_CONFIG['TEMPLATE_ID'],
    'user_id' => $EMAILJS_CONFIG['PUBLIC_KEY'],
    'private_key' => $EMAILJS_CONFIG['PRIVATE_KEY'],
    'template_params' => [
        'to_email' => 'test@example.com',
        'otp_code' => '123456',
        'user_name' => 'Test User',
        'app_name' => 'Note2Note',
        'expiry_minutes' => 10,
    ],
];

echo json_encode([
    'config' => $EMAILJS_CONFIG,
    'url' => $url,
    'data' => $data,
    'json_data' => json_encode($data)
], JSON_PRETTY_PRINT);
?>

