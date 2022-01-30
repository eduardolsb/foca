FOCA.Model.Perfil = {

    setUpdatePerfil: function(n, data, 
        imagem,
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
        arrayAtividades,
                ramo) {
        
        $('#btn-atualizar').attr('disabled', 'disabled');
        $('#btn-atualizar').val('Enviando...');
        
        $.ajax({
            type: "POST",
            timeout: 120000,
            async: true,
            url: FOCA.Structure.url + "/SetUpdatePerfilPrestador",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                id: data.Id,
                imagem: imagem,
                nomeuser: nomeuser,
                usuario: usuario,
                senha:senha,
                celular:celular,
                email:email,
                bancoagencia:bancoagencia,
                bancoconta:bancoconta,
                banconome:banconome,
                bancocpf:bancocpf,
                banco: banco,
                ramo: ramo,
                arrayAtividades: arrayAtividades
            }),
            success: function (result) {
                var retorno = result.d;

                if (retorno.Retorno == "1") {
                    FOCA.Methods.alert(Glossario.data[n].perfil.atualizado_realizado_com_sucesso);

                    localStorage.setItem('foca-core', JSON.stringify(retorno));

                    $('#btn-atualizar').removeAttr('disabled');
                    $('#btn-atualizar').val('ATUALIZAR');

                    return true;
                }

                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);

                $('#btn-atualizar').removeAttr('disabled');
                $('#btn-atualizar').val('ATUALIZAR');
               
            },
            error: function (x) {
                FOCA.Methods.alert(Glossario.data[n].login.falha_na_internet);

                $('#btn-atualizar').removeAttr('disabled');
                $('#btn-atualizar').val('ATUALIZAR');
            }
        });

        return true;
    },

    getImagem: function(n, elemento) {
        if (n != null) {

            var imagem = localStorage.getItem('foca_imagem_perfil_' + n);
            if (imagem != null) {

                $('#' + elemento).attr('style', 'background: #555 url(' + imagem + '); background-size:cover ; border-radius: 50%; width: 100px; height: 100px; margin:auto;');
                $('#img-perfil').attr('style', 'background: #555 url(' + imagem + '); background-size:cover ; border-radius: 50%; width: 100px; height: 100px;');

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
                            $('#' + elemento).attr('style', 'background: #555 url(' + retorno.Imagem + '); background-size:cover ; border-radius: 50%; width: 100px; height: 100px; margin: auto;');
                            $('#img-perfil').attr('style', 'background: #555 url(' + retorno.Imagem + '); background-size:cover ; border-radius: 50%; width: 100px; height: 100px;');

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