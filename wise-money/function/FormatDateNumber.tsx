export const formatStardEndDate = (startDate: string, endDate: string) => {
  // Split the date strings
  const startDateParts = startDate.split("-");
  const endDateParts = endDate.split("-");

  // Remove the century part (first two characters) from the year
  const endTitle =
    endDateParts[2] + "/" + endDateParts[1] + "/" + endDateParts[0].slice(2);
  const startTitle =
    startDateParts[2] +
    "/" +
    startDateParts[1] +
    "/" +
    startDateParts[0].slice(2);

  return startTitle + " - " + endTitle;
};

export const formatAmount = (value) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
