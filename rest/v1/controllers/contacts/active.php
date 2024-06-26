<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/Contacts.php';

$conn = null;
$conn = checkDbConnection();

$contacts = new Contacts($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("contactsid", $_GET)) {

        checkPayload($data);
        $contacts->contacts_aid = $_GET['contactsid'];
        $contacts->contacts_is_active = trim($data["isActive"]);
        $contacts->contacts_datetime = date("Y-m-d H:i:s");
        checkId($contacts->contacts_aid);
        $query = checkActive($contacts);
        http_response_code(200);
        returnSuccess($contacts, "contacts", $query);
    }
    checkEndpoint();
}



http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();