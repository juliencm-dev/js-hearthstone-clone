<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();

    require_once("partial/header-global-fade.php");
?>

<script src="js/classes/Card.js"></script>
<script src="js/classes/Hero.js"></script>
<script src="js/game.js"></script>

<div class="game-bg"></div>

<div id="waiting" class="loading">
    <div class="overlay-txt">
        La partie commencera dans quelques instants...
    </div>
</div>

<div id="end-of-game" class="modal-overlay fade-in hidden">
    <img class="modal-box" src="./img/lobby-ui-chat.png" alt="">
    <div class="end-of-game-wrapper">
        <div id="end-of-game-title">Victoire!</div>
        <div id="end-of-game-subtitle">Vous avez vaincu votre adversaire!</div>
        <button class="btn" id="btn-leave">Quitter</button>
    </div>
</div>

<div id="surrender-overlay" class="modal-overlay fade-in hidden">
    <img class="modal-box" src="./img/lobby-ui-chat.png" alt="">
    <button id="surrender" class="btn">Surrender</button>
</div>

<img src="./img/ui/halo.png" alt="" id="halo">

<div id="error-message-game" class="hidden pulse"></div>

<!-- TODO: Finir intégration du chat -->

<div id="chat-box" class="in-game hidden">
        <iframe frameBorder="0" class="chat" onload="applyStyles(this)" src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"]?>"> </iframe>
</div>

<div id="game-wrapper">
    <div id="opponent">  
        <div id="opponent-life">30</div>
        
        <!-- TODO: Finir l'intégration -->
        <div id="opponent-mana"></div>
        <div id="opponent-card-count"></div>
        <div id="opponent-card-hand"></div>

    </div>

    <div id="battlefield">
        <div id="opponent-field"></div>
        <div id="user-field"></div>
        
        <div id="stat-wrapper">
            <div id="turn-state-wrapper">
                <button id="end-turn" class="btn">End Turn</button>
                <div id="turn-timer">50</div>
            </div>
        </div>
    </div>

    <div id="user">
        <div id="user-hand"></div>
        <div id="user-life">30</div>
        <div id="user-mana">0</div>

        <!-- TODO: Finir l'intégration -->
        <div id="user-card-count"></div>
        <div id="user-card-hand"></div>

    </div>
</div>

<?php
    require_once("partial/footer.php");