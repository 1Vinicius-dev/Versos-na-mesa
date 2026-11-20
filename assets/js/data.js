/* ==========================================================================
   VERSOS NA MESA — DADOS DO SITE
   Fonte oficial: TCC "Versos na Mesa" (Instituto Loide Martha, 2026).
   Tudo o que não consta no TCC fica vazio ("") e o site exibe o espaço
   preparado para preenchimento posterior.
   ========================================================================== */

window.VNM = window.VNM || {};

/* --------------------------------------------------------------------------
   CONTATO E REDES
   Telefone, e-mail, @ do Instagram e domínio aparecem no folder (p. 35),
   no cartão de visita (p. 36) e no banner (p. 37) do TCC.
   TikTok e Facebook são citados como plataformas (p. 28), sem endereço.
   -------------------------------------------------------------------------- */
VNM.contato = {
  endereco: "Rua da Quitanda, nº 86 — Centro, Rio de Janeiro — RJ",
  enderecoMapa: "Rua da Quitanda, 86 - Centro, Rio de Janeiro - RJ",
  telefone: "(21) 98341-5720",
  telefoneLink: "+5521983415720",
  email: "versosnamesa@gmail.com",
  site: "www.versosnamesa.com.br",
  horarios: [
    { dias: "Segunda a sábado", horas: "06h às 22h" },
    { dias: "Feriados", horas: "08h às 17h" }
  ]
};

VNM.redes = [
  { nome: "Instagram", usuario: "@versosnamesa", url: "https://www.instagram.com/versosnamesa/", icone: "instagram" },
  { nome: "WhatsApp Business", usuario: "(21) 98341-5720", url: "https://wa.me/5521983415720", icone: "whatsapp" },
  { nome: "TikTok", usuario: "", url: "", icone: "tiktok" },      // a preencher
  { nome: "Facebook", usuario: "", url: "", icone: "facebook" }   // a preencher
];

/* --------------------------------------------------------------------------
   NEWSLETTER — deixe vazio enquanto não houver serviço de envio.
   Ex.: endpoint de Mailchimp, Brevo, RD Station, Formspree etc.
   -------------------------------------------------------------------------- */
VNM.newsletterEndpoint = "";

/* --------------------------------------------------------------------------
   CATÁLOGO (Livraria e Papelaria)
   Livros e itens de papelaria enviados pela empresa. O TCC não informa
   preços, por isso preco: null exibe "Consulte na loja". Formato:
   {
     id: "slug-unico",
     tipo: "livro" | "papelaria",
     nome: "Título",
     autor: "Autor (livros)", editora: "", publico: "",
     categoria: "Literatura nacional",
     preco: 49.9,            // número em reais, ou null para "Consulte"
     imagem: "assets/img/produtos/arquivo.webp",
     descricao: "Texto curto"
   }
   -------------------------------------------------------------------------- */
