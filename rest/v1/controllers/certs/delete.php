<?php
$conn = null;
$conn = checkDbConnection();
$certs = new Certs($conn);

$error = [];
$returnData = [];
if (array_key_exists("certsid", $_GET)) {
    $certs->certs_aid = $_GET['certsid'];
    checkId($certs->certs_aid);

    $query = checkDelete($certs);
    returnSuccess($certs, "certs", $query);
}

checkEndpoint();