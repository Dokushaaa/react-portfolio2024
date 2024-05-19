<?php
$conn = null;
$conn = checkDbConnection();
$background = new Background($conn);
$error = [];
$returnData = [];
if (array_key_exists("backgroundid", $_GET)) {
    checkPayload($data);
     $background->background_aid = $_GET['backgroundid'];
    $background->background_title = checkIndex($data, "background_title");
    $background->background_description = checkIndex($data, "background_description");
    $background->background_image = checkIndex($data, "background_image");
    $background->background_published_date = date("Y-m-d H:i:s");
    $background->background_datetime = date("Y-m-d H:i:s");date("Y-m-d H:i:s");
    $query = checkUpdate($background);
    returnSuccess($background, "background", $query);
}
checkEndpoint();