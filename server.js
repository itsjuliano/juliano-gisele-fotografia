import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Carrega as variáveis do arquivo .env (uso LOCAL apenas)
dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ ERRO: Chave GEMINI_API_KEY não encontrada no .env');
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/chat', async (req, res) => {
  try {
    const { mensagem } = req.body;

    if (!mensagem || !mensagem.trim()) {
      return res.status(400).json({ resposta: 'Mensagem vazia.' });
    }

    const contextoPrompt = `
Você é o assistente virtual do estúdio 'Juliano & Gisele Fotografia'.
Responda à dúvida do cliente de forma educada, prestativa e curta.
Use os seguintes dados do estúdio se o cliente perguntar por valores ou pacotes:
- Ensaio Individual: R$ 350
- Ensaio Família: R$ 550
- Ensaio Fashion: R$ 980

Pergunta do cliente: ${mensagem}
    `;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextoPrompt
    });

    const respostaTexto = result.text;

    if (!respostaTexto) {
      return res.json({ resposta: 'Desculpe, não consegui gerar uma resposta agora.' });
    }

    return res.json({ resposta: respostaTexto });
  } catch (error) {
    console.error('❌ Erro ao chamar a API do Gemini:', error.message);
    return res.status(500).json({ resposta: 'Desculpe, não consegui processar essa requisição.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor local rodando em http://localhost:${PORT}`);
});