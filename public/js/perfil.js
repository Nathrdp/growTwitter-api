const meuId = localStorage.getItem('userId');
const params = new URLSearchParams(window.location.search);
const perfilId = params.get('id') || meuId;
const eUMeuPerfil = perfilId === meuId;

if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
}

function irParaMeuPerfil() {
    window.location.href = `perfil.html?id=${meuId}`;
}

function formatarTempo(data) {
    const agora = new Date();
    const criado = new Date(data);
    const diff = Math.floor((agora - criado) / 1000 / 60);
    if (diff < 1) return 'agora';
    if (diff < 60) return `${diff}min`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h`;
    return `${Math.floor(diff / 1440)}d`;
}

function renderizarTweetPerfil(tweet, nomeUsuario, usernameUsuario) {
    const jaLikei = tweet.likes?.some(l => l.userId === meuId);

    return `
    <div class="card-tweet">
      <div class="tweet-header">
        <div class="avatar-mini">🐱</div>
        <div>
          <div class="tweet-info-topo">
            <span class="tweet-nome">${nomeUsuario}</span>
            <span class="tweet-username">@${usernameUsuario}</span>
            <span class="tweet-tempo">· ${formatarTempo(tweet.createdAt)}</span>
          </div>
        </div>
      </div>
      <div class="tweet-conteudo">${tweet.content}</div>
      <div class="tweet-interacoes">
        <button class="interacao-btn">
          <span>💬</span> ${tweet.replies?.length || 0}
        </button>
        <button class="interacao-btn ${jaLikei ? 'liked' : ''}" onclick="toggleLikePerfil('${tweet.id}', ${jaLikei})" id="like-btn-${tweet.id}">
          <span>🐾</span> <span id="like-count-${tweet.id}">${tweet.likes?.length || 0}</span>
        </button>
      </div>
    </div>
  `;
}

async function carregarPerfil() {
    const usuario = await buscarUsuario(perfilId);

    document.getElementById('perfil-nome').textContent = usuario.name;
    document.getElementById('perfil-username').textContent = `@${usuario.username}`;
    document.getElementById('stat-seguindo').textContent = usuario.following?.length || 0;
    document.getElementById('stat-seguidores').textContent = usuario.followers?.length || 0;

    const tweets = usuario.tweets?.filter(t => t.type === 'TWEET') || [];
    document.getElementById('stat-tweets').textContent = tweets.length;

    const btnArea = document.getElementById('btn-acao-perfil');
    if (eUMeuPerfil) {
        btnArea.innerHTML = `<button class="btn-editar">Editar perfil</button>`;
    } else {
        const estaSeguidoAtual = usuario.followers?.some(f => f.followerId === meuId);
        btnArea.innerHTML = `
      <button class="btn-seguir-perfil" id="btn-seguir" onclick="toggleSeguir('${perfilId}', ${estaSeguidoAtual})">
        ${estaSeguidoAtual ? 'Seguindo' : 'Seguir'}
      </button>
    `;
    }

    const lista = document.getElementById('lista-tweets-perfil');
    if (tweets.length === 0) {
        lista.innerHTML = '<div class="feed-vazio">Nenhum miauamento ainda 🐱</div>';
        return;
    }

    lista.innerHTML = tweets.map(t => renderizarTweetPerfil(t, usuario.name, usuario.username)).join('');
}

async function toggleSeguir(id, estaSeguindo) {
    const btn = document.getElementById('btn-seguir');
    if (estaSeguindo) {
        await deixarDeSeguir(id);
        btn.textContent = 'Seguir';
        btn.setAttribute('onclick', `toggleSeguir('${id}', false)`);
    } else {
        await seguirUsuario(id);
        btn.textContent = 'Seguindo';
        btn.setAttribute('onclick', `toggleSeguir('${id}', true)`);
    }
}

async function toggleLikePerfil(tweetId, jaLikei) {
    const btn = document.getElementById(`like-btn-${tweetId}`);
    const count = document.getElementById(`like-count-${tweetId}`);
    const atual = parseInt(count.textContent);

    if (jaLikei) {
        await removerLike(tweetId);
        btn.classList.remove('liked');
        count.textContent = atual - 1;
        btn.setAttribute('onclick', `toggleLikePerfil('${tweetId}', false)`);
    } else {
        await darLike(tweetId);
        btn.classList.add('liked');
        count.textContent = atual + 1;
        btn.setAttribute('onclick', `toggleLikePerfil('${tweetId}', true)`);
    }
}

carregarPerfil();