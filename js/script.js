document.addEventListener('DOMContentLoaded', function() {

    //inicializar elementos

    // inicializador button float do canto inferior direito 
    var btnAction = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(btnAction);
    
    //inicializar tabs
    var tabs = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(tabs);


    //funções

    coletarItensArquivoJson();

    function coletarItensArquivoJson()
    {
        var requisicaoComidas = new XMLHttpRequest();
        var requisicaoBebidas = new XMLHttpRequest();

        requisicaoComidas.open("GET", "itens_comidas.json", true);
        requisicaoComidas.send();

        requisicaoBebidas.open("GET", "itens_bebidas.json", true);
        requisicaoBebidas.send();

        requisicaoComidas.onreadystatechange = function() {
            if (requisicaoComidas.readyState == 4 && requisicaoComidas.status == 200) {
                var dados = JSON.parse(requisicaoComidas.response);

                carregarItensComidasCardapio(dados);
            }
            else if (requisicaoComidas.status != 200)
                alert("Erro ao carregar pratos. Tente novamente!")
        }

        requisicaoBebidas.onreadystatechange = function() {
            if (requisicaoBebidas.readyState == 4 && requisicaoBebidas.status == 200) {
                var dados = JSON.parse(requisicaoBebidas.response);

                carregarItensBebidasCardapio(dados);
            }
            else if (requisicaoBebidas.status != 200)
                alert("Erro ao carregar bebidas. Tente novamente!")
        }
        
    }

    function carregarItensComidasCardapio(pratos)
    {

        htmlPratos = '';

        for(var i = 0; i < pratos.length; i++){
            htmlPratos += construirHtmlPratos(pratos[i], i);
        }

        document.getElementById('itens_comidas').innerHTML = htmlPratos;

    }

    function carregarItensBebidasCardapio(bebidas)
    {
        htmlBebidas = '';

        for(var i = 0; i < bebidas.length; i++){
            if (bebidas[i].disponivel == 1)
                htmlBebidas += construirHtmlBebidas(bebidas[i], i);
        }

        document.getElementById('itens_bebidas').innerHTML = htmlBebidas;
    }

    function construirHtmlPratos(prato, contador)
    {
        var html = '';

        var itemLinha = ((contador+1)%2) == 0 ? 'itemPar' : 'itemPar';

        html += '<div class="wraper-linha row">';

        html += '<div class="col s5 wraper-item waves-effect waves-light itemPar">';
        html += '<span>'+prato.nome+'</span>';
        //html += '<span> <i class="fas fa-plus-circle item-add-nome-item"></i> '+prato.nome+'</span>';
        
        html += '</div>';

        html += '<div class="col s2 wraper-preco center-align '+itemLinha+'">';
        html += '<span class="preco"> '+converterMoeda(prato.precoP)+' </span>';
        html += '<div style="line-height: 12px;"><small>Tam P</small></div>';
        html += '</div>';

        html += '<div class="col s2 wraper-preco center-align '+itemLinha+'">';
        html += '<span class="preco"> '+converterMoeda(prato.precoM)+' </span>';
        html += '<div style="line-height: 12px;"><small>Tam M</small></div>';
        html += '</div>';

        html += '<div class="col s2 wraper-preco center-align '+itemLinha+'">';
        html += '<span class="preco"> '+converterMoeda(prato.precoG)+' </span>';
        html += '<div style="line-height: 12px;"><small>Tam G</small></div>';

        html += '</div>';

        html += '</div>';


        return html;
    }

    function construirHtmlBebidas(bebida)
    {
        html = '';
        html += '<div class="wraper-linha row">';

        html += '<div class="col s7 wraper-item itemPar wraper-item waves-effect waves-light">';
        html += '<span>'+bebida.nome+'</span>';
        html += '</div>';

        html += '<div class="col s2 offset-s2 wraper-preco center-align itemPar" style="padding-top: 6px; padding-bottom: 6px">';
        html += '<span class="preco">'+converterMoeda(bebida.preco)+'</span>';
        html += '</div>';

        html += '</div>';

        return html;
    }

    function converterMoeda(valor)
    {
        var valorMoeda = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

        return valorMoeda;
    }

});