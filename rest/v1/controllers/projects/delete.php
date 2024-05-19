<?php
$conn = null;
$conn = checkDbConnection();
$projects = new Projects($conn);

$error = [];
$returnData = [];
if (array_key_exists("projectsid", $_GET)) {
    $projects->projects_aid = $_GET['projectsid'];
    checkId($projects->projects_aid);

    $query = checkDelete($projects);
    returnSuccess($projects, "projects", $query);
}

checkEndpoint();