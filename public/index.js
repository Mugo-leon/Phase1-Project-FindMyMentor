// This event listener ensures that the script runs after the HTML document has been fully loaded.
document.addEventListener("DOMContentLoaded", () => {
  // Define the base URL for the JSON API.
  const baseUrl = "https://my-json-server.typicode.com//Mugo-leon/Phase1-Project-FindMyMentor";
  console.log("API base URL:", baseUrl);

  // Get the element with the id "mentor-header" and hide it initially.
  const mentorHeader = document.getElementById("mentor-header");
  mentorHeader.style.display = "none";

  // Function to display details of a specific consultant when a challenge is clicked.
  const DisplayConsultantDetails = (consultantId) => {
    // Fetch data for the selected consultant using the API.
    fetch(`${baseUrl}/consultants/${consultantId}`)
      .then((response) => response.json())
      .then((consultantInfo) => {
        // Get elements for displaying consultant details.
        const consultantChallenge = document.getElementById("consultant-challenge");
        const consultantDescription = document.getElementById("consultant-description");
        const consultantImage = document.getElementById("consultant-image");
        const reviewList = document.getElementById("review-list");

        // Populate elements with consultant information.
        consultantChallenge.textContent = consultantInfo.challenge;
        consultantDescription.textContent = consultantInfo.description;
        consultantImage.src = consultantInfo.image_url;

        // Clear and populate the review list with reviews for the consultant.
        reviewList.innerHTML = "";
        consultantInfo.reviews.forEach((review) => {
          const clientrev = document.createElement("li");
          clientrev.textContent = review;
          reviewList.appendChild(clientrev);
        });

        // Display the mentor header after fetching and displaying the consultant details.
        mentorHeader.style.display = "block";
      });
  };

  // Function to display a list of all available consultants.
  const DisplayAllConsultants = () => {
    // Fetch the list of consultants using the API.
    fetch(`${baseUrl}/consultants`)
      .then((response) => response.json())
      .then((consultants) => {
        // Get the challenge list element and clear it.
        const challengeList = document.getElementById("challenge-list");
        challengeList.innerHTML = "";

        // Iterate through the list of consultants and create challenge list items.
        consultants.forEach((consultant) => {
          const clientrev = document.createElement("li");
          clientrev.textContent = consultant.challenge;

          // Add a click event listener to each challenge list item to display consultant details when clicked.
          clientrev.addEventListener("click", () => {
            DisplayConsultantDetails(consultant.id);
          });

          challengeList.appendChild(clientrev);
        });
      });
  };

  // Get the review form element and add a submit event listener to handle new review submissions.
  const reviewForm = document.getElementById("review-form");
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the new review from the input field, create a list item, and add it to the review list.
    const newReview = document.getElementById("review").value;
    const reviewList = document.getElementById("review-list");
    const clientrev = document.createElement("li");
    clientrev.textContent = newReview;
    reviewList.appendChild(clientrev);

    // Clear the review input field after adding the review.
    document.getElementById("review").value = "";
  });

  // Get elements related to displaying the default information.
  const consultantChallenge = document.getElementById("consultant-challenge");
  const consultantDescription = document.getElementById("consultant-description");
  const consultantImage = document.getElementById("consultant-image");

  // Set default values for consultant information.
  consultantChallenge.textContent = "Please select a challenge";
  consultantDescription.textContent = "Select a challenge to view our recommended consultant";
  consultantImage.src = "images/placeholder.png";

  // Call the function to display the list of all consultants.
  DisplayAllConsultants();
});


