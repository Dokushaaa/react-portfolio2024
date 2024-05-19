<?php
$conn = null;
$conn = checkDbConnection();
$about = new About($conn);
if (array_key_exists("aboutid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$about->about_title = checkIndex($data, "about_title");
$about->about_description = checkIndex($data, "about_description");
$about->about_image = checkIndex($data, "about_image");
$about->about_is_active = 1;
$about->about_published_date = date("Y-m-d");;
$about->about_created = date("Y-m-d");
$about->about_datetime = date("Y-m-d H:i:s");

// isNameExist($about, $about->about_name);

$query = checkCreate($about);
returnSuccess($about," about", $query);

