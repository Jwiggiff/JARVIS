<?php
$arr = array("server-count"=>0)
if(!empty($_GET['server-count'])){
  $arr = $_GET['server-count'];
  echo json_encode($arr);
}
?>
