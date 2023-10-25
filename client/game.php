<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<script src="js/classes/Card.js"></script>
<script src="js/game.js"></script>

<div id="game-wrapper">
    <div id="opponent">
        <div id="opponent-hand"></div>
        <div id="opponent-hero"></div>     
        <div id="opponent-mana"></div>
    </div>

    <div id="battlefield">
        <div id="opponent-field"></div>
        <div id="user-field"></div>
        
        <div id="stat-wrapper">
            <div id="opponent-life">30</div>
                <div id="turn-state-wrapper">
                    <button id="end-turn">End Turn</button>
                    <div id="turn-timer">50</div>
                </div>
            <div id="user-life">30</div>
        </div>
    </div>

    <div id="user">
        <div id="user-hand">
        </div>
        <div id="user-hero"></div>

        <div id="mana-wrapper">
            <div id="mana"></div>
            <div id="user-mana">
                <div class="mana-count"></div>
            </div>
        </div>

        <button id="hero-power">Hero Power</button>
        <button id="surrender">Surrender</button>
    </div>
</div>

<?php
    require_once("partial/footer.php");