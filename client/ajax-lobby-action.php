<?php
    require_once("action/AjaxLobbyAction.php");

    $action = new AjaxLobbyAction();
    $data = $action->execute();

    echo json_encode($data);
?>