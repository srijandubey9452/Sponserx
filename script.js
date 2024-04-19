const fileInput = document.getElementById('csvFileInput');
const engagementChartEl = document.getElementById('engagementChart');
const reachImpressionsChartEl = document.getElementById('reachImpressionsChart');
const postTypeChartEl = document.getElementById('postTypeChart');
const findSponsorsBtn = document.getElementById('findSponsorsBtn');


// Find a suitable reach value (e.g., average, total, or from a specific row)


findSponsorsBtn.addEventListener('click', function() {
  window.location.href = 'new_sponsor_page.html'; // Replace with your actual filename
});

fileInput.addEventListener('change', handleFileUpload); 

function handleFileUpload(event) {
  const file = event.target.files[0];   

  // Show loading indicator
  document.getElementById('loader').style.display = 'block';

  Papa.parse(file, {
    header: true,
    complete: function(results) {
      const data = results.data;
      createEngagementChart(data);
      createReachImpressionsChart(data);
      createPostTypeChart(data);

      // Hide loading indicator
      document.getElementById('loader').style.display = 'none'; 
    },
    error: function(error) {
      console.error("Error parsing CSV:", error);
      // Handle parsing errors (display an error message to the user)
      alert("Error parsing CSV file. Please check the file format.");
      document.getElementById('loader').style.display = 'none'; 
    }
  });
}


function createEngagementChart(data) {
  const labels = data.map(row => row.date);
  const engagementData = data.map(row => row.engagement ? parseInt(row.engagement, 10) : 0);

  new Chart(engagementChartEl, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Engagement',
        data: engagementData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      }]
    }
  });
}

function createReachImpressionsChart(data) {
  const labels = data.map(row => row.date);
  const reachData = data.map(row => row.reach ? parseInt(row.reach, 10) : 0);
  const impressionsData = data.map(row => row.impressions ? parseInt(row.impressions, 10) : 0);

  new Chart(reachImpressionsChartEl, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Reach',
        data: reachData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: 'Impressions',
        data: impressionsData,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }]
    }
  });
}


function calculateReachValue(data) {
  const totalReach = data.reduce((sum, row) => {
      return sum + 
             (row.reach ? parseInt(row.reach, 10) : 0) +  // Existing reach column
             // Add reach from other post types, assuming you have these columns:
             (row.photo_reach ? parseInt(row.photo_reach, 10) : 0) + 
             (row.video_reach ? parseInt(row.video_reach, 10) : 0) +
             (row.reel_reach ? parseInt(row.reel_reach, 10) : 0); 
  }, 0);
  return totalReach;
}
function determineReachBracket(reach) {
  if (reach < 5000) {
    return "0-5000";
  } else if (reach < 10000) {
    return "5000-10000";
  } else if (reach < 20000) {
    return "10000-20000";
  } else {
    return "20000+";
  }
}


function createPostTypeChart(data) {
  const postTypes = [...new Set(data.map(row => row.post_type))]; 
  const postTypeCounts = postTypes.map(type => data.filter(row => row.post_type === type).length);

  new Chart(postTypeChartEl, {
    type: 'pie',
    data: {
      labels: postTypes,
      datasets: [{
        label: 'Post Type Distribution',
        data: postTypeCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
}
