export const slugGenerator = (treatmentName) => {
  const slug = `${treatmentName.replace(/\s+/g, "-").toLowerCase()}`;
  return slug;
};

export const faqsGenerator = (preguntas) => {
  const faqs = {};
  preguntas.split("¿").forEach((pregunta) => {
    const [key, value] = pregunta.split("?");
    if (key && !faqs[key]) {
      faqs[key] = value;
    }
  });
  return Object.entries(faqs);
};
