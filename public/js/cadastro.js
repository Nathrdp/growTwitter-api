async function fazerCadastro() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim().replace('@', '');
    const senha = document.getElementById('senha').value.trim();
    const erro = document.getElementById('erro');
    const sucesso = document.getElementById('sucesso');

    erro.textContent = '';
    sucesso.textContent = '';

    if (!nome || !email || !username || !senha) {
        erro.textContent = 'Preencha todos os campos';
        return;
    }

    if (senha.length < 8) {
        erro.textContent = 'A senha deve ter no mínimo 8 caracteres';
        return;
    }

    const res = await cadastrarUsuario({ name: nome, email, username, password: senha });

    if (res.id) {
        sucesso.textContent = 'Conta criada! Redirecionando... 🐱';
        setTimeout(() => window.location.href = 'index.html', 1500);
    } else {
        erro.textContent = res.message || 'Erro ao criar conta';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fazerCadastro();
});