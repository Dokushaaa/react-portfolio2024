<?php
$conn = null;
$conn = checkDbConnection();
$hero = new Hero($conn);
if (array_key_exists("heroid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$hero->hero_title = checkIndex($data, "hero_title");
$hero->hero_description = checkIndex($data, "hero_description");
$hero->hero_context = checkIndex($data, "hero_context");
$hero->hero_image = checkIndex($data, "hero_image");
$hero->hero_is_active = 1;
$hero->hero_created = date("Y");
$hero->hero_published_date = date("Y-m-d H:i:s");
$hero->hero_datetime = date("Y-m-d H:i:s");

// isNameExist($hero, $hero->hero_name);

$query = checkCreate($hero);
returnSuccess($hero," hero", $query);

