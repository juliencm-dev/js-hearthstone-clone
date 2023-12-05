<?php

    require_once("action/DAO/Connection.php");

    class DataDAO {

        public static function getStats(){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT * FROM statistique_magix WHERE play_count > 0 ORDER BY play_count DESC");
            $statement->setFetchMode(PDO::FETCH_ASSOC);

            $statement->execute();
            
            $answers = null;
            $answers = $statement->fetchAll();

            return $answers;
        }

        public static function updatePlayCount($card_id){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("UPDATE statistique_magix SET play_count = play_count + 1 WHERE card_id = ?");
            $statement->bindParam(1, $card_id); 

            $statement->execute();

            return "Success";
        }

        public static function addCard($card_id){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO statistique_magix(card_id, play_count) VALUES (?, 0)");
            $statement->bindParam(1, $card_id); 

            $statement->execute();
        }
    }
