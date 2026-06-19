import { GoogleGenAI } from '@google/genai';

// A chave fica nas variáveis de ambiente da Vercel, nunca no código.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  // Aceita apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ resposta: 'Método não permitido.' });
  }

  try {
    const { mensagem } = req.body || {};

    if (!mensagem || !mensagem.trim()) {
      return res.status(400).json({ resposta: 'Mensagem vazia.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ ERRO: Chave GEMINI_API_KEY não configurada na Vercel.');
      return res.status(500).json({ resposta: 'Serviço de IA temporariamente indisponível.' });
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

    return res.status(200).json({ resposta: respostaTexto });
  } catch (error) {
    console.error('❌ Erro ao chamar a API do Gemini:', error.message);
    return res.status(500).json({ resposta: 'Desculpe, não consegui processar essa requisição.' });
  }
}