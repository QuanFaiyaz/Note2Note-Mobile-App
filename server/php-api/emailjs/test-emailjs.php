<?php
declare(strict_types=1);

// EmailJS configuration
$EMAILJS_CONFIG = [
    'PUBLIC_KEY' => 'VESgaxHK7KT_7I0oi',
    'PRIVATE_KEY' => 'ghNU8-8xD0KYwW6Gwu5EH',
    'SERVICE_ID' => 'service_qv5wd53',
    'TEMPLATE_ID' => 'template_4b06ltq',
];

function testEmailJSConnection() {
    global $EMAILJS_CONFIG;
    
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
    
    echo "Testing EmailJS API connection...\n";
    echo "URL: " . $url . "\n";
    echo "Data: " . json_encode($data, JSON_PRETTY_PRINT) . "\n\n";
    
    // Use cURL for better HTTP handling
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
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);
    
    echo "HTTP Code: " . $httpCode . "\n";
    echo "Response: " . $result . "\n";
    echo "Error: " . $error . "\n";
    echo "Info: " . json_encode($info, JSON_PRETTY_PRINT) . "\n";
    
    return [
        'success' => $httpCode === 200 && empty($error),
        'http_code' => $httpCode,
        'response' => $result,
        'error' => $error,
        'info' => $info
    ];
}

// Test the connection
$result = testEmailJSConnection();

echo "\n=== TEST RESULT ===\n";
echo "Success: " . ($result['success'] ? 'YES' : 'NO') . "\n";
echo "HTTP Code: " . $result['http_code'] . "\n";
echo "Response: " . $result['response'] . "\n";
echo "Error: " . $result['error'] . "\n";
?>

