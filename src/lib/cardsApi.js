import axios from "axios";

export async function getFullDeck() {
  try {
    const response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const deckId = response.data.deck_id;
    console.log("NEW DECK ID", deckId);
    return deckId;
  } catch (error) {
    console.error("Error fetching shuffled deck:", error);
    throw error;
  }
}

export async function getHalfDeck() {
  try {
    const deckId = await getFullDeck();
    // Draw 26 cards to simulate a half deck
    await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`
    );
    return deckId;
  } catch (error) {
    console.error("Error fetching half shuffled deck:", error);
    throw error;
  }
}

export async function drawCard(deckId) {
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    return response.data;
  } catch (error) {
    console.error("Error drawing card:", error);
    throw error;
  }
}
