<?php
$conn = null;
$conn = checkDbConnection();
$certs = new Certs($conn);
if (array_key_exists("certsid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$certs->certs_title = checkIndex($data, "certs_title");
$certs->certs_description = checkIndex($data, "certs_description");
$certs->certs_image = checkIndex($data, "certs_image");
$certs->certs_is_active = 1;
$certs->certs_published_date = date("Y-m-d");;
$certs->certs_created = date("Y-m-d");
$certs->certs_datetime = date("Y-m-d H:i:s");

// isNameExist($certs, $certs->certs_name);

$query = checkCreate($certs);
returnSuccess($certs," certs", $query);

