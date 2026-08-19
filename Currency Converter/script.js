const currencies = ["JPY","AOA","GBP","EUR","NGN","AUD","PKR","USD","CAD","GMD"];
// populate dropdown
const fromSelect = document.getElementById("fromCurrency");
const toSelect  = document.getElementById("toCurrency");
currencies.forEach(currency =>{
    let option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    fromSelect.add(option1);

    let option2 = document.createElement("option");
    option2.value = currency;
    option2.text = currency;
    toSelect.add(option2);
});

async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        const url = `https://v6.exchangerate-api.com/v6/86e60cf8360fa64fc4c18ad9/latest/${fromCurrency}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.conversion_rates[toCurrency] || null;
    } catch (error) {
        console.log("Error Fetching Exchange Rates:", error);
        return null;
    }
}
async function convertCurrency() {
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;
    const amount = parseFloat(document.getElementById("amount").value);
    const resultDiv = document.getElementById("result");

    // console.log("Convert button clicked!");
    // console.log("From:", fromCurrency, "To:", toCurrency, "Amount:", amount);

    if (isNaN(amount)) {
        resultDiv.textContent = "Please enter a valid number.";
        return;
    }

    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    if (exchangeRate) {
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } else {
        resultDiv.textContent = "Invalid Currency Code or API issue.";
    }
}
function resetForm(){
    document.getElementById("amount").value = "";
    document.getElementById("result").textContent = "";
    fromSelect.value = "JPY"
    toSelect.value = "USD";
}

function exit(){
    if(confirm("Confirm if you want to EXIT!")){
        window.close();
    }
}