// =============================================
// CONFIGURAÇÃO DA CHAVE API DO GEMINI
// =============================================
const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/chat"
    : "/api/chat";

// =============================================
// 1. ATUALIZA ANO DO COPYRIGHT
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  const anoAtualEl = document.getElementById('anoAtual');
  if (anoAtualEl) {
    anoAtualEl.textContent = new Date().getFullYear();
  }
});

// =============================================
// 2. NAVBAR SCROLL EFFECT
// =============================================
const navbar = document.getElementById('navbar');
function verificarScroll() {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
}
window.addEventListener('scroll', verificarScroll, { passive: true });
verificarScroll();

// =============================================
// 3. MENU MOBILE
// =============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function() {
    const aberto = navLinks.classList.toggle('aberto');
    navToggle.setAttribute('aria-expanded', aberto);
  });

  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('aberto');
      navToggle.setAttribute('aria-expanded', false);
    });
  });
}

document.addEventListener('click', function(e) {
  if (navLinks && navToggle) {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove('aberto');
      navToggle.setAttribute('aria-expanded', false);
    }
  }
});

// =============================================
// 4. VALIDAÇÃO DO FORMULÁRIO
// =============================================
const formulario = document.getElementById('formContato');
const msgSucesso = document.getElementById('msg-sucesso');

if (formulario) {
  const btnEnviar = formulario.querySelector('.btn-enviar');

  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !servico || !mensagem) {
      [document.getElementById('nome'), document.getElementById('email'),
       document.getElementById('servico'), document.getElementById('mensagem')]
        .forEach(function(campo) {
          if (campo && !campo.value.trim()) {
            campo.style.borderColor = '#c0392b';
            campo.addEventListener('input', function() {
              campo.style.borderColor = '';
            }, { once: true });
          }
        });
      return;
    }

    if (btnEnviar) {
      btnEnviar.disabled = true;
      btnEnviar.textContent = 'Enviando…';
    }

    setTimeout(function() {
      formulario.reset();
      if (msgSucesso) msgSucesso.style.display = 'block';
      if (btnEnviar) {
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = '<i class="fa-solid fa-paper-plane" style="margin-right:.5rem"></i>Enviar mensagem';
      }

      setTimeout(function() {
        if (msgSucesso) msgSucesso.style.display = 'none';
      }, 5000);
    }, 900);
  });
}

// =============================================
// 5. ANIMAÇÃO DE ENTRADA (OBSERVER)
// =============================================
const elementsToAnimate = document.querySelectorAll('.card, .sobre-grid, .galeria-item, .contato-grid');

if (elementsToAnimate.length > 0) {
  elementsToAnimate.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elementsToAnimate.forEach(function(el) { observer.observe(el); });
}

// =============================================
// 6. CHATBOT E INTEGRAÇÃO GEMINI AI
// =============================================
const respostasCache = {
  'individual': 'O **Ensaio Individual** custa R$ 350. Inclui 2 horas de sessão, look livre e 30 fotos editadas em galeria digital.',
  'familia': 'O **Ensaio Família** custa R$ 550. Inclui 3 horas de sessão para até 5 pessoas, 50 fotos editadas e álbum em PDF.',
  'fashion': 'O **Ensaio Fashion** custa R$ 980. Inclui 4 horas de estúdio, maquiador profissional e 80 fotos tratadas.',
  'preco': 'Valores dos ensaios: Individual por R$ 350, Família por R$ 550 e Fashion por R$ 980. Deseja agendar algum?',
  'agendar': 'Para agendar um ensaio, preencha o formulário de contato ou chame no WhatsApp (86) 99453-2553.',
  'default': 'Sou o assistente da Juliano & Gisele Fotografia. Posso ajudar com informações sobre nossos ensaios Individual (R$ 350), Família (R$ 550) e Fashion (R$ 980). Qual deseja conhecer?'
};

function getFallbackResponse(texto) {
  const p = texto.toLowerCase();
  if (p.includes('individual') || p.includes('sozinho') || p.includes('sozinha')) return respostasCache.individual;
  if (p.includes('família') || p.includes('familia') || p.includes('grupo')) return respostasCache.familia;
  if (p.includes('fashion') || p.includes('moda') || p.includes('editorial')) return respostasCache.fashion;
  if (p.includes('preço') || p.includes('valor') || p.includes('quanto') || p.includes('custa')) return respostasCache.preco;
  if (p.includes('agendar') || p.includes('marcar') || p.includes('data')) return respostasCache.agendar;
  return respostasCache.default;
}

async function fetchGeminiAPI(texto) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensagem: texto })
  });
  if (!response.ok) throw new Error("Erro ao consultar servidor");
  const data = await response.json();
  return data.resposta;
}

// Utilitário para rolar o chat para o fim
function scrollChatFim() {
  const msgBox = document.getElementById('chatbotMensagens');
  if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
}

// Função de abertura e fechamento da janela
function toggleChatbot() {
  const janela = document.getElementById("chatbotJanela");
  if (janela) {
    janela.classList.toggle("ativo");
    scrollChatFim();
  }
}

// Função para envio de mensagens estruturada e corrigida
async function enviarMsgChatbot() {
  const input = document.getElementById('chatbotInput');
  const msgBox = document.getElementById('chatbotMensagens');
  if (!input || !msgBox) return;
  
  const texto = input.value.trim();
  if (!texto) return;

  // Adiciona a mensagem do Usuário na tela
  const msgUser = document.createElement('div');
  msgUser.className = 'chat-msg user';
  msgUser.textContent = texto;
  msgBox.appendChild(msgUser);

  input.value = '';
  scrollChatFim();

  // Cria o indicador de carregamento (loading)
  const msgPlaceholder = document.createElement('div');
  msgPlaceholder.className = 'chat-msg bot';
  msgPlaceholder.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Digitando...';
  msgBox.appendChild(msgPlaceholder);
  scrollChatFim();

  let resposta = '';

  try {
    // Tenta obter a resposta do seu servidor Back-end Express
    resposta = await fetchGeminiAPI(texto);
  } catch (apiError) {
    console.warn("Servidor ou Gemini indisponível, usando fallback local:", apiError);
    resposta = getFallbackResponse(texto);
  } finally {
    // Remove o indicador de carregamento de forma segura
    if (msgBox.contains(msgPlaceholder)) {
      msgBox.removeChild(msgPlaceholder);
    }
  }

  // Insere a resposta final do Bot na tela
  const msgBot = document.createElement('div');
  msgBot.className = 'chat-msg bot';
  msgBot.textContent = resposta;
  msgBox.appendChild(msgBot);
  scrollChatFim();
}

// =============================================
// 7. VINCULAÇÃO COMPATÍVEL DE EVENTOS (MODERN JS)
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const btnChatbot = document.querySelector('.chatbot-btn');
  const btnFechar = document.querySelector('.chatbot-fechar');
  const btnEnviar = document.querySelector('.chatbot-enviar');
  const inputChat = document.getElementById('chatbotInput');

  // Vincula os eventos diretamente pelo JavaScript
  if (btnChatbot) btnChatbot.addEventListener('click', toggleChatbot);
  if (btnFechar) btnFechar.addEventListener('click', toggleChatbot);
  if (btnEnviar) btnEnviar.addEventListener('click', enviarMsgChatbot);
  
  if (inputChat) {
    inputChat.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        enviarMsgChatbot();
      }
    });
  }
});

// FORÇA AS FUNÇÕES PARA O ESCOPO GLOBAL (Resolve o problema do onclick do HTML)
window.toggleChatbot = toggleChatbot;
window.enviarMsgChatbot = enviarMsgChatbot;