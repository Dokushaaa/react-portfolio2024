<?php
$conn = null;
$conn = checkDbConnection();
$proglang = new ProgLang($conn);
if (array_key_exists("proglangid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$proglang->proglang_title = checkIndex($data, "proglang_title");
$proglang->proglang_description = checkIndex($data, "proglang_description");
$proglang->proglang_image = checkIndex($data, "proglang_image");
$proglang->proglang_is_active = 1;
$proglang->proglang_published_date = date("Y-m-d");;
$proglang->proglang_created = date("Y-m-d");
$proglang->proglang_datetime = date("Y-m-d H:i:s");

// isNameExist($proglang, $proglang->proglang_name);

$query = checkCreate($proglang);
returnSuccess($proglang," proglang", $query);

