export const productFiltersNameConverter = (value: any, filterName: string) => {
  const parts = value?.split("-");

  const lowerBound = parts[0];
  const upperBound = parts[1];

  let newValue = "";

  if (filterName === "GoldWeight") {
    if (upperBound === undefined) {
      newValue = `Less than ${lowerBound}gms`;
    } else if (upperBound === "n") {
      newValue = `${lowerBound}gms and above`;
    } else {
      newValue = `${lowerBound}gms to ${upperBound}gms`;
    }
  }

  if (filterName === "GoldPrice") {
    if (lowerBound === "0") {
      newValue = `Less than ₹${upperBound}`;
    } else if (upperBound === "n") {
      newValue = `₹${lowerBound} and above`;
    } else {
      newValue = `₹${lowerBound} to ₹${upperBound}`;
    }
  }
  return newValue;
};
