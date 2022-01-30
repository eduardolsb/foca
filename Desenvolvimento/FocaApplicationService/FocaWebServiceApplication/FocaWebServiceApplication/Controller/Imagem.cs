using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI.WebControls;
using FocaWebServiceApplication.Model;

namespace FocaWebServiceApplication.Controller
{

    public class Imagem
    {
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetImagem(string id)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var runImagem = repo.RunImages.FirstOrDefault(a => a.Id == long.Parse(id));

            if (runImagem != null)
            {
                return new
                {
                    Retorno = 1,
                    Mensagem = "",
                    Imagem = runImagem.Image
                };
            }

            return new
            {
                Retorno = 0,
                Mensagem = ""
            };
        }

    } 
}