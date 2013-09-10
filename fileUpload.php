<?php

$output_dir = $_POST["uploadFolder"];

if(isset($_FILES["file"])){
	
	if ($_FILES["file"]["error"] > 0){
	  echo "Error: " . $_FILES["file"]["error"] . "<br>";
	}else{
		
    	if ( move_uploaded_file($_FILES["file"]["tmp_name"],$output_dir. $_FILES["file"]["name"]) ){
			print("Your comment has been successfully added.");
			exit(0);
		}else{
			header('HTTP/1.1 500 Internal Server Error');
			exit("Something went wrong when we tried to save your comment. Please try again later. Sorry for any inconvenience");
		}

	}
}
