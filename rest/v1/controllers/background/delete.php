<?php
$conn = null;
$conn = checkDbConnection();
$background = new Background($conn);

$error = [];
$returnData = [];
if (array_key_exists("backgroundid", $_GET)) {
    $background->background_aid = $_GET['backgroundid'];
    checkId($background->background_aid);

    $query = checkDelete($background);
    returnSuccess($background, "background", $query);
}

checkEndpoint();