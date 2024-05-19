<?php
$conn = null;
$conn = checkDbConnection();
$hero = new Hero($conn);
$error = [];
$returnData = [];
if (array_key_exists("heroid", $_GET)) {
    checkPayload($data);
     $hero->hero_aid = $_GET['heroid'];
    $hero->hero_title = checkIndex($data, "hero_title");
    $hero->hero_image = checkIndex($data, "hero_image");
    $hero->hero_description = checkIndex($data, "hero_description");
    $hero->hero_context = checkIndex($data, "hero_context");
    $hero->hero_published_date = date("Y-m-d H:i:s");
    $hero->hero_datetime = date("Y-m-d H:i:s");
    $query = checkUpdate($hero);
    returnSuccess($hero, "hero", $query);
}
checkEndpoint();