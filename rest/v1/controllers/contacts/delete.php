<?php
$conn = null;
$conn = checkDbConnection();
$contacts = new Contacts($conn);

$error = [];
$returnData = [];
if (array_key_exists("contactsid", $_GET)) {
    $contacts->contacts_aid = $_GET['contactsid'];
    checkId($contacts->contacts_aid);

    $query = checkDelete($contacts);
    returnSuccess($contacts, "contacts", $query);
}

checkEndpoint();