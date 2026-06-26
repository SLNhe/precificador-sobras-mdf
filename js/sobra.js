const larguraChapa = 1850;
const comprimentoChapa = 2750;

let textoFinal = "";

function setLucro(valor) {
    document.getElementById("porcentagemLucro").value = valor;
}

function calcular() {

    let nome = document.getElementById("nomeMDF").value;
    let valorChapa = parseFloat(document.getElementById("valorMDF").value);
    let larguraSobra = parseFloat(document.getElementById("larguraSOBRA").value);
    let comprimentoSobra = parseFloat(document.getElementById("comprimentoSOBRA").value);
    let lucro = parseFloat(document.getElementById("porcentagemLucro").value) || 0;

    if (isNaN(valorChapa) || isNaN(larguraSobra) || isNaN(comprimentoSobra)) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    let areaChapa = larguraChapa * comprimentoChapa;
    let areaSobra = larguraSobra * comprimentoSobra;

    if (areaSobra > areaChapa) {
        alert("A sobra não pode ser maior que a chapa!");
        return;
    }

    let valorSobra = (areaSobra / areaChapa) * valorChapa;
    valorSobra = valorSobra + (valorSobra * (lucro / 100));

    let valorFormatado = valorSobra.toFixed(2).replace(".", ",");

    document.getElementById("resNome").innerText = "Nome: " + (nome || "Não informado");
    document.getElementById("resValor").innerText = "Valor: R$ " + valorFormatado;

    textoFinal = `🪵 Orçamento de sobra de MDF

Material: ${nome || "Não informado"}
Medidas: ${larguraSobra}mm x ${comprimentoSobra}mm
Valor: R$ ${valorFormatado}

⚙️ Gerado por MDF Precificador`;

    let box = document.getElementById("resultadoBox");
    box.style.display = "block";
    box.scrollIntoView({ behavior: "smooth" });

    document.getElementById("btnCalcular").innerText = "Gerar Novamente";
}

function copiar() {
    if(!textoFinal){
        alert("Gere o cálculo primeiro!");
        return;
    }
    navigator.clipboard.writeText(textoFinal);
    alert("Copiado!");
}

function enviarWhats() {
    if(!textoFinal){
        alert("Gere o cálculo primeiro!");
        return;
    }
    let url = `https://wa.me/?text=${encodeURIComponent(textoFinal)}`;
    window.open(url, "_blank");
}