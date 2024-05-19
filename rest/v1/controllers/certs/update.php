<?php
$conn = null;
$conn = checkDbConnection();
$certs = new Certs($conn);
$error = [];
$returnData = [];
if (array_key_exists("certsid", $_GET)) {
    checkPayload($data);
     $certs->certs_aid = $_GET['certsid'];
    $certs->certs_title = checkIndex($data, "certs_title");
    $certs->certs_description = checkIndex($data, "certs_description");
    $certs->certs_image = checkIndex($data, "certs_image");
    $certs->certs_published_date = date("Y-m-d H:i:s");
    $certs->certs_datetime = date("Y-m-d H:i:s");date("Y-m-d H:i:s");
    $query = checkUpdate($certs);
    returnSuccess($certs, "certs", $query);
}
checkEndpoint();