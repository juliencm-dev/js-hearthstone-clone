<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");

?>

<script src="js/classes/Spark.js"></script>
<script src="js/page-index.js"></script>

<div class="bg-image">
  <img src="./img/background/front-page/bg_0006_bg-1.png" class="breathing bg-1" data-speedx="0.07" data-speedy="0.02" >
  <img src="./img/background/front-page/bg_0005_bg-2.png" class="bg-2">
  <img src="./img/background/front-page/bg_0004_bg-3.png" class="bg-3">
  <img src="./img/background/front-page/bg_0003_bg-4.png" class="breathing smoke" data-speedx="0.095" data-speedy="0.03">
  <img src="./img/background/front-page/bg_0002_bg-5.png" class="bg-4">
  <img src="./img/background/front-page/bg_0001_bg-6.png" class="breathing smoke" data-speedx="0.03" data-speedy="0.015">
  <img src="./img/background/front-page/bg_0000_bg-7.png" class="bg-5">
</div>

<div class="logo pulse <?=$data["hasConnectionError"] ? "hidden" : ""?>">
  <img src="./img/magix-logo.png" id="logo-magix">
  <div class="logo-text">Appuyez sur ENTRER</div>
</div>

<div class="login-wrapper fade-in <?=$data["hasConnectionError"] ? "" : "hidden"?>">
    <form class="login-box" action="#" method="POST">
      <?php 
          if ($data["hasConnectionError"]) {
              ?>
              <div class="error"><strong>Erreur : </strong>Connexion erronee</div>
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