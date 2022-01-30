FOCA.Controller.Orders = {

    load: function (n) {

        FOCA.Controller.Orders.functions.glossario(n);

        var core = localStorage.getItem('foca-core');
        var data = JSON.parse(core);

        //$('#img-perfil').attr('style', '' + core.);
        $('#txt-nome-perfil').html(data.Nome);

        FOCA.Model.Orders.getImagem(data.IdImagem, 'img-perfil');

        FOCA.Model.Orders.getOrders(n, data);

        $('#com_materiais').off('click').on('click', function () {
            $('#com_materiais').attr('style', 'float: left; color: #1cc7c4');
            $('#com_materiais').attr('name', '1');
            $('#sem_materiais').attr('style', 'float: right;');
            $('#sem_materiais').attr('name', '0');
            FOCA.Controller.Orders.functions.total(true);
        });

        $('#sem_materiais').off('click').on('click', function () {
            $('#com_materiais').attr('style', 'float: left;');
            $('#com_materiais').attr('name', '0');
            $('#sem_materiais').attr('style', 'float: right; color: #1cc7c4');
            $('#sem_materiais').attr('name', '1');
            FOCA.Controller.Orders.functions.total(false);
        });
    },

    functions: {

        total: function(progresso) {

            var local = localStorage.getItem('foca-gridorders');

            if (local != null || local != undefined) {
                var retorno = JSON.parse(local);

                var html = '';
                $.each(retorno.data, function (k, v) {

                    console.log(parseInt(v.Diff.toFixed(0)));

                    var finalizado = ((v.FlgFinalizado == null) ? false: (v.FlgFinalizado == false) ? false : true);

                    if (finalizado !== progresso) {

                        html += '<hr> ' +
                            '<h2> Data: ' + v.DataPedido + ' | ' + v.HoraPedido + '</h2>' +
                            '<table style="width:100%; height:auto;"> ' +
                            '<tr>' +
                            '   <td>' +
                            '       <h4> ' + v.IdPedido + ' - ' + v.UidPedido.split('-')[0].toUpperCase() + '</h4> <br/>' +
                            '        Valor do Serviço: <h4>R$: ' + v.Valor + ' </h4> Execução Estimada: <h4> ' + v.Tempo + 'h </h4> <br/>' +
                            '        ' + ((v.FlgFinalizado == true) ? '' : ((v.FlgAceiteProfissional == true) ?
                                            ((parseInt(v.Diff.toFixed(0)) <= 24) ? ((v.FlgChegada == true) ? '<input id="btn-finalizar-' + v.IdPedido + '" onclick="FOCA.Controller.Orders.functions.action(' + v.IdPedido + ',5);" type="button" value="FINALIZAR" />' : '<input id="btn-iniciar-' + v.IdPedido + '" onclick="FOCA.Controller.Orders.functions.action(' + v.IdPedido + ',4);" type="button" value="INICIAR" />')
                                            : '<input id="btn-cancelar-' + v.IdPedido + '" onclick="FOCA.Controller.Orders.functions.action(' + v.IdPedido + ',3);" type="button" value="CANCELAR" />') :
                                     '<input id="btn-aceitar-' + v.IdPedido + '" onclick="FOCA.Controller.Orders.functions.action(' + v.IdPedido + ',1);" type="button" value="ACEITAR" />')) +
                            '   </td>' +
                            '   <td>' +
                            '       <h4> Pagamento: ' + ((v.FlgPagamento == true) ? 'PAGO' : 'AGUARDANDO') + ' </h4> <br/>' +
                            '       <h4> Profissional: ' + ((v.NomeProfissional == null) ? 'AGUARDANDO' : v.NomeProfissional) + ' </h4> <br/>' +
                            '       <h4 style="color:red;"> STATUS: ' + ((v.FlgFinalizado == true) ? 'FINALIZADO' : ((v.FlgChegada == true) ? 'ANDAMENTO' : ((v.FlgAceiteProfissional == true) ? 'ACEITO' : 'AGUARDANDO'))) + ' </h4> <br/>' +
                            '       ' + ((v.FlgAceiteProfissional == true) ? '' :
                                    '<input id="btn-recusar-' + v.IdPedido + '" onclick="FOCA.Controller.Orders.functions.action(' + v.IdPedido + ',2);" type="button" value="RECUSAR" />') +
                            '   </td>' +
                            '</tr>' +
                            '</table>' +
                            '<input alt="" onclick="FOCA.Controller.Orders.functions.verMais(' + v.IdPedido + ')" type="button" value="INFORMAÇÕES" style="width:100%; margin-top:-10px;" />' +
                            ((v.FlgFinalizado == true && v.FlgRattingPrestador == null) ?
                            '<div style="width:100%;height:auto;background:#f9fafa;padding:5px;">' +
                            '   <h5>Avalie o serviço: </h5>' +
                            '   <select id="cd-ratting-' + v.IdPedido + '">' +
                            '       <option value="5">Excelente</option>' +
                            '       <option value="4">Ótimo</option>' +
                            '       <option value="3">Pediria novamente</option>' +
                            '       <option value="2">Resalvas</option>' +
                            '       <option value="1">Fraco</option>' +
                            '       <option value="0">Ruim</option>' +
                            '   </select>' +
                            '   <input type="button" onclick="FOCA.Controller.Orders.functions.ratting(' + v.IdPedido + ')" value="Enviar Avaliação" style="width:100%" />' +
                            '</div>' +
                            '<br/>' +
                            '<br/>' +
                            '<br/>' +
                            '<br/>' +
                            '<br/>' +
                            '' : '<br/>' +
                            '<br/>' +
                            '<br/>' +
                            '<br/>' +
                            '<br/>');
                    }
                });
                
                $('#inner-grid').html(html + '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>');
            }
        },

        ratting: function (idpedido) {

            var value = $('#cd-ratting-' + idpedido).val();
            FOCA.Model.Orders.setRatting(idpedido, value, "Prestador");
        },

        verMais: function (idpedido) {
            var local = localStorage.getItem('foca-gridorders');
            var retorno = JSON.parse(local);
            $.each(retorno.data, function(k, v) {
                if (idpedido == v.IdPedido) {

                    alert('ENDEREÇO: \n ' + v.EnderecoCompleto + ', ' + v.Bairro + ', ' + v.Cidade +
                        '.\n\n DEMANDA: \n Quartos(' + v.QtdQuartos + ') Salas(' + v.QtdSalas + ') Banheiros(' + v.QtdBanheiros + ')' +
                        '.\n\n EXTRA: \n Passar(' + ((v.FlgPassar == true) ? 'SIM' : 'NÃO') + ')' +
                        ' \n Armarios(' + ((v.FlgArmarios == true) ? 'SIM' : 'NÃO') + ')' +
                        ' \n Cozinha(' + ((v.FlgCozinha == true) ? 'SIM' : 'NÃO') + ')' +
                        ' \n Fogão(' + ((v.FlgFogao == true) ? 'SIM' : 'NÃO') + ')' +
                        ' \n Louça(' + ((v.FlgLouca == true) ? 'SIM' : 'NÃO') + ')' +
                        ' \n Geladeira(' + ((v.FlgGeladeira == true) ? 'SIM' : 'NÃO') + ')' +
                        ' \n Materiais(' + ((v.FlgMateriais == true) ? 'SIM' : 'NÃO') + ')' +
                        '');
                }
            });
        },

        action: function (id, act) {
            if (act == 4) {
                if (!confirm('DESEJA INFORMAR AO CLIENTE QUE ESTÁ A CAMINHO?')) {
                    return;
                }
            }

            if (act == 3) {
                if (!confirm('DESEJA REALMENTE CANCELAR ESTA ORDEM?')) {
                    //alert('');
                    return;
                }
            }
            FOCA.Model.Orders.setAction(id, act);
        }, 

        glossario: function(n) {
            $('#inicio').html(Glossario.data[n].principal.inicio);
            $('#ki_faxina').html(Glossario.data[n].principal.ki_faxina);
            $('#ki_limpeza').html(Glossario.data[n].principal.ki_faxina);
            $('#meu_perfil').html(Glossario.data[n].principal.meu_perfil);
            $('#meus_pedidos').html(Glossario.data[n].principal.meus_pedidos);
            $('#meus_servicos').html(Glossario.data[n].principal.meus_servicos);
            $('#fale_conosco').html(Glossario.data[n].principal.fale_conosco);
            $('#minhas_ordens').html(Glossario.data[n].orders.minhas_ordens);
            $('#nao_ha_nada_para_exibir').html(Glossario.data[n].orders.nao_ha_nada_para_exibir);
        }
    }
}