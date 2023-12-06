
<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/DataDAO.php");

    class AjaxDBAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            
            if(!empty($_POST["cardId"])){
                $result = DataDao::updatePlayCount($_POST["cardId"]);
            }
            if(!empty($_POST["getPlayCount"])){
                $result = DataDao::getStats();
            }
            if(!empty($_POST["reset"])){
                $result = DataDao::resetStats();
            }

            return compact('result');
           
        }
}