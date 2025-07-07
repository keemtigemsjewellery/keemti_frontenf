export const getLocalStorageValue = (key: string) => {
  return localStorage.getItem(key);
};

export const setLocalStorageValue = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const removeLocalStorageValue = (key: string) => {
  return localStorage.removeItem(key);
};

export const wordCapitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const addCommaInCurrency = (word: string) => {
  return parseFloat(word).toLocaleString("en-IN", { maximumFractionDigits: 0 });
};

export const slugToHeading = (word: string) => {
  return word
    .split("-")
    .map((letter) => letter.charAt(0).toUpperCase() + letter.slice(1))
    .join(" ");
};
export const headingToSlug = (word: string) => {
  return word
    .split(" ")
    .map((letter) => letter.toLowerCase())
    .join("-");
};

export const redirectURL = (redirectLink: string) => {
  if (redirectLink.includes(`${process.env.REACT_APP_BASE_URL}`)) {
    window.location.href = redirectLink;
  } else {
    window.open(
      redirectLink.includes("http") ? redirectLink : `https://${redirectLink}`,
      "_blank"
    );
  }
};

export const removeEmptyParams = (params: any) => {
  for (const key in params) {
    if (
      params[key] === "" ||
      (Array.isArray(params[key]) && params[key].length === 0)
    ) {
      delete params[key];
    }
  }
  return params;
};

export const urlSearchParams = (data: any) => {
  return Object.keys(data)
    .map((key) => {
      if (Array.isArray(data[key])) {
        return `${key}=${JSON.stringify(data[key])}`;
      } else {
        return `${key}=${data[key]}`;
      }
    })
    .join("&");
};

export const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const scrollToTop = () => {
  return window.scrollTo({
    top: 0,
    behavior: "instant",
  });
};

export const stringToSlug = (inputString: string) => {
  return inputString.toLowerCase().replace(/ /g, "-");
};

export const arraytoStringTypeArray = (data: any) => {
  return (
    "[" +
    `${data}`
      ?.split(",")
      .map((item: any) => `"${item}"`)
      .join(",") +
    "]"
  );
};

export const orderDetailsDateConverter = (date: any) => {
  const inputDate = new Date(`${date}`);

  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return inputDate.toLocaleDateString("en-US", options);
};

export const getDomainDetails = () => {
  const port =
    window.location.port.length > 0 ? `:${window.location.port}` : "";

  return window.location.protocol + "//" + window.location.hostname + port;
};

export const profileSidebarScrollToTop = () => {
  if (window.innerWidth < 576) {
    return window.scrollTo({
      top: 510,
      behavior: "instant",
    });
  } else {
    return window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }
};

export const standardDateToBlogDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
};

export const returnPathnameOnly = (searchDeepLink: string) => {
  const url = new URL(searchDeepLink);
  return url.pathname;
};
