<?php
    require_once("action/CommonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $key = $_SESSION["key"];
            $errorMessage = "";
            $data = [];
            $data["key"] = $key;

            if(!empty($_POST["username"])){
                $data["username"] = $_POST["username"];
                $result = parent::callAPI("games/observe", $data);
                
                if ($result == "WAITING") {
                    $errorMessage = "En attente d’un autre joueur";
                }
                elseif($result == "NOT_IN_GAME"){
                    $errorMessage = "Le joueur n’est pas dans une partie";
                }
                else {
                    header("location:game.php");
                    exit;
                }
            }

            if(!empty($_POST["gameMode"])){

                if(!empty($_POST["privateKey"])){
                    $data["privateKey"] = $_POST["gameMode"];
                }

                $data["type"] = $_POST["gameMode"];

                $result = parent::callAPI("games/auto-match", $data);
                
                if ($result == "DECK_INCOMPLETE") {
                    $errorMessage = "Votre Deck n'est pas complet!";
                }
                else {
                    header("location:game.php");
                    exit;
                }

            }
            return compact("key", "errorMessage");
    }
}