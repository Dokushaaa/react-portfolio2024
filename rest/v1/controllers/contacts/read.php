<?php
$conn = null;
$conn = checkDbConnection();
$contacts = new Contacts($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($contacts);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();