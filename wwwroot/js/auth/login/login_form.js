document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const loginButton = document.getElementById('loginButton');
    if (loginButton.disabled) return;  // ✅ ป้องกันการกดซ้ำ

    loginButton.disabled = true;
    loginButton.innerText = 'Logging in...';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/Account/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        if (response.ok) {
            window.location.href = '/';
        } else {
            document.getElementById('errorMessage').innerText = 'Invalid username or password.';
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'An error occurred. Please try again later.';
    } finally {
        loginButton.disabled = false;
        loginButton.innerText = 'Login';
    }
});
