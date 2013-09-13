<?php

require_once "UploadImagem.class.php";

if ( $_POST && $_FILES){

	$Upload = new UploadImagem();

	if ( isset( $_POST["uploadFolder"] ) ){
		$Upload->uploadDir = $_POST["uploadFolder"];		
	}

	if ( isset( $_FILES["imageUpload"] ) ){
		$Upload->file = $_FILES['imageUpload'];
	}

	if ( isset( $_POST["resizeTo"] ) ){
		$Upload->resize = $_POST['resizeTo'];
	}

	if ( isset( $_POST["renameTo"] ) ){
		$Upload->name = $_POST['renameTo'];
	}

	if ( isset( $_POST["cropCoordinates"] ) ){
		$Upload->crop = $_POST['cropCoordinates'];
	}

	if ( isset( $_POST["convertTo"] ) ){
		$Upload->convertTo = $_POST['convertTo'];
	}

	try{
		$Upload->upload();
		header('HTTP/1.0 200 OK');
	}catch(exception $e){
		echo $e->getMessage();
		header('HTTP/1.1 500 Internal Server Error');
	}

}
