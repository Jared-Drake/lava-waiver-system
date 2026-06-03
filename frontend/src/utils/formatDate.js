export function formatDate(dateValue) {
  if (!dateValue) {
    return "N/A";
  }

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}