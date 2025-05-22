import axios from "axios";

// API call to /api/deck/new
export async function getDeck(deckSize) {
  try {
    const response = await axios.get("/api/deck/new", { params: { deckSize } });
    console.log("/API/DECK/NEW ROUTE RESPONSE", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching new deck:", error);
    throw error;
  }
}

// Function to get a new card and modify the deck
export function drawCard(cardsArr) {
  try {
    const [drawnCard, ...cardsAfterDraw] = cardsArr;
    return {
      drawnCard,
      cardsAfterDraw,
      remaining: cardsAfterDraw.length,
    };
  } catch (error) {
    console.error("Error drawing card:", error);
    throw error;
  }
}
