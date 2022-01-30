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

        
        $('#ki_limpeza').html(data.StatusPrestador[0].Nome);
        var valortotal = 0.00;
        $.each(data.Atividades, function(k, v) {
            valortotal = parseFloat((valortotal + v.ValorTotal).toFixed(2).replace(",","."));
        });
        $('#ki_limpeza_total_valor').html(' R$' + valortotal + ' em ' + data.Atividades.length + ' ATV. ');
        

        FOCA.Model.Principal.getImagem(data.IdImagem, 'img-perfil');

        FOCA.Model.Login.logImediateComplete(n, data.Id);

        setInterval(function () {
            FOCA.Model.Principal.updateImediate(n);
        }, 10000);
        FOCA.Model.Principal.updateImediate(n);
    },

    functions: {

        glossario: function(n) {
            $('#inicio').html(Glossario.data[n].principal.inicio);
            $('#ki_faxina').html(Glossario.data[n].principal.ki_faxina);
            $('#meu_perfil').html(Glossario.data[n].principal.meu_perfil);
            $('#meus_pedidos').html(Glossario.data[n].principal.meus_pedidos);
            $('#meus_servicos').html(Glossario.data[n].principal.meus_servicos);
            $('#fale_conosco').html(Glossario.data[n].principal.fale_conosco);
            $('#sessao_de_servicos').html(Glossario.data[n].principal.sessao_de_servicos);
            $('#ki_limpeza_status').html(Glossario.data[n].principal.ki_faxina_status);

            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var year = dateObj.getUTCFullYear();
            $('#ki_limpeza_total').html(Glossario.data[n].principal.ki_faxina_total + ' ' + month + '/' + year);

            $('#ki_limpeza').html('');
        }
    }
}