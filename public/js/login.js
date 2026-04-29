async function fazerLogin() {
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const erro = document.getElementById('erro');

    erro.textContent = '';

    if (!login || !senha) {
        erro.textContent = 'Preencha todos os campos';
        return;
    }

    const res = await loginUsuario({ login, password: senha });

    if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('user', JSON.stringify(res.user));
        window.location.href = 'feed.html';
    } else {
        erro.textContent = res.message || 'Erro ao fazer login';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fazerLogin();
});