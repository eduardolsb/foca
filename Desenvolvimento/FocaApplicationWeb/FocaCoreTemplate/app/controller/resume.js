FOCA.Controller.Resume = {

    load: function (n) {

        FOCA.Controller.Resume.functions.glossario(n);

        var core = localStorage.getItem('foca-core');
        var data = JSON.parse(core);

        //$('#img-perfil').attr('style', '' + core.);
        $('#txt-nome-perfil').html(data.Nome);

        FOCA.Model.Resume.getImagem(data.IdImagem, 'img-perfil');

        if (data.Cartao.length > 0) {

            if (data.Cartao[0].InfoAdd == 1) {
                //VISA
                $('#bandeira-cartao').attr('style', 'width: 70px; height: 40px; float: left; background: #fff url(images/visa.jpg) center center no-repeat;background-size:contain');
            }
            if (data.Cartao[0].InfoAdd == 2) {
                //MASTER
                $('#bandeira-cartao').attr('style', 'width: 70px; height: 40px; float: left; background: #fff url(images/master.jpg) center center no-repeat;background-size:contain');
            }
            if (data.Cartao[0].InfoAdd == 3) {
                //AMEX
                $('#bandeira-cartao').attr('style', 'width: 70px; height: 40px; float: left; background: #fff url(images/amex.jpg) center center no-repeat;background-size:contain');
            }

            $('#cartao-content').html("****" + data.Cartao[0].NumeroCartao.substr((data.Cartao[0].NumeroCartao.length - 4), 4));

        } else {
            $('#panel-card-exhibition').remove();
            $('#panel-newcard-exhibition').show(200);
        }
        
        $('#btn-continuar').off('click').on('click', function () {
            var bairro = $('#cb-bairro').val(),
                endereco = $('#txt-endereco').val(),
                //genero = $('#cb-genero').val(),
                data = $('#txt-data').val(),
                hora = $('#txt-hora').val();

            var periodicidade = document.querySelector('input[name="ck-periodicidade"]:checked').value;
            
            if (FOCA.Methods.isEmpty(data)) {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_uma_data);
                return;
            }
            if (FOCA.Methods.isEmpty(hora)) {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_uma_hora);
                return;
            }
            if (FOCA.Methods.isEmpty(endereco)) {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_endereco);
                return;
            }
            if (bairro == "0") {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_bairro);
                return;
            }

            //FOCA.Model.Finalizacao.setDemanda(n, uidpedido, bairro, endereco, genero, data, hora);
            FOCA.Model.Finalizacao.setDemanda(n, uidpedido, bairro, endereco, data, hora, periodicidade);
        });

        var uidpedido = localStorage.getItem('foca-uidpedido');

        FOCA.Model.Resume.getPedido(uidpedido);
    },

    functions: {

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