// User made function for displaying stats about blog posts
export function getPostStatistics(content: string) {
  // Length
  const words = content.split(" ");
  const wordCount = words.length;

  // Reading time
  const minutes = wordCount / 200;
  const roundedMinutes = Math.round(minutes);

  // Complexity score
  const complexity = Math.trunc(wordCount / 100);

  // Random article ID for fun
  const randomID = Math.floor(Math.random() * 1000);

  return { wordCount, roundedMinutes, complexity, randomID };
}
