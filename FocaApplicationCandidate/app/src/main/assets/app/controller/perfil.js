FOCA.Controller.Perfil = {

    load: function (n) {

        FOCA.Controller.Perfil.functions.glossario(n);

        var html = '<option value="0">Selecione um banco</option>';
        $.each(FOCA.Const.bancos, function(k, v) {
            html += '<option value="' + v.code + '">' + v.code + ' - ' + v.name + '</option>';
        });
        $('#cb-bancos').html(html);

        var core = localStorage.getItem('foca-core');
        var data = JSON.parse(core);

        $('#form-usuario').val(data.Usuario);

        //$('#img-perfil').attr('style', '' + core.);
        $('#txt-nome-perfil').html(data.Nome);

        $('#form-celular').mask('(99)99999-9999');
        //$('#form-cartao-data-vencimento').mask('99/99/9999');

        $('#btn-atualizar').off('click').on('click', function () {

            var imagem = $('#form-img-perfil').attr('src');
            var nomeuser = $('#form-nome').val();
            var usuario = $('#form-usuario').val();
            var senha = $('#form-senha').val();
            var celular = $('#form-celular').val();
            var email = $('#form-email').val();
            var bancoagencia = $('#form-banco-agencia').val();
            var bancoconta = $('#form-banco-conta').val();
            var banconome = $('#form-banco-nome').val();
            var bancocpf = $('#form-banco-cpf').val();
            var banco = $('#cb-bancos').val();
            var tipopagamento = $('#cb-tipo').val();
            var tipocartao = $('#cb-cartoes').val(); 
            var cartaonumero = $('#form-cartao-numero').val();
            var cartaonome = $('#form-cartao-nome').val();
            //2017-09-13
            var cartaodatavencimento = $('#form-cartao-data-vencimento').val().split('-')[2] + '/' + $('#form-cartao-data-vencimento').val().split('-')[1] + '/' + $('#form-cartao-data-vencimento').val().split('-')[0];
            var cartaocodigoseguranca = $('#form-cartao-codigo-seguranca').val();

            if (FOCA.Methods.isEmpty(nomeuser)) {
                FOCA.Methods.alert(Glossario.data[n].perfil.precisa_preencher_o_campo_nome);
                return false;
            }

            if (FOCA.Methods.isEmpty(celular)) {
                FOCA.Methods.alert(Glossario.data[n].perfil.precisa_preencher_o_campo_telefone);
                return false;
            }

            if (FOCA.Methods.isEmpty(email)) {
                FOCA.Methods.alert(Glossario.data[n].perfil.precisa_preencher_o_campo_email);
                return false;
            }

            var core1 = localStorage.getItem('foca-core');
            var data1 = JSON.parse(core1);

            FOCA.Model.Perfil.setUpdatePerfil(n, data1, imagem,
                nomeuser,
                usuario,
                senha,
                celular,
                email,
                bancoagencia,
                bancoconta,
                banconome,
                bancocpf,
                banco,
                tipopagamento,
                tipocartao,
                cartaonumero,
                cartaonome,
                cartaodatavencimento,
                cartaocodigoseguranca);

        });

        FOCA.Model.Perfil.getImagem(data.IdImagem, 'form-img-perfil');

        $('#form-nome').val(data.Nome);
        $('#form-usuario').val(data.Usuario);
        //if (data.RunUsuario[0] != null) {
        //    $('#form-senha').val(data.RunUsuario[0].Senha);
        //}
        if (data.Telefone.trim() != '') {
            $('#form-celular').val(data.DDD + data.Telefone);
        }
        $('#form-email').val(data.Email);

        $('#form-banco-agencia').val(data.Agencia);
        $('#form-banco-conta').val(data.Conta);
        $('#form-banco-nome').val(data.NomeCompleto);
        $('#form-banco-cpf').val(data.CPF);
        $('#cb-bancos').val(data.Banco);
        
        //$('#cb-tipo').val(0);

        if (data.Cartao[0] != null) {
            $('#cb-cartoes').val(data.Cartao[0].InfoAdd);
            $('#form-cartao-numero').val(data.Cartao[0].NumeroCartao);
            $('#form-cartao-nome').val(data.Cartao[0].NomeCartao);
            $('#form-cartao-data-vencimento').val(data.Cartao[0].DataValidade);
            $('#form-cartao-codigo-seguranca').val(data.Cartao[0].NumeroSeguranca);
        }


        $('#form-img-perfil').off('click').on('click', function () {
            var dados = localStorage.getItem('foca-core');
            var core = JSON.parse(dados);

            //$('#cameraInput').trigger('click');
            //window.getAlbumGalery();
            window.getCam(core.Id);
            var result = "";

            while (true) {
                result = window.getCamAlbumItem();
                if (result != "") {

                    //var immemorial = clearImg(result);

                    //$('#form-img-perfil').attr('style', 'background: #555 url(' + result + '); background-size:cover ; border-radius: 50%; width: 100px; height: 100px; margin: auto;');
                    $('#form-img-perfil').attr('name', result);
                    $('#form-img-perfil').attr('src', result);
                    $('#img-perfil').attr('src', result);

                    //$('#img-perfil').attr('style', 'background: #555 url(' + result + '); background-size:cover ; border-radius: 50%; width: 100px; height: 100px;');
                    break;
                }
            }
        });
        
        function clearImg(img) {
            var n = '',
            str = '';

            if (img.length > 60400) {
                img = img.substr(0, 60400);
            }

            if (img.indexOf('http') > -1)
                return img;


            try {
                console.log(img);
                n = img.split('\n');
                if (n.length > 1)
                    str = n.join('');
                console.log(str);
            } catch (ex) {

            }

            try {
                console.log(img);
                var n2 = img.split(' ');
                if (n2.length > 1)
                    str = n2.join('');
                console.log(str);
            } catch (ex) {
                str = img;
            }

            try {
                console.log(img);
                var n4 = img.split('\r');
                if (n4.length > 1)
                    str = n4.join('');
                console.log(str);
            } catch (ex) {

            }

            try {
                console.log(img);
                var n3 = img.split('\r\n');
                if (n3.length > 1)
                    str = n3.join('');
                console.log(str);
            } catch (ex) {

            }


            return str;
        }
        function upload(file) {
            var form = new FormData(),
                xhr = new XMLHttpRequest();
            form.append('image', file);
        }
        function drawOnCanvas(file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = e.target.result,
                    c = document.querySelector('canvas'), // see Example 4
                    ctx = c.getContext('2d'),
                    img = new Image();
                /*
                img.onload = function () {
                    c.width = img.width;
                    c.height = img.height;
                    ctx.drawImage(img, 0, 0);
                };
                */
                console.log(dataURL);
                //img.src = dataURL;
                $('#img-perfil').attr('src', dataURL);
                $('#form-img-perfil').attr('src', dataURL);
                $('#foto-perfil').attr('name', dataURL);
            };
            reader.readAsDataURL(file);
        }

        var input = document.querySelector('input[type=file]'); // see Example 4
        input.onchange = function () {
            var file = input.files[0];
            upload(file);
            drawOnCanvas(file);   // see Example 6
            //displayAsImage(file); // see Example 7
        };
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
            $('#meu_profile').html(Glossario.data[n].perfil.meu_profile);
            $('#nao_ha_nada_para_exibir').html(Glossario.data[n].orders.nao_ha_nada_para_exibir);
        }
    }
}