VNM.produtos = [
  /* ---------------- LIVRARIA ---------------- */
  { id: "o-pequeno-principe", tipo: "livro", lombada: { cor: "#0b1f55", tinta: "#f7e7b0", espessura: 24, altura: 1.0 }, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry",
    editora: "Agir", categoria: "Clássicos", publico: "Infantojuvenil e adulto", preco: null,
    imagem: "assets/img/produtos/o-pequeno-principe.webp",
    descricao: "Um piloto perdido no deserto conhece um pequeno príncipe vindo de outro planeta. Uma fábula sobre amizade, amor e o olhar das crianças sobre o mundo." },
  { id: "o-menino-do-pijama-listrado", tipo: "livro", lombada: { cor: "#b9c4cc", tinta: "#2a1d16", espessura: 26, altura: 0.97 }, nome: "O menino do pijama listrado", autor: "John Boyne",
    editora: "Cia. das Letras", categoria: "Ficção histórica", publico: "Juvenil e adulto", preco: null,
    imagem: "assets/img/produtos/o-menino-do-pijama-listrado.webp",
    descricao: "Durante a Segunda Guerra Mundial, a amizade improvável entre dois meninos separados por uma cerca revela, pelo olhar da infância, o peso da história." },
  { id: "e-assim-que-comeca", tipo: "livro", lombada: { cor: "#14313f", tinta: "#f6e9d8", espessura: 36, altura: 1.02 }, nome: "É assim que começa", autor: "Colleen Hoover",
    editora: "Arqueiro", categoria: "Romance", publico: "Adulto", preco: null,
    imagem: "assets/img/produtos/e-assim-que-comeca.webp",
    descricao: "Da autora de “É assim que acaba”. A continuação da história de Lily e Atlas — porque todo final é um novo começo." },
  { id: "alice-no-pais-das-maravilhas", tipo: "livro", lombada: { cor: "#262a4d", tinta: "#f2d98a", espessura: 28, altura: 0.99 }, nome: "Alice no País das Maravilhas", autor: "Lewis Carroll",
    editora: "", categoria: "Clássicos", publico: "Infantojuvenil e adulto", preco: null,
    imagem: "assets/img/produtos/alice-no-pais-das-maravilhas.webp",
    descricao: "Ao seguir um coelho apressado, Alice cai em um mundo de lógica às avessas, chás intermináveis e personagens inesquecíveis." },

  { id: "como-eu-era-antes-de-voce", tipo: "livro", lombada: { cor: "#fbf3e2", tinta: "#c2477e", espessura: 42, altura: 1.03 },
    nome: "Como eu era antes de você", autor: "Jojo Moyes",
    editora: "Intrínseca", categoria: "Romance", publico: "Adulto", preco: null,
    imagem: "assets/img/produtos/como-eu-era-antes-de-voce.webp",
    descricao: "Lou Clark aceita trabalhar como cuidadora de Will Traynor, um jovem que ficou tetraplégico após um acidente. Um romance sobre encontros que mudam tudo e escolhas difíceis." },
  { id: "e-assim-que-acaba", tipo: "livro", lombada: { cor: "#8a1d6c", tinta: "#fdeef8", espessura: 38, altura: 1.01 },
    nome: "É assim que acaba", autor: "Colleen Hoover",
    editora: "Galera", categoria: "Romance", publico: "Adulto", preco: null,
    imagem: "assets/img/produtos/e-assim-que-acaba.webp",
    descricao: "Lily Bloom recomeça a vida em Boston e se apaixona por Ryle, até que o passado e o presente a obrigam a fazer uma escolha corajosa. O primeiro livro da história de Lily e Atlas." },
  { id: "verity", tipo: "livro", lombada: { cor: "#10302b", tinta: "#d8b75c", espessura: 32, altura: 0.98 },
    nome: "Verity", autor: "Colleen Hoover",
    editora: "Galera", categoria: "Suspense", publico: "Classificação etária: +16 anos", preco: null,
    imagem: "assets/img/produtos/verity.webp",
    descricao: "Uma escritora contratada para concluir a série de uma autora famosa encontra, entre os papéis dela, um manuscrito perturbador. Um suspense psicológico cheio de reviravoltas." },
  { id: "dom-quixote-volume-1", tipo: "livro", lombada: { cor: "#a51c26", tinta: "#fff4ea", espessura: 46, altura: 1.04 },
    nome: "Dom Quixote — Volume I", autor: "Miguel de Cervantes",
    editora: "", categoria: "Clássicos", publico: "Juvenil e adulto", preco: null,
    imagem: "assets/img/produtos/dom-quixote-volume-1.webp",
    descricao: "O fidalgo que leu romances de cavalaria demais parte em aventuras ao lado do fiel Sancho Pança. Um dos grandes clássicos da literatura mundial." },
  { id: "quarto-de-despejo", tipo: "livro", lombada: { cor: "#5f7f98", tinta: "#ffffff", espessura: 24, altura: 0.96 },
    nome: "Quarto de despejo: diário de uma favelada", autor: "Carolina Maria de Jesus",
    editora: "Ática", categoria: "Literatura brasileira", publico: "Juvenil e adulto", preco: null,
    imagem: "assets/img/produtos/quarto-de-despejo.webp",
    descricao: "O diário de Carolina Maria de Jesus, catadora de papel na favela do Canindé, em São Paulo. Um retrato forte e necessário da desigualdade brasileira." },
  { id: "o-estrangeiro", tipo: "livro", lombada: { cor: "#2c2a2b", tinta: "#f1efea", espessura: 20, altura: 0.97 },
    nome: "O estrangeiro", autor: "Albert Camus",
    editora: "Record", categoria: "Clássicos", publico: "Adulto", preco: null,
    imagem: "assets/img/produtos/o-estrangeiro.webp",
    descricao: "Meursault narra, com indiferença desconcertante, os dias que levam a um crime na Argélia. Romance do autor vencedor do Prêmio Nobel de Literatura." },
  { id: "odisseia-quadrinhos", tipo: "livro", lombada: { cor: "#a8151d", tinta: "#fff7ef", espessura: 18, altura: 1.06 },
    nome: "Odisseia (em quadrinhos)", autor: "Homero",
    editora: "L&PM Editores", categoria: "Quadrinhos", publico: "Infantojuvenil e adulto", preco: null,
    imagem: "assets/img/produtos/odisseia-quadrinhos.webp",
    descricao: "A volta de Ulisses para casa após a Guerra de Troia, adaptada em quadrinhos na coleção Clássicos da Literatura em Quadrinhos." },

  /* ---------------- PAPELARIA ---------------- */
  { id: "cadernos-espiral", tipo: "papelaria", nome: "Cadernos espiral", categoria: "Cadernos", preco: null,
    imagem: "assets/img/produtos/cadernos-espiral.webp",
    descricao: "Cadernos com espiral metálica em cores clássicas — verde, vermelho e azul-marinho — para estudos, trabalho e anotações do dia a dia." },
  { id: "canetas-esferograficas", tipo: "papelaria", nome: "Canetas esferográficas", categoria: "Canetas", preco: null,
    imagem: "assets/img/produtos/canetas-esferograficas.webp",
    descricao: "Canetas esferográficas de corpo transparente em várias cores, para escrever, destacar e organizar suas anotações." },
  { id: "marca-textos", tipo: "papelaria", nome: "Marca-textos", categoria: "Materiais de escrita", preco: null,
    imagem: "assets/img/produtos/marca-textos.webp",
    descricao: "Marca-textos em tons de rosa, laranja, amarelo, verde, azul e lilás para destacar o que importa nos estudos." },
  { id: "lapis-de-cor", tipo: "papelaria", nome: "Lápis de cor", categoria: "Materiais escolares", preco: null,
    imagem: "assets/img/produtos/lapis-de-cor.webp",
    descricao: "Lápis de cor com borracha na ponta, em uma paleta variada para desenhar, colorir e criar." },
  { id: "kit-escolar", tipo: "papelaria", nome: "Kit escolar", categoria: "Materiais escolares", preco: null,
    imagem: "assets/img/produtos/kit-escolar.webp",
    descricao: "Régua, fita adesiva, cola bastão e giz de cera colorido: o básico para a volta às aulas." },
  { id: "mochila", tipo: "papelaria", nome: "Mochila", categoria: "Materiais escolares", preco: null,
    imagem: "assets/img/produtos/mochila.webp",
    descricao: "Mochila em tecido, com bolso frontal e alça superior, para carregar livros, cadernos e materiais." },
  { id: "estojo", tipo: "papelaria", nome: "Estojo", categoria: "Itens de organização", preco: null,
    imagem: "assets/img/produtos/estojo.webp",
    descricao: "Estojo em tecido com zíper para manter canetas, lápis e acessórios sempre organizados." },
  { id: "kit-escritorio", tipo: "papelaria", nome: "Kit escritório", categoria: "Artigos de escritório", preco: null,
    imagem: "assets/img/produtos/kit-escritorio.webp",
    descricao: "Tesoura, grampeador, borracha, apontador, bloco de notas adesivas, prendedores e clipes coloridos." },
  { id: "papeis-coloridos", tipo: "papelaria", nome: "Papéis coloridos", categoria: "Papelaria criativa", preco: null,
    imagem: "assets/img/produtos/papeis-coloridos.webp",
    descricao: "Folhas coloridas para trabalhos escolares, artesanato, cartões e projetos criativos." }
];

