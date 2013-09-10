<?php

class UploadImagem {
	
	public $uploadDir;
	public $file;
	public $name;
	public $resize;
	public $crop;
	
	private $uploadedFile;
	private $extension;
	private $src;
	
	public function upload(){
	
		//print_r(get_object_vars($this));

		if ( strlen($this->uploadDir) == 0 ){
			throw new Exception('O destino da imagem precisa ser informado.'); 
		}
		
		if ( $this->file == null ){
			throw new Exception('Nenhuma imagem para upload.'); 
		}else{
			$arrayFile = explode(".", $this->file["name"]);
			$this->extension = strtolower(end($arrayFile));
		}
		
		if ( $this->name == '' ){
			$this->name = $this->file["name"];
		}else{
			$this->name .= '.' . $this->extension;
		}
		
		$this->uploadedFile = $this->file["tmp_name"];
		$this->src = $this->getSRC();
		
		if ( $this->crop ){
			if ( array_key_exists("x", $this->crop) && array_key_exists("y", $this->crop) &&
				 array_key_exists("x2", $this->crop) && array_key_exists("y2", $this->crop) &&
				 array_key_exists("w", $this->crop) && array_key_exists("h", $this->crop) ) {
				 
				 $this->cropImage();
				 exit();
				 
			}else{			
				throw new Exception('Indices incorretos para cortar a imagem.'); 
			}
		}
		
		if ( $this->resize ){
			if ( $this->verifySizes() ) {
				$this->resizeImage();
				exit();
			}else{			
				throw new Exception('Indices incorretos para o redimensionamento.'); 
			}
		}
		
		
		$this->sendImage();

	
	}
	
	private function sendImage(){
		
		if ($this->file["error"] > 0){
			throw new Exception("Error: " . $this->file["error"]);
		}else{
			if ( move_uploaded_file($this->uploadedFile,$this->uploadDir. $this->name) ){
				print("Feited.");
				exit(0);
			}else{
				throw new Exception('Erro durante o upload.'); 
			}
		}
		
	}

	private function resizeImage(){
	
		$src = $this->src;

		if ( is_resource($src) ){
			$width  = imagesx($src);
			$height = imagesy($src);
		}else{
			list($width,$height)=getimagesize($this->uploadedFile);
		}

		$newwidth  = $this->resize['width'];
		$newheight = $this->resize['height'];
		
		$tmp=imagecreatetruecolor($newwidth,$newheight);

		imagecopyresampled($tmp,$src,0,0,0,0,$newwidth,$newheight,$width,$height);

		//imagepng?? imagegif??
		imagejpeg($tmp,$this->uploadDir . $this->name,100);

		imagedestroy($src);
		imagedestroy($tmp);
	
	}
	
	private function cropImage(){
	
		$src = $this->src;

		$tmp = imagecreatetruecolor($this->crop['w'], $this->crop['h']);

		imagecopyresampled($tmp, $src, 0, 0, $this->crop['x'], $this->crop['y'], $this->crop['w'], $this->crop['h'], $this->crop['w'], $this->crop['h']);
		
		
		
		if ( $this->resize ){
			if ( $this->verifySizes() ) {
				$this->src = $tmp;
				$this->resizeImage();
			}else{			
				throw new Exception('Indices incorretos para o redimensionamento.'); 
			}
		}else{
			//imagepng?? imagegif??
			imagejpeg($tmp,$this->uploadDir . $this->name,100);
		}
	
	}
	
	private function getSRC(){
	
		if($this->extension=="jpg" || $this->extension=="jpeg" ){
			return imagecreatefromjpeg($this->uploadedFile);			
		}else if($this->extension=="png"){
			return  imagecreatefrompng($this->uploadedFile);
		}else{
			return  imagecreatefromgif($this->uploadedFile);
		}
	
	}

	private function verifySizes(){

		if ( array_key_exists("width", $this->resize) || array_key_exists("height", $this->resize) ) {
			if ( $this->crop )
				list($width,$height)=array(1,1);
			else
				list($width,$height)=getimagesize($this->uploadedFile);
			
			if ( array_key_exists("width", $this->resize) && !array_key_exists("height", $this->resize)  ){
				$this->resize['height'] = $this->resize['width'] * $height / $width;
				return true;
			}else if ( !array_key_exists("width", $this->resize) && array_key_exists("height", $this->resize)  ){
				$this->resize['width'] = $this->resize['height'] * $width / $height;
				return true;
			}else{
				return true;
			}

		}else{			
			return false;
		}

	}
	
}
