using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FocaWebServiceApplication
{
    public partial class Default : System.Web.UI.Page
    {

        //=======> DEMANDA KILEMPEZA
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetPedido(string uidpedido)
        {
            return Controller.KiLimpeza.GetPedido(uidpedido);
        }
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object AddEndereco(string idcliente, string complemento, string endereco, string nome)
        {
            return Controller.KiLimpeza.AddEndereco(idcliente, complemento, endereco, nome);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetEndereco(string idcliente)
        {
            return Controller.KiLimpeza.GetEndereco(idcliente);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetRatting(string idpedido, string tipocliente, string value)
        {
            return Controller.KiLimpeza.SetRatting(idpedido, tipocliente, value);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetOrders(string id)
        {
            return Controller.KiLimpeza.GetOrders(id);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetAction(string id, string atc)
        {
            return Controller.KiLimpeza.SetAction(id, atc);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetDemandaKiLimpezaOK(string uidpedido, string bairro, string endereco, /*string genero,*/ string data, string hora, string periodicidade)
        {
            return Controller.KiLimpeza.SetDemandaKiLimpezaOK(uidpedido, bairro, endereco, /*genero,*/ data, hora, periodicidade);
        } 
         
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetDemandaKiLimpeza(string id, string horas, string valor, string materiais, string quartos, string banheiro, string sala,
        string armarios, string geladeira, string louca, string cozinha, string fogao, string passar)
        {
            return Controller.KiLimpeza.SetDemandaKiLimpeza(id, horas, valor, materiais, quartos, banheiro, sala,
        armarios, geladeira, louca, cozinha, fogao, passar);
        }

        //=======> LOGIN
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetImagem(string id)
        {
            return Controller.Imagem.GetImagem(id);
        }
        
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetUpdatePerfil(string id, string imagem, string nomeuser, string usuario, string senha, string celular, string email, string bancoagencia,
        string bancoconta, string banconome, string bancocpf, string banco, string tipopagamento, string tipocartao, string cartaonumero, string cartaonome, string cartaodatavencimento,
        string cartaocodigoseguranca)
        {
            return Controller.Login.SetUpdatePerfil(id, imagem, nomeuser,usuario,senha,celular,email,bancoagencia,bancoconta,banconome,bancocpf,banco,tipopagamento,tipocartao,
                    cartaonumero,cartaonome,cartaodatavencimento,cartaocodigoseguranca);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetUpdatePerfilPrestador(string id, string imagem, string nomeuser, string usuario, string senha, string celular, string email, string bancoagencia,
        string bancoconta, string banconome, string bancocpf, string banco, string ramo, string[] arrayAtividades)
        {
            return Controller.Login.SetUpdatePerfilPrestador(id, imagem, nomeuser, usuario, senha, celular, email, bancoagencia, bancoconta, banconome, bancocpf, banco, ramo, arrayAtividades);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object LogImediate(string id)
        {
            return Controller.Login.LogImediate(id);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetLogin(string usuario, string senha)
        {
            return Controller.Login.SetLogin(usuario, senha);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetEsqueciSenha(string usuario)
        {
            return Controller.Login.SetEsqueciSenha(usuario);
        } 

        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
        //=======> CONFIRMAÇÃO DE TELEFONE OU EMAIL
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SendCodigoVerification(string telmail)
        {
            return Controller.CodigoConfirmacao.SendCodigoVerification(telmail);  
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SendCodigoVerificationPrestador(string telmail)
        {
            return Controller.CodigoConfirmacao.SendCodigoVerificationPrestador(telmail);
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object ConfirmationCodigoVerification(string telmail, string codigo, string id)
        {
            return Controller.CodigoConfirmacao.ConfirmationCodigoVerification(telmail, codigo, id);
        }

    }
}