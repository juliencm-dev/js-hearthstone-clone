<?php
    require_once("action/GameAction.php");

    $action = new GameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<script src="js/game.js"></script>

<canvas></canvas>
<div class="main-wrapper">
    <div id="opponent">
        <div id="opponent-hand"></div>
        <div id="opponent-hand-count"></div>
        <div id="opponent-hero"></div>
        <div id="opponent-life">30</div>
        <div id="opponent-mana"></div>
    </div>

    <div id="battlefield">
        <div id="opponent-field"></div>
        <div id="turn-timer">50</div>
        <div id="user-field"></div>
    </div>

    <div id="user">
        <div id="user-hand"></div>
        <div id="user-hand-count"></div>
        <div id="user-hero"></div>
        <div id="user-life">0</div>
        <div id="user-mana"></div>
        <button id="hero-power"></button>
        <button id="end-turn"></button>
        <button id="surrender"></button>
    </div>
</div>

<?php
    require_once("partial/footer.php");