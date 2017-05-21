<?php
//var_dump($_POST,$_GET);

require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php';

date_default_timezone_set("America/Los_Angeles");
header('Content-Type: Application/json');

define("app_id","1742952839348527");
define("app_secret","7a5438559d6863f8f182fd43f058ed2d");
define("google_apikey","AIzaSyB77SEbqn5Pcksjv3N7A8RQIaCPTJZrSfc");
define("access_token","EAAYxNNTZAgS8BADaTVN1et9WovksxqhTqSsAFijZCaw7XpVIv0mdpPjcx8WLswjhcZBMXYrwEZCAPdCA5g2ftKaSSWUO1JZC4kSFpc6UwZCrMZAO0xqCIBFZAcV0u2R0ObJhZCNVnBqj7RqbygI9IMNaZAGBtubVVMIN4ZD");

function createAlbPosts()
{
	$fb = new Facebook\Facebook([
  'app_id' => app_id,
  'app_secret' => app_secret,
  'default_graph_version' => 'v2.8',
]);

$fb->setDefaultAccessToken(access_token);
$url1 = "/".$_GET["Id"]."?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)&access_token=".access_token;
 try{
  $fbResp = $fb->get($url1);
  $fbData = $fbResp->getGraphNode();
  }
  catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo '';
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
  return $fbData;
}

function getData($url)
{

  $fb = new Facebook\Facebook([
    'app_id' => app_id,
    'app_secret' => app_secret,
    'default_graph_version' => 'v2.8',
  ]);

try{
$fbResp = $fb->get($url);
$fbData = $fbResp->getGraphEdge();
$pagingdata = $fbResp->getGraphEdge()->getMetaData();

$retdata = array(
  "data" => json_decode($fbData),
  "paging" => $pagingdata
);
}
catch(Facebook\Exceptions\FacebookResponseException $e) {
echo 'Graph returned an error: ' . $e->getMessage();
exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
echo 'Facebook SDK returned an error: ' . $e->getMessage();
exit;
}
return $retdata;
}

$fb = new Facebook\Facebook([
  'app_id' => app_id,
  'app_secret' => app_secret,
  'default_graph_version' => 'v2.8',
]);

$fb->setDefaultAccessToken(access_token);

if (isset($_GET["Id"])) {
$albPicData = createAlbPosts();
echo $albPicData;
flush();
}

if(isset($_GET['Search']))
{
//$cntr = $_GET['lat'].",".$_GET['long'];
$cntr = "0,0";
$url = "/search?q=".$_GET['Search']."&type=user&fields=id,name,picture.width(700).height(700)&access_token=".access_token;
  //echo "<script>console.log( 'Debug Objects: hello".$_GET['Search'] ."lat".$_GET['lat']."url". $url . "' );</script>";
$userdata = getData($url);
$url1 = "/search?q=".$_GET['Search']."&type=page&fields=id,name,picture.width(700).height(700)&access_token=".access_token;
$pagedata = getData($url1);
$url2 = "/search?q=".$_GET['Search']."&type=event&fields=id,name,picture.width(700).height(700)&access_token=".access_token;
$eventdata = getData($url2);
$url3 = "/search?q=".$_GET['Search']."&type=place&fields=id,name,picture.width(700).height(700)&center=".$cntr."&access_token=".access_token;
$placedata = getData($url3);
$url4 = "/search?q=".$_GET['Search']."&type=group&fields=id,name,picture.width(700).height(700)&access_token=".access_token;
$groupdata = getData($url4);

$allData = array("user" => $userdata,"page" => $pagedata,"event" => $eventdata,"place"=>$placedata,"group" =>$groupdata);
echo json_encode($allData);
flush();
}
?>
