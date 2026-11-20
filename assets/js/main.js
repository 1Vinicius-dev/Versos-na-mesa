/* ==========================================================================
   VERSOS NA MESA — COMPORTAMENTO DO SITE
   Componentes compartilhados (cabeçalho, rodapé, busca, sacola, galeria)
   e renderização das seções a partir de assets/js/data.js.
   ========================================================================== */
(function () {
  'use strict';
  var V = window.VNM, I = V.icone;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var pagina = document.body.getAttribute('data-pagina') || 'inicio';
  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ------------------------------------------------------------------ */
  /* NAVEGAÇÃO                                                          */
  /* ------------------------------------------------------------------ */
  var NAV = [
    { id: 'inicio', rotulo: 'Início', href: 'index.html' },
    { id: 'livraria', rotulo: 'Livraria', href: 'livraria.html' },
    { id: 'papelaria', rotulo: 'Papelaria', href: 'papelaria.html' },
    { id: 'cafeteria', rotulo: 'Cafeteria', href: 'index.html#cafeteria' },
    { id: 'eventos', rotulo: 'Eventos', href: 'eventos.html' },
    { id: 'historia', rotulo: 'Nossa história', href: 'historia.html' },
    { id: 'contato', rotulo: 'Contato', href: 'index.html#contato' }
  ];

  function montarCabecalho() {
    var alvo = $('#cabecalho'); if (!alvo) return;
    var links = NAV.map(function (n) {
      var atual = (n.id === pagina) ? ' aria-current="page"' : '';
      return '<li><a href="' + n.href + '" data-nav="' + n.id + '"' + atual + '>' + n.rotulo + '</a></li>';
    }).join('');
    alvo.innerHTML =
      '<a class="pular" href="#conteudo">Pular para o conteúdo</a>' +
      '<div class="faixa-topo"><p>' + V.ramo('ramo-mini') + '<span>Um café, um verso, infinitas histórias.</span>' + V.ramo('ramo-mini espelho') + '</p></div>' +
      '<header class="cabecalho" id="topo">' +
      '  <div class="cabecalho__in">' +
      '    <a class="marca" href="index.html" aria-label="Versos na Mesa — página inicial"><img src="assets/img/logo.png" alt="Versos na Mesa" width="378" height="141"></a>' +
      '    <nav class="nav" id="nav" aria-label="Principal"><ul>' + links + '</ul>' +
      '      <div class="nav__rodape"><p>' + I('local') + esc(V.contato.endereco) + '</p><p>' + I('relogio') + 'Seg. a sáb. 06h–22h · Feriados 08h–17h</p></div>' +
      '    </nav>' +
      '    <div class="acoes">' +
      '      <button class="busca-campo" type="button" data-abrir-busca aria-label="Pesquisar no site">' + I('busca') + '<span>Buscar no site…</span><kbd>/</kbd></button>' +
      '      <button class="icone-btn so-mobile" type="button" data-abrir-busca aria-label="Pesquisar">' + I('busca') + '</button>' +
      '      <button class="icone-btn" type="button" data-abrir-sacola aria-label="Abrir sacola">' + I('sacola') + '<span class="contador" data-contador hidden>0</span></button>' +
      '      <button class="icone-btn hamburguer" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav">' + I('menu') + '</button>' +
      '    </div>' +
      '  </div>' +
      '</header>' +
      '<div class="veu" data-veu hidden></div>';

    var btn = $('.hamburguer'), nav = $('#nav'), veu = $('[data-veu]');
    function fechar() { nav.classList.remove('aberto'); btn.setAttribute('aria-expanded', 'false'); btn.innerHTML = I('menu'); veu.hidden = true; document.body.classList.remove('travado'); }
    btn.addEventListener('click', function () {
      var abrir = !nav.classList.contains('aberto');
      if (!abrir) return fechar();
      nav.classList.add('aberto'); btn.setAttribute('aria-expanded', 'true'); btn.innerHTML = I('fechar'); veu.hidden = false; document.body.classList.add('travado');
      var l = $('a', nav); if (l) l.focus();
    });
    veu.addEventListener('click', fechar);
    $$('a', nav).forEach(function (a) { a.addEventListener('click', fechar); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('aberto')) { fechar(); btn.focus(); } });

    var cab = $('.cabecalho');
    var aoRolar = function () { cab.classList.toggle('rolado', window.scrollY > 40); };
    window.addEventListener('scroll', aoRolar, { passive: true }); aoRolar();
  }

  function montarRodape() {
    var alvo = $('#rodape'); if (!alvo) return;
    var C = V.contato;
    var nav = NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.rotulo + '</a></li>'; }).join('');
    var redes = V.redes.map(function (r) {
      return r.url
        ? '<a class="rede" href="' + r.url + '" target="_blank" rel="noopener" aria-label="' + r.nome + ' (abre em nova aba)">' + I(r.icone) + '</a>'
        : '<span class="rede rede--vazia" title="' + r.nome + ': endereço a definir" aria-label="' + r.nome + ': endereço a definir">' + I(r.icone) + '</span>';
    }).join('');
    alvo.innerHTML =
      '<footer class="rodape">' +
      '  <img class="rodape__ilus" src="assets/img/ilustracao-xicara-clara.png" alt="" aria-hidden="true">' +
      '  <div class="rodape__in">' +
      '    <div class="rodape__marca">' +
      '      <img src="assets/img/logo-claro.png" alt="Versos na Mesa" width="240">' +
      '      <p class="manuscrito">Um café, um verso, infinitas histórias.</p>' +
      '      <p class="rodape__desc">Livraria, papelaria e cafeteria no Centro do Rio de Janeiro.</p>' +
      '      <div class="redes">' + redes + '</div>' +
      '    </div>' +
      '    <div><h3>Navegação</h3><ul>' + nav + '</ul></div>' +
      '    <div><h3>Visite</h3><ul class="rodape__info">' +
      '      <li>' + I('local') + '<span>' + esc(C.endereco) + '</span></li>' +
      '      <li>' + I('relogio') + '<span>Segunda a sábado: 06h às 22h<br>Feriados: 08h às 17h</span></li>' +
      '      <li>' + I('telefone') + '<a href="tel:' + C.telefoneLink + '">' + C.telefone + '</a></li>' +
      '      <li>' + I('email') + '<a href="mailto:' + C.email + '">' + C.email + '</a></li>' +
      '    </ul></div>' +
      '    <div><h3>Informações</h3><ul>' +
      '      <li><a href="informacoes.html#privacidade">Política de privacidade</a></li>' +
      '      <li><a href="informacoes.html#trocas">Trocas e devoluções</a></li>' +
      '      <li><a href="informacoes.html#faq">Perguntas frequentes</a></li>' +
      '      <li><a href="cardapio.html">Cardápio completo</a></li>' +
      '      <li><a href="empreendimento.html">O empreendimento</a></li>' +
      '    </ul></div>' +
      '  </div>' +
      '  <div class="rodape__base"><p>© 2026 Versos na Mesa — Livraria, Papelaria e Cafeteria.</p><p>Projeto de plano de negócios · Instituto Loide Martha · Rio de Janeiro</p></div>' +
      '</footer>' +
      '<button class="voltar-topo" type="button" aria-label="Voltar ao topo">' + I('seta') + '</button>';
    var vt = $('.voltar-topo');
    vt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); var m = $('.marca'); if (m) m.focus({ preventScroll: true }); });
    window.addEventListener('scroll', function () { vt.classList.toggle('visivel', window.scrollY > 900); }, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* AVISOS (toast)                                                     */
  /* ------------------------------------------------------------------ */
  function aviso(msg, tipo) {
    var box = $('.avisos');
    if (!box) { box = document.createElement('div'); box.className = 'avisos'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
    $$('.aviso', box).forEach(function (v) { v.remove(); });
    var el = document.createElement('div'); el.className = 'aviso aviso--' + (tipo || 'ok');
    el.innerHTML = I(tipo === 'info' ? 'info' : 'check') + '<span>' + esc(msg) + '</span>';
    box.appendChild(el);
    setTimeout(function () { el.classList.add('saindo'); setTimeout(function () { el.remove(); }, 400); }, 3600);
  }
  V.aviso = aviso;

  /* ------------------------------------------------------------------ */
  /* DIÁLOGOS (busca, sacola, galeria) — foco preso e Esc               */
  /* ------------------------------------------------------------------ */
  var ultimoFoco = null;
  function abrirDialogo(el, focoEm) {
    ultimoFoco = document.activeElement;
    el.hidden = false; requestAnimationFrame(function () { el.classList.add('aberto'); });
    document.body.classList.add('travado');
    var f = focoEm ? $(focoEm, el) : $('button, [href], input', el); if (f) f.focus();
  }
  function fecharDialogo(el) {
    el.classList.remove('aberto'); document.body.classList.remove('travado');
    setTimeout(function () { el.hidden = true; }, 250);
    if (ultimoFoco) ultimoFoco.focus();
  }
  function prenderFoco(el, e) {
    if (e.key !== 'Tab') return;
    var f = $$('button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])', el).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var p = f[0], u = f[f.length - 1];
    if (e.shiftKey && document.activeElement === p) { e.preventDefault(); u.focus(); }
    else if (!e.shiftKey && document.activeElement === u) { e.preventDefault(); p.focus(); }
  }

  /* ------------------------------------------------------------------ */
  /* BUSCA — indexa seções, cardápio, eventos, promoções e catálogo     */
  /* ------------------------------------------------------------------ */
  function indiceBusca() {
    var idx = [
      { t: 'Livraria', d: 'Catálogo de livros, indicações personalizadas e Clube do Livro', u: 'livraria.html', g: 'Página' },
      { t: 'Papelaria', d: 'Cadernos, canetas, materiais escolares, escritório e papelaria criativa', u: 'papelaria.html', g: 'Página' },
      { t: 'Cafeteria', d: 'Cafés, bebidas, salgados e doces', u: 'index.html#cafeteria', g: 'Seção' },
      { t: 'Cardápio completo', d: 'Preços de cafés, bebidas, salgados, doces e adicionais', u: 'cardapio.html', g: 'Página' },
      { t: 'Eventos', d: 'Clube do Livro, Café com Poesia, oficinas e mais', u: 'eventos.html', g: 'Página' },
      { t: 'Promoções', d: 'Desconto de inauguração, combo café + livro, cartão fidelidade', u: 'index.html#promocoes', g: 'Seção' },
      { t: 'Conheça nosso espaço', d: 'Plantas baixas e imagens 3D dos dois pavimentos', u: 'index.html#espaco', g: 'Seção' },
      { t: 'Localização', d: V.contato.endereco + ' — metrô, VLT e ônibus', u: 'index.html#contato', g: 'Seção' },
      { t: 'Horário de funcionamento', d: 'Segunda a sábado 06h às 22h · Feriados 08h às 17h', u: 'index.html#contato', g: 'Seção' },
      { t: 'Nossa história', d: 'Justificativa, missão, visão e valores', u: 'historia.html', g: 'Página' },
      { t: 'Responsabilidade socioambiental', d: 'Compromissos ambientais e sociais', u: 'historia.html#socioambiental', g: 'Seção' },
      { t: 'O empreendimento', d: 'Sócias, investimento, projeções e análise SWOT', u: 'empreendimento.html', g: 'Página' },
      { t: 'Análise SWOT', d: 'Forças, fraquezas, oportunidades e ameaças', u: 'empreendimento.html#swot', g: 'Seção' },
      { t: 'Wi-Fi gratuito', d: 'Diferenciais do espaço', u: 'index.html#experiencia', g: 'Diferencial' },
      { t: 'Marca-páginas e ecobags', d: 'Brindes e materiais personalizados da marca', u: 'papelaria.html#brindes', g: 'Papelaria' },
      { t: 'Perguntas frequentes', d: 'Informações aos clientes', u: 'informacoes.html#faq', g: 'Página' }
    ];
    V.papelariaCategorias.forEach(function (c) { idx.push({ t: c.nome, d: 'Categoria da papelaria', u: 'papelaria.html?categoria=' + encodeURIComponent(c.nome), g: 'Categoria' }); });
    V.cardapio.forEach(function (cat) {
      cat.itens.forEach(function (it) { idx.push({ t: it[0], d: cat.titulo + ' · ' + it.slice(1).filter(function (p) { return p !== '—'; }).join(' / '), u: 'cardapio.html#' + cat.id, g: 'Cardápio' }); });
    });
    V.eventos.forEach(function (e) { idx.push({ t: e.titulo, d: e.texto, u: 'eventos.html#' + e.id, g: 'Evento' }); });
    V.promocoes.forEach(function (p) { idx.push({ t: p.titulo, d: p.texto, u: 'index.html#promocoes', g: 'Promoção' }); });
    V.produtos.forEach(function (p) { idx.push({ t: p.nome, d: [p.autor, p.categoria, p.editora].filter(Boolean).join(' · '), u: 'produto.html?id=' + encodeURIComponent(p.id), g: p.tipo === 'livro' ? 'Livro' : 'Papelaria' }); });
    return idx;
  }
  var normal = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };

  function montarBusca() {
    var el = document.createElement('div');
    el.className = 'dialogo busca'; el.hidden = true;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Pesquisar no site');
    el.innerHTML =
      '<div class="busca__caixa">' +
      '  <form class="busca__form" role="search" onsubmit="return false">' + I('busca') +
      '    <label for="busca-input" class="sr">Pesquisar</label>' +
      '    <input id="busca-input" type="search" autocomplete="off" placeholder="Busque por cappuccino, Clube do Livro, cadernos…" aria-controls="busca-res">' +
      '    <button type="button" class="icone-btn" data-fechar aria-label="Fechar pesquisa">' + I('fechar') + '</button>' +
      '  </form>' +
      '  <div class="busca__sugestoes"><span>Sugestões:</span> <button type="button">Pequeno Príncipe</button><button type="button">Cappuccino</button><button type="button">Cadernos</button><button type="button">Clube do Livro</button></div>' +
      '  <ul id="busca-res" class="busca__res" aria-live="polite"></ul>' +
      '  <p class="busca__nota">' + I('info') + ' A busca inclui livros, papelaria, cardápio, eventos e informações da loja.</p>' +
      '</div>';
    document.body.appendChild(el);
    var inp = $('#busca-input', el), res = $('#busca-res', el), idx = indiceBusca();
    function render() {
      var q = normal(inp.value.trim());
      if (!q) { res.innerHTML = ''; return; }
      var termos = q.split(/\s+/);
      var achados = idx.filter(function (i) { var h = normal(i.t + ' ' + i.d + ' ' + i.g); return termos.every(function (t) { return h.indexOf(t) > -1; }); })
        .sort(function (a, b) { return (normal(a.t).indexOf(q) === 0 ? 0 : 1) - (normal(b.t).indexOf(q) === 0 ? 0 : 1); }).slice(0, 12);
      res.innerHTML = achados.length
        ? achados.map(function (a) { return '<li><a href="' + a.u + '"><span class="tag">' + a.g + '</span><strong>' + esc(a.t) + '</strong><small>' + esc(a.d) + '</small></a></li>'; }).join('')
        : '<li class="vazio">Nenhum resultado para “' + esc(inp.value) + '”.</li>';
    }
    inp.addEventListener('input', render);
    $$('.busca__sugestoes button', el).forEach(function (b) { b.addEventListener('click', function () { inp.value = b.textContent; render(); inp.focus(); }); });
    el.addEventListener('click', function (e) { if (e.target === el || e.target.closest('[data-fechar]')) fecharDialogo(el); if (e.target.closest('.busca__res a')) fecharDialogo(el); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharDialogo(el); prenderFoco(el, e); });
    document.addEventListener('click', function (e) { if (e.target.closest('[data-abrir-busca]')) { abrirDialogo(el, '#busca-input'); } });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName) && el.hidden) { e.preventDefault(); abrirDialogo(el, '#busca-input'); }
    });
  }

  /* ------------------------------------------------------------------ */
  /* SACOLA — pronta para o catálogo; sem pagamento simulado             */
  /* ------------------------------------------------------------------ */
  var CHAVE = 'vnm-sacola';
  function lerSacola() { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch (e) { return []; } }
  function gravarSacola(s) { try { localStorage.setItem(CHAVE, JSON.stringify(s)); } catch (e) { } atualizarSacola(); }
  var moeda = function (n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
  V.moeda = moeda;
  V.adicionarSacola = function (id) {
    var p = V.produtos.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    var s = lerSacola(), it = s.filter(function (x) { return x.id === id; })[0];
    if (it) it.qtd++; else s.push({ id: id, qtd: 1 });
    gravarSacola(s); aviso('“' + p.nome + '” foi adicionado à sacola.');
  };
  function zap(texto) { return 'https://wa.me/' + V.contato.telefoneLink.replace(/\D/g, '') + '?text=' + encodeURIComponent(texto); }
  V.zap = zap;
  function atualizarSacola() {
    var s = lerSacola().filter(function (x) { return V.produtos.some(function (p) { return p.id === x.id; }); });
    var n = s.reduce(function (a, b) { return a + b.qtd; }, 0);
    $$('[data-contador]').forEach(function (c) { c.textContent = n; c.hidden = n === 0; });
    var lista = $('.sacola__lista'); if (!lista) return;
    var envio = $('[data-enviar-lista]');
    if (!s.length) {
      lista.innerHTML = '<li class="sacola__vazia"><img src="assets/img/ilustracao-xicara.png" alt=""><strong>Sua sacola está vazia</strong><p>Explore a livraria e a papelaria e adicione o que chamou sua atenção.</p>' +
        '<div class="sacola__vazia-acoes"><a class="btn btn--contorno" href="livraria.html">Livraria</a><a class="btn btn--contorno" href="papelaria.html">Papelaria</a></div></li>';
      $('.sacola__total').innerHTML = ''; envio.hidden = true; return;
    }
    var total = 0, semPreco = 0, linhas = [];
    lista.innerHTML = s.map(function (x) {
      var p = V.produtos.filter(function (q) { return q.id === x.id; })[0];
      if (typeof p.preco === 'number') total += p.preco * x.qtd; else semPreco++;
      linhas.push('• ' + x.qtd + 'x ' + p.nome + (p.autor ? ' (' + p.autor + ')' : ''));
      return '<li class="sacola__item"><a href="produto.html?id=' + encodeURIComponent(p.id) + '" tabindex="-1"><img src="' + esc(p.imagem || 'assets/img/logo-selo.png') + '" alt=""></a><div><strong>' + esc(p.nome) + '</strong><span>' + (typeof p.preco === 'number' ? moeda(p.preco) : 'Preço sob consulta') + '</span>' +
        '<div class="qtd"><button type="button" data-q="-1" data-id="' + p.id + '" aria-label="Diminuir quantidade de ' + esc(p.nome) + '">' + I('menos') + '</button><output>' + x.qtd + '</output><button type="button" data-q="1" data-id="' + p.id + '" aria-label="Aumentar quantidade de ' + esc(p.nome) + '">' + I('mais') + '</button></div></div>' +
        '<button type="button" class="icone-btn" data-rem="' + p.id + '" aria-label="Remover ' + esc(p.nome) + '">' + I('lixo') + '</button></li>';
    }).join('');
    $('.sacola__total').innerHTML = semPreco
      ? '<div><span>' + n + (n > 1 ? ' itens' : ' item') + '</span><strong>Valores sob consulta</strong></div>'
      : '<div><span>Subtotal</span><strong>' + moeda(total) + '</strong></div>';
    envio.hidden = false;
    envio.href = zap('Olá, Versos na Mesa! Gostaria de consultar disponibilidade e valores destes itens:\n' + linhas.join('\n'));
  }
  function montarSacola() {
    var el = document.createElement('div');
    el.className = 'dialogo sacola'; el.hidden = true;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'sacola-titulo');
    el.innerHTML =
      '<aside class="sacola__painel">' +
      '  <div class="sacola__topo"><h2 id="sacola-titulo">Sua sacola</h2><button type="button" class="icone-btn" data-fechar aria-label="Fechar sacola">' + I('fechar') + '</button></div>' +
      '  <ul class="sacola__lista"></ul>' +
      '  <div class="sacola__rodape"><div class="sacola__total"></div>' +
      '    <a class="btn btn--cheio btn--largo" data-enviar-lista target="_blank" rel="noopener" hidden>' + I('whatsapp') + ' Consultar itens pelo WhatsApp</a>' +
      '    <button type="button" class="btn btn--contorno btn--largo" disabled aria-describedby="nota-pag">Finalizar compra online</button>' +
      '    <p class="nota" id="nota-pag">' + I('info') + ' A compra online ainda não está disponível: depende da integração de um meio de pagamento. Envie sua lista pelo WhatsApp ou compre na loja.</p>' +
      '  </div>' +
      '</aside>';
    document.body.appendChild(el);
    el.addEventListener('click', function (e) {
      if (e.target === el || e.target.closest('[data-fechar]')) return fecharDialogo(el);
      var b = e.target.closest('[data-q]');
      if (b) { var s = lerSacola(); s.forEach(function (x) { if (x.id === b.dataset.id) x.qtd = Math.max(1, x.qtd + Number(b.dataset.q)); }); gravarSacola(s); }
      var r = e.target.closest('[data-rem]');
      if (r) { gravarSacola(lerSacola().filter(function (x) { return x.id !== r.dataset.rem; })); }
    });
    el.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharDialogo(el); prenderFoco(el, e); });
    document.addEventListener('click', function (e) { if (e.target.closest('[data-abrir-sacola]')) abrirDialogo(el, '[data-fechar]'); });
    atualizarSacola();
    document.addEventListener('click', function (e) { var b = e.target.closest('[data-add]'); if (b) V.adicionarSacola(b.getAttribute('data-add')); });
  }

  /* ------------------------------------------------------------------ */
  /* GALERIA COM AMPLIAÇÃO                                              */
  /* ------------------------------------------------------------------ */
  function montarGaleria() {
    var itens = $$('[data-ampliar]'); if (!itens.length) return;
    var el = document.createElement('div');
    el.className = 'dialogo lightbox'; el.hidden = true;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Imagem ampliada');
    el.innerHTML = '<button type="button" class="icone-btn lb-fechar" data-fechar aria-label="Fechar">' + I('fechar') + '</button>' +
      '<button type="button" class="icone-btn lb-ant" aria-label="Imagem anterior">' + I('setaEsq') + '</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="icone-btn lb-prox" aria-label="Próxima imagem">' + I('seta') + '</button>';
    document.body.appendChild(el);
    var grupo = [], pos = 0, img = $('img', el), cap = $('figcaption', el);
    function mostrar(i) {
      pos = (i + grupo.length) % grupo.length; var a = grupo[pos];
      img.src = a.getAttribute('href') || a.dataset.src; img.alt = a.dataset.legenda || '';
      cap.textContent = (a.dataset.legenda || '') + (grupo.length > 1 ? '  ·  ' + (pos + 1) + ' de ' + grupo.length : '');
      $('.lb-ant', el).hidden = $('.lb-prox', el).hidden = grupo.length < 2;
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-ampliar]'); if (!a) return;
      e.preventDefault();
      grupo = $$('[data-ampliar="' + a.dataset.ampliar + '"]'); mostrar(grupo.indexOf(a)); abrirDialogo(el, '[data-fechar]');
    });
    $('.lb-ant', el).addEventListener('click', function () { mostrar(pos - 1); });
    $('.lb-prox', el).addEventListener('click', function () { mostrar(pos + 1); });
    el.addEventListener('click', function (e) { if (e.target === el || e.target.closest('[data-fechar]')) fecharDialogo(el); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecharDialogo(el);
      if (e.key === 'ArrowRight') mostrar(pos + 1);
      if (e.key === 'ArrowLeft') mostrar(pos - 1);
      prenderFoco(el, e);
    });
  }

  /* ------------------------------------------------------------------ */
  /* NEWSLETTER                                                         */
  /* ------------------------------------------------------------------ */
  function montarNewsletter() {
    $$('form[data-newsletter]').forEach(function (f) {
      var inp = $('input[type=email]', f), msg = $('.form-msg', f);
      inp.addEventListener('input', function () { f.classList.remove('erro'); msg.textContent = ''; });
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var v = inp.value.trim();
        if (!v) { f.classList.add('erro'); msg.textContent = 'Digite seu e-mail para se inscrever.'; inp.focus(); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { f.classList.add('erro'); msg.textContent = 'Este e-mail não parece válido. Confira e tente novamente.'; inp.focus(); return; }
        f.classList.remove('erro');
        if (!V.newsletterEndpoint) {
          f.classList.add('ok');
          msg.textContent = 'E-mail válido! O envio de novidades ainda não está ativo — o serviço de newsletter precisa ser configurado.';
          aviso('Formulário validado. Integração de newsletter pendente.', 'info');
          return;
        }
        var btn = $('button', f); btn.disabled = true;
        fetch(V.newsletterEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: v }) })
          .then(function (r) { if (!r.ok) throw 0; f.classList.add('ok'); msg.textContent = 'Inscrição confirmada! Obrigado por fazer parte dessa história.'; f.reset(); })
          .catch(function () { f.classList.add('erro'); msg.textContent = 'Não foi possível concluir a inscrição agora. Tente novamente mais tarde.'; })
          .then(function () { btn.disabled = false; });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* RENDERIZAÇÃO DE SEÇÕES                                             */
  /* ------------------------------------------------------------------ */
  function render(sel, html) { var el = $(sel); if (el) el.innerHTML = html; }

  function cardEvento(e, completo) {
    return '<article class="evento evento--' + e.tom + ' revelar" id="' + (completo ? e.id : '') + '">' +
      '<div class="evento__ico">' + I(e.icone) + '</div>' +
      '<h3>' + e.titulo + '</h3><p>' + e.texto + '</p>' +
      (completo ? '<span class="selo-status">Proposta do plano de negócios · datas a divulgar</span>' : '<a class="link-seta" href="eventos.html#' + e.id + '">Saiba mais ' + I('seta') + '</a>') +
      '</article>';
  }

  function renderizar() {
    render('[data-livraria-linhas]', V.livrariaLinhas.map(function (l) {
      return '<li class="linha revelar">' + I(l.icone) + '<div><h3>' + l.titulo + '</h3><p>' + l.texto + '</p></div></li>';
    }).join(''));

    $$('[data-vitrine]').forEach(function (el) {
      var tipo = el.getAttribute('data-vitrine'), lim = Number(el.getAttribute('data-limite')) || 99;
      el.innerHTML = V.produtos.filter(function (p) { return p.tipo === tipo; }).slice(0, lim).map(cardProduto).join('');
    });

    render('[data-papelaria]', V.papelariaCategorias.map(function (c) {
      var n = V.produtos.filter(function (p) { return p.tipo === 'papelaria' && p.categoria === c.nome; }).length;
      return '<li class="revelar"><a class="categoria" href="papelaria.html?categoria=' + encodeURIComponent(c.nome) + '#catalogo">' + I(c.icone) + '<span>' + c.nome + '</span><small>' + (n ? n + (n > 1 ? ' produtos' : ' produto') : 'Em breve') + '</small></a></li>';
    }).join(''));

    render('[data-eventos-home]', V.eventos.slice(0, 4).map(function (e) { return cardEvento(e, false); }).join(''));
    render('[data-eventos-todos]', V.eventos.map(function (e) { return cardEvento(e, true); }).join(''));

    render('[data-promocoes]', V.promocoes.filter(function (p) { return !p.destaque; }).map(function (p) {
      return '<li class="promo revelar">' + I(p.icone) + '<h3>' + p.titulo + '</h3><p>' + p.texto + '</p></li>';
    }).join(''));

    render('[data-cardapio-resumo]', V.cardapio.slice(0, 4).map(function (c) {
      return '<div class="menu-bloco revelar"><h3>' + c.titulo + '</h3><ul>' + c.itens.slice(0, 4).map(function (i) {
        return '<li><span>' + i[0] + '</span><i></i><b>' + (c.tamanhos.length > 1 ? 'a partir de ' : '') + i[1] + '</b></li>';
      }).join('') + '</ul></div>';
    }).join(''));

    render('[data-cardapio-completo]', V.cardapio.map(function (c) {
      return '<section class="menu-cat revelar" id="' + c.id + '" aria-labelledby="t-' + c.id + '"><h2 id="t-' + c.id + '">' + c.titulo + '</h2>' +
        '<table><thead><tr><th scope="col">Produto</th>' + c.tamanhos.map(function (t) { return '<th scope="col">' + t + '</th>'; }).join('') + '</tr></thead><tbody>' +
        c.itens.map(function (i) { return '<tr><th scope="row">' + i[0] + '</th>' + i.slice(1).map(function (p) { return '<td>' + p + '</td>'; }).join('') + '</tr>'; }).join('') +
        '</tbody></table></section>';
    }).join(''));
    render('[data-cardapio-indice]', V.cardapio.map(function (c) { return '<li><a href="#' + c.id + '">' + c.titulo + '</a></li>'; }).join(''));

    render('[data-redes]', V.redes.map(function (r) {
      return r.url
        ? '<li><a class="rede-card" href="' + r.url + '" target="_blank" rel="noopener">' + I(r.icone) + '<strong>' + r.nome + '</strong><span>' + r.usuario + '</span></a></li>'
        : '<li><div class="rede-card rede-card--vazia">' + I(r.icone) + '<strong>' + r.nome + '</strong><span>Perfil a definir</span></div></li>';
    }).join(''));
  }

  function precoTexto(p) { return typeof p.preco === 'number' ? moeda(p.preco) : 'Consulte na loja'; }

  function cardProduto(p) {
    var livro = p.tipo === 'livro';
    return '<li class="produto produto--' + p.tipo + ' revelar">' +
      '<a class="produto__link" href="produto.html?id=' + encodeURIComponent(p.id) + '">' +
      '<div class="produto__capa"><img src="' + esc(p.imagem) + '" alt="' + (livro ? 'Capa do livro ' : '') + esc(p.nome) + '" loading="lazy"></div>' +
      '<span class="produto__cat">' + esc(p.categoria || '') + '</span>' +
      '<h3>' + esc(p.nome) + '</h3>' + (p.autor ? '<p class="autor">' + esc(p.autor) + '</p>' : '') +
      '</a>' +
      '<div class="produto__rodape"><span class="preco' + (typeof p.preco === 'number' ? '' : ' preco--consulta') + '">' + precoTexto(p) + '</span>' +
      '<button type="button" class="icone-btn produto__add" data-add="' + p.id + '" aria-label="Adicionar ' + esc(p.nome) + ' à sacola">' + I('sacola') + '</button></div>' +
      '</li>';
  }

  /* Páginas de catálogo (livraria.html e papelaria.html): filtros + busca */
  function paginaCatalogo() {
    var grade = $('[data-catalogo-pagina]'); if (!grade) return;
    var tipo = grade.getAttribute('data-catalogo-pagina');
    var itens = V.produtos.filter(function (p) { return p.tipo === tipo; });
    var cats = tipo === 'papelaria'
      ? V.papelariaCategorias.map(function (c) { return c.nome; }).filter(function (c) { return itens.some(function (p) { return p.categoria === c; }); })
      : itens.map(function (p) { return p.categoria; }).filter(function (c, i, a) { return c && a.indexOf(c) === i; });
    var filtros = $('[data-filtros]'), campo = $('[data-filtro-texto]'), contador = $('[data-contagem]');
    var params = new URLSearchParams(location.search), ativa = params.get('categoria') || '';
    if (ativa && cats.indexOf(ativa) < 0 && tipo === 'papelaria') ativa = '__vazia__:' + ativa;
    filtros.innerHTML = ['Todos'].concat(cats).map(function (c) {
      var v = c === 'Todos' ? '' : c;
      return '<button type="button" class="chip" data-cat="' + esc(v) + '" aria-pressed="' + (v === ativa) + '">' + esc(c) + '</button>';
    }).join('');
    function aplicar() {
      var q = normal((campo.value || '').trim());
      var lista = itens.filter(function (p) {
        var okCat = !ativa || p.categoria === ativa;
        var okTxt = !q || normal([p.nome, p.autor, p.categoria, p.editora, p.descricao].filter(Boolean).join(' ')).indexOf(q) > -1;
        return okCat && okTxt;
      });
      if (ativa.indexOf('__vazia__:') === 0) {
        grade.innerHTML = '<li class="catalogo-vazio"><img src="assets/img/ilustracao-xicara.png" alt=""><strong>' + esc(ativa.slice(10)) + ': em breve</strong><p>Esta categoria ainda não tem produtos cadastrados. Pergunte na loja!</p><button type="button" class="btn btn--contorno" data-cat="">Ver todos os produtos</button></li>';
        contador.textContent = '0 produtos'; return;
      }
      grade.innerHTML = lista.length ? lista.map(cardProduto).join('')
        : '<li class="catalogo-vazio"><img src="assets/img/ilustracao-xicara.png" alt=""><strong>Nada encontrado</strong><p>Tente outro termo ou limpe os filtros.</p><button type="button" class="btn btn--contorno" data-limpar>Limpar filtros</button></li>';
      contador.textContent = lista.length + (lista.length === 1 ? ' produto' : ' produtos');
      $$('.revelar', grade).forEach(function (e) { e.classList.add('visto'); });
    }
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]');
      if (b) {
        ativa = b.getAttribute('data-cat');
        $$('[data-filtros] .chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-cat') === ativa)); });
        var u = new URL(location.href); if (ativa) u.searchParams.set('categoria', ativa); else u.searchParams.delete('categoria');
        history.replaceState(null, '', u.pathname.split('/').pop() + u.search + '#catalogo');
        aplicar();
      }
      if (e.target.closest('[data-limpar]')) { campo.value = ''; ativa = ''; $$('[data-filtros] .chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-cat') === '')); }); aplicar(); }
    });
    campo.addEventListener('input', aplicar);
    aplicar();
  }

  /* Página de produto */
  function paginaProduto() {
    var alvo = $('[data-produto]'); if (!alvo) return;
    var id = new URLSearchParams(location.search).get('id');
    var p = V.produtos.filter(function (x) { return x.id === id; })[0];
    if (!p) {
      alvo.innerHTML = '<div class="estado-vazio"><img src="assets/img/ilustracao-xicara.png" alt=""><h1>Produto não encontrado</h1><p>O produto que você procura não está no catálogo. Que tal explorar nossas estantes?</p><div class="hero__acoes" style="justify-content:center"><a class="btn btn--cheio" href="livraria.html">Ir para a livraria</a><a class="btn btn--contorno" href="papelaria.html">Ir para a papelaria</a></div></div>';
      return;
    }
    var livro = p.tipo === 'livro', secao = livro ? { n: 'Livraria', u: 'livraria.html' } : { n: 'Papelaria', u: 'papelaria.html' };
    document.title = p.nome + ' — Versos na Mesa';
    document.body.setAttribute('data-pagina', livro ? 'livraria' : 'papelaria');
    $$('.nav a').forEach(function (a) { a.toggleAttribute('aria-current', a.getAttribute('data-nav') === (livro ? 'livraria' : 'papelaria')); if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page'); });
    var ficha = [['Autor', p.autor], ['Editora', p.editora], ['Categoria', p.categoria], ['Indicado para', p.publico]].filter(function (f) { return f[1]; })
      .map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('');
    var rel = V.produtos.filter(function (x) { return x.tipo === p.tipo && x.id !== p.id; }).slice(0, 4);
    alvo.innerHTML =
      '<nav class="migalhas migalhas--claro" aria-label="Você está em"><a href="index.html">Início</a><span>/</span><a href="' + secao.u + '">' + secao.n + '</a><span>/</span><span aria-current="page">' + esc(p.nome) + '</span></nav>' +
      '<div class="produto-detalhe">' +
      '  <div class="produto-detalhe__img produto-detalhe__img--' + p.tipo + '"><a href="' + esc(p.imagem) + '" data-ampliar="produto" data-legenda="' + esc(p.nome) + '"><img src="' + esc(p.imagem) + '" alt="' + (livro ? 'Capa do livro ' : '') + esc(p.nome) + '"></a></div>' +
      '  <div class="produto-detalhe__info">' +
      '    <p class="sobretitulo">' + esc(p.categoria || secao.n) + '</p><h1>' + esc(p.nome) + '</h1>' + (p.autor ? '<p class="autor">' + esc(p.autor) + '</p>' : '') +
      '    <p class="preco' + (typeof p.preco === 'number' ? '' : ' preco--consulta') + '">' + precoTexto(p) + '</p>' +
      '    <p class="produto-detalhe__desc">' + esc(p.descricao || '') + '</p>' +
      (ficha ? '<dl class="ficha">' + ficha + '</dl>' : '') +
      '    <div class="produto-detalhe__acoes"><button type="button" class="btn btn--cheio" data-add="' + p.id + '">' + I('sacola') + ' Adicionar à sacola</button>' +
      '    <a class="btn btn--contorno" target="_blank" rel="noopener" href="' + zap('Olá, Versos na Mesa! Vocês têm disponível: ' + p.nome + (p.autor ? ', de ' + p.autor : '') + '?') + '">' + I('whatsapp') + ' Consultar disponibilidade</a></div>' +
      '    <ul class="produto-detalhe__extras"><li>' + I('local') + 'Consulte a disponibilidade na loja · Rua da Quitanda, 86 — Centro</li>' +
      (livro ? '<li>' + I('xicara') + 'Combo Café + Livro: desconto ao levar um livro com uma bebida da cafeteria</li>' : '<li>' + I('mochila') + 'Volta às aulas: kits com cadernos, canetas, mochilas e mais</li>') + '</ul>' +
      '  </div>' +
      '</div>' +
      (rel.length ? '<section class="relacionados"><div class="cab-secao"><div><p class="sobretitulo">Você também pode gostar</p><h2 class="titulo-secao">Mais da <em>' + secao.n.toLowerCase() + '</em></h2></div><a class="link-seta" href="' + secao.u + '">Ver tudo ' + I('seta') + '</a></div><ul class="produtos">' + rel.map(cardProduto).join('') + '</ul></section>' : '');
  }

  /* ------------------------------------------------------------------ */
  /* ANIMAÇÕES DE ENTRADA E MENU ATIVO POR SEÇÃO                        */
  /* ------------------------------------------------------------------ */
  function animar() {
    var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = $$('.revelar');
    if (reduzir || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('visto'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('visto'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(e); });

    if (pagina !== 'inicio') return;
    var secoes = ['cafeteria', 'contato'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var spy = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return;
        $$('.nav a').forEach(function (a) { a.removeAttribute('aria-current'); });
        var a = $('.nav a[data-nav="' + x.target.id + '"]'); if (a) a.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(function (s) { spy.observe(s); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    montarCabecalho(); montarRodape(); renderizar(); paginaProduto(); paginaCatalogo();
    montarBusca(); montarSacola(); montarGaleria(); montarNewsletter(); animar();
    $$('[data-ramo]').forEach(function (e) { e.innerHTML = V.ramo(e.getAttribute('data-ramo')); });
    $$('[data-i]').forEach(function (e) { e.innerHTML = I(e.getAttribute('data-i')) + e.innerHTML; });
  });
})();
