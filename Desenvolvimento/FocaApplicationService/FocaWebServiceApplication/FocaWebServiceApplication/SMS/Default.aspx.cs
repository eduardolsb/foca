using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FocaWebServiceApplication.SMS
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoConfirmacao = repo.RunCodigoConfirmacaos.FirstOrDefault(a => a.FlgTelefone == true && a.FlgAtivo == true);
            if (codigoConfirmacao != null)
            {
                codigoConfirmacao.FlgAtivo = false;
                codigoConfirmacao.DataFim = DateTime.Now;
                repo.SubmitChanges();

                var codigoCliente = repo.CodigoClientes.FirstOrDefault(a => a.Id == codigoConfirmacao.IdCodigoCliente && a.FlgAtivo == true);

                if (codigoCliente != null)
                {
                    Response.Write(codigoCliente.TelefoneCompleto + "| FOCA seu codigo de acesso " + codigoConfirmacao.Codigo);
                    return;
                }
            }

            Response.Write("");
            return;
        }
    }
}