/* Linhas da livraria descritas no folder e no banner do TCC (p. 35 e 37). */
VNM.livrariaLinhas = [
  { titulo: "Livros nacionais e internacionais", texto: "Estantes organizadas por categorias e gêneros, distribuídas pelas paredes laterais da loja.", icone: "livros" },
  { titulo: "Indicações personalizadas", texto: "Atendimento que ajuda cada leitor a encontrar a próxima boa história.", icone: "estrela" },
  { titulo: "Clube do Livro", texto: "Encontros mensais para conversar sobre uma obra escolhida.", icone: "grupo" },
  { titulo: "Biblioteca e área de leitura", texto: "Segundo andar reservado e silencioso, com biblioteca principal e espaços de permanência.", icone: "poltrona" }
];

VNM.papelariaCategorias = [
  { nome: "Cadernos", icone: "caderno" },
  { nome: "Canetas", icone: "caneta" },
  { nome: "Materiais de escrita", icone: "lapis" },
  { nome: "Materiais escolares", icone: "mochila" },
  { nome: "Artigos de escritório", icone: "clipe" },
  { nome: "Itens de organização", icone: "pasta" },
  { nome: "Papelaria criativa", icone: "pincel" },
  { nome: "Marcadores de páginas", icone: "marcador" },
  { nome: "Produtos temáticos", icone: "xicara" }
];

