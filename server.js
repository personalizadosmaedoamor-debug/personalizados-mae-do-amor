import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({ origin: process.env.STORE_ORIGIN || 'https://personalizadosmaedoamor.com.br' }));
app.use(express.json({ limit: '32kb' }));
const PORT = process.env.PORT || 3000;
const CATALOG = {
  'agenda-a5': { title: 'Agenda personalizada A5', price: 90 },
  'planner-semanal': { title: 'Planner semanal', price: 49.90 },
  'planner-mensal': { title: 'Planner mensal', price: 39.90 },
  'caixa-cartonada': { title: 'Caixa cartonada personalizada', price: 65 },
  'kit-papelaria': { title: 'Kit papelaria personalizada', price: 79.90 },
  'bloco-anotacoes': { title: 'Bloco de anotações', price: 24.90 },
  'planner-diario': { title: 'Planner diário', price: 34.90 },
  'kit-presente': { title: 'Kit presente afetivo', price: 99.90 }
};
app.get('/health', (_req, res) => res.json({ ok: true }));
app.post('/create-preference', async (req, res) => {
  try {
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) return res.status(503).json({ error: 'Pagamento ainda não configurado. Defina MERCADOPAGO_ACCESS_TOKEN no servidor.' });
    const items = req.body?.items;
    if (!Array.isArray(items) || !items.length || items.length > 30) return res.status(400).json({ error: 'Carrinho inválido.' });
    const secureItems = [];
    for (const item of items) {
      const product = CATALOG[item.id];
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return res.status(400).json({ error: 'Produto ou quantidade inválida.' });
      secureItems.push({ id: item.id, title: product.title, quantity, currency_id: 'BRL', unit_price: product.price });
    }
    const origin = process.env.STORE_ORIGIN || 'https://personalizadosmaedoamor.com.br';
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST', headers: { 'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: secureItems, back_urls: { success: `${origin}/?pagamento=sucesso`, pending: `${origin}/?pagamento=pendente`, failure: `${origin}/?pagamento=falhou` }, auto_return: 'approved', statement_descriptor: 'MAE DO AMOR' })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: 'Não foi possível iniciar o pagamento.', detail: data.message || data.error || 'Erro do provedor.' });
    return res.json({ checkout_url: data.init_point, preference_id: data.id });
  } catch (error) {
    console.error('Checkout preference error:', error);
    return res.status(500).json({ error: 'Erro interno ao iniciar o pagamento.' });
  }
});
app.listen(PORT, () => console.log(`Checkout API ouvindo na porta ${PORT}`));
