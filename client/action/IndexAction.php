<?php
	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$hasConnectionError = false;

			if($_SESSION["visibility"] == CommonAction::$VISIBILITY_MEMBER){
				header("location:lobby.php");
				exit;
			}

			if (isset($_POST["username"])) {
				$user = [];
				$user["username"] = $_POST["username"];
				$user["password"] = $_POST["pwd"];
				
				if(!empty($user)){
					$result = parent::callAPI("signin", $user);

					if ($result == "INVALID_USERNAME_PASSWORD") {
						$hasConnectionError = true;
					}
					else {
						$_SESSION["username"] = $user["username"];
						$_SESSION["key"] = $result->key; 
						$_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
						header("location:lobby.php");
						exit;
					}
				}
			}

			return compact("hasConnectionError");
		}
	}