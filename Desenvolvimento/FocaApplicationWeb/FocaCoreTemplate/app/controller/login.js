FOCA.Controller.Login = {

    countResend: 0,

    load: function (n) {

        FOCA.Controller.Login.functions.glossario(n);

        $("body").css('height', window.innerHeight + 'px');
        $("body").css('overflow-y', 'hidden');

        var core = localStorage.getItem('foca-core');
        if (core != null) {
            //location.href = 'principal.html';
            location.href = 'kifaxina.html';
            return;
        }

        $('#main').show();
        $('#panel-confirmacao').hide();
        $('#panel-login').hide();
        
        
        $('#panel-bottom').off('click').on('click', function() {
            FOCA.Controller.Login.functions.hrefLogin(n);
        });

        $('#txt-login').off('keydown').on('keydown', function () {
            if ($('#txt-login').val().length == 1) {
                if ($.isNumeric($('#txt-login').val()) == true) {
                    $('#txt-login').mask('99-99999-9999');
                } else {
                    $('#txt-login').unmask();
                }
            } else {
                if ($('#txt-login').val().indexOf('@') > -1) {
                    $('#txt-login').unmask();
                }
            }
        });

        $('#btn-login').off('click').on('click', function() {
            FOCA.Controller.Login.functions.login(n);
        });

        $('#txt-login').val('');
    },

    functions: {

        glossario: function(n) {
            $('#entre_com_telefone_ou_email_para_logar').html(Glossario.data[n].login.entre_com_telefone_ou_email_para_logar);
            $('#txt-login').attr('placeholder',Glossario.data[n].login.celular_ou_email);
            $('#btn-login').val(Glossario.data[n].login.entrar);
            $('#ja_possui_uma_conta').html(Glossario.data[n].login.ja_possui_uma_conta);
            $('#login').html(Glossario.data[n].login.login);
        },

        login: function (n) {

            var block = localStorage.getItem('block');
            if (block != null) {
                if ((parseInt(block) + 1800000) > (new Date()).getTime()) {
                    FOCA.Methods.alert(Glossario.data[n].login.blocked);
                    location.reload();
                    return;
                }
            }

            var telemail = $('#txt-login').val();
            
            if (FOCA.Methods.isEmpty(telemail)) {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_telefone_ou_email);
                return;
            }

            $('#main').hide();
            $('#panel-confirmacao').show();
            $('#panel-login').hide();

            if (telemail.indexOf('@') > -1) {
                localStorage.setItem('foca-email', telemail);
                $('#um_email_sms_foi_enviado').html(Glossario.data[n].login.um_email_foi_enviado);
            } else {
                telemail = telemail.replace("-", "").replace("-", "");
                localStorage.setItem('foca-tel', telemail);
                $('#um_email_sms_foi_enviado').html(Glossario.data[n].login.um_sms_foi_enviado);
            }

            $('#txt-confirmacao1').val('');
            $('#txt-confirmacao2').val('');
            $('#txt-confirmacao3').val('');
            $('#txt-confirmacao4').val('');

            $('#txt-confirmacao1').focus();
            $('#txt-confirmacao1').select();
            $('#txt-confirmacao1').on('keydown', function () { setTimeout(function () { $('#txt-confirmacao2').focus(); $('#txt-confirmacao2').select(); }, 100); });
            $('#txt-confirmacao2').on('keydown', function () { setTimeout(function () { $('#txt-confirmacao3').focus(); $('#txt-confirmacao3').select(); }, 100); });
            $('#txt-confirmacao3').on('keydown', function () { setTimeout(function () { $('#txt-confirmacao4').focus(); $('#txt-confirmacao4').select(); }, 100); });
            
            $('#btn-confirmacao').val(Glossario.data[n].login.confirmar_codigo);
            $('#reenviar_o_codigo').html(Glossario.data[n].login.reenviar_o_codigo);

            $('#btn-confirmacao').off('click').on('click', function () {

                var codigo = $('#txt-confirmacao1').val() + $('#txt-confirmacao2').val() + $('#txt-confirmacao3').val() + $('#txt-confirmacao4').val();
                console.log(codigo);
                if (codigo.length < 4) {
                    FOCA.Methods.alert(Glossario.data[n].login.digite_o_codigo_corretamente);
                    return;
                }
                
                FOCA.Model.Login.codigoVerification(n, codigo);
            });

            $('#reenviar_o_codigo').off('click').on('click', function () {
                FOCA.Controller.Login.countResend = (FOCA.Controller.Login.countResend + 1);
                if (FOCA.Controller.Login.countResend > 3) {
                    FOCA.Controller.Login.countResend = 0;
                    FOCA.Methods.alert(Glossario.data[n].login.limite_de_envio_excedido);
                    localStorage.setItem('block', (new Date()).getTime());
                    location.reload();
                    return;
                }

                FOCA.Model.Login.sendCodigoVerification(n, telemail);

                setTimeout(function() {
                    FOCA.Methods.alert(Glossario.data[n].login.codigo_enviado_com_sucesso);
                }, 1000);
            });

            FOCA.Model.Login.sendCodigoVerification(n, telemail);
        },

        hrefLogin: function (n) {

            $('#txt-email-sms').val('');
            $('#txt-pass').val('');

            $('#digite_seus_dados_de_acesso').html(Glossario.data[n].login.digite_seus_dados_de_acesso);
            $('#btn-email-sms').val(Glossario.data[n].login.entrar);
            $('#btn-esquecisenha-sms').val(Glossario.data[n].login.esqueci_minha_senha);
            $('#txt-email-sms').attr('placeholder',Glossario.data[n].login.digite_seu_email_ou_telefone);
            $('#txt-pass').attr('placeholder',Glossario.data[n].login.digite_sua_senha);

            $('#main').hide();
            $('#panel-confirmacao').hide();
            $('#panel-login').show();

            $('#btn-email-sms').off('click').on('click',  function () {
                var usuario = $('#txt-email-sms').val();
                var senha = $('#txt-pass').val();

                if (FOCA.Methods.isEmpty(usuario)) {
                    FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_usuario);
                    return;
                }
                if (FOCA.Methods.isEmpty(senha)) {
                    FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_uma_senha);
                    return;
                }
                FOCA.Model.Login.login(n, usuario, senha);
            });

            $('#btn-esquecisenha-sms').off('click').on('click', function () {
                var usuario = $('#txt-email-sms').val();

                if (FOCA.Methods.isEmpty(usuario)) {
                    FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_usuario);
                    return;
                }
                FOCA.Model.Login.esqueci(n, usuario);
            });
        }

    }
}