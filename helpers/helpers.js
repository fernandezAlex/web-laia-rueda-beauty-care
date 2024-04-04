export const slugGenerator = (treatmentName) => {
	if (!treatmentName) return;
	const slug = `${treatmentName.replace(/\s+/g, "-").toLowerCase()}`;
	return slug;
};

export const formatText = (text) => {
	if (!text) return;
	return text
		.replace(/\s+\\/g, "\\")
		.replace(/\s*\?/g, "")
		.replace(/(\\r\\n)(?=\w*\?)/g, "")
		.replace(/\\r\\n/g, "<br>");
	s;
};

export const faqsGenerator = (preguntas) => {
	if (!preguntas) return;
	const faqs = {};
	preguntas.split("¿").forEach((pregunta) => {
		const [key, value] = pregunta.split("?");
		if (key && !faqs[key]) {
			faqs[key] = formatText(value);
		}
	});
	return Object.entries(faqs);
};
