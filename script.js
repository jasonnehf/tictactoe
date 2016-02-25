/* PLAN
	x-	draw boxes
	x-	attach event handler to box container
	x-	make click turn on box class styles
	x-	make click only turn on unstyled boxes
	-	make click check, at end, run placeholder tictactoe solver
		-	queryClassName for last-clicked box's list of win-classes : if a count === 3, win!
		-	check if any boxes left to click; if not, and no winner, cat's game (display kitty)
	-	add reset button to clear all box styles

*/

var currentPlayer=-1;

function runWinCondition(winningTiles,winningSelector)
{
	for(var i=0; i<winningTiles.length; i++){
		winningTiles[i].classList.add("tile-winner");
	}
	var playerName=(currentPlayer===0 ? "Player 1" : "Player 2");
	var gamefooter=document.getElementsByClassName('gamefooter')[0].textContent=playerName + " Wins!";
	currentPlayer=-1;
}

function nextPlayerTurn()
{
	currentPlayer=(currentPlayer+1) % 2;
	var playerName=(currentPlayer===0 ? "Player 1" : "Player 2");
	var gamefooter=document.getElementsByClassName('gamefooter')[0].textContent="It's " + playerName + "'s turn...";	
}

function processClick(event)
{
	if(currentPlayer===-1 || event.target.nodeName!=="DIV" || !event.target.classList.contains("tile-unset"))
	{
		return;
	}
	if(event.type==="touchend"){
		event.preventDefault();
	}
	var tile=event.target;
	var box=tile.parentNode;
	var tileMarker=(currentPlayer===0 ? 'tile-x' : 'tile-o');
	//console.log("event: ",event, "target: ", {item:event.target} );
	// console.log("currentPlayer : ",currentPlayer);
	//var checkMe=document.querySelectorAll('.c1.box > .'+tileMarker);
	//console.log('checkMe: ', checkMe);
	tile.classList.remove('tile-unset');
	tile.classList.add(tileMarker);
	var winConditionMet=false;
	var winConditionElements=[];
	for(var i=0; i<box.classList.length-1;i++)
	{
		var winConditionGroup=box.classList[i];
		var winConditionSelector='.'+winConditionGroup+'.box > .'+tileMarker;
		winConditionElements=document.querySelectorAll(winConditionSelector);
		console.log('winConditionGroup: ', winConditionGroup,'winConditionElements: ', winConditionElements);
		if(winConditionElements.length>2)
		{
			winConditionMet=true;
			break;
		}

	}
	if(!winConditionMet)
		nextPlayerTurn();
	else
		runWinCondition(winConditionElements,winConditionSelector);

	// console.log("currentPlayer : ",currentPlayer);
	// console.log({target: event.target}, {targetParent: event.target.parentNode});

} 

function resetBoard(event)
{
	var gametiles=document.getElementsByClassName('tile');
	for(var i=0;i<gametiles.length;i++)
	{
		gametiles[i].classList.remove('tile-x', 'tile-o','tile-winner');
		gametiles[i].classList.add('tile-unset');
		// gametiles[i].parentNode.classList.remove('box-x', 'box-o');
		document.getElementsByClassName('gamefooter')[0].textContent="";
	}
	nextPlayerTurn();
}

function onInit(event)
{
	gameboard=document.getElementsByClassName('gameboard-container')[0];
	gameboard.addEventListener('click', processClick);
	gameboard.addEventListener('touchend', processClick);

	resetGameBtn=document.getElementById('resetGameBtn');
	resetGameBtn.addEventListener('click', resetBoard);

	resetBoard(event);	//	just for sanity sake



}




document.addEventListener('DOMContentLoaded',onInit);