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
            var ramo = $('#cb-ramo-atividade').val();

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
            if (ramo == "0") {
                FOCA.Methods.alert(Glossario.data[n].perfil.precisa_selecionar_ramo_atividade);
                return false;
            }

            if (FOCA.Controller.Perfil.arrayAtividades.length == 0) {
                FOCA.Methods.alert(Glossario.data[n].perfil.precisa_selecionar_atividade);
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
                FOCA.Controller.Perfil.arrayAtividades,
                ramo);

            return true;
        });

        FOCA.Model.Perfil.getImagem(data.IdImagem, 'form-img-perfil');

        $('#form-nome').val(data.Nome);
        $('#form-usuario').val(data.Usuario);
        //if (data.RunUsuario[0] != null) {
        //    $('#form-senha').val(data.RunUsuario[0].Senha);
        //}

        if (data.Telefone != null) {
            $('#form-celular').val('(' + data.DDD + ')' + data.Telefone);
        }

        $('#form-email').val(data.Email);

        $('#form-banco-agencia').val(data.Agencia);
        $('#form-banco-conta').val(data.Conta);
        $('#form-banco-nome').val(data.NomeCompleto);
        $('#form-banco-cpf').val(data.CPF);
        $('#cb-bancos').val(data.Banco);

        if (data.CodigoAtributo[0] != null) {
            $('#cb-ramo-atividade').val(data.CodigoAtributo[0].Nome);
        }

        $.each(data.CodigoRegiaoAtuacao, function (k, v) {
            FOCA.Controller.Perfil.arrayAtividades.push(v.Nome);
        });
        var html2 = '';
        var array2 = FOCA.Controller.Perfil.arrayAtividades;
        FOCA.Controller.Perfil.arrayAtividades = [];
        $.each(array2, function (k, v) {
            html2 += '<table id="atv-' + k + '" onclick="FOCA.Controller.Perfil.functions.closeGrid(' + k + ');">' +
                    '<tr>' +
                        '<td><input type="button" value="-"/></td>' +
                        '<td>' + v.split(',')[0] + '</td>' +
                    '</tr>' +
                '</table>';

            FOCA.Controller.Perfil.arrayAtividades.push(v);
        });
        $('#grid-atividades').html(html2);

        //$('#cb-tipo').val(0);


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
        
        $('#cb-atividade').on('change', function (e) {
            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;

            console.log(valueSelected);
            if (valueSelected == 0) {
                return false;
            }

            if ('Barra da Tijuca, Rio de Janeiro, RJ' == valueSelected) {
                if (FOCA.Controller.Perfil.arrayAtividades.indexOf(valueSelected) == -1) {
                    FOCA.Controller.Perfil.arrayAtividades.push('Barra da Tijuca, Rio de Janeiro, RJ');
                }
            }
            if ('Campo Grande, Rio de Janeiro, RJ' == valueSelected) {
                if (FOCA.Controller.Perfil.arrayAtividades.indexOf(valueSelected) == -1) {
                    FOCA.Controller.Perfil.arrayAtividades.push('Campo Grande, Rio de Janeiro, RJ');
                }
            }
            var html = '';
            $.each(FOCA.Controller.Perfil.arrayAtividades, function(k, v) {
                html += '<table id="atv-' + k + '" onclick="FOCA.Controller.Perfil.functions.closeGrid(' + k + ');">' +
                            '<tr>' + 
                                '<td><input type="button" value="-"/></td>' + 
                                '<td>' + v.split(',')[0] + '</td>' + 
                            '</tr>' + 
                        '</table>';
                
            });
            $('#grid-atividades').html(html);
        });
    },
    
    arrayAtividades: [],

    functions: {
        closeGrid: function(id) {
            var html = '';
            var array = FOCA.Controller.Perfil.arrayAtividades;
            FOCA.Controller.Perfil.arrayAtividades = [];
            $.each(array, function (k, v) {
                if (k != parseInt(id)) {
                    html += '<table id="atv-' + k + '" onclick="FOCA.Controller.Perfil.functions.closeGrid(' + k + ');">' +
                            '<tr>' +
                                '<td><input type="button" value="-"/></td>' +
                                '<td>' + v.split(',')[0] + '</td>' +
                            '</tr>' +
                        '</table>';

                    FOCA.Controller.Perfil.arrayAtividades.push(v);
                }
            });
            $('#grid-atividades').html(html);
        },
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