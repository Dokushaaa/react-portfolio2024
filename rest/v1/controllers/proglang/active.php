<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/ProgLang.php';

$conn = null;
$conn = checkDbConnection();

$proglang = new ProgLang($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("proglangid", $_GET)) {

        checkPayload($data);
        $proglang->proglang_aid = $_GET['proglangid'];
        $proglang->proglang_is_active = trim($data["isActive"]);
        $proglang->proglang_datetime = date("Y-m-d H:i:s");
        checkId($proglang->proglang_aid);
        $query = checkActive($proglang);
        http_response_code(200);
        returnSuccess($proglang, "proglang", $query);
    }
    checkEndpoint();
}



http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();