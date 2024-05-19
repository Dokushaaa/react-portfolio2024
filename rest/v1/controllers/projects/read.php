<?php
$conn = null;
$conn = checkDbConnection();
$projects = new Projects($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($projects);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();