FOCA.Model.Orders = {


    setRatting: function (idpedido, value, tipo) {

        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/SetRatting",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                idpedido: idpedido,
                tipocliente: tipo,
                value: value
            }),
            success: function (result) {
                var retorno = result.d;

                alert('Enviado com sucesso');

                location.href = 'orders.html';
            },
            error: function (x) {
                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);
            }
        });

        return true;
    },

    getOrders: function(n, data) {
        
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/GetOrders",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                id: data.Id
            }),
            success: function (result) {
                var retorno = result.d;

                localStorage.setItem('foca-gridorders', JSON.stringify(retorno));

                FOCA.Controller.Orders.functions.total(true);
            },
            error: function (x) {
                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);

                FOCA.Controller.Login.load(n);
            }
        });

        return true;
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
                            //$('#' + elemento).attr('style', 'background: #555 url(' + retorno.Imagem + '); background-size:cover ; border-radius: 50%; width: 100px; height: 100px;');
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

    getImagemList: function (n, elemento) {
        if (n != null) {

            $.ajax({
                type: "POST",
                timeout: 120000,
                async: true,
                url: FOCA.Structure.url + "/GetImagem",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    id: n
                }),
                success: function (result) {
                    var retorno = result.d;

                    if (retorno.Retorno != "0") {
                        //$('#' + elemento).attr('style', 'background: #555 url(' + retorno.Imagem + '); background-size:cover ; border-radius: 50%; width: 100px; height: 100px;');
                        $('#' + elemento).attr('src', retorno.Imagem);

                    }

                    return true;
                },
                error: function (x) {

                }
            });
            
        }
    }
}