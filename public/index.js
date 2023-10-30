document.addEventListener("DOMContentLoaded", () => { //This code runs once the DOM content is completely loaded and ready for modification.
    // Define the URL of the JSON API
const apiUrl = 'https://raw.githubusercontent.com/Mugo-leon/Phase1-Project-FindMyMentor/main/db.json';

// Make a GET request to the API
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });


  
});