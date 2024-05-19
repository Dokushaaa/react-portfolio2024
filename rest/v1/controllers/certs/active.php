<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/Certs.php';

$conn = null;
$conn = checkDbConnection();

$certs = new Certs($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("certsid", $_GET)) {

        checkPayload($data);
        $certs->certs_aid = $_GET['certsid'];
        $certs->certs_is_active = trim($data["isActive"]);
        $certs->certs_datetime = date("Y-m-d H:i:s");
        checkId($certs->certs_aid);
        $query = checkActive($certs);
        http_response_code(200);
        returnSuccess($certs, "certs", $query);
    }
    checkEndpoint();
}



http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();