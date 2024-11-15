document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');
    const signupConfirmPassword = document.getElementById('signup-confirm-password');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');

    // Afficher le formulaire d'inscription et cacher celui de connexion
    document.getElementById('show-signup-form').addEventListener('click', function () {
        loginFormContainer.style.display = 'none';
        signupFormContainer.style.display = 'block';
    });

    // Afficher le formulaire de connexion et cacher celui d'inscription
    document.getElementById('show-login-form').addEventListener('click', function () {
        signupFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    // Gérer l'inscription
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = signupEmail.value;
        const password = signupPassword.value;
        const confirmPassword = signupConfirmPassword.value;

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        // Vérification si l'email est déjà utilisé
        if (localStorage.getItem(email)) {
            alert('Cet e-mail est déjà utilisé.');
            return;
        }

        // Enregistrer l'utilisateur dans le localStorage
        localStorage.setItem(email, JSON.stringify({ password: password }));
        alert('Inscription réussie !');

        // Retourner à la page de connexion
        signupFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    // Gérer la connexion
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = loginEmail.value;
        const password = loginPassword.value;

        // Vérifier si l'email existe
        const storedUser = localStorage.getItem(email);

        if (!storedUser) {
            alert('Aucun compte trouvé pour cet e-mail.');
            return;
        }

        // Vérifier le mot de passe
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
            alert('Connexion réussie !');
        } else {
            alert('Mot de passe incorrect.');
        }
    });
});
