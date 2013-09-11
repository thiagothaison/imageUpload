<?php

require_once "UploadImagem.class.php";

$Upload = new UploadImagem();

$Upload->uploadDir = $_POST["uploadFolder"];
$Upload->file      = $_FILES['file'];
$Upload->name      = date('YmdHis');
$Upload->crop      = $_POST["cropCoordinates"];
$Upload->resize    = array('width'=>350);

$Upload->upload();

//print_r($_POST);