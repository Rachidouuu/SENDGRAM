document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const loginCountDisplay = document.getElementById('login-count');
    const logoutButton = document.getElementById('logout');

    // Fonction de gestion de la connexion
    loginForm && loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = loginEmail.value;
        const password = loginPassword.value;

        const storedUser = localStorage.getItem(email);

        if (!storedUser) {
            alert('Aucun compte trouvé pour cet e-mail.');
            return;
        }

        const userData = JSON.parse(storedUser);

        if (userData.password === password) {
            alert('Connexion réussie !');
            
            // Met à jour le nombre de connexions dans le localStorage
            const loginCount = userData.loginCount ? userData.loginCount + 1 : 1;
            userData.loginCount = loginCount;

            localStorage.setItem(email, JSON.stringify(userData));

            // Redirige vers le tableau de bord
            window.location.href = 'dashboard.html';
        } else {
            alert('Mot de passe incorrect.');
        }
    });

    // Vérifier si l'utilisateur est déjà connecté
    if (window.location.pathname === '/dashboard.html') {
        const email = localStorage.getItem('currentUserEmail');
        const storedUser = localStorage.getItem(email);
        
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            loginCountDisplay.innerText = userData.loginCount || 0;
        }
    }

    // Déconnexion
    logoutButton && logoutButton.addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});
