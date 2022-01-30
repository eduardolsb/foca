using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI.WebControls;
using FocaWebServiceApplication.Model;

namespace FocaWebServiceApplication.Controller
{
    public class CodigoConfirmacao 
    {
        
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object ConfirmationCodigoVerification(string telmail, string codigo, string id)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes
                .FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);

            if (codigoCliente != null)
            {
                codigoCliente.FlgPerfilConfirmado = true;
                repo.SubmitChanges();
            }

            var runCodigoConfirmacao =
                repo.RunCodigoConfirmacaos.FirstOrDefault(
                    a => a.Codigo == codigo && a.FlgAtivo == true && a.IdCodigoCliente == long.Parse(id));

            if (runCodigoConfirmacao != null)
            {
                runCodigoConfirmacao.FlgEmail = true;
                runCodigoConfirmacao.DataFim = DateTime.Now;
                repo.SubmitChanges();
            }

            return new
            {
                Retorno = 1,
                Mensagem = "",
                Id = codigoCliente.Id,
                IdCodigoTipoCliente = codigoCliente.IdCodigoTipoCliente,
                Codigo = runCodigoConfirmacao.Codigo
            };
        }
        
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SendCodigoVerification(string telmail) 
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes
                .FirstOrDefault(a => (a.TelefoneCompleto == telmail) && a.FlgAtivo == true);

            var codigoTipoCliente = repo.CodigoTipoClientes.FirstOrDefault(a => a.Nome == "Cliente" && a.FlgAtivo == true);
            if (codigoTipoCliente == null)
            {
                return new
                {
                    Resultado = 0,
                    Mensagem = 1001
                };
            }

            if (codigoCliente == null)
            {
                codigoCliente = new Model.CodigoCliente
                {
                    Uid = Guid.NewGuid(),
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    FlgAtivo = true,
                    TelefoneCompleto = telmail,
                    IdCodigoTipoCliente = codigoTipoCliente.Id
                };
                repo.CodigoClientes.InsertOnSubmit(codigoCliente);
                repo.SubmitChanges();
            }

            var runCodigoConfirmacao = new Model.RunCodigoConfirmacao
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = true,
                IdCodigoCliente = codigoCliente.Id,
                FlgTelefone = (!telmail.Contains("@")),
                FlgEmail = (telmail.Contains("@")),
                Codigo = GenerateRandomNo()
            };
            repo.RunCodigoConfirmacaos.InsertOnSubmit(runCodigoConfirmacao);
            repo.SubmitChanges();


            if (telmail.Contains("@"))
            {
                if (ValidaEnderecoEmail(telmail))
                {
                    SendMail("carloselsb@gmail.com", telmail,
                        "Foca | Codigo de confirmação: " + runCodigoConfirmacao.Codigo,
                        "<div style='width:100%;height:1000px;'>" +
                        "" +
                        "<h2> FOCA </h2>" +
                        "<hr/>" +
                        "<br/>" +
                        "<br/>" +
                        "<p> Seu código de confirmação é: " + runCodigoConfirmacao.Codigo + ". " +
                        "</br>" +
                        "</br>" +
                        "Nao se esqueça de complementar seus dados de cadastro. </p>" +
                        "</div>");
                }
            }

            return new
            {
                Retorno = 1,
                Mensagem = "",
                Id = codigoCliente.Id,
                IdCodigoTipoCliente = codigoTipoCliente.Id,
                Codigo = runCodigoConfirmacao.Codigo,
                Telmail = telmail 
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SendCodigoVerificationPrestador(string telmail) 
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes
                .FirstOrDefault(a => (a.TelefoneCompleto == telmail) && a.FlgAtivo == true);

            var codigoTipoCliente = repo.CodigoTipoClientes.FirstOrDefault(a => a.Nome == "Prestador" && a.FlgAtivo == true);
            if (codigoTipoCliente == null)
            {
                return new
                {
                    Resultado = 0,
                    Mensagem = 1001
                };
            }

            if (codigoCliente == null)
            {
                codigoCliente = new Model.CodigoCliente
                {
                    Uid = Guid.NewGuid(),
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    FlgAtivo = true,
                    TelefoneCompleto = telmail,
                    IdCodigoTipoCliente = codigoTipoCliente.Id
                };
                repo.CodigoClientes.InsertOnSubmit(codigoCliente);
                repo.SubmitChanges();
            }

            var runCodigoConfirmacao = new Model.RunCodigoConfirmacao
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = true,
                IdCodigoCliente = codigoCliente.Id,
                FlgTelefone = (!telmail.Contains("@")),
                FlgEmail = (telmail.Contains("@")),
                Codigo = GenerateRandomNo()
            };
            repo.RunCodigoConfirmacaos.InsertOnSubmit(runCodigoConfirmacao);
            repo.SubmitChanges();

            var _status = repo.CodigoClienteCodigoStatusPrestadors.FirstOrDefault(
                    a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true);
            if (_status == null)
            {
                var estatusPrestador = new Model.CodigoClienteCodigoStatusPrestador
                {
                    Uid = Guid.NewGuid(),
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    FlgAtivo = true,
                    IdCodigoCliente = codigoCliente.Id,
                    IdCodigoStatusPrestador = 2
                };
                repo.CodigoClienteCodigoStatusPrestadors.InsertOnSubmit(estatusPrestador);
                repo.SubmitChanges();
            }

            if (telmail.Contains("@"))
            {
                if (ValidaEnderecoEmail(telmail))
                {
                    SendMail("carloselsb@gmail.com", telmail,
                        "Foca | Codigo de confirmação: " + runCodigoConfirmacao.Codigo,
                        "<div style='width:100%;height:1000px;'>" +
                        "" +
                        "<h2> FOCA </h2>" +
                        "<hr/>" +
                        "<br/>" +
                        "<br/>" +
                        "<p> Seu código de confirmação é: " + runCodigoConfirmacao.Codigo + ". " +
                        "</br>" +
                        "</br>" +
                        "Nao se esqueça de complementar seus dados de cadastro. </p>" +
                        "</div>");
                }
            }

            return new
            {
                Retorno = 1,
                Mensagem = "",
                Id = codigoCliente.Id,
                IdCodigoTipoCliente = codigoTipoCliente.Id,
                Codigo = runCodigoConfirmacao.Codigo,
                Telmail = telmail
            };
        }

        public static bool EnviarNotificacao(string id, string title, string msg)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var runnotificacao = new Model.RunNotificacao
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = true,
                Title = title,
                Msg = msg,
                IdCodigoCliente = long.Parse(id)
            };
            repo.RunNotificacaos.InsertOnSubmit(runnotificacao);
            repo.SubmitChanges();

            return true;
        }

        public static bool Enviar(string emailTo, string subject, string body, List<string> emailsCc = null, string arquivo = null)
        {
            var result = false;

            const string @from = "foca@unydata.com";
            var mailObj = new MailMessage(from, emailTo, subject, body) { IsBodyHtml = true };

            if (arquivo != null)
                mailObj.Attachments.Add(new Attachment(arquivo));

            if (emailsCc != null)
            {
                foreach (var m in emailsCc)
                {
                    mailObj.Bcc.Add(m);
                }
            }

            var smpTobj = new SmtpClient("mail.unydata.com")
            {
                Port = 25,
                EnableSsl = false,
                Credentials = new System.Net.NetworkCredential(@from, "admmaster")
            };

            try
            {
                smpTobj.Send(mailObj);
                result = true;
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        public static bool SendMail(string remetente, string destinatario, string assunto, string mensagem)
        {
            try
            {
                // valida o email
                bool bValidaEmail = ValidaEnderecoEmail(destinatario);

                // Se o email não é validao retorna uma mensagem
                if (bValidaEmail == false)
                    return false;

                // cria uma mensagem
                MailMessage mensagemEmail = new MailMessage(remetente, destinatario, assunto, mensagem) { IsBodyHtml = true }; 

                SmtpClient client = new SmtpClient("mail.unydata.com");
                client.Port = 25;
                client.EnableSsl = false;
                NetworkCredential cred = new NetworkCredential("foca@unydata.com", "admmaster");
                client.Credentials = cred;

                // envia a mensagem
                client.Send(mensagemEmail);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public static bool ValidaEnderecoEmail(string enderecoEmail)
        {
            try
            {
                //define a expressão regulara para validar o email
                string texto_Validar = enderecoEmail;
                Regex expressaoRegex = new Regex(@"\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}");

                // testa o email com a expressão
                if (expressaoRegex.IsMatch(texto_Validar))
                {
                    // o email é valido
                    return true;
                }
                else
                {
                    // o email é inválido
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static string GenerateRandomNo()
        {
            int _min = 1000;
            int _max = 9999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max).ToString();
        }
    }
}