LOJA VIRTUAL — PERSONALIZADOS MÃE DO AMOR

Conteúdo
- index.html: vitrine responsiva, catálogo demonstrativo, filtros, carrinho com quantidades e subtotal, formulário de pedido.
- logo.png: logotipo enviado pela loja.
- CNAME: domínio personalizado.
- api/: API opcional para criar checkout Mercado Pago no servidor.

CONTATOS JÁ INCLUÍDOS
WhatsApp: (77) 98801-5635 (https://wa.me/5577988015635)
Instagram: @personalizadosmaedoamor
E-mail: personalizadosmaedoamor@gmail.com
Domínio: personalizadosmaedoamor.com.br

IMPORTANTE SOBRE OS PAGAMENTOS
O carrinho funciona no navegador e o botão de finalizar pedido encaminha os itens para o WhatsApp da loja. Isso NÃO é um pagamento online concluído nem confirma cobrança.
Para aceitar pagamentos online de verdade, publique a pasta api/ em um serviço de backend seguro e configure a variável de ambiente MERCADOPAGO_ACCESS_TOKEN com o token privado obtido no painel de desenvolvedor do Mercado Pago. Nunca coloque esse token no index.html, no GitHub público ou em mensagens. Configure STORE_ORIGIN=https://personalizadosmaedoamor.com.br. A API cria preferências de Checkout Pro usando os preços definidos no catálogo do servidor.

A integração de API é um ponto de partida técnico, não está conectada a uma conta de pagamento, não foi testada em produção e não recebe confirmações/webhooks de pagamento. Antes de aceitar pedidos reais, configure o token, ajuste catálogo e preços, teste em ambiente de teste, configure notificações/webhooks e verifique os estados de pagamento no backend. A documentação oficial atual do Mercado Pago deve ser consultada: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro-preferences/create-payment-preference

CATÁLOGO
Os produtos e preços em index.html e api/server.js são exemplos editáveis, não valores confirmados pela loja. Atualize os preços em ambos os arquivos para que a vitrine e o backend coincidam. O frete não está calculado automaticamente; confirme com a cliente antes da cobrança.

PUBLICAÇÃO DO FRONTEND NO GITHUB PAGES
1. Extraia o ZIP.
2. Envie index.html, logo.png e CNAME para a raiz do repositório do GitHub.
3. Em Settings > Pages, escolha Deploy from a branch, branch main e pasta /(root).
4. No Registro.br, configure os DNS conforme a documentação oficial do GitHub Pages e confira o domínio personalizado nas configurações Pages. A propagação pode demorar.
5. A API em /api não roda no GitHub Pages; ela precisa ser hospedada separadamente num serviço de backend. O checkout de pagamento só poderá ser habilitado depois que a API estiver publicada e o frontend chamar seu endereço.
