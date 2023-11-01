document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "https://my-json-server.typicode.com/Mugo-leon/Phase1-Project-FindMyMentor";
  console.log("API base URL:", baseUrl);

  const mentorHeader = document.getElementById("mentor-header");
  mentorHeader.style.display = "none";

  const DisplayConsultantDetails = (consultantId) => {
    fetch(`${baseUrl}/consultants/${consultantId}`)
      .then((response) => response.json())
      .then((consultantInfo) => {
        const consultantChallenge = document.getElementById("consultant-challenge");
        const consultantDescription = document.getElementById("consultant-description");
        const consultantImage = document.getElementById("consultant-image");
        const reviewList = document.getElementById("review-list");

        consultantChallenge.textContent = consultantInfo.challenge;
        consultantDescription.textContent = consultantInfo.description;
        consultantImage.src = consultantInfo.image_url;

        reviewList.innerHTML = "";
        consultantInfo.reviews.forEach((review) => {
          const clientrev = document.createElement("li");
          clientrev.textContent = review;
          reviewList.appendChild(clientrev);
        });
        mentorHeader.style.display = "block";
      });
  };

  const DisplayAllConsultants = () => {
    fetch(`${baseUrl}/consultants`)
      .then((response) => response.json())
      .then((consultants) => {
        const challengeList = document.getElementById("challenge-list");
        challengeList.innerHTML = "";

        consultants.forEach((consultant) => {
          const clientrev = document.createElement("li");
          clientrev.textContent = consultant.challenge;
          clientrev.addEventListener("click", () => {
            DisplayConsultantDetails(consultant.id);
          });
          challengeList.appendChild(clientrev);
        });

        if (consultants.length === 0) {
          const placeholder = document.createElement("li");
          placeholder.textContent = "No consultants available.";
          challengeList.appendChild(placeholder);
          mentorHeader.style.display = "none";
        }
      });
  };

  const reviewForm = document.getElementById("review-form");
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newReview = document.getElementById("review").value;
    const reviewList = document.getElementById("review-list");
    const clientrev = document.createElement("li");
    clientrev.textContent = newReview;
    reviewList.appendChild(clientrev);

    document.getElementById("review").value = "";
  });
  const consultantChallenge = document.getElementById("consultant-challenge");
  const consultantDescription = document.getElementById("consultant-description");
  const consultantImage = document.getElementById("consultant-image");

  consultantChallenge.textContent = "Please select a challenge";
  consultantDescription.textContent = "Select a challenge to view consultant details";
  consultantImage.src = "images/placeholder.png";
  
  DisplayAllConsultants();
});

