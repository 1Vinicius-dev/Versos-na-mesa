/* ==========================================================================
   VERSOS NA MESA — ESTANTE 3D
   Livros em pé sobre a mesa, com a lombada à mostra. O livro em foco gira
   e mostra a capa; ao abrir, os outros saem de cena, o livro vai para o
   centro, a capa se abre como uma página e os detalhes aparecem ao lado.
   Uso: <div data-estante data-titulo="..." data-subtitulo="..." data-nivel="h2"></div>
   ========================================================================== */
(function () {
  'use strict';
  var V = window.VNM, I = V.icone;
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ponteiroFino = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* Ordem da estante: alterna cores e espessuras para parecer uma estante real */
  var ORDEM = ['dom-quixote-volume-1', 'como-eu-era-antes-de-voce', 'o-pequeno-principe', 'verity', 'quarto-de-despejo',
    'e-assim-que-acaba', 'o-menino-do-pijama-listrado', 'alice-no-pais-das-maravilhas', 'o-estrangeiro', 'e-assim-que-comeca', 'odisseia-quadrinhos'];

  function livrosDaEstante() {
    var livros = V.produtos.filter(function (p) { return p.tipo === 'livro'; });
    return livros.slice().sort(function (a, b) {
      var ia = ORDEM.indexOf(a.id), ib = ORDEM.indexOf(b.id);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }

  /* Divide um título em letras para a animação de entrada */
  function letras(texto) {
    var i = 0;
    return texto.split(/(\*[^*]+\*)/).map(function (parte) {
      var enfase = /^\*.*\*$/.test(parte); if (enfase) parte = parte.slice(1, -1);
      var html = parte.split(' ').map(function (palavra) {
        return '<span class="letras__palavra">' + Array.prototype.map.call(palavra, function (l) {
          return '<span class="letras__l" style="--i:' + (i++) + '">' + esc(l) + '</span>';
        }).join('') + '</span>';
      }).join(' ');
      return enfase ? '<em>' + html + '</em>' : html;
    }).join('');
  }

  function montar(raiz) {
    var livros = livrosDaEstante(); if (!livros.length) return;
    var nivel = raiz.getAttribute('data-nivel') || 'h2';
    var titulo = raiz.getAttribute('data-titulo') || 'Nas nossas *estantes*';
    var sub = raiz.getAttribute('data-subtitulo') || '';
    var hora = new Date().getHours();
    var modo = (hora >= 6 && hora < 18) ? 'dia' : 'noite';
    var ativo = Math.min(livros.length - 1, Math.max(0, livros.map(function (l) { return l.id; }).indexOf(raiz.getAttribute('data-inicio') || 'e-assim-que-acaba')));
    if (ativo < 0) ativo = Math.floor(livros.length / 2);
    var uid = 'estante-' + Math.random().toString(36).slice(2, 7);

    raiz.classList.add('estante');
    raiz.setAttribute('data-modo', modo);
    raiz.innerHTML =
      '<div class="estante__cena" aria-hidden="true"><img src="assets/img/foto-ambiente-livraria.webp" alt=""><span class="estante__luz"></span></div>' +
      '<button type="button" class="estante__modo" aria-pressed="' + (modo === 'noite') + '" aria-label="Alternar iluminação: dia ou noite">' +
      '  <span class="estante__modo-sol">' + I('sol') + '</span><span class="estante__modo-lua">' + I('lua') + '</span></button>' +
      '<div class="estante__topo">' +
      '  <' + nivel + ' class="estante__titulo letras">' + letras(titulo) + '</' + nivel + '>' +
      (sub ? '<p class="estante__sub">' + esc(sub) + '</p>' : '') +
      '  <p class="estante__atual" aria-live="polite"><span data-atual-titulo></span><i></i><span data-atual-autor></span></p>' +
      '</div>' +
      '<div class="estante__palco">' +
      '  <ul class="estante__fila" role="listbox" aria-label="Livros da estante" aria-orientation="horizontal" id="' + uid + '-fila"></ul>' +
      '  <div class="aberto" role="dialog" aria-modal="false" aria-labelledby="' + uid + '-titulo" hidden>' +
      '    <div class="aberto__livro">' +
      '      <div class="aberto__pagina aberto__pagina--dir"></div>' +
      '      <div class="aberto__folha"><div class="aberto__capa"><img alt=""></div><div class="aberto__pagina aberto__pagina--esq"></div></div>' +
      '    </div>' +
      '    <div class="aberto__info"></div>' +
      '  </div>' +
      '</div>' +
      '<div class="estante__mesa" aria-hidden="true"></div>' +
      '<div class="estante__controles">' +
      '  <button type="button" class="estante__seta" data-dir="-1" aria-label="Livro anterior" aria-controls="' + uid + '-fila">' + I('setaEsq') + '</button>' +
      '  <span class="estante__contador" aria-hidden="true"><b data-pos>1</b> / ' + livros.length + '</span>' +
      '  <button type="button" class="estante__seta" data-dir="1" aria-label="Próximo livro" aria-controls="' + uid + '-fila">' + I('seta') + '</button>' +
      '</div>' +
      '<p class="estante__dica">' + (ponteiroFino.matches ? 'Passe o mouse pela estante e clique em um livro para abrir' : 'Deslize para navegar e toque no livro para abrir') + '</p>';

    var fila = raiz.querySelector('.estante__fila');
    var palco = raiz.querySelector('.estante__palco');
    var aberto = raiz.querySelector('.aberto');
    var folha = raiz.querySelector('.aberto__folha');

    fila.innerHTML = livros.map(function (l, i) {
      var lb = l.lombada || {};
      var rot = l.curto || l.nome.split(/ —|\(|:/)[0].trim();
      var fs = Math.max(8, Math.min(12.5, 150 * (lb.altura || 1) / (rot.length * 0.74)));
      return '<li class="livro3d" role="presentation" style="--fs:' + fs.toFixed(2) + ';--esp:' + (lb.espessura || 30) + ';--alt:' + (lb.altura || 1) + ';--cor:' + (lb.cor || '#6b4430') + ';--tinta:' + (lb.tinta || '#fff') + ';--n:' + i + '">' +
        '<button type="button" class="livro3d__btn" role="option" aria-selected="false" tabindex="-1" data-i="' + i + '" aria-label="' + esc(l.nome + ', de ' + l.autor) + '">' +
        '<span class="livro3d__entrada"><span class="livro3d__corpo">' +
        '<span class="livro3d__face livro3d__capa"><img src="' + esc(l.imagem) + '" alt="" loading="lazy" draggable="false"></span>' +
        '<span class="livro3d__face livro3d__lombada"><span class="livro3d__lombada-titulo">' + esc(rot) + '</span><span class="livro3d__lombada-autor">' + esc(l.autor.split(' ').pop()) + '</span></span>' +
        '<span class="livro3d__face livro3d__miolo"></span>' +
        '<span class="livro3d__face livro3d__topo"></span>' +
        '<span class="livro3d__face livro3d__verso"></span>' +
        '</span></span><span class="livro3d__sombra"></span></button></li>';
    }).join('');
    var itens = Array.prototype.slice.call(fila.children);
    var botoes = itens.map(function (li) { return li.firstChild; });

    /* -------- medidas -------- */
    var M = {};
    function medir() {
      var cs = getComputedStyle(raiz);
      M.k = parseFloat(cs.getPropertyValue('--k')) || 1;
      M.L = 160 * M.k;
      M.W = palco.clientWidth;
      M.estreito = window.matchMedia('(max-width: 720px)').matches;
    }

    /* -------- posicionamento -------- */
    var estado = 'estante'; // estante | abrindo | aberto | fechando
    function esp(i) { return (livros[i].lombada && livros[i].lombada.espessura || 30) * M.k; }
    function posicionar() {
      var a = ativo, gap = 5 * M.k, folga = 22 * M.k;
      var xs = [];
      xs[a] = 0;
      var x = M.L / 2 + folga;
      for (var i = a + 1; i < itens.length; i++) { xs[i] = x + esp(i) / 2; x += esp(i) + gap; }
      x = -M.L / 2 - folga;
      for (i = a - 1; i >= 0; i--) { xs[i] = x - esp(i) / 2; x -= esp(i) + gap; }
      var abrindo = estado !== 'estante';
      var alvoX = M.estreito ? M.L * 0.62 : -M.W * 0.2 + M.L * 0.62;
      itens.forEach(function (li, i) {
        var d = i - a, rot, z = 0, xx = xs[i], escala = 1, op = 1, y = 0;
        if (d === 0) {
          rot = 0; z = 46 * M.k;
          if (abrindo) { xx = alvoX; z = 0; escala = 1.25; }
        } else {
          rot = 90 - Math.max(-1, Math.min(1, d)) * Math.min(Math.abs(d), 3) * 2.2;
          if (abrindo) { xx += (d > 0 ? 1 : -1) * (M.W * 0.7); op = 0; y = 6; }
        }
        li.style.setProperty('--x', xx.toFixed(1) + 'px');
        li.style.setProperty('--z', z.toFixed(1) + 'px');
        li.style.setProperty('--y', y + 'px');
        li.style.setProperty('--rot', rot.toFixed(2) + 'deg');
        li.style.setProperty('--esc', escala);
        li.style.opacity = op;
        li.classList.toggle('ativo', d === 0);
        li.style.zIndex = 100 - Math.abs(d);
        botoes[i].setAttribute('aria-selected', String(d === 0));
        botoes[i].tabIndex = d === 0 && !abrindo ? 0 : -1;
      });
      var l = livros[a];
      raiz.querySelector('[data-atual-titulo]').textContent = l.nome;
      raiz.querySelector('[data-atual-autor]').textContent = l.autor;
      raiz.querySelector('[data-pos]').textContent = a + 1;
      raiz.style.setProperty('--aberto-x', alvoX + 'px');
    }

    function focar(i, mover) {
      i = Math.max(0, Math.min(itens.length - 1, i));
      if (i === ativo || estado !== 'estante') return;
      ativo = i; posicionar();
      var atual = raiz.querySelector('.estante__atual'); atual.classList.remove('troca'); void atual.offsetWidth; atual.classList.add('troca');
      if (mover) botoes[i].focus({ preventScroll: true });
    }

    /* -------- abrir / fechar -------- */
    var tempos = [];
    function depois(ms, fn) { tempos.push(setTimeout(fn, reduzir.matches ? 0 : ms)); }
    function limpar() { tempos.forEach(clearTimeout); tempos = []; }

    function conteudoAberto(l) {
      var lb = l.lombada || {};
      raiz.querySelector('.aberto__capa img').src = l.imagem;
      raiz.querySelector('.aberto__capa img').alt = 'Capa de ' + l.nome;
      raiz.querySelector('.aberto__livro').style.cssText = '--alt:' + (lb.altura || 1) + ';--cor:' + (lb.cor || '#6b4430');
      raiz.querySelector('.aberto__pagina--esq').innerHTML =
        '<span class="pg-sobre">Da estante da</span><img src="assets/img/logo-selo.png" alt="" class="pg-selo">' +
        '<span class="pg-titulo">' + esc(l.nome) + '</span><span class="pg-autor">' + esc(l.autor) + '</span>';
      raiz.querySelector('.aberto__pagina--dir').innerHTML =
        '<span class="pg-traco"></span><span class="pg-citacao">“Um café, um verso, infinitas histórias.”</span>' +
        '<span class="pg-rodape">' + esc(l.nome) + ' · ' + esc(l.autor) + '</span>';
      var meta = [l.categoria, l.editora].filter(Boolean).map(esc).join(' · ');
      raiz.querySelector('.aberto__info').innerHTML =
        '<button type="button" class="aberto__fechar" data-fechar-livro>Fechar ' + I('fechar') + '</button>' +
        '<p class="aberto__meta">' + meta + '</p>' +
        '<h3 id="' + uid + '-titulo">' + esc(l.nome) + '</h3>' +
        '<p class="aberto__autor">de ' + esc(l.autor) + '</p>' +
        '<p class="aberto__desc">' + esc(l.descricao) + '</p>' +
        (l.publico ? '<p class="aberto__publico">' + I('info') + esc(l.publico) + '</p>' : '') +
        '<p class="aberto__preco">' + (typeof l.preco === 'number' ? V.moeda(l.preco) : 'Preço: consulte na loja') + '</p>' +
        '<div class="aberto__acoes">' +
        '  <button type="button" class="btn btn--cheio" data-add="' + l.id + '">' + I('sacola') + ' Adicionar à sacola</button>' +
        '  <a class="btn btn--contorno" target="_blank" rel="noopener" href="' + V.zap('Olá, Versos na Mesa! Vocês têm disponível: ' + l.nome + ', de ' + l.autor + '?') + '">' + I('whatsapp') + ' Consultar</a>' +
        '</div>' +
        '<a class="link-seta" href="produto.html?id=' + encodeURIComponent(l.id) + '">Ver página do livro ' + I('seta') + '</a>' +
        '<p class="aberto__dica">Pressione Esc para fechar</p>';
    }

    function abrir(i) {
      if (estado !== 'estante') return;
      if (typeof i === 'number' && i !== ativo) { ativo = i; }
      limpar();
      var l = livros[ativo];
      conteudoAberto(l);
      estado = 'abrindo';
      raiz.classList.add('estante--aberta');
      posicionar();
      depois(700, function () {
        aberto.hidden = false;
        itens[ativo].classList.add('oculto');
        requestAnimationFrame(function () {
          aberto.classList.add('visivel');
          depois(60, function () { folha.classList.add('folheada'); });
          depois(520, function () { aberto.classList.add('info-visivel'); estado = 'aberto'; var f = raiz.querySelector('[data-fechar-livro]'); if (f) f.focus({ preventScroll: true }); });
        });
      });
    }

    function fechar() {
      if (estado !== 'aberto' && estado !== 'abrindo') return;
      limpar();
      estado = 'fechando';
      aberto.classList.remove('info-visivel');
      folha.classList.remove('folheada');
      depois(760, function () {
        aberto.classList.remove('visivel');
        aberto.hidden = true;
        itens[ativo].classList.remove('oculto');
        estado = 'estante';
        raiz.classList.remove('estante--aberta');
        posicionar();
        botoes[ativo].focus({ preventScroll: true });
      });
    }

    /* -------- interação -------- */
    var raf = 0, px = 0;
    palco.addEventListener('pointermove', function (e) {
      if (!ponteiroFino.matches || e.pointerType !== 'mouse' || estado !== 'estante') return;
      px = e.clientX;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = palco.getBoundingClientRect();
        var margem = r.width * 0.08;
        var t = (px - r.left - margem) / (r.width - 2 * margem);
        focar(Math.round(Math.max(0, Math.min(1, t)) * (itens.length - 1)));
      });
    });

    var toqueX = null, toqueY = null, arrastou = false;
    palco.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') return; toqueX = e.clientX; toqueY = e.clientY; arrastou = false; });
    palco.addEventListener('pointermove', function (e) {
      if (toqueX === null || e.pointerType === 'mouse' || estado !== 'estante') return;
      var dx = e.clientX - toqueX;
      if (Math.abs(dx) > 34 && Math.abs(dx) > Math.abs(e.clientY - toqueY)) {
        arrastou = true; focar(ativo + (dx < 0 ? 1 : -1)); toqueX = e.clientX;
      }
    });
    palco.addEventListener('pointerup', function () { toqueX = null; });
    palco.addEventListener('pointercancel', function () { toqueX = null; });

    fila.addEventListener('click', function (e) {
      var b = e.target.closest('.livro3d__btn'); if (!b) return;
      if (arrastou) { arrastou = false; return; }
      var i = Number(b.getAttribute('data-i'));
      if (!ponteiroFino.matches && i !== ativo) { focar(i); return; }
      abrir(i);
    });
    fila.addEventListener('keydown', function (e) {
      var mapa = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (mapa[e.key]) { e.preventDefault(); focar(ativo + mapa[e.key], true); }
      else if (e.key === 'Home') { e.preventDefault(); focar(0, true); }
      else if (e.key === 'End') { e.preventDefault(); focar(itens.length - 1, true); }
    });
    raiz.querySelectorAll('.estante__seta').forEach(function (b) {
      b.addEventListener('click', function () { if (estado === 'estante') focar(ativo + Number(b.getAttribute('data-dir'))); });
    });
    raiz.addEventListener('click', function (e) { if (e.target.closest('[data-fechar-livro]')) fechar(); });
    raiz.addEventListener('keydown', function (e) { if (e.key === 'Escape' && estado !== 'estante') { e.stopPropagation(); fechar(); } });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && (estado === 'aberto' || estado === 'abrindo') && !document.querySelector('.dialogo.aberto')) fechar();
    });
    raiz.querySelector('.estante__modo').addEventListener('click', function () {
      var noite = raiz.getAttribute('data-modo') !== 'noite';
      raiz.setAttribute('data-modo', noite ? 'noite' : 'dia');
      this.setAttribute('aria-pressed', String(noite));
    });

    /* -------- entrada em cena -------- */
    medir(); posicionar();
    var ro = new (window.ResizeObserver || function () { this.observe = function () { }; })(function () { medir(); posicionar(); });
    ro.observe(palco);
    if ('IntersectionObserver' in window && !reduzir.matches) {
      var io = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { raiz.classList.add('em-cena'); io.disconnect(); }
      }, { threshold: 0.25 });
      io.observe(raiz);
    } else raiz.classList.add('em-cena');
  }

  /* Leve inclinação 3D nas capas dos cards de livros, seguindo o cursor */
  function inclinar() {
    if (!ponteiroFino.matches || reduzir.matches) return;
    document.addEventListener('pointermove', function (e) {
      var capa = e.target.closest && e.target.closest('.produto--livro .produto__capa');
      document.querySelectorAll('.produto__capa.inclinada').forEach(function (c) { if (c !== capa) { c.classList.remove('inclinada'); c.style.transform = ''; } });
      if (!capa) return;
      var r = capa.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      capa.classList.add('inclinada');
      capa.style.transform = 'perspective(700px) rotateY(' + (x * 16).toFixed(2) + 'deg) rotateX(' + (-y * 10).toFixed(2) + 'deg) translateY(-6px)';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-estante]').forEach(montar);
    inclinar();
  });
})();
