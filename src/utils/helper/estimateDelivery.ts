export const estimateDelivery = (
  rangeStartDate: number,
  rangeEndDate: number
) => {
  function formatDate(date: any) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  function calculateFutureDate(days: any) {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);
    return futureDate;
  }

  const startDate = calculateFutureDate(rangeStartDate);
  const endDate = calculateFutureDate(rangeEndDate);

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return `${formattedStartDate} - ${formattedEndDate}`;
};
