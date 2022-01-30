FOCA.Controller.Finalizacao = {

    load: function (n) {

        FOCA.Controller.Finalizacao.functions.glossario(n);

        var core = localStorage.getItem('foca-core');
        var data = JSON.parse(core);

        //$('#img-perfil').attr('style', '' + core.);
        $('#txt-nome-perfil').html(data.Nome);

        FOCA.Model.Finalizacao.getImagem(data.IdImagem, 'img-perfil');

        $('#txt-hora').mask('99:99');

        var uidpedido = localStorage.getItem('foca-uidpedido');
        var valor = localStorage.getItem('foca-pedido-valor');
        var horas = localStorage.getItem('foca-pedido-horas');

        $('#total-horas').html(horas);
        $('#total-reais').html(valor);

        $('#btn-salvar-endereco').off('click').on('click', function () {
            if ($('#div-panel-nome-endereco').attr('name') == "0") {
                $('#div-panel-nome-endereco').show(500);
                $('#div-panel-nome-endereco').attr('name', "1");
            } else {
                FOCA.Model.Finalizacao.addEndereco();
            }
        });

        $('#btn-continuar').off('click').on('click', function () {
            var bairro = $('#cb-bairro').val(),
                endereco = $('#txt-endereco').val(),
                //genero = $('#cb-genero').val(),
                data = $('#txt-data').val(),
                hora = $('#txt-hora').val();

            var periodicidade = document.querySelector('input[name="ck-periodicidade"]:checked').value;
            
            if (FOCA.Methods.isEmpty(data)) {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_uma_data);
                return;
            }
            if (FOCA.Methods.isEmpty(hora)) {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_uma_hora);
                return;
            }
            if (FOCA.Methods.isEmpty(endereco)) {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_endereco);
                return;
            }
            if (bairro == "0") {
                FOCA.Methods.alert(Glossario.data[n].login.precisa_escrever_um_bairro);
                return;
            }

            //FOCA.Model.Finalizacao.setDemanda(n, uidpedido, bairro, endereco, genero, data, hora);
            FOCA.Model.Finalizacao.setDemanda(n, uidpedido, bairro, endereco, data, hora, periodicidade);
        });


        FOCA.Model.Finalizacao.getEndereco();
    },

    functions: {

        getEndereco: function(n) {
            /*
                Resultado = "1",
                Mensagem = "",
                Enderecos = runEnderecoNew.Select(a => new
                {
                    Id = a.Id,
                    Nome = a.Nome,
                    Endereco = a.Endereco,
                    Complemento = a.Complemento,
                    IdCliente = a.IdCodigoCliente
                })
            */
            
            var html = '';
            if (n.Enderecos.length > 0) {
                $.each(n.Enderecos, function(k, v) {
                    html += '<div id="label-' + v.Id + '" onclick="FOCA.Controller.Finalizacao.functions.selectEndereco(' + v.Id + ');" style="width:auto;height:35px;background:#fff;border:solid 1px #1cc7c4;border-radius:5px;padding:5px;float:left;margin:5px;"> ' + v.Nome + ' </div>';
                });
                $('#grid-panel-address').html(html);
                $('#div-panel-completed-adreess').hide();
                $('#div-panel-related-address').show();
            } else {
                $('#div-panel-completed-adreess').show();
                $('#div-panel-related-address').hide();
            }

            localStorage.setItem('foca-enderecos', JSON.stringify(n.Enderecos));
        },

        selectEndereco: function (id) {
            /*
                Resultado = "1",
                Mensagem = "",
                Enderecos = runEnderecoNew.Select(a => new
                {
                    Id = a.Id,
                    Nome = a.Nome,
                    Endereco = a.Endereco,
                    Complemento = a.Complemento,
                    IdCliente = a.IdCodigoCliente
                })
            */

            var endrecos = JSON.parse(localStorage.getItem('foca-enderecos'));

            var html = '';
            if (endrecos != null) {
                $.each(endrecos, function (k, v) {
                    if (id == v.Id) {
                        html += '<div id="label-' + v.Id + '" onclick="FOCA.Controller.Finalizacao.functions.selectEndereco(' + v.Id + ');" style="width:auto;height:35px;background:#e1eef6;border:solid 1px #1cc7c4;border-radius:5px;padding:5px;float:left;margin:5px;"> ' + v.Nome + ' </div>';
                        $('#cb-bairro').val(v.Complemento);
                        $('#txt-endereco').val(v.Endereco);
                        $('#txt-endereco-nome').val(v.Nome);
                    } else {
                        html += '<div id="label-' + v.Id + '" onclick="FOCA.Controller.Finalizacao.functions.selectEndereco(' + v.Id + ');" style="width:auto;height:35px;background:#fff;border:solid 1px #1cc7c4;border-radius:5px;padding:5px;float:left;margin:5px;"> ' + v.Nome + ' </div>';
                    }
                });
                $('#grid-panel-address').html(html);
                $('#div-panel-completed-adreess').hide();
                $('#div-panel-related-address').show();
            } else {
                $('#div-panel-completed-adreess').show();
                $('#div-panel-related-address').hide();
            }

        },

        addMore: function () {

            $('#div-panel-nome-endereco').attr('name', "0");
            $('#div-panel-completed-adreess').show();
            $('#div-panel-related-address').hide();
        },

        glossario: function(n) {
            $('#inicio').html(Glossario.data[n].principal.inicio);
            $('#ki_faxina').html(Glossario.data[n].principal.ki_faxina);
            $('#ki_limpeza').html(Glossario.data[n].principal.ki_faxina);
            $('#meu_perfil').html(Glossario.data[n].principal.meu_perfil);
            $('#meus_pedidos').html(Glossario.data[n].principal.meus_pedidos);
            $('#meus_servicos').html(Glossario.data[n].principal.meus_servicos);
            $('#fale_conosco').html(Glossario.data[n].principal.fale_conosco);
            $('#txt_ki_faxina').html(Glossario.data[n].kifaxina.kifaxina);
        }
    }
}