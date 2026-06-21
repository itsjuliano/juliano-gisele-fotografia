<div align="center">

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│            J U L I A N O   &   G I S E L E               │
│                    F O T O G R A F I A                   │
│                                                           │
│         « Momentos que duram para sempre »                │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 📸 Site institucional com chatbot inteligente powered by Google Gemini

[![Status](https://img.shields.io/badge/status-no%20ar-b8945a?style=for-the-badge)](#)
[![Deploy](https://img.shields.io/badge/deploy-vercel-2c221a?style=for-the-badge&logo=vercel)](#)
[![IA](https://img.shields.io/badge/IA-gemini--2.5--flash-d4b483?style=for-the-badge&logo=googlegemini&logoColor=white)](#)
[![Licença](https://img.shields.io/badge/uso-acad%C3%AAmico-6b4f3a?style=for-the-badge)](#)

<br>

**[🔗 Ver site ao vivo](https://juliano-gisele-fotografia.vercel.app/)** · **[📖 Relatório técnico](https://drive.google.com/file/d/1MR7qQVvt7GOXw-6j7AdZxvIvqAj9OCFi/view?usp=sharing)**

</div>

<br>

<div align="center">
<sub>━━━━━━━━━━━━━━━━━━━━━  ✦  ━━━━━━━━━━━━━━━━━━━━━</sub>
</div>

<br>

## 🎞️ Sobre o ensaio

> *"Cada projeto é tratado com atenção personalizada, garantindo que a essência de cada cliente apareça em cada clique."*

**Juliano & Gisele Fotografia** é um site institucional fictício, criado como projeto acadêmico para a disciplina **Desenvolvimento Web para IA**, no Curso Superior de Tecnologia em Inteligência Artificial — **Faculdade Estadual do Piauí (PIT)**.

O projeto simula um estúdio de fotografia profissional que vende três tipos de ensaio (Individual, Família e Fashion), com um diferencial real: um **chatbot com inteligência artificial genuína** — não um simulador de respostas prontas, mas uma integração de verdade com a API do **Google Gemini**, capaz de entender e responder dúvidas dos clientes em linguagem natural.

<br>

<table align="center">
<tr>
<td align="center" width="200">

**👤 Individual**
<br>
R$ 350
<br>
<sub>2h de sessão · 30 fotos</sub>

</td>
<td align="center" width="200">

**👨‍👩‍👧 Família** ⭐
<br>
R$ 550
<br>
<sub>3h de sessão · 50 fotos</sub>

</td>
<td align="center" width="200">

**✨ Fashion**
<br>
R$ 980
<br>
<sub>4h de sessão · 80 fotos</sub>

</td>
</tr>
</table>

<br>

## 🖼️ Por trás das lentes — O que foi revelado neste projeto

<table>
<tr>
<td valign="top" width="50%">

### 🎨 Front-end

- **HTML5** semântico, com `<header>`, `<nav>`, `<section>` e atributos ARIA para acessibilidade
- **CSS3** com variáveis globais (`:root`), CSS Grid e Flexbox
- Paleta de cores terrosa e minimalista, inspirada em estúdios fotográficos contemporâneos
- **Responsividade** completa via Media Queries (desktop → tablet → mobile)
- **JavaScript (ES6)** puro: animações com `IntersectionObserver`, validação de formulário, menu mobile

</td>
<td valign="top" width="50%">

### 🤖 Inteligência Artificial

- Chatbot com IA real, não scriptado
- SDK oficial **`@google/genai`**
- Modelo **`gemini-2.5-flash`**
- Engenharia de prompt para manter o foco no negócio
- Arquitetura **serverless** (função isolada, sem servidor 24/7)
- Sistema de **fallback local** caso a IA fique indisponível

</td>
</tr>
</table>

<br>

<div align="center">
<sub>━━━━━━━━━━━━━━━━━━━━━  ✦  ━━━━━━━━━━━━━━━━━━━━━</sub>
</div>

<br>

## 🗂️ O álbum completo — Estrutura do projeto

```
📁 juliano-gisele-fotografia/
│
├── 📁 api/
│   └── 📄 chat.js              → Função serverless · conversa com o Gemini
│
├── 📁 assets/
│   ├── 🖼️  sobre-juliano-gisele.png
│   ├── 🖼️  galeria-fashion.jpg
│   ├── 🖼️  galeria-individual.jpg
│   ├── 🖼️  galeria-familia.jpg
│   ├── 🖼️  galeria-retrato.jpg
│   └── 🖼️  galeria-casal.jpg
│
├── 📁 css/
│   └── 🎨 style.css            → Toda a identidade visual do estúdio
│
├── 📁 js/
│   └── ⚙️  chatbot.js           → Comportamento do site + lógica do chat
│
├── 📄 index.html               → A vitrine do estúdio
├── 📄 package.json             → Dependências do projeto
├── 📄 vercel.json               → Configuração de deploy
├── 📄 .env.example              → Modelo de variável de ambiente
└── 📄 .gitignore                → O que nunca revelamos ao público
```

<br>

## 🎬 Bastidores — Como rodar localmente

<table>
<tr>
<td width="40" align="center">1️⃣</td>
<td>

**Clone o set de filmagem**
```bash
git clone https://github.com/seu-usuario/juliano-gisele-fotografia.git
cd juliano-gisele-fotografia
```

</td>
</tr>
<tr>
<td width="40" align="center">2️⃣</td>
<td>

**Revele os equipamentos** *(instale as dependências)*
```bash
npm install
```

</td>
</tr>
<tr>
<td width="40" align="center">3️⃣</td>
<td>

**Configure a luz certa** *(variável de ambiente)*

Crie um arquivo `.env` na raiz, baseado no `.env.example`:
```
GEMINI_API_KEY=sua_chave_aqui
```
> 🔑 Obtenha a sua gratuitamente no [Google AI Studio](https://aistudio.google.com/app/apikey)

</td>
</tr>
<tr>
<td width="40" align="center">4️⃣</td>
<td>

**Luzes, câmera, ação!**
```bash
npm install -g vercel
vercel dev
```
Acesse **`http://localhost:3000`** e veja o estúdio ganhar vida ✨

</td>
</tr>
</table>

<br>

<div align="center">
<sub>━━━━━━━━━━━━━━━━━━━━━  ✦  ━━━━━━━━━━━━━━━━━━━━━</sub>
</div>

<br>

## 🧠 O cérebro por trás do sorriso — Arquitetura do Chatbot

```
   👤 Cliente digita uma pergunta
           │
           ▼
   💻 chatbot.js (navegador)
           │  fetch POST → /api/chat
           ▼
   ☁️  api/chat.js  (função serverless · Vercel)
           │  injeta prompt de contexto + chave protegida
           ▼
   🌐 Google Gemini API  (gemini-2.5-flash)
           │  gera resposta em linguagem natural
           ▼
   💬 Resposta exibida no chat
```

**Por que essa arquitetura?**
A chave da API **nunca** aparece no código que o navegador do cliente recebe. Ela vive isolada em uma função serverless, acessada apenas via variável de ambiente — o equivalente digital de manter o negativo original guardado no cofre, enquanto só as cópias reveladas circulam por aí.

<br>

## 🛠️ Equipamento utilizado

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-2c221a?style=flat-square&logo=html5&logoColor=d4b483)
![CSS3](https://img.shields.io/badge/CSS3-2c221a?style=flat-square&logo=css3&logoColor=d4b483)
![JavaScript](https://img.shields.io/badge/JavaScript-2c221a?style=flat-square&logo=javascript&logoColor=d4b483)
![Node.js](https://img.shields.io/badge/Node.js-2c221a?style=flat-square&logo=node.js&logoColor=d4b483)
![Gemini](https://img.shields.io/badge/Google_Gemini-2c221a?style=flat-square&logo=googlegemini&logoColor=d4b483)
![Vercel](https://img.shields.io/badge/Vercel-2c221a?style=flat-square&logo=vercel&logoColor=d4b483)
![Git](https://img.shields.io/badge/Git-2c221a?style=flat-square&logo=git&logoColor=d4b483)

</div>

<br>

## 🏆 Desafios revelados na sala de edição

| 🎞️ Desafio | 💡 Solução adotada |
|---|---|
| Proteger a chave de API | Isolamento em função serverless + variável de ambiente |
| Chat "travando" visualmente | Auto-scroll via `scrollChatFim()` a cada nova mensagem |
| IA indisponível em algum momento | Sistema de fallback com respostas locais pré-definidas |
| Erro *"No entrypoint found"* no deploy | Migração de servidor Express tradicional para arquitetura 100% serverless, com `vercel.json` explícito |

<br>

<div align="center">
<sub>━━━━━━━━━━━━━━━━━━━━━  ✦  ━━━━━━━━━━━━━━━━━━━━━</sub>
</div>

<br>

## 🎓 Créditos do estúdio

<div align="center">

**Desenvolvido por**

**Juliano da Cruz Ferreira Moraes** & **Gisele Maria Lima de Albuquerque**

<sub>Curso Superior de Tecnologia em Inteligência Artificial</sub>
<br>
<sub>Disciplina: Desenvolvimento Web para IA</sub>
<br>
<sub>Faculdade Estadual do Piauí — Instituto de Tecnologia (PIT)</sub>

<br>

```
        📷 ────────────────────────── 📷

         "Toda boa fotografia começa
          com a luz certa. Todo bom
          código começa com a base
                certa."

        📷 ────────────────────────── 📷
```

<br>

**Feito com ❤️, café e algumas centenas de `console.log`**

</div>
