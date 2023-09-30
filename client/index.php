<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
    
    <script src="js/page-index.js"></script>
    <div class="overlay hidden">
        <div id="deck-builder-frame" class="hidden">
                <iframe id="deck" style="height:90vh; width:90vw; " src="https://magix.apps-de-cours.com/server/#/deck/<?= $data["key"] ?>"></iframe>
        </div>
    </div>

    <div class="lobby-bg"></div>

    <div id="play-menu-wrapper">
            <form action="#" method="post" id="mode-wrapper">
                <input type="hidden" name="gameMode" id="game-mode" value="">
                <button class="btn mode" value="TRAINING">Pratique</button>
                <div id="pvp-wrapper">
                    <button class="btn mode" value="PVP">Jouer</button>
                    <input type="text" name="privateKey" class="input-field" placeholder="Clé privée (optionnel)">
                </div>
                <button class="btn mode" value="ARENA">Arena</button>
                <input type="submit" style="display: none;" id="submit">
            </form>
            <form action="#" method="post" id="logout-wrapper">
                <input type="hidden" name="logout" value="true">
                <button type="submit" class="btn quitter">Quitter</button>
            </form>
        </div>
    
        <div class="main-wrapper" id="index-wrapper">
    
            <?php 
                if ($data["errorMessage"]) {
                    ?>
                        <div class="error-message" id="errorMessage"> <?= $data["errorMessage"]?></div>
                    <?php
                    $data["errorMessage"] = "";
                }
            ?>
    
            <div id="option-menu-wrapper">
                <button class="btn">Statistiques</button>
                <button id="deck-builder" class="btn">Deck Builder</button>
            </div>
    
            <form action="#" id="observer-wrapper" method="post">
                    <button type="submit" class="btn mode" value="OBSERVER">Observer</button>
                    <input type="text" name="username" class="input-field" placeholder="Nom du joueur">
            </form>
      
            <div id="chat-box" class="">
                <iframe style="width:700px;height:240px;" onload="applyStyles(this)" src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"]?>"> </iframe>
            </div>
    
        </div>


<?php
    require_once("partial/footer.php");