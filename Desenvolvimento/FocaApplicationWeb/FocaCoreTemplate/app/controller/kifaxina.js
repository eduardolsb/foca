FOCA.Controller.Kifaxina = {

    ValueTotalHora: 2,

    load: function (n) {

        FOCA.Controller.Kifaxina.functions.glossario(n);

        var core = localStorage.getItem('foca-core');
        var data = JSON.parse(core);

        //$('#img-perfil').attr('style', '' + core.);
        $('#txt-nome-perfil').html(data.Nome);

        FOCA.Model.Kifaxina.getImagem(data.IdImagem, 'img-perfil');

        $('#c1-plus').off('click').on('click', function () { var c = parseInt($('#c1').val()); c = (c >= 0 && c < 9) ? (c + 1) : (c); $('#c1').val(c); FOCA.Controller.Kifaxina.functions.total(); });
        $('#c1-less').off('click').on('click', function () { var c = parseInt($('#c1').val()); c = (c > 0) ? (c - 1) : (c); $('#c1').val(c); FOCA.Controller.Kifaxina.functions.total(); });

        $('#c2-plus').off('click').on('click', function () { var c = parseInt($('#c2').val()); c = (c >= 0 && c < 9) ? (c + 1) : (c); $('#c2').val(c); FOCA.Controller.Kifaxina.functions.total(); });
        $('#c2-less').off('click').on('click', function () { var c = parseInt($('#c2').val()); c = (c > 0) ? (c - 1) : (c); $('#c2').val(c); FOCA.Controller.Kifaxina.functions.total(); });

        $('#c3-plus').off('click').on('click', function () { var c = parseInt($('#c3').val()); c = (c >= 0 && c < 9) ? (c + 1) : (c); $('#c3').val(c); FOCA.Controller.Kifaxina.functions.total(); });
        $('#c3-less').off('click').on('click', function () { var c = parseInt($('#c3').val()); c = (c > 0) ? (c - 1) : (c); $('#c3').val(c); FOCA.Controller.Kifaxina.functions.total(); });

        $('#c1-hora-plus').off('click').on('click', function () {
            if (FOCA.Controller.Kifaxina.ValueTotalHora < 9) {
                FOCA.Controller.Kifaxina.ValueTotalHora = (FOCA.Controller.Kifaxina.ValueTotalHora + 1);
                FOCA.Controller.Kifaxina.functions.total();
            } else {
                FOCA.Methods.setFocaMSG('Não recomendamos exceder o período superior de ' + FOCA.Controller.Kifaxina.ValueTotalHora + ' horas para este serviço.');
            }
        });
        $('#c1-hora-less').off('click').on('click', function () {
            if (FOCA.Controller.Kifaxina.ValueTotalHora > 2) {
                FOCA.Controller.Kifaxina.ValueTotalHora = (FOCA.Controller.Kifaxina.ValueTotalHora - 1);
                FOCA.Controller.Kifaxina.functions.total();
            } else {
                FOCA.Methods.setFocaMSG('Não recomendamos reduzir o período inferior a ' + FOCA.Controller.Kifaxina.ValueTotalHora + ' horas para este serviço.');
            }
        });

        $('#txt-lavar-armarios').off('click').on('click', function () {
            if ($('#txt-lavar-armarios').attr('name') == "0") {
                $('#txt-lavar-armarios').attr('name', "1");
                //$('#txt-lavar-armarios').attr('style', 'opacity:0.2;width: 130px;');
                $('#txt-lavar-armarios').attr('src', 'images/lavar-armarios_h.png');
            } else {
                $('#txt-lavar-armarios').attr('name', "0");
                $('#txt-lavar-armarios').attr('style', 'width: 130px;');
                $('#txt-lavar-armarios').attr('src', 'images/lavar-armarios.png');
            }
            FOCA.Controller.Kifaxina.functions.total();
        });
        //$('#txt-lavar-geladeira').val();
        $('#txt-lavar-geladeira').off('click').on('click', function () {
            if ($('#txt-lavar-geladeira').attr('name') == "0") {
                $('#txt-lavar-geladeira').attr('name', "1");
                //$('#txt-lavar-geladeira').attr('style', 'opacity:0.2;width: 130px;');
                $('#txt-lavar-geladeira').attr('src', 'images/lavar-geladeira_h.png');
            } else {
                $('#txt-lavar-geladeira').attr('name', "0");
                $('#txt-lavar-geladeira').attr('style', 'width: 130px;');
                $('#txt-lavar-geladeira').attr('src', 'images/lavar-geladeira.png');
            }
            FOCA.Controller.Kifaxina.functions.total();
        });
        //$('#txt-lavar-louca').val();
        $('#txt-lavar-louca').off('click').on('click', function () {
            if ($('#txt-lavar-louca').attr('name') == "0") {
                $('#txt-lavar-louca').attr('name', "1");
                //$('#txt-lavar-louca').attr('style', 'opacity:0.2;width: 130px;');
                $('#txt-lavar-louca').attr('src', 'images/lavar-louca_h.png');
            } else {
                $('#txt-lavar-louca').attr('name', "0");
                $('#txt-lavar-louca').attr('style', 'width: 130px;');
                $('#txt-lavar-louca').attr('src', 'images/lavar-louca.png');
            }
            FOCA.Controller.Kifaxina.functions.total();
        });
        //$('#txt-lavar-cozinha').val();
        $('#txt-lavar-cozinha').off('click').on('click', function () {
            if ($('#txt-lavar-cozinha').attr('name') == "0") {
                $('#txt-lavar-cozinha').attr('name', "1");
                //$('#txt-lavar-cozinha').attr('style', 'opacity:0.2;width: 130px;');
                $('#txt-lavar-cozinha').attr('src', 'images/lavar-utencilios-cozinha_h.png');
            } else {
                $('#txt-lavar-cozinha').attr('name', "0");
                $('#txt-lavar-cozinha').attr('style', 'width: 130px;');
                $('#txt-lavar-cozinha').attr('src', 'images/lavar-utencilios-cozinha.png');
            }
            FOCA.Controller.Kifaxina.functions.total();
        });
        //$('#txt-lavar-fogao').val();
        $('#txt-lavar-fogao').off('click').on('click', function () {
            if ($('#txt-lavar-fogao').attr('name') == "0") {
                $('#txt-lavar-fogao').attr('name', "1");
                //$('#txt-lavar-fogao').attr('style', 'opacity:0.2;width: 130px;');
                $('#txt-lavar-fogao').attr('src', 'images/lavar-utencilios-fogao_h.png');
            } else {
                $('#txt-lavar-fogao').attr('name', "0");
                $('#txt-lavar-fogao').attr('style', 'width: 130px;');
                $('#txt-lavar-fogao').attr('src', 'images/lavar-utencilios-fogao.png');
            }
            FOCA.Controller.Kifaxina.functions.total();
        });
        //$('#txt-passar').val();
        $('#txt-passar').off('click').on('click', function () {
            if ($('#txt-passar').attr('name') == "0") {
                $('#txt-passar').attr('name', "1");
                //$('#txt-passar').attr('style', 'opacity:0.2;width: 130px;');
                $('#txt-passar').attr('src', 'images/passar-roupa_h.png');
            } else {
                $('#txt-passar').attr('name', "0");
                $('#txt-passar').attr('style', 'width: 130px;');
                $('#txt-passar').attr('src', 'images/passar-roupa.png');
            }
            FOCA.Controller.Kifaxina.functions.total();
        });

        $('#com_materiais').off('click').on('click', function () {
            $('#com_materiais').attr('style', 'float: left; color: #1cc7c4');
            $('#com_materiais').attr('name', '1');
            $('#sem_materiais').attr('style', 'float: right;');
            $('#sem_materiais').attr('name', '0');
            FOCA.Controller.Kifaxina.functions.total();
        });

        $('#sem_materiais').off('click').on('click', function () {
            $('#com_materiais').attr('style', 'float: left;');
            $('#com_materiais').attr('name', '0');
            $('#sem_materiais').attr('style', 'float: right; color: #1cc7c4');
            $('#sem_materiais').attr('name', '1');
            FOCA.Controller.Kifaxina.functions.total();
        });

        FOCA.Controller.Kifaxina.functions.total();
        
        $('#btn-continuar').off('click').on('click', function () {

           FOCA.Model.Kifaxina.setDemanda(n, data, $('#total-horas').html(),  $('#total-reais').html(), $('#com_materiais').attr('name'), $('#c1').val(), $('#c2').val(), $('#c3').val(),
                $('#txt-lavar-armarios').attr('name'), $('#txt-lavar-geladeira').attr('name'), $('#txt-lavar-louca').attr('name'), 
                /*$('#txt-lavar-cozinha').attr('name')*/ "0", /*$('#txt-lavar-fogao').attr('name')*/ "0", $('#txt-passar').attr('name'));

        });

        $('#div-style-cama').off('click').on('click', function() {
            FOCA.Methods.setFocaMSG('Representa a quantidade de quartos');
        });
        $('#div-style-banheira').off('click').on('click', function () {
            FOCA.Methods.setFocaMSG('Representa a quantidade de banheiros');
        });
        $('#div-style-lustre').off('click').on('click', function () {
            FOCA.Methods.setFocaMSG('Representa a quantidade de salas');
        });
    },

    functions: {

        total: function() {
            var valor = 0;
            var horas = FOCA.Controller.Kifaxina.ValueTotalHora;

            valor = (horas * 25);

            //R$200 - SE TIVER QUE ENVIAR MATERIAL
            valor += (($('#com_materiais').attr('name') === "1") ? 200 : 0);
            horas += (($('#com_materiais').attr('name') === "1") ? 0 : 0);

            //R$30 - PARA CADA QUARTO
            valor += (parseInt($('#c1').val()) * 30); 
            horas += (parseInt($('#c1').val()) * 0.3);

            valor += (parseInt($('#c2').val()) * 50);
            horas += (parseInt($('#c2').val()) * 0.4);

            valor += (parseInt($('#c3').val()) * 60);
            horas += (parseInt($('#c3').val()) * 1.3);

            // SERVIÇOS ADICIONAIS
            valor += (($('#txt-lavar-armarios').attr('name') === "1") ? 30 : 0);
            horas += (($('#txt-lavar-armarios').attr('name') === "1") ? 0.2 : 0);

            valor += (($('#txt-lavar-geladeira').attr('name') === "1") ? 30 : 0);
            horas += (($('#txt-lavar-geladeira').attr('name') === "1") ? 0.3 : 0);

            valor += (($('#txt-lavar-louca').attr('name') === "1") ? 40 : 0);
            horas += (($('#txt-lavar-louca').attr('name') === "1") ? 0.3 : 0);

            valor += (($('#txt-lavar-cozinha').attr('name') === "1") ? 60 : 0);
            horas += (($('#txt-lavar-cozinha').attr('name') === "1") ? 0.4 : 0);

            valor += (($('#txt-lavar-fogao').attr('name') === "1") ? 20 : 0);
            horas += (($('#txt-lavar-fogao').attr('name') === "1") ? 0.2 : 0);

            valor += (($('#txt-passar').attr('name') === "1") ? 70 : 0);
            horas += (($('#txt-passar').attr('name') === "1") ? 2.0 : 0);

            $('#total-horas').html(horas.toFixed(2));
            $('#total-reais').html(valor.toFixed(2));

            if ($('#c1').val() > 0) {
                $('#div-style-cama').attr('style', 'width: 80px; height: 80px; border-radius: 50%; background: #cfd3f4 url(images/cama.png) center center no-repeat; background-size: 60%; margin: auto;');
            } else {
                $('#div-style-cama').attr('style', 'width: 80px; height: 80px; border-radius: 50%; background: #fff url(images/cama.png) center center no-repeat; background-size: 60%; margin: auto;');
            }

            if ($('#c2').val() > 0) {
                $('#div-style-banheira').attr('style', 'width: 80px; height: 80px; border-radius: 50%; background: #cfd3f4 url(images/banheira.png) center center no-repeat; background-size: 60%; margin: auto;');
            } else {
                $('#div-style-banheira').attr('style', 'width: 80px; height: 80px; border-radius: 50%; background: #fff url(images/banheira.png) center center no-repeat; background-size: 60%; margin: auto;');
            }

            if ($('#c3').val() > 0) {
                $('#div-style-lustre').attr('style', 'width: 80px; height: 80px; border-radius: 50%; background: #cfd3f4 url(images/lustre.png) center center no-repeat; background-size: 60%; margin: auto;');
            } else {
                $('#div-style-lustre').attr('style', 'width: 80px; height: 80px; border-radius: 50%; background: #fff url(images/lustre.png) center center no-repeat; background-size: 60%; margin: auto;');
            }

            console.log(horas);
            console.log(valor);

            return true;
        },

        glossario: function(n) {
            $('#inicio').html(Glossario.data[n].principal.inicio);
            $('#ki_faxina').html(Glossario.data[n].principal.ki_faxina);
            $('#ki_limpeza').html(Glossario.data[n].principal.ki_faxina);
            $('#meu_perfil').html(Glossario.data[n].principal.meu_perfil);
            $('#meus_pedidos').html(Glossario.data[n].principal.meus_pedidos);
            $('#meus_servicos').html(Glossario.data[n].principal.meus_servicos);
            $('#fale_conosco').html(Glossario.data[n].principal.fale_conosco);
            $('#txt_ki_faxina').html(Glossario.data[n].kifaxina.kifaxina);
        }
    }
}