async function fetchRandomJoke() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/",{
        headers:{
            Accept: "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    const jokeContainer = document.querySelector(".joke-container");
    const jokeText = data.joke;
    jokeContainer.querySelector("p").textContent = jokeText;
  } 
  catch (error) {
    console.error("Error fetching joke:", error);
    alert(error);
  }
}

const generateButton = document.getElementById("generateJoke");
generateButton.addEventListener("click", fetchRandomJoke);
  

  