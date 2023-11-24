<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
    
    <script src="js/page-lobby.js"></script>
    <div class="overlay hidden">
        <div id="deck-builder-frame" class="hidden">
                <iframe id="deck" style="height:90vh; width:90vw; " src="https://magix.apps-de-cours.com/server/#/deck/<?= $data["key"] ?>"></iframe>
        </div>
    </div>
    <div class="bg-image">
        <img src="./img/background/front-page/bg_0006_bg-1.png" class="parallax bg-1 greyscale" data-speedx="0.05" data-speedy="0.02" >
        <img src="./img/background/front-page/bg_0005_bg-2.png" class="parallax bg-2 greyscale" data-speedx="0.03" data-speedy="0.015">
        <img src="./img/background/front-page/bg_0004_bg-3.png" class="parallax bg-3 greyscale" data-speedx="0.02" data-speedy="0.01">
        <img src="./img/background/front-page/bg_0003_bg-4.png" class="smoke greyscale">
        <img src="./img/background/front-page/bg_0002_bg-5.png" class="parallax bg-4 greyscale" data-speedx="0.015" data-speedy="0.005">
        <img src="./img/background/front-page/bg_0001_bg-6.png" class="smoke greyscale">
        <img src="./img/background/front-page/bg_0000_bg-7.png" class="parallax bg-5 greyscale" data-speedx="0.0120" data-speedy="0.002">
    </div>

    <img src="./img/vortex.png" class="swirl">

    <div class="lobby-bg"></div>
    
    <div class="menu-bg">
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
    </div>

    
    <div id="utils-wrapper">
        <div class="utils-menu-wrapper">
            <button class="btn">Statistiques</button>
            <button id="deck-builder" class="btn">Deck Builder</button>
            <form action="#" id="observer-wrapper" method="post">
                <button type="submit" class="btn mode" value="OBSERVER">Observer</button>
                <input type="text" name="username" class="input-field" placeholder="Nom du joueur">
            </form>
        </div>
    </div>
    
    
    <div id="lobby-wrapper">
        <?php 
            if ($data["errorMessage"]) {
                ?>
                    <div class="error-message" id="errorMessage"> <?= $data["errorMessage"]?></div>
                <?php
                $data["errorMessage"] = "";
            }
        ?>
    </div>

    <div id="chat-box" class="">
        <iframe frameBorder="0" class="chat" onload="applyStyles(this)" src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"]?>"> </iframe>
    </div>


<?php
    require_once("partial/footer.php");