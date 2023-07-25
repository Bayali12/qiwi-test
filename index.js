const getСurrencies = async () => {
  try {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await response.json();
    return data.Valute;
  } catch (error) {
    console.error(error);
  }
};

const getDate = async () => {
  try {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await response.json();
    return { date: data.Date, previousDate: data.PreviousDate };
  } catch (error) {
    console.error(error);
  }
};

const formatDate = (date) => {
  const initialDate = new Date(date);
  const formatedDate = `${initialDate.toLocaleDateString(
    "en-GB"
  )}, ${initialDate.toLocaleTimeString("it-IT")}`;
  return formatedDate;
};

const addCurrenciesToSelector = (currencies) => {
  const currenciesSelector = document.getElementById("currencies");

  Object.keys(currencies).map((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `${currencies[key].ID} - ${currencies[key].Name}`;
    currenciesSelector.appendChild(option);
  });
};

const setCurrencyInfo = (currency, { date, previousDate }) => {
  const titleCurrency = document.querySelector(".currencyInfo .title");
  const currentDateElement = document.querySelector(
    ".currencyInfo .current .date"
  );
  const previousDateElement = document.querySelector(
    ".currencyInfo .previous .date"
  );
  const currentExchangeRate = document.querySelector(
    ".currencyInfo .current .exchangeRate"
  );
  const previousExchangeRate = document.querySelector(
    ".currencyInfo .previous .exchangeRate"
  );

  titleCurrency.textContent = `${currency.ID} - ${currency.Name} (${currency.CharCode}).`;
  currentDateElement.textContent = formatDate(date);
  previousDateElement.textContent = formatDate(previousDate);
  currentExchangeRate.textContent = currency.Value;
  previousExchangeRate.textContent = currency.Previous;
};

addEventListener("load", async () => {
  const currencies = await getСurrencies();
  const date = await getDate();
  const currenciesSelector = document.getElementById("currencies");
  const currencyInfo = document.getElementsByClassName("currencyInfo");

  currenciesSelector.addEventListener("change", (event) => {
    setCurrencyInfo(currencies[event.target.value], date)
    currencyInfo[0].style.display = "block"
  });

  addCurrenciesToSelector(currencies);
});
