<?php
$conn = null;
$conn = checkDbConnection();
$projects = new Projects($conn);
if (array_key_exists("projectsid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$projects->projects_title = checkIndex($data, "projects_title");
$projects->projects_description = checkIndex($data, "projects_description");
$projects->projects_image = checkIndex($data, "projects_image");
$projects->projects_is_active = 1;
$projects->projects_published_date = date("Y-m-d");;
$projects->projects_created = date("Y-m-d");
$projects->projects_datetime = date("Y-m-d H:i:s");

// isNameExist($projects, $projects->projects_name);

$query = checkCreate($projects);
returnSuccess($projects," projects", $query);