/* --------------------------------------------------------------------------
   CARDÁPIO — transcrito da tabela de preços do TCC (p. 34).
   -------------------------------------------------------------------------- */
VNM.cardapio = [
  {
    id: "quentes", titulo: "Cafés e bebidas quentes", tamanhos: ["Médio", "Grande"],
    itens: [
      ["Americano", "R$ 9,00", "R$ 12,00"],
      ["Cappuccino", "R$ 9,00", "R$ 12,00"],
      ["Espresso duplo", "R$ 10,50", "R$ 13,50"],
      ["Latte", "R$ 12,60", "R$ 15,60"],
      ["Macchiato", "R$ 13,50", "R$ 16,50"],
      ["Chocolate belga", "R$ 15,75", "R$ 18,75"],
      ["Mocha", "R$ 13,50", "R$ 16,50"],
      ["White mocha", "R$ 15,00", "R$ 18,00"]
    ]
  },
  {
    id: "geladas", titulo: "Cafés e bebidas geladas", tamanhos: ["Médio", "Grande"],
    itens: [
      ["Americano", "R$ 9,00", "—"],
      ["Caramelo", "R$ 12,75", "R$ 15,75"],
      ["Café com avelã", "R$ 13,50", "R$ 16,50"],
      ["Biscoito com avelã", "R$ 15,00", "R$ 18,00"],
      ["Mocha com avelã", "R$ 13,50", "R$ 16,50"],
      ["Matcha cremoso", "R$ 10,00", "R$ 13,00"],
      ["Chocolate belga", "R$ 10,00", "R$ 13,00"],
      ["Morango cremoso", "R$ 9,00", "R$ 12,00"],
      ["Baunilha", "R$ 10,00", "R$ 13,00"]
    ]
  },
  {
    id: "salgados", titulo: "Salgados", tamanhos: ["Preço"],
    itens: [
      ["Baguete de queijo", "R$ 12,00"],
      ["Coxinha", "R$ 8,00"],
      ["Bauru", "R$ 12,00"],
      ["Empada", "R$ 8,00"],
      ["Esfiha", "R$ 8,00"],
      ["Lanche natural", "R$ 12,00"],
      ["Croissant", "R$ 10,00"]
    ]
  },
  {
    id: "doces", titulo: "Doces", tamanhos: ["Preço"],
    itens: [
      ["Cookie", "R$ 10,00"],
      ["Cookie recheado", "R$ 12,00"],
      ["Donuts", "R$ 8,00"],
      ["Bolo", "R$ 10,00"],
      ["Verso doce (sobremesa da casa)", "R$ 15,00"]
    ]
  },
  {
    id: "bebidas", titulo: "Bebidas", tamanhos: ["Preço"],
    itens: [
      ["Água", "R$ 5,00"],
      ["H2O", "R$ 8,00"],
      ["Suco em lata", "R$ 10,00"],
      ["Suco natural", "R$ 15,00"],
      ["Refrigerante", "R$ 12,00"]
    ]
  },
  {
    id: "adicionais", titulo: "Adicionais", tamanhos: ["Preço"],
    itens: [
      ["Chantilly", "R$ 4,00"],
      ["Doce de leite", "R$ 5,00"],
      ["Nutella", "R$ 7,00"]
    ]
  }
];

