# Site Versos na Mesa

Site da Versos na Mesa — Livraria, Papelaria e Cafeteria, construído a partir do TCC "Versos na Mesa" (Instituto Loide Martha, 2026).

## Como abrir

Dê dois cliques em `index.html`. O site funciona direto no navegador, sem instalação.
As fontes (Google Fonts) e o mapa incorporado precisam de internet. Sem conexão, o site usa fontes alternativas e mostra a imagem do mapa do TCC.

Para publicar, envie a pasta inteira para qualquer hospedagem de sites estáticos (Netlify, Vercel, GitHub Pages, Hostinger etc.).

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página inicial: banner, universos, destaques da livraria e da papelaria, cafeteria, diferenciais, eventos, promoções, espaço (plantas, 3D e fotos do imóvel), localização e horário, redes sociais e newsletter |
| `livraria.html` | Estante 3D interativa + catálogo de livros com filtro por categoria e busca por título ou autor |
| `papelaria.html` | Área da papelaria: catálogo com filtros, brindes da marca e volta às aulas |
| `cardapio.html` | Cardápio completo com os preços da página 34 do TCC |
| `eventos.html` | Os oito eventos previstos no plano de marketing |
| `historia.html` | Justificativa, missão, visão, valores, identidade visual e responsabilidade socioambiental |
| `empreendimento.html` | Página discreta (só no rodapé): sócias, números financeiros, tabelas, payback, SWOT, organograma, cronograma e as divergências do documento |
| `informacoes.html` | Política de privacidade, trocas e devoluções (espaços reservados) e perguntas frequentes |
| `produto.html` | Detalhes de cada livro ou item (`produto.html?id=...`), com ficha, sacola, consulta pelo WhatsApp e produtos relacionados |

## Onde editar

O conteúdo fica em **`assets/js/data.js`**:

- `VNM.produtos`: catálogo com 11 livros e 9 itens de papelaria (imagens em `assets/img/produtos/`). Para incluir um produto, copie um bloco existente e troque os dados. Ele aparece automaticamente na página certa, na busca, na página de detalhes e na sacola.
- **Preços:** todos estão como `preco: null` (aparece "Consulte na loja"), porque nenhum preço foi informado. Para mostrar um preço, troque por um número, por exemplo `preco: 39.9`.
- `VNM.redes`: preencha `usuario` e `url` do TikTok e do Facebook quando existirem.
- `VNM.newsletterEndpoint`: endereço do serviço de e-mail (Mailchimp, Brevo, RD Station, Formspree…). Vazio = o formulário valida o e-mail, mas não envia nada.
- `VNM.cardapio`, `VNM.eventos`, `VNM.promocoes`: textos e preços.

## Estante 3D (livraria)

Inspirada no vídeo de referência e montada em `assets/js/estante.js`, aparece na página inicial e no topo da livraria:

- Os livros ficam em pé sobre uma mesa de madeira, com a lombada à mostra. O livro em destaque gira e mostra a capa.
- No computador, basta mover o mouse pela estante para trocar o livro em destaque. No celular, deslize para os lados ou use as setas.
- Ao clicar, os outros livros saem de cena, o escolhido vai para o lado, a capa se abre como uma página e os detalhes aparecem ao lado. Fecha com o botão "Fechar" ou com a tecla Esc.
- O título entra letra por letra. O botão de sol e lua alterna a iluminação de dia e de noite (começa conforme o horário).
- Teclado: setas, Home e End navegam, Enter abre e Esc fecha. Quem ativa "reduzir movimento" no sistema vê tudo sem animação.
- Cada livro tem um campo `lombada` (cor, cor do texto, espessura e altura) em `data.js`. Um livro novo sem esse campo usa uma lombada marrom padrão.

## O que ainda depende de configuração

1. **Newsletter**: falta conectar um serviço de envio (veja acima).
2. **Preços e pagamento**: falta informar os preços dos produtos. A sacola salva os itens no navegador e permite **enviar a lista pelo WhatsApp** da loja, mas **não há pagamento online**: o botão "Finalizar compra online" fica desativado até alguém integrar um meio de pagamento e um sistema de pedidos (backend).
3. **Conta de cliente**: não foi implementada, porque exige backend e autenticação.
4. **TikTok e Facebook**: o TCC cita as plataformas, mas não informa os perfis.
5. **Políticas**: textos oficiais de privacidade e de trocas.

## Origem dos dados de contato

Telefone (21) 98341-5720, e-mail versosnamesa@gmail.com, Instagram @versosnamesa e o domínio aparecem no folder (p. 35), no cartão de visita (p. 36) e no banner (p. 37) do TCC.

## Divergências encontradas no TCC

O site mantém cada valor como aparece na sua seção e sinaliza as diferenças na página "O empreendimento":

- Capital social: R$ 150.000,00 no contrato social (p. 52) e R$ 450.000,00 na tabela de cotas e no planejamento financeiro.
- Aluguel: R$ 30.520,00 na localização (p. 11) e R$ 18.000,00 na tabela de despesas (p. 51).
- Horário de segunda a sábado: 06h às 22h no texto (p. 15 e 54) e 08h às 22h no folder (p. 35). O site usa 06h.

## Estrutura

```
index.html, cardapio.html, eventos.html, historia.html,
empreendimento.html, informacoes.html, produto.html
assets/css/style.css   estilos (paleta, tipografia, responsivo)
assets/js/data.js      conteúdo editável
assets/js/icons.js     ícones em SVG
assets/js/main.js      cabeçalho, rodapé, busca, sacola, galeria, newsletter, animações
assets/img/            imagens extraídas do TCC (fotos e 3D do local tratadas: ampliadas, nitidez e gramado do 3D trocado por fundo creme)
assets/img/produtos/   capas dos livros e fotos da papelaria
```

Tecnologia: HTML, CSS e JavaScript puros, sem dependências e sem etapa de build.
