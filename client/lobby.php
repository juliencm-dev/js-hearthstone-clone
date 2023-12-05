<?php
    require_once("action/LobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();

    require_once("partial/header-global-fade.php");
?>
    
    <script src="js/page-lobby.js"></script>
    
    <div class="bg-image">
        <img src="./img/background/front-page/bg_0006_bg-1.png" class="breathing bg-1 " data-speedx="0.07" data-speedy="0.02" >
        <img src="./img/background/front-page/bg_0005_bg-2.png" class="bg-2 greyscale-half">
        <img src="./img/background/front-page/bg_0004_bg-3.png" class="bg-3 greyscale-half">
        <img src="./img/background/front-page/bg_0003_bg-4.png" class="breathing smoke greyscale" data-speedx="0.095" data-speedy="0.03">
        <img src="./img/background/front-page/bg_0002_bg-5.png" class="bg-4 greyscale-half">
        <img src="./img/background/front-page/bg_0001_bg-6.png" class="breathing smoke greyscale" data-speedx="0.03" data-speedy="0.015">
        <img src="./img/background/front-page/bg_0000_bg-7.png" class="breathing bg-5 greyscale"data-speedx="0.03" data-speedy="0.015">
    </div>

    <img src="./img/vortex.png" class="swirl">
    <div class="lobby-bg"></div>
    
    <div id="error-message" class="hidden pulse"></div>

    <div id="play-menu-bg">
        <div class="play-menu-wrapper">
            <div class="mode-wrapper">
                <button class="btn mode" value="TRAINING">Pratique</button>
                <button class="btn mode" value="PVP">PvP</button>
                <button class="btn mode" value="ARENA">Arena</button>
            </div>
            <form action="#" method="post" class="logout-wrapper">
                <input type="hidden" name="logout" value="true">
                <button type="submit" class="btn quitter">Quitter</button>
            </form>
        </div>
    </div>
    
    <div id="utils-menu-bg">
        <div class="utils-menu-wrapper">
            <button class="btn">Statistiques</button>
            <button id="deck-builder" class="btn">Deck Builder</button>
            <div class="observer-wrapper">
                <button id="btn-observer" class="btn">Observer</button>
                <input type="text" id="username" class="input-field" placeholder="Nom du joueur">
            </div>
        </div>
    </div>


    <div id="game-mode-bg"  class="hidden">
        <div class="game-mode-wrapper">
            <div class="mode-wrapper">
                <div id="standard-mode" class="btn-wrapper hidden">
                    <button class="btn" id="standard" value="STANDARD">Jouer solo</button>
                    <button class="btn" id="coop" value="COOP">Jouer Co-Op</button>
                </div>
                <div id="arena-mode" class="btn-wrapper hidden">
                    <button class="btn" id="training" value="TRAINING">Pratique</button>
                    <button class="btn" id="pvp" value="PVP">PvP</button>
                </div>
                <div id="private" class="hidden">
                    <label >Entrez un identifiant unique afin de jouer avec un ami:</label>
                    <input type="text" name="privateKey" name="privateKey" class="input-field" placeholder="Clé privée (optionnel)">
                </div>
            </div>
        </div>
    </div>
    
    <div id="chat-box" class="">
        <iframe frameBorder="0" class="chat" onload="applyStyles(this)" src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"]?>"> </iframe>
    </div>

    <div class="overlay hidden">
        <div id="deck-builder-frame" class="hidden">
                <iframe id="deck" style="height:90vh; width:90vw; " src="https://magix.apps-de-cours.com/server/#/deck/<?= $data["key"] ?>"></iframe>
        </div>
    </div>

    <div id="utils-wrapper-bg"  class="hidden">
        <div id="stats-wrapper" class="hidden">
            <div id="stats-chat">
                <h1>Statistiques</h1>
            </div>
            <button id="reset-stats" class="btn">Reset</button>
            <button id="export-csv" class="btn">Exporter</button>
        </div>
    </div>


<?php
    require_once("partial/footer.php");