
export const slugGenerator = (treatmentName) => {
  const slug = `tratamiento-${treatmentName.replace(/\s+/g, '-').toLowerCase()}`;
  return slug;
}