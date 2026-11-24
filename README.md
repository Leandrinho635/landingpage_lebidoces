# LeBi Doces 🎂

Landing page de apresentação dos bolos artesanais da **LeBi Doces**.

Site estático (HTML, CSS e JavaScript puros) — não precisa de instalação nem de build.

## Como visualizar

Basta abrir o arquivo `index.html` no navegador.

## Configuração

Tudo que muda com frequência fica em [`js/config.js`](js/config.js):

| Campo              | O que é                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `whatsappNumero`   | Número do WhatsApp, só dígitos, com 55 + DDD. Ex.: `5511987654321`      |
| `whatsappMensagem` | Mensagem que já vem escrita quando o cliente abre a conversa            |
| `instagram`        | Usuário do Instagram (sem @)                                            |
| `bolos`            | Lista de bolos da galeria (nome, descrição, categoria e mídias)         |

### Adicionando fotos e vídeos dos bolos

1. Coloque os arquivos em `assets/bolos/` (nomes sem espaços e sem acentos, ex.: `ninho-morango.jpeg`).
2. Em `js/config.js`, adicione cada arquivo à lista `midias` do bolo:
   `{ tipo: "foto", src: "assets/bolos/ninho-morango.jpeg", foco: "50% 45%" }` ou `{ tipo: "video", src: "assets/bolos/bolo.mp4" }`.
3. Com mais de uma mídia, o cartão vira um carrossel (setas, bolinhas e arrastar no celular).

As fotos são recortadas em formato quadrado. Use `foco` ("horizontal vertical" em %) para escolher
qual parte da foto fica visível. Enquanto um arquivo não existir, o site mostra um cartão ilustrado no lugar.

## Botão do WhatsApp

Os botões usam a API pública **Click to Chat** do WhatsApp (`https://wa.me/<numero>?text=<mensagem>`):
no celular abre o aplicativo e no computador abre o WhatsApp Web/Desktop, já na conversa com a LeBi Doces.
Cada bolo da galeria tem um botão "Quero esse!" que já envia o nome do bolo na mensagem.

## Estrutura

```
index.html
css/style.css
js/config.js   ← configurações (número, mensagens, bolos)
js/main.js
assets/img/logo.png
assets/bolos/  ← fotos dos bolos
```

## Publicação

Por ser estático, pode ser hospedado gratuitamente no GitHub Pages, Netlify ou Vercel.
