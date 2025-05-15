import axios from "axios";

export async function getShuffledDeck() {
  return axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((response) => {
      return response.data.deck_id;
    })
    .catch((error) => {
      console.error("Error fetching shuffled deck:", error);
    });
}

/* Example Response: */
/* {
    "success": true,
    "deck_id": "3p40paa87x90",
    "shuffled": true,
    "remaining": 52
}*/

export async function drawCard(deckId) {
  return axios.get(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );
}

/* Example Response: */
/* {
    "success": true, 
    "deck_id": "kxozasf3edqu", 
    "cards": [
        {
            "code": "6H", 
            "image": "https://deckofcardsapi.com/static/img/6H.png", 
            "images": {
                          "svg": "https://deckofcardsapi.com/static/img/6H.svg", 
                          "png": "https://deckofcardsapi.com/static/img/6H.png"
                      }, 
            "value": "6", 
            "suit": "HEARTS"
        }, 
    ], 
    "remaining": 50
} */
