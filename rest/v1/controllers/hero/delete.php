<?php
$conn = null;
$conn = checkDbConnection();
$hero = new Hero($conn);

$error = [];
$returnData = [];
if (array_key_exists("heroid", $_GET)) {
    $hero->hero_aid = $_GET['heroid'];
    checkId($hero->hero_aid);

    $query = checkDelete($hero);
    returnSuccess($hero, "hero", $query);
}

checkEndpoint();