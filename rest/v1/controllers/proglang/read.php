<?php
$conn = null;
$conn = checkDbConnection();
$proglang = new ProgLang($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($proglang);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();