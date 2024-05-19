<?php
$conn = null;
$conn = checkDbConnection();
$projects = new Projects($conn);
$error = [];
$returnData = [];
if (array_key_exists("projectsid", $_GET)) {
    checkPayload($data);
     $projects->projects_aid = $_GET['projectsid'];
    $projects->projects_title = checkIndex($data, "projects_title");
    $projects->projects_description = checkIndex($data, "projects_description");
    $projects->projects_image = checkIndex($data, "projects_image");
    $projects->projects_published_date = date("Y-m-d H:i:s");
    $projects->projects_datetime = date("Y-m-d H:i:s");date("Y-m-d H:i:s");
    $query = checkUpdate($projects);
    returnSuccess($projects, "projects", $query);
}
checkEndpoint();