$(document).ready(function(){

	var phaedra = {
		firstName: "Phaedra",
		lastName: "Parks",
		startlifePoints: 100,
		powerPoints: 1
	};

	var kenya = {
		firstName: "Kenya",
		lastName: "Moore",
		startlifePoints: 180,
		powerPoints: 1
	};

	var porsha = {
		firstName: "Porsha",
		lastName: "Williams",
		startlifePoints: 150,
		powerPoints: 1
	};

	var nene = {
		firstName: "NeNe",
		lastName: "Leakes",
		startlifePoints: 100,
		powerPoints: 1
	};

	var defendPower = 0;
	var attackPower = 0;
	var defendLife = 100;
	var attackLife = 100;

	// defender test, check to see if defender character has been selected before enabling click event
	 var defendTest = $("#phaedra, #porsha, #nene, #kenya").hasClass("defender");
	 	//console.log(defendTest);

	//step one - click events
	$(" #phaedra, #porsha, #nene, #kenya").on("click",function(){
			
		var characterId = $(this).attr("id");
		var points = characterId+"[0]";

		console.log(points);
		// var fullName = characterId[firstName];
		// var lifePoints = characterId[startLifePoints];

		//if no defender character has been selected, select one
		if (defendTest === false) {


			//remove character from the enemy-area div, append to the defender-area div, re-add the id, add class of "defender"
			$("#" + characterId).remove();
			$(".defender-area").append('<div class="character defender"></div>');
			$(".defender").attr("id", characterId);
			$(".character").attr("height", "600px");
			$(".character-heading").removeClass("hide");
			$(".current-enemy-heading").removeClass("hide");

			//add score info within character
			$("#" + characterId).append("<h3 class='name'>defender-name</h3>");

			$("#" + characterId).append("<h4 class='life points'>defender-life</h4>");

			//update defendTest
			defendTest = $("#phaedra, #porsha, #nene, #kenya").hasClass("defender");

			//auto-generates random amount of power of your character
			defendPower = Math.floor(Math.random() * 50);

			//prompts user to select next character
			$(".select").text("Select your enemy...");

		} else if (defendTest === true) {

			
			//remove character from the enemy-area div, append to the defender-area div, re-add the id, add class of "defender"
			$("#" + characterId).remove();
			$(".current-enemy-area").append('<div class="character enemy"></div>');
			$(".enemy").attr("id", characterId);

			//add score info within character
			$("#" + characterId).append("<h3 class='name'>enemy-name</h3>");
			$("#" + characterId).append("<h4 class='life points'>enemy-life</h4>");

			//update defendTest
			defendTest = $("#phaedra, #porsha, #nene, #kenya").hasClass("defender");

			//auto-generates random amount of power of enemy
			attackPower = Math.floor(Math.random() * 50);

			//unhide attack button
			$("#attack").removeClass("hide");

			//prompts user to click the attack button
			$(".select").text("Click button to attack!");
		}//closes if / else if statement

	}); 


	//step 2 click attack
	$("#attack").on("click", function(){
		//generate random attack value for defender


		//generate random attack value for defender for enemy

		if( defendPower > attackPower ) {

			defendPower = defendPower + Math.floor((attackPower/10));

			defendLife = defendLife - attackPower;

			console.log("defend power: " +defendPower);
			console.log("defend life: "+ defendLife);

		} else {

			attackLife = attackLife - defendPower;

			console.log("attack: " +attackLife);
		}
		
		
		//console.log("Defend Life:" + defendLife);
		$(".defender > .life").text("HP: " + defendLife);
		//console.log("Attack Life:" + attackLife);
		$(".enemy > .life").text("HP: " + attackLife);

		//console.log("Defend Power:" + defendPower);
		$(".attack-stats").removeClass("hide");
		$(".attack-power").text( attackPower);
		$(".defend-power").text(defendPower);

		//update attack and defend variables in the DOM

		 if (attackLife <= 0) {
		//if enemy's life points < 0 you win, select another enemy
		$(".attack-button-win-msg").removeClass("hide");
		
		//hide attack button, hide current defender
		$("#attack").addClass("hide");
		$(".enemy").addClass("hide");
		$(".attack-button-msg").addClass("hide");
		$(".enemy").removeClass("enemy");


			$("#phaedra, #porsha, #nene, #kenya").on("click", function(){
				$(".attack-button-win-msg").addClass("hide");
				$("#attack").removeClass("hide");
			});

		//reset life points
		attackLife = 100;


		 } else if (defendLife <= 0) {
			// //step 5 you lose
			// 	//if your life points = 0 you lose
			$(".attack-button-lose-msg").removeClass("hide");
			//hide attack button, unhide refresh button
			$("#attack").addClass("hide");
			$("#refresh").removeClass("hide");
		 }
		
	});

		//step 6 refresh game
		$("#refresh").on("click", function(){
			$("#attack").addClass("hide");
			$(".attack-button-lose-msg").addClass("hide");
			$(".attack-button-win-msg").addClass("hide");
			$("#refresh").addClass("hide");
			$(".defender-area").empty();
			$(".current-enemy-area").empty();
			$(".character").removeClass("defender");
			$(".character").removeClass("enemy");
		});
});