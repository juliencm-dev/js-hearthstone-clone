<?php
	require_once("action/CommonAction.php");

	class LoginAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$hasConnectionError = false;

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
						// var_dump($result);exit;
						$_SESSION["username"] = $user["username"];
						$_SESSION["key"] = $result->key; 
						$_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
						header("location:index.php");
						exit;
					}
				}
			}

			return compact("hasConnectionError");
		}
	}