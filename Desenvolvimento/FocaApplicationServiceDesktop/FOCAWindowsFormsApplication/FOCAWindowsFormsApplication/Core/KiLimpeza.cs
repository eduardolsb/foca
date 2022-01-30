using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;

namespace FOCAWindowsFormsApplication.Core
{
    class KiLimpeza
    {
        public static void Start() 
        {
            var repo = new Model.FOCADataClassesDataContext();

            while (true)
            {
                var runKiLimpezaOperacao = repo.RunKiLimpezaOperacaos.OrderByDescending(a => a.DataPedido).Where(a => a.DataPedido > DateTime.Today).FirstOrDefault(a => a.IdProfissional == null);

                if (runKiLimpezaOperacao != null)
                {
                    var codigoRegiaoAtuacao = repo.CodigoRegiaoAtuacaos.FirstOrDefault(a => a.NomeSubBairro.Trim() == runKiLimpezaOperacao.Bairro.Trim());
                     
                    var codigoAtributo = repo.CodigoAtributos.FirstOrDefault(a => a.Nome == "Limpeza");

                    if (codigoRegiaoAtuacao != null && codigoAtributo != null)
                    {
                        var runFilaVivaProx = repo.RunFilaVivas.OrderBy(a => a.Ordem).FirstOrDefault(a => a.FlgAtivo == true
                            && a.IdCodigoAtributo == codigoAtributo.Id
                            && a.IdCodigoRegiaoAtuacao == codigoRegiaoAtuacao.Id);

                        var codigoClientePrestador = repo.CodigoClientes.FirstOrDefault(a => a.Id == runFilaVivaProx.IdCodigoClientePrestador
                            && a.CodigoRegiaoAtuacaoCodigoClientes.Any(b => b.IdCodigoRegiaoAtuacao == codigoRegiaoAtuacao.Id)
                            && a.CodigoAtributoCodigoClientes.Any(b => b.IdCodigoAtributo == codigoAtributo.Id)
                            && a.CodigoClienteCodigoStatusPrestadors.Any(b => b.IdCodigoStatusPrestador == 1));

                        if (codigoClientePrestador != null)
                        {

                            var _runkiLimpeza = repo.RunKiLimpezaOperacaos.FirstOrDefault(a => a.Id == runKiLimpezaOperacao.Id);
                            _runkiLimpeza.IdProfissional = codigoClientePrestador.Id;
                            _runkiLimpeza.NomeProfissional = codigoClientePrestador.Nome;
                            repo.SubmitChanges();

                            
                            /*REORDENA*/
                            var filaViva = repo.RunFilaVivas.Where(a => a.IdCodigoRegiaoAtuacao == codigoRegiaoAtuacao.Id && a.FlgAtivo == true).OrderBy(a => a.Ordem);
                            foreach (var lista in filaViva)
                            {
                                var fv = repo.RunFilaVivas.FirstOrDefault(a => a.Id == lista.Id);
                                fv.Ordem = (fv.Ordem - 1);
                                fv.DataAlteração = DateTime.Now.Ticks;
                                repo.SubmitChanges();

                                if (fv.Ordem <= 0)
                                {
                                    fv.Ordem = (repo.RunFilaVivas.Count(a => a.IdCodigoClientePrestador != codigoClientePrestador.Id 
                                        && a.IdCodigoRegiaoAtuacao == codigoRegiaoAtuacao.Id) + 1);
                                    repo.SubmitChanges();
                                }
                            }

                            var runnotificacao = new Model.RunNotificacao
                            {
                                Uid = Guid.NewGuid(),
                                DataFim = null,
                                DataInicio = DateTime.Now,
                                FlgAtivo = true,
                                Title = "FOCA " + _runkiLimpeza.Id + " - " + _runkiLimpeza.UidPedido.ToString().ToUpper().Split('-')[0],
                                Msg = "Sua demanda foi atualizada",
                                IdCodigoCliente = _runkiLimpeza.IdCodigoCliente
                            };
                            repo.RunNotificacaos.InsertOnSubmit(runnotificacao);
                            repo.SubmitChanges();
                        }
                    }
                }

                Thread.Sleep(10000);
            }
        }

        public static bool EnviarNotificacao(string id, string title, string msg)
        {
            var repo = new Model.FOCADataClassesDataContext();

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
    }
}
