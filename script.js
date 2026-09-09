// ==========================================
// GRÁFICO CANVAS - JOTA STYLE
// ==========================================

// Localiza o elemento Canvas no HTML
const canvas = document.getElementById("grafico-produtos");

function ajustarCanvas() {
    const escala = window.devicePixelRatio || 1;
    const largura = canvas.clientWidth || 600;
    const altura = largura * (350 / 600);
    const fator = largura / 600;

    canvas.width = Math.round(largura * escala);
    canvas.height = Math.round(altura * escala);
    ctx.setTransform(escala * fator, 0, 0, escala * fator, 0, 0);
    canvas.larguraVisual = largura;
    canvas.alturaVisual = altura;
}

// Obtém o contexto 2D para realizar os desenhos
const ctx = canvas.getContext("2d");


// ==========================================
// DADOS DOS PRODUTOS
// ==========================================

const produtos = [
    {
        nome: "Camiseta",
        valor: 80
    },
    {
        nome: "Calça Jeans",
        valor: 65
    },
    {
        nome: "Moletom",
        valor: 90
    },
    {
        nome: "Tênis",
        valor: 70
    }
];


// ==========================================
// CONFIGURAÇÕES DO GRÁFICO
// ==========================================

const larguraBarra = 80;
const espaco = 55;

const baseGrafico = 280;

const alturaMaxima = 200;

let animacao = 0;


// ==========================================
// FUNÇÃO PARA DESENHAR O GRÁFICO
// ==========================================

function desenharGrafico() {

    // Limpa o Canvas antes de desenhar o próximo frame.
    // Isso evita o acúmulo visual.
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ------------------------------------------
    // TÍTULO
    // ------------------------------------------

    ctx.font = "bold 20px Arial";

    ctx.fillStyle = "#111111";

    ctx.fillText(
        "Popularidade dos produtos",
        20,
        35
    );


    // ------------------------------------------
    // EIXO DO GRÁFICO
    // ------------------------------------------

    ctx.beginPath();

    ctx.moveTo(40, 60);

    ctx.lineTo(40, baseGrafico);

    ctx.lineTo(570, baseGrafico);

    ctx.strokeStyle = "#333333";

    ctx.stroke();


    // ------------------------------------------
    // DESENHA CADA BARRA
    // ------------------------------------------

    produtos.forEach((produto, index) => {

        const x =
            70 +
            index * (larguraBarra + espaco);

        const altura =
            (produto.valor / 100) *
            alturaMaxima *
            animacao;

        const y =
            baseGrafico - altura;


            // Barra
            const cores = ["#d6a63c", "#1f6fbb", "#2f8dcc", "#e0b84f"];
            ctx.fillStyle = cores[index];

        ctx.fillRect(
            x,
            y,
            larguraBarra,
            altura
        );


        // --------------------------------------
        // VALOR DA BARRA
        // --------------------------------------

        ctx.font = "bold 14px Arial";

        ctx.fillStyle = "#102a43";

        ctx.textAlign = "center";

        ctx.fillText(
            `${Math.round(produto.valor * animacao)}%`,
            x + larguraBarra / 2,
            y - 10
        );


        // --------------------------------------
        // NOME DO PRODUTO
        // --------------------------------------

        ctx.font = "14px Arial";

        ctx.fillStyle = "#5d7184";

        ctx.fillText(
            produto.nome,
            x + larguraBarra / 2,
            baseGrafico + 25
        );

    });


    // ------------------------------------------
    // ANIMAÇÃO
    // ------------------------------------------

    if (animacao < 1) {

        animacao += 0.02;

        requestAnimationFrame(
            desenharGrafico
        );

    }

}


// ==========================================
// INICIA O GRÁFICO
// ==========================================

ajustarCanvas();
desenharGrafico();

window.addEventListener("resize", () => {
    ajustarCanvas();
    animacao = 1;
    desenharGrafico();
});
