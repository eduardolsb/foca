FOCA.Controller.Principal = {

    load: function (n) {

        FOCA.Controller.Principal.functions.glossario(n);

        var core = localStorage.getItem('foca-core');
        if (core == null) {
            FOCA.Model.Login.logImediate(n);
            return;
        }
        var data = JSON.parse(core);

        console.log(data);

        //$('#img-perfil').attr('style', '' + core.);
        $('#txt-nome-perfil').html(data.Nome);

        FOCA.Model.Principal.getImagem(data.IdImagem, 'img-perfil');

        setInterval(function() {
            FOCA.Model.Principal.updateImediate(n);
        }, 10000);
        FOCA.Model.Principal.updateImediate(n);

        clienteid(data.Id);
    },

    functions: {

        ratting: function (idpedido, value) {
            FOCA.Model.Principal.setRatting(idpedido, value, "Cliente");
        },

        glossario: function(n) {
            $('#inicio').html(Glossario.data[n].principal.inicio);
            $('#ki_faxina').html(Glossario.data[n].principal.ki_faxina);
            $('#ki_limpeza').html(Glossario.data[n].principal.ki_faxina);
            $('#meu_perfil').html(Glossario.data[n].principal.meu_perfil);
            $('#meus_pedidos').html(Glossario.data[n].principal.meus_pedidos);
            $('#meus_servicos').html(Glossario.data[n].principal.meus_servicos);
            $('#fale_conosco').html(Glossario.data[n].principal.fale_conosco);
            $('#sessao_de_servicos').html(Glossario.data[n].principal.sessao_de_servicos);
        }
    }
}