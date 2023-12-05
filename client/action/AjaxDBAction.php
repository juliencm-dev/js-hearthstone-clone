
<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/DataDAO.php");

    class AjaxDBAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            
            if(!empty($_POST["card_id"])){
                $result = DataDao::updatePlayCount($_POST["card_id"]);
            }

            return compact('result');
           
        }
}