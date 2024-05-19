<?php
$conn = null;
$conn = checkDbConnection();
$proglang = new ProgLang($conn);
$error = [];
$returnData = [];
if (array_key_exists("proglangid", $_GET)) {
    checkPayload($data);
     $proglang->proglang_aid = $_GET['proglangid'];
    $proglang->proglang_title = checkIndex($data, "proglang_title");
    $proglang->proglang_description = checkIndex($data, "proglang_description");
    $proglang->proglang_image = checkIndex($data, "proglang_image");
    $proglang->proglang_published_date = date("Y-m-d H:i:s");
    $proglang->proglang_datetime = date("Y-m-d H:i:s");date("Y-m-d H:i:s");
    $query = checkUpdate($proglang);
    returnSuccess($proglang, "proglang", $query);
}
checkEndpoint();