const contentCreatorForm = document.getElementById('contentCreatorForm');

contentCreatorForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Collect profile data
    const name = document.getElementById('name').value; // Assuming 'name' is the ID of your name input
    const type = document.getElementById('type').value; // Assuming 'type' is the ID of your type select
    const socialHandles = document.getElementById('socialHandles').value; // Adjust the ID if needed
    const niche = document.getElementById('niche').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;




     // Add the console.log line here:
     console.log("Name entered:", name);
     console.log("Social Handles:", socialHandles); 

     // Basic Validation (Example)
     if (name === "") { 
         alert("Please enter your name.");
         return; 
     }
    // Basic Validation (Example)

    if (name === "") { 
        alert("Please enter your name.");
        return; 
    }

    // Create JSON object 
    const profileData = {
        type: type, 
        name: name, 
        socialHandles:socialHandles,
        niche:niche,
        mobile: mobile,
        email: email,
        dob: dob

        // ... add other fields
    };

    // Store in localStorage
    const jsonString = JSON.stringify(profileData);
    localStorage.setItem('profile', jsonString); 

    // Success Message 
    alert("Profile created successfully!");  
    // Inside your form submission event handler, after storing the profile:
 
window.location.href = "./profile.html"; // Redirect to the profile page


   
      
});
