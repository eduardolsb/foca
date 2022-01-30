FOCA.Model.Principal = {

    logImediate: function (n) {

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

                    window.location.href = 'principal.html';
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
    },

    updateImediate: function (n) {

        var confirmacao = localStorage.getItem('foca-core');

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
                success: function (result) {
                    var retorno = result.d;

                    localStorage.setItem('foca-core', JSON.stringify(retorno));

                    console.log(retorno);

                    if (retorno.AprovacaoPrestador.length > 0) {
                        
                        $('#panel-chamada').show(500);

                        $('#btn-aceitar').off('click').on('click', function() {
                            FOCA.Model.Principal.setAction(retorno.AprovacaoPrestador[0].Id, "1");
                        });
                        $('#btn-recusar').off('click').on('click', function () {
                            FOCA.Model.Principal.setAction(retorno.AprovacaoPrestador[0].Id, "2");
                        });
                    } else {
                        $('#panel-chamada').hide();
                    }

                    return true;
                },
                error: function (x) {
                    FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);
                }
            });
        }
        return false;
    },

    setAction: function (id, atc) {
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/SetAction",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                id: id,
                atc: atc
            }),
            success: function (result) {
                var retorno = result.d;

                localStorage.setItem('foca-gridorders', JSON.stringify(retorno));

                location.href = 'principal.html';
            },
            error: function (x) {
                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);
            }
        });

        return true;
    }
}