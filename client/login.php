<?php
    require_once("action/LoginAction.php");

    $action = new LoginAction();
    $data = $action->execute();

    require_once("partial/header.php");

?>

<script src="js/classes/Spark.js"></script>
<script src="js/page-login.js"></script>

<div class="bg-image"></div>
<div class="logo">
  <img src="./img/magix-logo.png" id="logo-magix">
</div>


<div class="main-wrapper">
    <form class="login-box" action="#" method="POST">
      <?php 
          if ($data["hasConnectionError"]) {
              ?>
              <div class=""><strong>Erreur : </strong>Connexion erronée</div>
              <?php
          }
      ?>
      <div>
        <label for="username">Nom d'usager</label>
        <div class="login-label">
          <input id="username" name="username" class="input-field">
        </div>
      </div>

      <div>
        <label for="pwd">Mot de passe </label>
        <div class="login-label">
          <input id="pwd" name="pwd" type="password" class="input-field">
        </div>
      </div>
     
      <button id="btn-connect" type="submit" class="btn">Connection</button>
  
    </form>
  </div>

<?php
    require_once("partial/footer.php");