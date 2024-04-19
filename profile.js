const changePhotoBtn = document.getElementById('changePhotoBtn');
const profilePhoto = document.getElementById('profilePhoto');
const profilePhotoInput = document.getElementById('profilePhotoInput');


changePhotoBtn.addEventListener('click', function() {
 profilePhotoInput.click(); // Trigger the hidden file input
});

profilePhotoInput.addEventListener('change', function(event) {
 const file = event.target.files[0];
 const reader = new FileReader();

 reader.onload = function(e) {
profilePhoto.src = e.target.result; 
 }

reader.readAsDataURL(file);
});

function displayProfile() {
const profileString = localStorage.getItem('profile');
if (profileString) {
const profile = JSON.parse(profileString);
 
document.getElementById('profileName').textContent = profile.name;
document.getElementById('profileType').textContent = profile.type;
document.getElementById('profileSocial').textContent = profile.socialHandles; 
document.getElementById('profileNiche').textContent = profile.niche; 
document.getElementById('profileMobile').textContent = profile.mobile;
document.getElementById('profileEmail').textContent = profile.email;
document.getElementById('profileDOB').textContent = profile.dob;

 } else {
 // Handle the case where there's no profile stored
 }
 }

// Call displayProfile when the page loads
window.addEventListener('load', function() {
    displayProfile();  
}); 
