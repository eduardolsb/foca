using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FocaWebServiceApplication.NOTIFICACAO 
{ 
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var id = Request.QueryString["Id"];

            var runNotificacao = repo.RunNotificacaos.FirstOrDefault(a => a.IdCodigoCliente == long.Parse(id) && a.FlgAtivo == true);
            if (runNotificacao != null)
            {
                runNotificacao.FlgAtivo = false;
                runNotificacao.DataFim = DateTime.Now;
                repo.SubmitChanges();

                var codigoCliente = repo.CodigoClientes.FirstOrDefault(a => a.Id == runNotificacao.IdCodigoCliente && a.FlgAtivo == true);

                if (codigoCliente != null)
                {
                    Response.Write(runNotificacao.Title + "|" + runNotificacao.Msg);
                    return;
                }
            }

            Response.Write("");
            return;
        }
    }
}