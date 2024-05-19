<?php
$conn = null;
$conn = checkDbConnection();
$background = new Background($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($background);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();