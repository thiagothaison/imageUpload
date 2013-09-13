<?php

error_reporting(E_ALL);

class UploadImagem {
	
	public $uploadDir;
	public $file;
	public $name;
	public $resize;
	public $crop;
	public $convertTo;
	
	private $uploadedFile;
	private $extension;
	private $src;
	private $validExtensions = array('jpg','jpge','gif','png','bmp');
	
	public function upload(){
	
		//print_r(get_object_vars($this));

		if ( strlen($this->uploadDir) == 0 ){
			throw new Exception('O destino da imagem precisa ser informado.'); 
		}else if ( !is_dir( $this->uploadDir ) ){
			mkdir( $this->uploadDir );
		}
		
		if ( $this->file == null ){
			throw new Exception('Nenhuma imagem para upload.'); 
		}else if ( $this->file["type"] == ""){
			throw new Exception('Erro desconhecido');
		}else{
			$arrayFile = explode(".", $this->file["name"]);
			$this->extension = strtolower(end($arrayFile));
		}
		
		if ( $this->name == '' ){
			$this->name = str_replace('.' . $this->extension, '', $this->file["name"]);
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

		$width  = imagesx($src);
		$height = imagesy($src);

		$newwidth  = $this->resize['width'];
		$newheight = $this->resize['height'];
		
		$tmp=imagecreatetruecolor($newwidth,$newheight);

		imagecopyresampled($tmp,$src,0,0,0,0,$newwidth,$newheight,$width,$height);

		$this->saveImage($tmp,$this->uploadDir,$this->name,60);

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
			$this->saveImage($tmp,$this->uploadDir,$this->name,60);

			imagedestroy($src);
			imagedestroy($tmp);

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

	private function saveImage($src, $saveIn, $name){

		$fileType = $this->extension;

		if ( $this->convertTo ){
			if ( in_array( $this->convertTo , $this->validExtensions ) ) {
				$fileType = $this->convertTo;
			}else{
				throw new Exception('Impossível converter para ' . strtoupper($this->convertTo) . '. Você só pode converter para ' . join(', ',$this->validExtensions) . '.' );
			}
		}

		switch ($fileType){

			case 'jpg':
			case 'jpge':
				imagejpeg($src, $saveIn . $name . '.jpg', 60);
			break;

			case 'gif':
				imagegif($src, $saveIn . $name . '.gif');
			break;

			case 'png':
				imagepng($src, $saveIn . $name . '.png');
			break;

			case 'bmp':
				$this->imagebmp($src, $saveIn . $name . '.bmp');
			break;


		}

	}

	private function imagebmp ($im, $fn = false){
	    if (!$im) return false;
	            
	    if ($fn === false) $fn = 'php://output';
	    $f = fopen ($fn, "w");
	    if (!$f) return false;
	            
	    //Image dimensions
	    $biWidth = imagesx ($im);
	    $biHeight = imagesy ($im);
	    $biBPLine = $biWidth * 3;
	    $biStride = ($biBPLine + 3) & ~3;
	    $biSizeImage = $biStride * $biHeight;
	    $bfOffBits = 54;
	    $bfSize = $bfOffBits + $biSizeImage;
	            
	    //BITMAPFILEHEADER
	    fwrite ($f, 'BM', 2);
	    fwrite ($f, pack ('VvvV', $bfSize, 0, 0, $bfOffBits));
	            
	    //BITMAPINFO (BITMAPINFOHEADER)
	    fwrite ($f, pack ('VVVvvVVVVVV', 40, $biWidth, $biHeight, 1, 24, 0, $biSizeImage, 0, 0, 0, 0));
	            
	    $numpad = $biStride - $biBPLine;
	    for ($y = $biHeight - 1; $y >= 0; --$y)
	    {
	        for ($x = 0; $x < $biWidth; ++$x)
	        {
	            $col = imagecolorat ($im, $x, $y);
	            fwrite ($f, pack ('V', $col), 3);
	        }
	        for ($i = 0; $i < $numpad; ++$i)
	            fwrite ($f, pack ('C', 0));
	    }
	    fclose ($f);
	    return true;
	}
	
}
