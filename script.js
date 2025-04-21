async function getStockData() {
  const symbol = document.getElementById("stockSymbol").value.toUpperCase();
  const resultDiv = document.getElementById("stockResult");
  const apiKey = "T4XFZRN6J0EXR28B"; // 🔁 Replace with your Alpha Vantage key

  if (!symbol) {
    resultDiv.innerHTML = "<p>Please enter a stock symbol.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    );
    const data = await res.json();
    const stock = data["Global Quote"];

    if (!stock || !stock["05. price"]) {
      resultDiv.innerHTML = `<p>No data found for symbol: ${symbol}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h2>${symbol} - $${parseFloat(stock["05. price"]).toFixed(2)}</h2>
      <p>Open: $${parseFloat(stock["02. open"]).toFixed(2)}</p>
      <p>High: $${parseFloat(stock["03. high"]).toFixed(2)}</p>
      <p>Low: $${parseFloat(stock["04. low"]).toFixed(2)}</p>
      <p>Change: ${stock["10. change percent"]}</p>
    `;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    resultDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
  }
}
