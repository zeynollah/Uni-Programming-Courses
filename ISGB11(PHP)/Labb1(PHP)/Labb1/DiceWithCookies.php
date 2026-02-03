<?php
	include("include/oneDice.php");
	include("include/sixDices.php");

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
				

				if(isset($_POST["btnNewGame"])){
					if($disabled){
						setCookie("nbrOfRounds", 0, (time()+3600));
						setCookie("sumOfAllrounds", 0, (time()+3600));
						$disabled = false;
						echo("<h1> New Game </h1>");
					}
				}



				if(isset($_POST["btnExit"]) && isset($_COOKIE["nbrOfRounds"]) && isset($_COOKIE["sumOfAllrounds"])){
					setCookie("nbrOfRounds", 0, (time()-3600));
					setCookie("sumOfAllrounds", 0, (time()-3600));
					if(!$disabled){
						$disabled = true;
					}
				}

			

				if( isset($_POST["btnRoll"]) && isset($_COOKIE["nbrOfRounds"]) && isset($_COOKIE["sumOfAllrounds"]) ){
						$disabled = false;
						$oSixDices = new SixDices();
						$oSixDices->rollDices();

						$_COOKIE["nbrOfRounds"] += 1;
						$_COOKIE["sumOfAllrounds"] += $oSixDices->sumDices();

						setCookie("nbrOfRounds", $_COOKIE["nbrOfRounds"], (time()+3600));
						setCookie("sumOfAllrounds", $_COOKIE["sumOfAllrounds"], (time()+3600));

						echo( publishData($_COOKIE["sumOfAllrounds"],  $_COOKIE["nbrOfRounds"]) );
				}

	

				if( isset($_COOKIE["nbrOfRounds"]) && isset($_COOKIE["sumOfAllrounds"]) && !isset($_POST["btnRoll"]) && !isset($_POST["btnExit"]) && !isset($_POST["btnNewGame"]) ){
					echo( publishData($_COOKIE["sumOfAllrounds"],  $_COOKIE["nbrOfRounds"]) );
					$disabled = false;
				}

			?>

		</div>
		
		<form action="<?php echo( $_SERVER["PHP_SELF"] ); ?>" method="post">
			<input type="submit" name="btnRoll" class="btn btn-primary" value="Roll six dices" <?php if($disabled) { echo("disabled"); } ?>> 
			<input type="submit" name="btnNewGame" class="btn btn-primary" value="New Game">
			<input type="submit" name="btnExit" class="btn btn-primary" value="Exit" <?php if($disabled) { echo("disabled"); } ?>> 
		</form>

		<script src="script/animation.js"></script>

	</body>

</html>