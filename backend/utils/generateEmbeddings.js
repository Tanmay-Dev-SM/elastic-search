export const generateRandomEmbedding = () => {
  const embedding = [];
  for (let i = 0; i < 128; i++) {
    embedding.push(Math.random());
  }
  return embedding;
};
