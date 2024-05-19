<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/Projects.php';

$conn = null;
$conn = checkDbConnection();

$projects = new Projects($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("projectsid", $_GET)) {

        checkPayload($data);
        $projects->projects_aid = $_GET['projectsid'];
        $projects->projects_is_active = trim($data["isActive"]);
        $projects->projects_datetime = date("Y-m-d H:i:s");
        checkId($projects->projects_aid);
        $query = checkActive($projects);
        http_response_code(200);
        returnSuccess($projects, "projects", $query);
    }
    checkEndpoint();
}



http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();