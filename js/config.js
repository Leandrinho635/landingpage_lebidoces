/* =========================================================
   CONFIGURAÇÕES DO SITE — edite apenas este arquivo
   ========================================================= */
window.LEBI_CONFIG = {
  // Número do WhatsApp no formato internacional, SOMENTE dígitos:
  // 55 (Brasil) + DDD + número.  Ex.: (11) 98765-4321 -> "5511987654321"
  whatsappNumero: "554184061812",

  // Mensagem que já aparece escrita quando o cliente abre a conversa
  whatsappMensagem: "Olá, LeBi Doces! Vim pelo site e gostaria de fazer uma encomenda 🍰",

  instagram: "lebi_doces",

  // Catálogo de bolos exibido na galeria.
  // Coloque as fotos/vídeos em assets/bolos/ (nomes sem espaços e sem acentos).
  // Cada bolo tem uma lista "midias"; com mais de uma, o cartão vira um carrossel.
  //   tipo:  "foto" ou "video"
  //   src:   caminho do arquivo
  //   foco:  (opcional) ponto da imagem que deve ficar visível no recorte,
  //          "horizontal vertical" em %. Ex.: "50% 70%" = centro, mais para baixo.
  // Se um arquivo não existir, um cartão ilustrado é exibido no lugar.
  bolos: [
    {
      nome: "Ninho com Morango",
      descricao: "Bolo coberto com chantilly, bordas decoradas e morangos frescos por cima.",
      categoria: "Festa",
      midias: [
        { tipo: "foto", src: "assets/bolos/ninho-morango.jpeg", foco: "50% 45%" }
      ]
    },
    {
      nome: "Bolo de Prestígio",
      descricao: "Massa de chocolate, recheio cremoso de coco e cobertura de chocolate. Pode ser decorado para aniversários.",
      categoria: "Aniversário",
      midias: [
        { tipo: "foto", src: "assets/bolos/prestigio-aniversario.jpeg", foco: "50% 65%" },
        { tipo: "foto", src: "assets/bolos/prestigio.jpeg", foco: "55% 55%" }
      ]
    },
    {
      nome: "Bolo de Pote de Prestígio",
      descricao: "Camadas de massa de chocolate e creme de coco no pote, perfeito para presentear.",
      categoria: "Individual",
      midias: [
        { tipo: "foto", src: "assets/bolos/pote-prestigio.jpeg", foco: "50% 55%" }
      ]
    },
    {
      nome: "Bolo de Cenoura com Chocolate",
      descricao: "O clássico caseiro: massa de cenoura fofinha com cobertura de chocolate.",
      categoria: "Caseiro",
      midias: [
        { tipo: "foto", src: "assets/bolos/cenoura-chocolate.jpeg", foco: "70% 65%" },
        { tipo: "video", src: "assets/bolos/cenoura-chocolate.mp4" }
      ]
    },
    {
      nome: "Bolo com Calda Quente de Chocolate",
      descricao: "Massa de chocolate molhadinha com calda quente de chocolate por cima.",
      categoria: "Caseiro",
      midias: [
        { tipo: "foto", src: "assets/bolos/calda-quente-chocolate.jpeg", foco: "50% 75%" }
      ]
    }
  ]
};
