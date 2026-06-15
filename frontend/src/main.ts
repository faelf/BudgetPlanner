interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const USER_API_URL = '/api/user';

async function fetchDashboardUser(): Promise<void> {
  const usercontainer = document.querySelector(".user-profile");

  if (!usercontainer) return;

  try {
    const response = await fetch(USER_API_URL);

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const userData: User = await response.json();

    usercontainer.innerHTML = `${userData.first_name} ${userData.last_name}`;

  } catch (error) {
    console.error('Failed to retrieve dashboard user metrics:', error);

    usercontainer.innerHTML = `
      <p class="error-message">
        User Not Found
      </p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', fetchDashboardUser);