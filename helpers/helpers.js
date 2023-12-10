export const slugGenerator = (treatmentName) => {
  const slug = `${treatmentName.replace(/\s+/g, "-").toLowerCase()}`;
  return slug;
};

export const formatText = (text) => {
  return text
    .replace(/\s+\\/g, "\\")
    .replace(/\s*\?/g, "")
    .replace(/(\\r\\n)(?=\w*\?)/g, "")
    .replace(/\\r\\n/g, "<br>");
  s;
};

export const faqsGenerator = (preguntas) => {
  const faqs = {};
  preguntas.split("¿").forEach((pregunta) => {
    const [key, value] = pregunta.split("?");
    if (key && !faqs[key]) {
      faqs[key] = formatText(value);
    }
  });
  return Object.entries(faqs);
};
