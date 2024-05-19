<?php
$conn = null;
$conn = checkDbConnection();
$background = new Background($conn);
if (array_key_exists("backgroundid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$background->background_title = checkIndex($data, "background_title");
$background->background_description = checkIndex($data, "background_description");
$background->background_image = checkIndex($data, "background_image");
$background->background_is_active = 1;
$background->background_published_date = date("Y-m-d");;
$background->background_created = date("Y-m-d");
$background->background_datetime = date("Y-m-d H:i:s");

// isNameExist($background, $background->background_name);

$query = checkCreate($background);
returnSuccess($background," background", $query);

