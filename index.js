/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js Comment. Comment.
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Grab the element with the id 'games-container'
    const gamesContainer = document.getElementById("games-container");

    // Loop over each item in the games array
    for (let game of games) {
        // Create a new div element for each game card
        const gameCard = document.createElement("div");

        // Add the class 'game-card' to the game card
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display game info
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers}</p>
        `;

        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    }
}




// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
// Call the function to add all games to the page
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

document.addEventListener("DOMContentLoaded", function() {
    const fundedBtn = document.getElementById("funded-btn");

    // grab the contributions card element
    const contributionsCard = document.getElementById("num-contributions");
    
    // Use reduce() to calculate the total number of individual contributions (backers)
    const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
    
    // Set the inner HTML of the contributionsCard to display the result
    contributionsCard.innerHTML = totalContributions.toLocaleString();
    
    // grab the amount raised card, then use reduce() to find the total amount raised
    const raisedCard = document.getElementById("total-raised");
    
    const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
    
    // Set the inner HTML of the raisedCard element to display the total pledged amount with a dollar sign
    raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;
    
    // grab number of games card and set its inner HTML
    const gamesCard = document.getElementById("num-games");
    
    // get the total number of games
    const totalGames = GAMES_JSON.length;
    
    // set the inner HTML to display the total number of games
    gamesCard.innerHTML = `${totalGames}`;

    if (fundedBtn) {
        fundedBtn.addEventListener("click", filterFundedOnly);
    }

    // Use filter to find all the unfunded games (pledged less than goal)
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Get the number of unfunded games
    const numUnfundedGames = unfundedGames.length;

    console.log(`Number of unfunded games: ${numUnfundedGames}`);

    // Template string for money raised and unfunded games count
    const displayStr = `A total of $${totalPledged.toLocaleString()} has been raised for ${totalGames} games. Currently, ${numUnfundedGames} game${numUnfundedGames === 1 ? '' : 's'} remains unfunded. We need your help to fund these amazing games!`;

    // Create a new paragraph element
    const newParagraph = document.createElement("p");
    newParagraph.innerHTML = displayStr;

    // Get the description container and append the new paragraph
    const descriptionContainer = document.getElementById("description-container");
    descriptionContainer.appendChild(newParagraph);

// Grab the element where you want to display the top 2 games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games by the pledged amount, from highest to lowest
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Destructure the first and second games from the sorted array
const [firstGame, secondGame, ...rest] = sortedGames;

// Create and append elements to display the top funded games
function displayTopGames() {
    if (firstGameContainer) {
        // Create a new element to display the name of the top funded game
        const firstGameName = document.createElement("h3");
        firstGameName.innerText = firstGame.name;

        // Append it to the first game container
        firstGameContainer.appendChild(firstGameName);
    }

    if (secondGameContainer) {
        // Create a new element to display the name of the second most funded game
        const secondGameName = document.createElement("h3");
        secondGameName.innerText = secondGame.name;

        // Append it to the second game container
        secondGameContainer.appendChild(secondGameName);
    }
}

// Call the function to display the top games
displayTopGames();
});




/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the length of the unfundedGames array to the console
    console.log(`Number of unfunded games: ${unfundedGames.length}`);


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the length of the fundedGames array to the console
    console.log(`Number of funded games: ${fundedGames.length}`);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// Add event listeners for each button and connect them to the appropriate functions
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);




// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Grab the element where you want to display the top 2 games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games by the pledged amount, from highest to lowest
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Destructure the first and second games from the sorted array
const [firstGame, secondGame, ...rest] = sortedGames;

// Create a function to display the top games when a button is clicked
function displayTopGames() {
    // Ensure the elements are populated with the top 2 games
    if (firstGameContainer && secondGameContainer) {
        firstGameContainer.innerHTML = `
            <h3>${firstGame.name}</h3>
            <p>Pledged: $${firstGame.pledged.toLocaleString()}</p>
            <p>Backers: ${firstGame.backers}</p>
        `;
        
        secondGameContainer.innerHTML = `
            <h3>${secondGame.name}</h3>
            <p>Pledged: $${secondGame.pledged.toLocaleString()}</p>
            <p>Backers: ${secondGame.backers}</p>
        `;
    }
}

// Add event listeners to the buttons (ensure they exist in the HTML)
document.getElementById("top-game-btn")?.addEventListener("click", displayTopGames);

// For the Runner-Up button (second game), we add a similar function if needed
document.getElementById("second-game")?.addEventListener("click", function() {
    secondGameContainer.innerHTML = `
        <h3>${secondGame.name}</h3>
        <p>Pledged: $${secondGame.pledged.toLocaleString()}</p>
        <p>Backers: ${secondGame.backers}</p>
    `;
});
