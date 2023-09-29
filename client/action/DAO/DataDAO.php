<?php
    
    class DataDAO {

        public static function authenticate($username, $password) {
            $user = null;

            if ($username == "john" && $password == "qwerty") {
                $user = [
                  "username" => "John",
                  "visibility" => 1,
                ];
            }

            return $user;
        }

        public static function updateProfile($userId, $newPassword) {
            // ...
        }
    }
