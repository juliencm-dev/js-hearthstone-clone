<?php
    require_once("action/AjaxGameAction.php");

    $action = new AjaxGameAction();
    $data = $action->execute();

    echo json_encode($data['result']);
?>
