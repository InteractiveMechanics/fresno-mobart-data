<?php
    $files = array();
    $count = 0;
    $data = json_decode($GLOBALS['HTTP_RAW_POST_DATA']);

    foreach ($data as $value) {
        if ($count < 50) {
            if (!empty($value->Artwork_URL)){
                $str = str_replace(array('http://iaccessfresno.com/mobart/data/', 'http://staging.iaccessfresno.com/mobart/data/'), '', $value->Artwork_URL);
                $path = '../' . $str;

                array_push($files, $path);
                $count++;
            }
        }
    }

    // if true, good; if false, zip creation failed
    $result = create_zip($files, 'archive.zip', true);
    if ($result){
        header('Content-Type: application/octet-stream;');
        header('Content-Disposition: attachment; filename=archive.zip');
        header('Content-Length: ' . filesize('archive.zip'));
        header('Pragma: no-cache'); 
        header('Expires: 0'); 
        readfile('archive.zip');
    }

    function create_zip($files = array(), $destination = '', $overwrite = false) {

    	if(file_exists($destination) && !$overwrite) { return false; }
    	$valid_files = array();

    	if(is_array($files)) {
    		foreach($files as $file) {
    			if(file_exists($file)) {
    				$valid_files[] = $file;
    			}
    		}
    	}

    	if(count($valid_files)) {

    		$zip = new ZipArchive();
    		if($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
    			return false;
    		}

    		foreach($valid_files as $file) {
    			$zip->addFile($file,$file);
    		}
    		$zip->close();
    		
    		return file_exists($destination);
    	} else {
    		return false;
    	}
    }
?>