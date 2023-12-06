<?php
    require_once("action/CommonAction.php");

    class AjaxLobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $errorMessage = "";
            $data = [];
            $data["key"] = $_SESSION["key"];

            if(!empty($_POST["username"])){
                $_SESSION["observer"] = $_POST["username"];
                $data["username"] = $_SESSION["observer"];
                
                $result = parent::callAPI("games/observe", $data);
                
                if($result == "NOT_IN_GAME"){
                    $result = "ERROR";
                    $errorMessage = $_SESSION["observer"] . " n’est pas dans une partie";
                }
                else{
                    $result = "SUCCESS";
                }
            }

            if(!empty($_POST["type"])){
 
                $data["type"] = $_POST["type"];
                $data["mode"] = $_POST["mode"];
                
                if(!empty($_POST["privateKey"])){
                    $data["privateKey"] = $_POST["privateKey"];
                }
                $result = parent::callAPI("games/auto-match", $data);
                
                if ($result == "DECK_INCOMPLETE") {
                    $errorMessage = "Votre Deck n'est pas complet!";
                }
                else {
                    $result = "SUCCESS";
                }

            }
        
            return compact("result","errorMessage");
        }
}