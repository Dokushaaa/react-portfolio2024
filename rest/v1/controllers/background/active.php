<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/Background.php';

$conn = null;
$conn = checkDbConnection();

$background = new Background($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("backgroundid", $_GET)) {

        checkPayload($data);
        $background->background_aid = $_GET['backgroundid'];
        $background->background_is_active = trim($data["isActive"]);
        $background->background_datetime = date("Y-m-d H:i:s");
        checkId($background->background_aid);
        $query = checkActive($background);
        http_response_code(200);
        returnSuccess($background, "background", $query);
    }
    checkEndpoint();
}



http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();