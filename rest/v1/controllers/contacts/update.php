<?php
$conn = null;
$conn = checkDbConnection();
$contacts = new Contacts($conn);
$error = [];
$returnData = [];
if (array_key_exists("contactsid", $_GET)) {
    checkPayload($data);
     $contacts->contacts_aid = $_GET['contactsid'];
    $contacts->contacts_web = checkIndex($data, "contacts_web");
    $contacts->contacts_userhandle = checkIndex($data, "contacts_userhandle");
    $contacts->contacts_username = checkIndex($data, "contacts_username");
    $contacts->contacts_published_date = date("Y-m-d H:i:s");
    $contacts->contacts_datetime = date("Y-m-d H:i:s");
    $query = checkUpdate($contacts);
    returnSuccess($contacts, "contacts", $query);
}
checkEndpoint();