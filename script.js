// Login Modal
function openLoginModal() { document.getElementById('admin-login-modal').style.display = 'block'; }
function closeLoginModal() { document.getElementById('admin-login-modal').style.display = 'none'; }

// Add Listing Modal
function openAddListingModal() {
  if(localStorage.getItem('isAdmin') === 'true') {
    document.getElementById('add-listing-modal').style.display = 'block';
  } else {
    alert('You must be admin to add listing.');
  }
}
function closeAddListingModal() { document.getElementById('add-listing-modal').style.display = 'none'; }

// Admin Login
function adminLogin() {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  // Hardcoded admin credentials
  if(username === 'admin' && password === 'password123') {
    localStorage.setItem('isAdmin','true');
    alert('Login successful!');
    closeLoginModal();
    document.querySelector('.header-top-btn').style.display = 'inline-block';
    document.getElementById('admin-login-btn').style.display = 'none';
  } else {
    alert('Invalid credentials!');
  }
}

// Add Property
function addProperty() {
  const title = document.getElementById('prop-title').value;
  const location = document.getElementById('prop-location').value;
  const price = document.getElementById('prop-price').value;
  const desc = document.getElementById('prop-desc').value;
  const status = document.getElementById('prop-status').value;
  const image = document.getElementById('prop-image').files[0];

  if(!title || !location || !price || !desc || !image) return alert('Fill all fields.');

  const reader = new FileReader();
  reader.onload = function(e) {
    const imgSrc = e.target.result;

    const propertyList = document.querySelector('.property-list');
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="property-card">
        <figure class="card-banner">
          <a href="#"><img src="${imgSrc}" class="w-100"></a>
          <div class="card-badge ${status === 'new' ? 'green' : 'red'}">${status === 'new' ? 'New' : 'Sold Out'}</div>
          <div class="banner-actions">
            <button class="banner-actions-btn"><ion-icon name="location"></ion-icon><address>${location}</address></button>
          </div>
        </figure>
        <div class="card-content">
          <div class="card-price"><strong>$${price}</strong></div>
          <h3 class="h3 card-title"><a href="#">${title}</a></h3>
          <p class="card-text">${desc}</p>
        </div>
      </div>
    `;
    propertyList.prepend(li);
    closeAddListingModal();
  }
  reader.readAsDataURL(image);
}

// Check if admin logged in
if(localStorage.getItem('isAdmin') === 'true') {
  document.querySelector('.header-top-btn').style.display = 'inline-block';
  document.getElementById('admin-login-btn').style.display = 'none';
}
