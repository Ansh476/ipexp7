document.addEventListener("DOMContentLoaded", () => {
    let allEvents = [];

    fetch("/api/events")
      .then((response) => response.json())
      .then((events) => {
        allEvents = events;
        displayEvents(allEvents); 
      });
  
    const eventList = document.getElementById("event-list");
    const searchBar = document.getElementById("search-bar");

    function displayEvents(events) {
      eventList.innerHTML = ""; 
      events.forEach((event) => {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.innerHTML = `
          <img src="${event.image}" alt="${event.name}">
          <h2>${event.name}</h2>
          <p>Date: ${event.date}</p>
          <button data-id="${event.id}">View Details</button>
        `;
        eventList.appendChild(card);
      });
  

      document.querySelectorAll(".event-card button").forEach((button) => {
        button.addEventListener("click", (e) => {
          const eventID = e.target.getAttribute("data-id");
          fetch(`/api/events/${eventID}`)
            .then((response) => response.json())
            .then((event) => {
              openModal(event);
            });
        });
      });
    }
  
    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredEvents = allEvents.filter((event) =>
        event.name.toLowerCase().includes(searchTerm)
      );
      displayEvents(filteredEvents);
    });
  
    const modal = document.getElementById("event-modal");
    const closeModalBtn = document.querySelector(".close");
  
    function openModal(event) {
      document.getElementById("modal-event-name").innerText = event.name;
      document.getElementById("modal-event-image").src = event.image;
      document.getElementById("modal-event-desc").innerText = event.desc;
      document.getElementById("modal-event-date").innerText = event.date;
      modal.style.display = "flex";
    }
  
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  