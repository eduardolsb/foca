FOCA.Controller.Finalizacao = {

    load: function (n) {

        FOCA.Controller.Finalizacao.functions.glossario(n);

        var core = localStorage.getItem('foca-core');
        var data = JSON.parse(core);

        //$('#img-perfil').attr('style', '' + core.);
        $('#txt-nome-perfil').html(data.Nome);

        FOCA.Model.Finalizacao.getImagem(data.IdImagem, 'img-perfil');

        $('#txt-hora').mask('99:99');

        var uidpedido = localStorage.getItem('foca-uidpedido');
        var valor = localStorage.getItem('foca-pedido-valor');
        var horas = localStorage.getItem('foca-pedido-horas');

        $('#total-horas').html(horas);
        $('#total-reais').html(valor);

        $('#btn-continuar').off('click').on('click',function () {
            var bairro = $('#cb-bairro').val(),
                endereco = $('#txt-endereco').val(),
                genero = $('#cb-genero').val(),
                data = $('#txt-data').val(),
                hora = $('#txt-hora').val();

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

            FOCA.Model.Finalizacao.setDemanda(n, uidpedido, bairro, endereco, genero, data, hora);
        });
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