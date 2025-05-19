import axios from "axios";
import { NextResponse } from "next/server";

// This route handles getting a new shuffled deck id from the cards API
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const deckSize = searchParams.get("deckSize");
    const drawCount = deckSize === "full" ? 52 : 26;

    // Initialize new deck, get deck id
    const firstRes = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const deckId = firstRes.data.deck_id;

    // Check deck size
    if (deckSize === "half") {
      // Draw 26 cards to simulate a half deck
      await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`
      );
    }

    // Draw all cards to cache them in context (avoid API call per draw)
    const secondRes = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${drawCount}`
    );
    const cards = secondRes.data.cards;

    return NextResponse.json(
      { deckId, cards, remaining: drawCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching new deck:", error);
    return NextResponse.json(
      { message: "An error occurred fetching the new deck." },
      { status: 500 }
    );
  }
}
