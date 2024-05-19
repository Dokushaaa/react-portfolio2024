<?php
$conn = null;
$conn = checkDbConnection();
$about = new About($conn);
$error = [];
$returnData = [];
if (array_key_exists("aboutid", $_GET)) {
    checkPayload($data);
     $about->about_aid = $_GET['aboutid'];
    $about->about_title = checkIndex($data, "about_title");
    $about->about_description = checkIndex($data, "about_description");
    $about->about_image = checkIndex($data, "about_image");
    $about->about_published_date = date("Y-m-d H:i:s");
    $about->about_datetime = date("Y-m-d H:i:s");date("Y-m-d H:i:s");
    $query = checkUpdate($about);
    returnSuccess($about, "about", $query);
}
checkEndpoint();