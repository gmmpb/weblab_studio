"use server";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

export async function analyzeSentiment(text: string) {
  const result = sentiment.analyze(text);
  return result;
}
