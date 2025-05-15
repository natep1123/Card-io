import axios from "axios";

export async function getShuffledDeck() {
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

export async function getHalfShuffledDeck() {
  try {
    const deckId = await getShuffledDeck();
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`
    );
    const cards = response.data.cards;
    console.log("HALF DECK CARDS", cards);
    return { deckId, cards };
  } catch (error) {
    console.error("Error fetching half shuffled deck:", error);
    throw error;
  }
}
