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
| `bolos`            | Lista de bolos da galeria (nome, descrição, foto e categoria)           |

### Adicionando fotos dos bolos

1. Coloque as fotos em `assets/bolos/` (de preferência `.jpg`, proporção 4:3).
2. Em `js/config.js`, aponte o campo `foto` do bolo para o arquivo, ex.: `assets/bolos/red-velvet.jpg`.

Enquanto a foto não existir, o site mostra um cartão ilustrado no lugar.

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
