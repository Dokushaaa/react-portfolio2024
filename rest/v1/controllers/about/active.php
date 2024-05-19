<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/About.php';

$conn = null;
$conn = checkDbConnection();

$about = new About($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("aboutid", $_GET)) {

        checkPayload($data);
        $about->about_aid = $_GET['aboutid'];
        $about->about_is_active = trim($data["isActive"]);
        $about->about_datetime = date("Y-m-d H:i:s");
        checkId($about->about_aid);
        $query = checkActive($about);
        http_response_code(200);
        returnSuccess($about, "about", $query);
    }
    checkEndpoint();
}



http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();