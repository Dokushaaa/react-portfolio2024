<?php
$conn = null;
$conn = checkDbConnection();
$proglang = new ProgLang($conn);

$error = [];
$returnData = [];
if (array_key_exists("proglangid", $_GET)) {
    $proglang->proglang_aid = $_GET['proglangid'];
    checkId($proglang->proglang_aid);

    $query = checkDelete($proglang);
    returnSuccess($proglang, "proglang", $query);
}

checkEndpoint();