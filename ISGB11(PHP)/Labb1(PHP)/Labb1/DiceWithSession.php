<?php
	session_start();
	include("include/oneDice.php");
	include("include/sixDices.php");

	function removeSession() {

		session_unset();
		
		if( ini_get( "session.use_cookies" ) ) {
			
			$sessionCookieData = session_get_cookie_params();

			$path = $sessionCookieData["path"];
			$domain = $sessionCookieData["domain"];
			$secure = $sessionCookieData["secure"];
			$httponly = $sessionCookieData["httponly"];
			
			setcookie( session_name(), "", time() - 3600, $path, $domain, $secure, $httponly );
		
		}
		session_destroy();
	}

	function publishData( $inSum, $inNbr ) {

		$avg = 0;

		if($inSum > 0 && $inNbr > 0) {
			$avg = number_format( ( $inSum / $inNbr ), 2 );
		}

		return "<div><p>Antal: $inNbr</p><p>Totalt: $inSum</p><p>Medel: $avg</p></div>";

	}

	$disabled = true;


?>
<!doctype html>
<html lang="en" >

	<head>
		<meta charset="utf-8">
		<title>Roll the dice...</title>
		<link href="style/style.css" rel="stylesheet">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
	</head>

	<body>
	
		<div>
			<?php 
				

			if( isset($_GET["linkNewGame"])){
				if($disabled){
					$disabled = false;

					$_SESSION["nbrOfRounds"] = 0;
					$_SESSION["sumOfAllrounds"] = 0;

					echo( "<h1>New Game!</h1>" );
				}
			}

	

			if( isset($_GET["linkRoll"]) && isset( $_SESSION["nbrOfRounds"] ) && isset( $_SESSION["sumOfAllrounds"]) ){
				
				$disabled = false;
				$oSixDices = new SixDices();
				$oSixDices->rollDices();
				$_SESSION["sumOfAllrounds"] += $oSixDices->sumDices(); 
				$_SESSION["nbrOfRounds"] += 1;

				echo( publishData($_SESSION["sumOfAllrounds"],  $_SESSION["nbrOfRounds"]) );
			}

		

			if( isset($_GET["linkExit"]) && isset( $_SESSION["nbrOfRounds"] ) && isset( $_SESSION["sumOfAllrounds"]) ){
				removeSession();
				$disabled = true;
			}


			if( isset( $_SESSION["nbrOfRounds"] ) && isset( $_SESSION["sumOfAllrounds"]) && !isset($_GET["linkNewGame"]) && !isset($_GET["linkRoll"]) && !isset($_GET["linkExit"]) ){
				echo( publishData($_SESSION["sumOfAllrounds"],  $_SESSION["nbrOfRounds"]) );
				$disabled = false;
			}

	

			if( !isset( $_SESSION["nbrOfRounds"] ) && !isset( $_SESSION["sumOfAllrounds"]) && !isset($_GET["linkNewGame"]) && !isset($_GET["linkRoll"]) && !isset($_GET["linkExit"]) ){
				removeSession();
				$disabled = true;
			}

			?>
		</div>
		
		<a href="<?php echo( $_SERVER["PHP_SELF"] ); ?>?linkRoll=true" class="btn btn-primary <?php if($disabled) { echo("disabled"); } ?>">Roll six dices</a> 
		<a href="<?php echo( $_SERVER["PHP_SELF"] ); ?>?linkNewGame=true" class="btn btn-primary">New game</a>
		<a href="<?php echo( $_SERVER["PHP_SELF"] ); ?>?linkExit=true" class="btn btn-primary <?php if($disabled) { echo("disabled"); } ?>">Exit</a>
		
		<script src="script/animation.js"></script>
		
	</body>

</html>