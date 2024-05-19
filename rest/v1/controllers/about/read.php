<?php
$conn = null;
$conn = checkDbConnection();
$about = new About($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($about);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();