/* --------------------------------------------------------------------------
   EVENTOS — propostas do plano de marketing (p. 26). Sem datas confirmadas.
   -------------------------------------------------------------------------- */
VNM.eventos = [
  { id: "clube-do-livro", titulo: "Clube do Livro", icone: "grupo", tom: "verde",
    texto: "Encontros mensais para conversar sobre uma obra escolhida, compartilhar opiniões, discutir personagens e trocar indicações de leitura." },
  { id: "noite-de-autores", titulo: "Noite de Autores", icone: "pena", tom: "cafe",
    texto: "Eventos destinados à divulgação e ao bate-papo com escritores locais e novos talentos, possibilitando aos clientes conhecerem melhor seus trabalhos." },
  { id: "cafe-com-poesia", titulo: "Café com Poesia", icone: "xicara", tom: "terracota",
    texto: "Encontros que unem literatura e cafeteria, com leitura de poemas, apresentações e momentos para os participantes compartilharem suas próprias produções." },
  { id: "oficinas-criativas", titulo: "Oficinas Criativas", icone: "pincel", tom: "rosa",
    texto: "Atividades de escrita, desenho, pintura, lettering, artesanato e outras formas de expressão artística, incentivando a criatividade dos participantes." },
  { id: "encontros-de-leitura", titulo: "Encontros de Leitura", icone: "livro-aberto", tom: "verde",
    texto: "Momentos de leitura em grupo, voltados principalmente para crianças e adolescentes, buscando incentivar o hábito da leitura desde cedo." },
  { id: "datas-comemorativas", titulo: "Datas Comemorativas", icone: "calendario", tom: "terracota",
    texto: "Ações especiais no Dia dos Namorados, Dia do Livro, volta às aulas, Dia das Mães, Dia dos Pais e Natal, com decoração temática, atividades e produtos especiais." },
  { id: "eventos-para-criancas", titulo: "Eventos para Crianças", icone: "balao", tom: "rosa",
    texto: "Contação de histórias, oficinas de desenho e atividades educativas durante períodos de férias e finais de semana." },
  { id: "feiras-e-exposicoes", titulo: "Feiras e Exposições", icone: "moldura", tom: "cafe",
    texto: "Exposição de livros, produtos artesanais e trabalhos de artistas e escritores locais, fortalecendo a relação da empresa com a comunidade." }
];

/* --------------------------------------------------------------------------
   PROMOÇÕES — estratégias do plano de marketing (p. 27).
   -------------------------------------------------------------------------- */
VNM.promocoes = [
  { titulo: "Desconto de inauguração", texto: "10% de desconto em produtos selecionados durante o período de inauguração.", icone: "laco", destaque: true },
  { titulo: "Combo Café + Livro", texto: "Desconto especial para clientes que comprarem um livro junto com uma bebida ou produto da cafeteria.", icone: "xicara" },
  { titulo: "Cartão fidelidade", texto: "Acúmulo de benefícios após determinado número de compras, podendo receber descontos, brindes ou produtos gratuitos.", icone: "cartao" },
  { titulo: "Promoção de aniversário", texto: "Clientes cadastrados recebem um desconto ou benefício especial durante o mês de aniversário.", icone: "bolo" },
  { titulo: "Descontos em kits", texto: "Combinações de livros, materiais de papelaria, cafés e outros produtos com preços mais atrativos.", icone: "presente" },
  { titulo: "Promoções nas redes sociais", texto: "Sorteios, desafios, cupons de desconto e ofertas exclusivas para os seguidores da marca.", icone: "coracao" },
  { titulo: "Volta às aulas", texto: "Descontos em materiais escolares e criação de kits com cadernos, canetas, mochilas e outros produtos de papelaria.", icone: "mochila" }
];
