<?php
$conn = null;
$conn = checkDbConnection();
$certs = new Certs($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($certs);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();