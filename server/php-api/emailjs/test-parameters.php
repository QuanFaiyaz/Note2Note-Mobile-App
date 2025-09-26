<?php
// Test EmailJS template configuration
header('Content-Type: application/json');

$url = 'https://api.emailjs.com/api/v1.0/email/send';

// Test 1: Using to_email parameter
$data1 = [
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

// Test 2: Using email parameter
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

// Test 3: Using recipient_email parameter
$data3 = [
    'service_id' => 'service_qv5wd53',
    'template_id' => 'template_4b06ltq',
    'user_id' => 'VESgaxHK7KT_7I0oi',
    'template_params' => [
        'recipient_email' => 'your-email@example.com',
        'otp_code' => '123456',
        'user_name' => 'Test User',
        'app_name' => 'Note2Note',
        'expiry_minutes' => 10,
    ],
];

function testEmailJS($data, $testName) {
    $url = 'https://api.emailjs.com/api/v1.0/email/send';
    
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
    curl_close($ch);

    echo "=== $testName ===\n";
    echo "HTTP Code: $httpCode\n";
    echo "Response: $result\n";
    echo "Error: $error\n";
    echo "Success: " . ($httpCode === 200 ? "YES" : "NO") . "\n\n";
    
    return $httpCode === 200;
}

echo "Testing different EmailJS parameter names...\n\n";

testEmailJS($data1, "Test 1: to_email parameter");
testEmailJS($data2, "Test 2: email parameter");
testEmailJS($data3, "Test 3: recipient_email parameter");

echo "If all tests fail, the issue might be:\n";
echo "1. Template configuration in EmailJS dashboard\n";
echo "2. Service configuration\n";
echo "3. Template parameter names don't match\n";
echo "4. Template needs to be published/activated\n";
?>
