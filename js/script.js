// Fetch User Data & Handle Display & Filtering
async function fetchUserProfiles() {
  try {
      const response = await fetch('js/data.json');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json'))
        throw new Error('Expected JSON, but received ' + contentType);

      const users = await response.json();
      const searchBar = document.getElementById('searchBar');
      const userProfilesContainer = document.getElementById('userProfiles');

      // Display Profiles
      function displayProfiles(filteredUsers) {
        userProfilesContainer.innerHTML = '';

        if (filteredUsers.length === 0) {
          const noResultsMessage = document.createElement('p');
          noResultsMessage.classList.add('noResults');
          noResultsMessage.textContent = 'No Results Found';
          userProfilesContainer.appendChild(noResultsMessage);
        } else {
          filteredUsers.forEach(user => {
            const dataProfile = document.createElement('div');
            dataProfile.classList.add('dataProfile');
            dataProfile.innerHTML = `
              <img src="${user.profilePicture}" alt="Profile Picture">
              <div class="profileDetails">
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
                <p><strong>Job Position:</strong> ${user.job || 'NA'}</p>
              </div>
            `;
            userProfilesContainer.appendChild(dataProfile);
          });
        }
      }

      // Function to Filter & Display Profiles
      function filterProfiles() {
        const filter = searchBar.value.toLowerCase();
        const filteredUsers = users.filter(user => {
          const name = user.name.toLowerCase();
          const email = user.email.toLowerCase();
          const address = `${user.address.street.toLowerCase()}, ${user.address.city.toLowerCase()}`;
          const job = user.job ? user.job.toLowerCase() : '';
          return name.includes(filter) || email.includes(filter) || address.includes(filter) || job.includes(filter);
        });
        displayProfiles(filteredUsers);
      }

      // Initial Display & Setup Event Listener
      displayProfiles(users);
      searchBar.addEventListener('input', filterProfiles);

  } catch (error) {
    console.error('Error fetching user profiles:', error);
  }
}

// Fetch Data On Page Load
document.addEventListener('DOMContentLoaded', fetchUserProfiles);