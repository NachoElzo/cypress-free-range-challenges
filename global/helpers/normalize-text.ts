const normalizeText = (text) => {
  return text
    .normalize("NFD") // Separa los acentos de las letras
    .replace(/\s+/g, "") // Elimina todos los espacios
    .replace(/[^\w\s]/gi, "") // Elimina caracteres especiales
    .trim()
    .toLowerCase();
};

export default normalizeText;
