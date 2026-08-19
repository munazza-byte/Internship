const searchBtn = document.getElementById("searchBtn");
const productsDiv = document.getElementById("products");
const template = document.getElementById("productTemplate");
const input = document.querySelector("input");
let query = input.value;

const api = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    "x-rapidapi-key": "4af7527a80msh4e4857186cefec3p1cf78ajsn79badad1379c"
  }
};

async function fetchProducts(query) {
  try {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(query)}&country=US&page=1`;
    const response = await fetch(url, api);
    const data = await response.json();
    console.log("API Response:", data);

    productsDiv.innerHTML = ""; // Clear previous results

    const products = data.data?.products || [];

    if (products.length === 0) {
      productsDiv.innerHTML = "<p>No products found 😢</p>";
      return;
    }

  products.forEach(product => {
  const card = template.content.cloneNode(true);

  // Image
  const img = card.querySelector("img");
  img.src = product.product_photo || "No image";
  img.alt = product.product_title || "No title";

  // Title (make it clickable to Amazon)
  const titleEl = card.querySelector("h3");
  titleEl.textContent = product.product_title || "Untitled";
  if (product.product_url) {
    titleEl.innerHTML = `<a href="${product.product_url}" target="_blank">${product.product_title}</a>`;
  }

  // Rating (in first <p>)
  card.querySelector("p").textContent = product.product_star_rating
    ? `⭐ ${product.product_star_rating} (${product.product_num_ratings} ratings)`
    : "No rating";

  // Price (in .price <p>)
  const priceEl = card.querySelector(".price");
  if (product.product_original_price) {
    priceEl.innerHTML = `
      <span class="old-price">${product.product_original_price}</span>\n
      <span class="new-price">${product.product_price}</span>
    `;
  } 
  else {
    priceEl.textContent = product.product_price || "Price not available";
  }

  productsDiv.appendChild(card);
});

  } 
  catch (error) {
    console.error("Error fetching products:", error);
    productsDiv.innerHTML = "<p>Something went wrong ❌</p>";
  }
}


searchBtn.addEventListener("click", () => {
  const query = document.getElementById("searchBox").value.trim();
  if (query) {
    fetchProducts(query);
  } else {
    alert("Please enter a product name!");
  }
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const query = searchBox.value.trim();
    if (query) {
      fetchProducts(query);
    } else {
      alert("Please enter a product name!");
    }
  }
});

// https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-amazon-data/playground/endpoint_369599f7-6147-4cb9-9417-09dcd429936d