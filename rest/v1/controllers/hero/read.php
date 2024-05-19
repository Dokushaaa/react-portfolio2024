<?php
$conn = null;
$conn = checkDbConnection();
$hero = new Hero($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($hero);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();