using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FocaWebServiceApplication.REDEFINIR_SENHA
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            var uid = Request.QueryString["Key"];
            var senha1 = TextBox1.Text;
            var senha2 = TextBox2.Text;

            if (senha2 != senha1)
            {
                Response.Write("<script>alert('As senhas estão diferentes.');</script>");
            }

            var repo = new Model.FocaDataClassesDataContext();

            var codigoClientes = repo.CodigoClientes.FirstOrDefault(a => a.Uid.ToString() == uid && a.FlgAtivo == true);

            if (codigoClientes == null)
            {
                Response.Write("<script>alert('Usuário não encontrado.');</script>");
            }

            var usuario = repo.RunUsuarios.FirstOrDefault(a => a.IdCodigoCliente == codigoClientes.Id && a.FlgAtivo == true);

            if (usuario == null)
            {
                Response.Write("<script>alert('Usuário inexistente para este contato.');</script>");
            }

            var bytes = new UTF8Encoding().GetBytes(senha1);
            var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
            var md5Data = Convert.ToBase64String(hashBytes);

            if (usuario != null)
            {
                usuario.Senha = md5Data;
                repo.SubmitChanges();
            }
        }
    }
}