FOCA.Model.Finalizacao = {

    getEndereco: function() {

        var core = localStorage.getItem('foca-core');
        if (core == null) {
            alert("Usuário não identificado");
            return;
        }
        var data = JSON.parse(core);

        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/GetEndereco",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                idcliente: data.Id
            }),
            success: function(result) {
                var retorno = result.d;

                if (retorno.Resultado == "1") {

                    FOCA.Controller.Finalizacao.functions.getEndereco(retorno);
                }

                return true;
            },
            error: function(x) {
                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);
            }
        });
    },

    addEndereco: function() {
        if ($('#cb-bairro').val() == "0") {
            alert("Precisa selecionar uma região");
            return;
        }
        if (FOCA.Methods.isEmpty($('#txt-endereco').val())) {
            FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_endereco);
            return;
        }
        if (FOCA.Methods.isEmpty($('#txt-endereco-nome').val())) {
            FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_nome_de_endereco);
            return;
        }

        var core = localStorage.getItem('foca-core');
        if (core == null) {
            alert("Usuário não identificado");
            return;
        }
        var data = JSON.parse(core);

        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/AddEndereco",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                idcliente: data.Id,
                complemento: $('#cb-bairro').val(),
                endereco: $('#txt-endereco').val(),
                nome: $('#txt-endereco-nome').val()
            }),
            success: function(result) {
                var retorno = result.d;

                if (retorno.Resultado == "1") {

                    $('#div-panel-nome-endereco').attr('name', "0");
                    $('#div-panel-completed-adreess').fadeOut();
                    setTimeout(function() {
                        $('#div-panel-related-address').fadeIn();
                    }, 500);

                    FOCA.Controller.Finalizacao.functions.getEndereco(retorno);
                }

                return true;
            },
            error: function(x) {
                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);
            }
        });
    },

    setDemanda: function(n, uidpedido, bairro, endereco, data, hora, periodicidade) {

        $('#btn-continuar').attr('disabled', 'disabled');
        $('#btn-continuar').val('Enviando...');

        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/SetDemandaKiLimpezaOK",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                uidpedido: uidpedido,
                bairro: bairro,
                endereco: endereco,
                data: data,
                hora: hora,
                periodicidade: periodicidade
            }),
            success: function(result) {
                var retorno = result.d;

                window.location.href = 'resume.html';
                return true;
            },
            error: function(x) {
                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);
            }
        });

        return false;
    },

    logImediate: function(n) {

        var confirmacao = localStorage.getItem('foca_codigo_confirmacao');

        if (confirmacao != null) {
            var data = JSON.parse(confirmacao);

            $.ajax({
                type: "POST",
                timeout: 120000,
                async: true,
                url: FOCA.Structure.url + "/LogImediate",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    id: data.Id
                }),
                success: function(result) {
                    var retorno = result.d;

                    if (retorno.Resultado == "0") {
                        FOCA.Controller.Login.load(n);
                        return false;
                    }

                    localStorage.setItem('foca-core', JSON.stringify(retorno));

                    window.location.href = 'kifaxina.html';
                    return true;
                },
                error: function(x) {
                    FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);

                    FOCA.Controller.Login.load(n);
                }
            });
        } else {
            FOCA.Controller.Login.load(n);
        }
        return false;
    },

    getImagem: function(n, elemento) {
        if (n != null) {

            var imagem = localStorage.getItem('foca_imagem_perfil_' + n);
            if (imagem != null) {

                $('#' + elemento).attr('src', imagem);

            } else {

                $.ajax({
                    type: "POST",
                    timeout: 120000,
                    async: true,
                    url: FOCA.Structure.url + "/GetImagem",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        id: n
                    }),
                    success: function(result) {
                        var retorno = result.d;

                        if (retorno.Retorno != "0") {
                            $('#' + elemento).attr('src', retorno.Imagem);

                            localStorage.setItem('foca_imagem_perfil_' + n, retorno.Imagem);
                        }

                        return true;
                    },
                    error: function(x) {

                    }
                });
            }
        }
    }

}
