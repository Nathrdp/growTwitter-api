const userId = localStorage.getItem('userId');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
}

function irParaPerfil() {
    window.location.href = `perfil.html?id=${userId}`;
}

function atualizarContador() {
    const texto = document.getElementById('conteudo-tweet').value;
    document.getElementById('contador').textContent = `${texto.length}/280`;
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

function renderizarTweet(tweet) {
    const jaLikei = tweet.likes?.some(l => l.userId === userId);

    return `
    <div class="card-tweet" id="tweet-${tweet.id}">
      <div class="tweet-header">
        <div class="avatar-mini" onclick="verPerfil('${tweet.user?.id}')" style="cursor:pointer;">🐱</div>
        <div class="tweet-info">
          <div class="tweet-info-topo">
            <span class="tweet-nome" onclick="verPerfil('${tweet.user?.id}')">${tweet.user?.name || 'Usuário'}</span>
            <span class="tweet-username">@${tweet.user?.username || ''}</span>
            <span class="tweet-tempo">· ${formatarTempo(tweet.createdAt)}</span>
          </div>
        </div>
      </div>
      <div class="tweet-conteudo">${tweet.content}</div>
      <div class="tweet-interacoes">
        <button class="interacao-btn" onclick="verReplies('${tweet.id}')">
          <span>💬</span> ${tweet.replies?.length || 0}
        </button>
        <button class="interacao-btn ${jaLikei ? 'liked' : ''}" onclick="toggleLike('${tweet.id}', ${jaLikei})" id="like-btn-${tweet.id}">
          <span>🐾</span> <span id="like-count-${tweet.id}">${tweet.likes?.length || 0}</span>
        </button>
      </div>
    </div>
  `;
}

const tweetsMock = [
    {
        id: 'mock1',
        content: 'Acabei de descobrir que posso miar online! Isso é incrível! 🐱🎉',
        createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
        type: 'TWEET',
        user: { id: 'u1', name: 'Gatinho Feliz', username: 'gatinhofeliz' },
        likes: Array(42).fill({ userId: 'outro' }),
        replies: Array(8).fill({})
    },
    {
        id: 'mock2',
        content: 'Dica do dia: sempre deixe um espacinho do seu dia para um bom ronronar ✨🐾',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        type: 'TWEET',
        user: { id: 'u2', name: 'Miau Profissional', username: 'miaupro' },
        likes: Array(128).fill({ userId: 'outro' }),
        replies: Array(23).fill({})
    },
    {
        id: 'mock3',
        content: 'Por que humanos não entendem que 3h da manhã é o melhor horário pra correr pela casa? 🐈‍⬛✨',
        createdAt: new Date(Date.now() - 32 * 60000).toISOString(),
        type: 'TWEET',
        user: { id: 'u3', name: 'Felina Curiosa', username: 'felinacuriosa' },
        likes: Array(89).fill({ userId: 'outro' }),
        replies: Array(45).fill({})
    },
    {
        id: 'mock4',
        content: 'Se cabe, eu sento! 📦✨\n\nNão importa o tamanho da caixa 🐱',
        createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
        type: 'TWEET',
        user: { id: 'u4', name: 'Gato dos Memes', username: 'gatomemes' },
        likes: Array(256).fill({ userId: 'outro' }),
        replies: Array(67).fill({})
    }
];

async function carregarFeed() {
    const lista = document.getElementById('lista-tweets');

    const tweetsReais = await buscarFeed();
    const todos = [...(tweetsReais || []), ...tweetsMock];

    if (todos.length === 0) {
        lista.innerHTML = '<div class="feed-vazio">Nenhum miauamento ainda. Seja o primeiro! 🐱</div>';
        return;
    }

    lista.innerHTML = todos.map(renderizarTweet).join('');
}

async function publicarTweet() {
    const conteudo = document.getElementById('conteudo-tweet').value.trim();
    if (!conteudo) return;

    const res = await criarTweet(conteudo);
    if (res.id) {
        document.getElementById('conteudo-tweet').value = '';
        document.getElementById('contador').textContent = '0/280';
        carregarFeed();
    }
}

async function toggleLike(tweetId, jaLikei) {
    const btn = document.getElementById(`like-btn-${tweetId}`);
    const count = document.getElementById(`like-count-${tweetId}`);
    const atual = parseInt(count.textContent);

    if (jaLikei) {
        await removerLike(tweetId);
        btn.classList.remove('liked');
        count.textContent = atual - 1;
        btn.setAttribute('onclick', `toggleLike('${tweetId}', false)`);
    } else {
        await darLike(tweetId);
        btn.classList.add('liked');
        count.textContent = atual + 1;
        btn.setAttribute('onclick', `toggleLike('${tweetId}', true)`);
    }
}

function verPerfil(id) {
    window.location.href = `perfil.html?id=${id}`;
}

function verReplies(tweetId) {
    alert('Replies em breve! 🐾');
}

carregarFeed();