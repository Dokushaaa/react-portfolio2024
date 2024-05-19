<?php
$conn = null;
$conn = checkDbConnection();
$about = new About($conn);

$error = [];
$returnData = [];
if (array_key_exists("aboutid", $_GET)) {
    $about->about_aid = $_GET['aboutid'];
    checkId($about->about_aid);

    $query = checkDelete($about);
    returnSuccess($about, "about", $query);
}

checkEndpoint();