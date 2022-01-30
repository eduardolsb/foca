FOCA.Model.Login = {

    login: function (n, user, senha) {

        $('#btn-email-sms').attr('disabled', 'disabled');
        $('#btn-email-sms').val('Enviando...');

        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/SetLogin",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                usuario: user,
                senha: senha
            }),
            success: function (result) {
                var retorno = result.d;

                if (retorno.Retorno == "0") {
                    FOCA.Controller.Login.load(n);
                    FOCA.Methods.alert(Glossario.data[n].mensagens[retorno.Mensagem]);

                    $('#btn-email-sms').removeAttr('disabled');
                    $('#btn-email-sms').val('ENTRAR');
                    return false;
                }

                localStorage.setItem('foca-core', JSON.stringify(retorno));

                setTimeout(function() {
                    window.location.href = 'principal.html';
                },500);
                
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

    updateImediate: function (n) {

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
                success: function (result) {
                    var retorno = result.d;

                    localStorage.setItem('foca-core', JSON.stringify(retorno));

                    console.log('updated');
                    return true;
                },
                error: function (x) {
                    FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);
                }
            });
        }
        return false;
    },

    sendCodigoVerification: function (n, telmail) {
        
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/SendCodigoVerification",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                telmail: telmail
            }),
            success: function (result) {
                var retorno = result.d;

                if (retorno.Resultado == "0") {
                    FOCA.Methods.alert(Glossario.data[n].mensagens[retorno.Mensagem]);
                    return false;
                }

                localStorage.setItem('foca_codigo_confirmacao', JSON.stringify(retorno));
                return true;
            },
            error: function (x) {
                FOCA.Methods.alert(Glossario.data[n].login.erro);
            }
        });
    }, 

    codigoVerification: function (n, codigo) {

        var confirmacao = localStorage.getItem('foca_codigo_confirmacao');
        var data = JSON.parse(confirmacao);

        console.log(data);
        console.log(codigo);

        if (parseInt(data.Codigo) == parseInt(codigo)) {

            console.log('entrou');

            FOCA.Model.Login.confirmationCodigoVerification(data.Telmail, data.Codigo, data.Id);
            return true;
        } else {
            FOCA.Methods.alert(Glossario.data[n].login.codigo_incorreto);
        }

        return false;
    },

    confirmationCodigoVerification: function(telmail, codigo, id) {
        
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/ConfirmationCodigoVerification",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                telmail: telmail,
                codigo: codigo,
                id: id
            }),
            success: function (result) {
                var retorno = result.d;

                if (retorno.Resultado == "0") {
                    FOCA.Methods.alert(Glossario.data[n].mensagens[retorno.Mensagem]);
                    return false;
                }

                localStorage.setItem('foca_codigo_confirmacao', JSON.stringify(retorno));

                location.href = 'principal.html';
                return true;
            },
            error: function (x) {
                FOCA.Methods.alert(Glossario.data[n].login.erro);
            }
        });
    }
}