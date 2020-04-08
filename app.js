const submitBtn = document.querySelector("#submit");
const form = document.querySelector("#searchForm");
const removeAll = document.querySelector("#remove");
const input = document.querySelector("#search");
const imgSection = document.querySelector("#img");

//Prevents default form submittion.
form.addEventListener("submit", (event) => event.preventDefault());

//function that gets data from the API Giphy.
async function getGiphy(giphy) {
  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: "FaF17auGsch79zegKCt1Oza09bl1GnGQ",
      q: giphy,
      limit: 1,
      offset: Math.floor(Math.random() * 10),
    },
  });
  //This loops through the response data and pulls out the arrays containing the urls
  for (let img of response.data.data) {
    //In this loop we pass the url to another function that creates the imgs
    makeGiphyImage(img.images.original.url);
  }
}

//This function creates the img element and appends it to the dom
const makeGiphyImage = (url) => {
  const img = document.createElement("img");
  img.classList.add("images");
  img.src = url;
  img.alt = input.value;
  imgSection.appendChild(img);
  input.value = "";
};

//This function deletes the elements the previous two functions created.
const remove = () => {
  imgSection.innerHTML = "";
};

//This eventlistener listens for a click on the submit btn and passes the getGiphy function with the vaule from the input.
submitBtn.addEventListener("click", () => getGiphy(input.value));

//this eventlistener listens for a click on the removeBTN and passes the remove function.
removeAll.addEventListener("click", remove);
