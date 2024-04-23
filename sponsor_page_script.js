// Inside new_sponsor_page.js:

const sponsorGrid = document.querySelector('.sponsor-grid');
const nicheFilter = document.getElementById('nicheFilter');

fetch('./sponsors.json')
  .then(response => response.json())
  .then(sponsors => {
    const reach = localStorage.getItem('reach'); 

    const filteredSponsors = sponsors.filter(sponsor => {
       return sponsor.reachBracket === determineReachBracket(reach) && 
          (nicheFilter.value === "" || sponsor.niche.includes(nicheFilter.value)); 
    });

    function clearSponsorGrid() {
       sponsorGrid.innerHTML = ''; 
    }

    clearSponsorGrid(); // Clear existing cards

    // Populate the grid with cards (using filteredSponsors)
    filteredSponsors.forEach(sponsor => { 
      const card = document.createElement('div');
      card.classList.add('sponsor-card', 'col-md-4'); // Bootstrap grid column
  
      card.innerHTML = `
      
      <img src="./images/${sponsor.img}" alt="${sponsor.name}" class="card-img-top"> 
      <div class="card-body">
          <h5 class="card-title">${sponsor.name}</h5>
          <p class="card-text">Niche: ${sponsor.niche.join(', ')}</p>
          <a href="${sponsor.website}" class="btn btn-primary">View Profile</a>
          <button class="btn btn-success">Apply</button>
          <a href="${sponsor.chat}" class="btn btn-primary">Chat</a>
          
      </div> 
  `;
  const applyButton = card.querySelector('.btn-success'); 

  applyButton.addEventListener('click', () => {
     applyButton.textContent = "Applied";
     applyButton.disabled = true;

     // Application Data
     const applicationData = {
        creatorName: "document.getElementById('profileName').textContent", // Replace with actual creator name
        sponsorName: sponsor.name
     };

     // Client-Side Storage (localStorage)
     let applications = [];
     if (localStorage.getItem('applications')) {
        applications = JSON.parse(localStorage.getItem('applications')); 
     }
     applications.push(applicationData);
     localStorage.setItem('applications', JSON.stringify(applications));
    });
 

  
      sponsorGrid.appendChild(card); 
  }); 
  });

// Event listener for nicheFilter changes
nicheFilter.addEventListener('change', () => {
    // Re-run filtering and card generation logic 
}); 
