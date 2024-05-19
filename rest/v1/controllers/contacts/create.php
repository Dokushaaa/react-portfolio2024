<?php
$conn = null;
$conn = checkDbConnection();
$contacts = new Contacts($conn);
if (array_key_exists("contactsid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$contacts->contacts_web = checkIndex($data, "contacts_web");
$contacts->contacts_userhandle = checkIndex($data, "contacts_userhandle");
$contacts->contacts_username = checkIndex($data, "contacts_username");
$contacts->contacts_is_active = 1;
$contacts->contacts_created = date("Y");
$contacts->contacts_published_date = date("Y-m-d H:i:s");
$contacts->contacts_datetime = date("Y-m-d H:i:s");

// isNameExist($contacts, $contacts->contacts_name);

$query = checkCreate($contacts);
returnSuccess($contacts," contacts", $query);

