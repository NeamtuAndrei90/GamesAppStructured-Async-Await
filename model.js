var apiURL = "https://games-world.herokuapp.com";

// function getGamesList(callbackFunction){
//     fetch(apiURL + "/games", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         }
//     }).then(function(response){
//         return response.json();
//     }).then(function(arrayOfGames){
//         callbackFunction(arrayOfGames);
//     });
// }

async function getGamesList(){
    const response = await fetch(apiURL + "/games", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const arrayOfGames = response.json();
    return arrayOfGames;
  }

  async function startApp() {
    const arrayOfGames = await getGamesList();
    console.log(arrayOfGames)
    for (var i = 0; i < arrayOfGames.length; i++) {
      createDomElement(arrayOfGames[i]);
    }
  }


// function deleteGame(gameID, callbackFunction) {
//     fetch(apiURL + "/games/" + gameID, {
//         method: "DELETE"
//     }).then(function(r){
//         return r.text();
//     }).then(function(apiresponse){
//         callbackFunction(apiresponse);
//     });

// }

async function deleteGameDiv(gameID){
    const response = await fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    });
    const responseMsg = response.text();
    return responseMsg;
}

async function deleteGame(gameID, div){
    const responseMsg = await deleteGameDiv(gameID);
    console.log(responseMsg);
    console.log(gameID);
    removeDeletedElementFromDOM(div);
}

// function createGameRequest(gameObject, callbackCreateGame){
//     fetch(apiURL + "/games", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: gameObject
//     }).then(function(response){
//         return response.json();
//     }).then(function(createdGame){
//         console.log(createdGame);
//         callbackCreateGame(createdGame);
//     });
// }

async function createGameRequest(gameObject){
    const response = await fetch(apiURL + "/games/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    })
    const newGame = response.json;
    return newGame;
}

async function createGame (gameObject){
    const newGame = await createGameRequest(gameObject);

    createDomElement(newGame)

}


// function updateGameRequest(gameId, updatedGameObj, callbackCreateGame){
//     fetch(apiURL + "/games/" + gameId , {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: updatedGameObj
//     }).then(function(response){
//         return response.json();
//     }).then(function(updatedGame){
//         console.log(updatedGame);
//         callbackCreateGame(updatedGame);
//     });
// }

async function updateGameRequest(gameId, updatedGameObj){
    const response = fetch(apiURL + "/games/" + gameId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObj
    })
    const updatedGame = response.json();
    return updatedGame;
}

async function updateGame(gameId, updatedGameObj, gameDiv){
    const updatedGame = await updatedGameRequest(gameId, updatedGameObj)
    newDomElement(gameDiv, updatedGame);
}