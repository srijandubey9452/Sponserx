const fileInput = document.getElementById('csvFileInput'); // Assuming 'csvFileInput' is your file input's ID
const findSponsorsBtn = document.getElementById('findSponsorsBtn'); // Assuming 'findSponsorsBtn' is your button's ID

findSponsorsBtn.addEventListener('click', function() {
  const file = fileInput.files[0];

  Papa.parse(file, {
    header: true,
    complete: function(results) {
      const data = results.data; 
      const reachValue = calculateReachValue(data); 
      
      // Store the reach in localStorage
      localStorage.setItem('reach', reachValue);

      // Redirect to the sponsor page
      window.location.href = 'new_sponsor_page.html'; 
    },
    error: function(error) {
      console.error("Error parsing CSV:", error); 
      // Handle parsing errors (display an error message, etc.)
    }
  });
});

function calculateReachValue(data) {
  // Implement your logic to calculate the representative reach value 
  // Example - Assuming a column named 'reach':
  
  const totalReach = data.reduce((sum, row) => sum + parseInt(row.reach, 10), 0);
  return totalReach; 
}
