"use server";
import keywordExtractor from "keyword-extractor";

export async function extractKeywords(text: string) {
  const extractionResult = keywordExtractor.extract(text, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false,
  });

  return extractionResult;
}
