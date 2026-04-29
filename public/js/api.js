const API_URL = window.location.origin;

function getToken() {
    return localStorage.getItem('token');
}

function headersAuth() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    };
}

async function cadastrarUsuario(dados) {
    const res = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    return res.json();
}

async function loginUsuario(dados) {
    const res = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    return res.json();
}

async function buscarUsuario(id) {
    const res = await fetch(`${API_URL}/user/${id}`, {
        headers: headersAuth()
    });
    return res.json();
}

async function buscarFeed() {
    const res = await fetch(`${API_URL}/tweet/feed`, {
        headers: headersAuth()
    });
    return res.json();
}

async function criarTweet(content) {
    const res = await fetch(`${API_URL}/tweet`, {
        method: 'POST',
        headers: headersAuth(),
        body: JSON.stringify({ content })
    });
    return res.json();
}

async function criarReply(tweetId, content) {
    const res = await fetch(`${API_URL}/tweet/${tweetId}/reply`, {
        method: 'POST',
        headers: headersAuth(),
        body: JSON.stringify({ content })
    });
    return res.json();
}

async function darLike(tweetId) {
    const res = await fetch(`${API_URL}/tweet/${tweetId}/like`, {
        method: 'POST',
        headers: headersAuth()
    });
    return res.json();
}

async function removerLike(tweetId) {
    const res = await fetch(`${API_URL}/tweet/${tweetId}/like`, {
        method: 'DELETE',
        headers: headersAuth()
    });
    return res.json();
}

async function seguirUsuario(userId) {
    const res = await fetch(`${API_URL}/user/${userId}/follow`, {
        method: 'POST',
        headers: headersAuth()
    });
    return res.json();
}

async function deixarDeSeguir(userId) {
    const res = await fetch(`${API_URL}/user/${userId}/follow`, {
        method: 'DELETE',
        headers: headersAuth()
    });
    return res.json();
}