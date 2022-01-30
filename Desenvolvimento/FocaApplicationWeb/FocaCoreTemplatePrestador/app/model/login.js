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

                if (retorno.IdCodigoTipoCliente != null && retorno.IdCodigoTipoCliente != "3") {
                    FOCA.Methods.alert(Glossario.data[n].mensagens.codigo_tipo_cliente_errado);

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

                $('#btn-email-sms').removeAttr('disabled');
                $('#btn-email-sms').val('ENTRAR');
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

                    if (retorno.IdCodigoTipoCliente != null && retorno.IdCodigoTipoCliente != "3") {
                        FOCA.Methods.alert(Glossario.data[n].mensagens.codigo_tipo_cliente_errado);
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

    logImediateComplete: function (n, id) { 
        
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/LogImediate",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                id: id
            }),
            success: function (result) {
                var retorno = result.d;

                if (retorno.Resultado == "0") {
                    FOCA.Controller.Login.load(n);
                    return false;
                }

                if (retorno.IdCodigoTipoCliente != null && retorno.IdCodigoTipoCliente != "3") {
                    FOCA.Methods.alert(Glossario.data[n].mensagens.codigo_tipo_cliente_errado);
                    return false;
                }

                localStorage.setItem('foca-core', JSON.stringify(retorno));

                $('#txt-nome-perfil').html(retorno.Nome);


                $('#ki_limpeza').html(retorno.StatusPrestador[0].Nome);
                var valortotal = 0.00;
                $.each(retorno.Atividades, function (k, v) {
                    valortotal = (valortotal + v.ValorTotal).toFixed(2);
                });
                $('#ki_limpeza_total_valor').html(' R$' + valortotal + ' em ' + retorno.Atividades.length + ' ATV. ');


                FOCA.Model.Principal.getImagem(retorno.IdImagem, 'img-perfil');
                return true;
            },
            error: function (x) {
                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);

                FOCA.Controller.Login.load(n);
            }
        });

        return false;
    },

    sendCodigoVerification: function (n, telmail) {
        
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/SendCodigoVerificationPrestador",
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

                if (retorno.IdCodigoTipoCliente != null && retorno.IdCodigoTipoCliente != "3") {
                    FOCA.Methods.alert(Glossario.data[n].mensagens.codigo_tipo_cliente_errado);
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