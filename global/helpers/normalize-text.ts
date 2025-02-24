const normalizeText = (text: string) => {
  return text
    .normalize("NFD") // Converts accented characters to their base form (e.g., "é" → "e")
    .replace(/\s+/g, "") // Removes all spaces
    .replace(/[^\w\s]/gi, "") // Removes special characters, keeping only letters and numbers
    .trim() // Removes spaces at the start and end
    .toLowerCase(); // Converts text to lowercase
};

export default normalizeText;
