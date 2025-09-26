<?php
// Simple EmailJS test without private key
header('Content-Type: application/json');

$url = 'https://api.emailjs.com/api/v1.0/email/send';

$data = [
    'service_id' => 'service_qv5wd53',
    'template_id' => 'template_4b06ltq',
    'user_id' => 'VESgaxHK7KT_7I0oi',
    'template_params' => [
        'to_email' => 'your-email@example.com',
        'otp_code' => '123456',
        'user_name' => 'Test User',
        'app_name' => 'Note2Note',
        'expiry_minutes' => 10,
    ],
];

// Also test with different parameter names
$data2 = [
    'service_id' => 'service_qv5wd53',
    'template_id' => 'template_4b06ltq',
    'user_id' => 'VESgaxHK7KT_7I0oi',
    'template_params' => [
        'email' => 'your-email@example.com',
        'otp_code' => '123456',
        'user_name' => 'Test User',
        'app_name' => 'Note2Note',
        'expiry_minutes' => 10,
    ],
];

echo "Testing EmailJS API (no private key)...\n";
echo "URL: " . $url . "\n";
echo "Data: " . json_encode($data, JSON_PRETTY_PRINT) . "\n\n";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'User-Agent: Note2Note-PHP/1.0'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
$info = curl_getinfo($ch);
curl_close($ch);

echo "HTTP Code: " . $httpCode . "\n";
echo "Response: " . $result . "\n";
echo "Error: " . $error . "\n";

if ($httpCode === 200) {
    echo "SUCCESS: EmailJS is working!\n";
} else {
    echo "FAILED: EmailJS returned error\n";
}
?>
