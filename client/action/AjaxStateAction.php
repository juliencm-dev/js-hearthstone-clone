<?php
    require_once("action/CommonAction.php");

    class AjaxStateAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            $data["key"] = $_SESSION["key"];

            if (!empty($_SESSION['observer'])) {
                $data["username"] = $_SESSION["observer"];
                $result = parent::callAPI("games/observe", $data);

                if ($result == "NOT_IN_GAME"){
                    $_SESSION['observer'] = "";
                    header("location:lobby.php");
                    exit;
                }

            }else{
                $result = parent::callAPI("games/state", $data);
            }
            
            return compact('result');
           
        }
}