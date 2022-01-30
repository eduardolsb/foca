FOCA.Model.Finalizacao = {

    setDemanda: function (n, uidpedido, bairro, endereco, genero, data, hora) {

        $('#btn-continuar').attr('disabled', 'disabled');
        $('#btn-continuar').val('Enviando...');

            $.ajax({
                type: "POST",
                timeout: 120000,
                async: true,
                url: FOCA.Structure.url + "/SetDemandaKiLimpezaOK",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    uidpedido:uidpedido, 
                    bairro:bairro, 
                    endereco:endereco, 
                    genero:genero, 
                    data:data, 
                    hora: hora
                }),
                success: function (result) {
                    var retorno = result.d;
                    
                    window.location.href = 'orders.html';
                    return true;
                },
                error: function (x) {
                    FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);
                }
            });

        return false;
    },

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
    }

}