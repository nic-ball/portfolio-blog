// User made function for displaying stats about blog posts
export function getPostStatistics(content: string, allPosts: any[]) {
  // Length
  const words = content.split(" ");
  const wordCount = words.length;

  // Reading time
  const minutes = wordCount / 200;
  const roundedMinutes = Math.round(minutes);

  // Complexity score
  const complexity = Math.trunc(wordCount / 100);

  // Random article to read next
  let recommendedPost = null;
  if (allPosts && allPosts.length > 0) {
    const randomIndex = Math.floor(Math.random() * allPosts.length);
    recommendedPost = allPosts[randomIndex];
  }

  return {
    wordCount,
    readingTime: roundedMinutes < 1 ? 1 : roundedMinutes, // Min 1 min read
    complexity,
    recommendedPost
  };
}
