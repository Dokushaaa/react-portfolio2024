<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/Hero.php';

$conn = null;
$conn = checkDbConnection();

$hero = new Hero($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("heroid", $_GET)) {

        checkPayload($data);
        $hero->hero_aid = $_GET['heroid'];
        $hero->hero_is_active = trim($data["isActive"]);
        $hero->hero_datetime = date("Y-m-d H:i:s");
        checkId($hero->hero_aid);
        $query = checkActive($hero);
        http_response_code(200);
        returnSuccess($hero, "hero", $query);
    }
    checkEndpoint();
}



http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();