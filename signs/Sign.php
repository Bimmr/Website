<?php
header("Access-Control-Allow-Origin: *");

$img = imagecreatefrompng('sign.png');
$font = './minecraft.ttf';
$spacing = 25;
$fontSize = 17;
$middle = $size = getimagesize('sign.png')[0]/2;

$line1 = $_GET['Line1'];
$line2 = $_GET['Line2'];
$line3 = $_GET['Line3'];
$line4 = $_GET['Line4'];
$lines = array($line1, $line2, $line3, $line4);

foreach ($lines as $i => $line){
    if(!empty($line)){
        $color = imagecolorallocate($img, 0, 0, 0);
        $replacedLine = preg_replace('/&./', '', $line);
        $x = $middle - getWidth($fontSize, $font, $replacedLine)/2;

        foreach(str_split($line) as $j => $letter){
            if($letter == '&' || ($j > 0 && $line[$j - 1] == '&')){
                if($j > 0 && $line[$j - 1] == '&'){
                    $code = $letter;
                    if($code == '0')
                        $color = imagecolorallocate($img, 0, 0, 0);
                    if($code == '1')
                        $color = imagecolorallocate($img, 0, 0, 170);
                    if($code == '2')
                        $color = imagecolorallocate($img, 0, 170, 0);
                    if($code == '3')
                        $color = imagecolorallocate($img, 0, 170, 170);
                    if($code == '4')
                        $color = imagecolorallocate($img, 170, 0, 0);
                    if($code == '5')
                        $color = imagecolorallocate($img, 170, 0, 170);
                    if($code == '6')
                        $color = imagecolorallocate($img, 255, 170, 0);
                    if($code == '7')
                        $color = imagecolorallocate($img, 170, 170, 170);
                    if($code == '8')
                        $color = imagecolorallocate($img, 85, 85, 85);
                    if($code == '9')
                        $color = imagecolorallocate($img, 85, 85, 255);
                    if($code == 'a')
                        $color = imagecolorallocate($img, 85, 255, 85);
                    if($code == 'b')
                        $color = imagecolorallocate($img, 85, 255, 255);
                    if($code == 'c')
                        $color = imagecolorallocate($img, 255, 85, 85);
                    if($code == 'd')
                        $color = imagecolorallocate($img, 255, 85, 255);
                    if($code == 'e')
                        $color = imagecolorallocate($img, 255, 255, 85);
                    if($code == 'f')
                        $color = imagecolorallocate($img, 255, 255, 255);
                }
            }
            else{
                imagettftext($img, $fontSize, 0, $x, ($i + 1) * $spacing, $color, $font, $letter);
                $x = $x + getWidth($fontSize, $font, $letter);
            }
        }
    }
}

//    Get the width of text given a specific font and size
//    @param fontSize
//    @param font
//    @param text
//    @return width
function getWidth($fontSize, $font, $text){
    $box = imageftbbox($fontSize, 0, $font, $text);
    $width = $box[2]-$box[0];
    return $width+2;
}

header('Content-type: image/png');
imagecolortransparent($img, imagecolorallocate($img, 255, 255, 255));

// Output the image
imagepng($img);

imagedestroy($img);

?>
