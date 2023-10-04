<?php
    require_once("action/LoginAction.php");

    $action = new LoginAction();
    $data = $action->execute();

    require_once("partial/header.php");

?>

<script src="js/classes/Spark.js"></script>
<script src="js/page-login.js"></script>

<div class="bg-image">
  <img src="./img/background/front-page/bg_0006_bg-1.png" class="parallax bg-1" data-speedx="0.05" data-speedy="0.02" >
  <img src="./img/background/front-page/bg_0005_bg-2.png" class="parallax bg-2" data-speedx="0.03" data-speedy="0.015">
  <img src="./img/background/front-page/bg_0004_bg-3.png" class="parallax bg-3" data-speedx="0.02" data-speedy="0.01">
  <img src="./img/background/front-page/bg_0003_bg-4.png" class="smoke">
  <img src="./img/background/front-page/bg_0002_bg-5.png" class="parallax bg-4" data-speedx="0.015" data-speedy="0.005">
  <img src="./img/background/front-page/bg_0001_bg-6.png" class="smoke">
  <img src="./img/background/front-page/bg_0000_bg-7.png" class="parallax bg-5" data-speedx="0.012" data-speedy="0.002">
</div>

<div class="logo">
  <img src="./img/magix-logo.png" id="logo-magix">
</div>


<div class="login-wrapper hidden">
    <form class="login-box" action="#" method="POST">
      <?php 
          if ($data["hasConnectionError"]) {
              ?>
              <div class=""><strong>Erreur : </strong>Connexion erronée</div>
              <?php
          }
      ?>
      <div>
        <label class="login-label" for="username">Nom d'usager</label>
        <div class="input-wrapper">
          <input id="username" name="username" class="input-field">
        </div>
      </div>

      <div>
        <label class="login-label" for="pwd">Mot de passe </label>
        <div class="input-wrapper">
          <input id="pwd" name="pwd" type="password" class="input-field">
        </div>
      </div>
     
      <button id="btn-connect" type="submit" class="btn">Connection</button>
  
    </form>
  </div>

<?php
    require_once("partial/footer.php");