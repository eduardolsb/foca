using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace FocaWebServiceApplication.Controller
{
    public class KiLimpeza
    {
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetPedido(string uidpedido)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var runKiLimpezaOperacaos = repo.RunKiLimpezaOperacaos.Where(a => a.Uid.ToString() == uidpedido &&
                                                                                 a.DataPedido != null &&
                                                                                 a.FlgAtivo == true)
                   .OrderBy(a => a.DataPedido);

            return new
            {
                data = runKiLimpezaOperacaos.Select(a => new
                {
                    UidPedido = a.UidPedido,
                    IdPedido = a.Id,
                    Valor = a.ValorTotal,
                    Tempo = a.TempoTotal,

                    IdProfissional = a.IdProfissional,

                    DataPedido = a.DataPedido.Value.ToShortDateString(),
                    HoraPedido = a.DataPedido.Value.ToShortTimeString(),

                    FlgAceiteProfissional = a.FlgAceiteProfissional,
                    DataAceiteProfissional = a.DataAceiteProfissional,

                    FlgFinalizado = a.FlgFinalizado,
                    DataFinalizado = a.DataFinalizado,

                    FlgPagamento = a.FlgPagamento,
                    DataPagamento = a.DataPagamento,
                    NomeProfissional = a.NomeProfissional,

                    FlgRatting = a.FlgRatting,
                    FlgRattingPrestador = a.FlgRattingPrestador,
                })
            };
        }
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetEndereco(string idcliente)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigocliente = repo.CodigoClientes.FirstOrDefault(a => a.Id == long.Parse(idcliente) && a.FlgAtivo == true);
            if (codigocliente == null)
            {
                return new
                {
                    Resultado = 0,
                    Mensagem = "Cliente não encontrado"
                };
            }

            var runEnderecoNew = repo.RunEnderecos.Where(a => a.IdCodigoCliente == codigocliente.Id && a.FlgAtivo == true);

            return new
            {
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
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object AddEndereco(string idcliente, string complemento, string endereco, string nome)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigocliente = repo.CodigoClientes.FirstOrDefault(a => a.Id == long.Parse(idcliente) && a.FlgAtivo == true);
            if (codigocliente == null)
            {
                return new
                {
                    Resultado = 0,
                    Mensagem = "Cliente não encontrado"
                };
            }

            var runEndereco = new Model.RunEndereco
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = true,
                Nome = nome.Trim().ToUpper(),
                Endereco = endereco.Trim(),
                Complemento = complemento.Trim(),
                IdCodigoCliente = codigocliente.Id
            };
            repo.RunEnderecos.InsertOnSubmit(runEndereco);
            repo.SubmitChanges();

            var runEnderecoNew = repo.RunEnderecos.Where(a => a.IdCodigoCliente == codigocliente.Id && a.FlgAtivo == true);

            return new
            {
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
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object GetOrders(string id)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);

            if (codigoCliente.CodigoTipoCliente.Nome == "Cliente")
            {

                var runKiLimpezaOperacaos = repo.RunKiLimpezaOperacaos.Where(a => a.IdCodigoCliente == long.Parse(id) &&
                                                                                  a.DataPedido != null &&
                                                                                  a.FlgAtivo == true)
                    .OrderBy(a => a.DataPedido);

                return new
                {
                    data = runKiLimpezaOperacaos.Select(a => new
                    {
                        UidPedido = a.UidPedido,
                        IdPedido = a.Id,
                        Valor = a.ValorTotal,
                        Tempo = a.TempoTotal,

                        IdProfissional = a.IdProfissional,

                        DataPedido = a.DataPedido.Value.ToShortDateString(),
                        HoraPedido = a.DataPedido.Value.ToShortTimeString(),

                        FlgAceiteProfissional = a.FlgAceiteProfissional,
                        DataAceiteProfissional = a.DataAceiteProfissional,

                        FlgFinalizado = a.FlgFinalizado,
                        DataFinalizado = a.DataFinalizado,

                        FlgPagamento = a.FlgPagamento,
                        DataPagamento = a.DataPagamento,
                        NomeProfissional = a.NomeProfissional,
                         
                        FlgRatting = a.FlgRatting,
                        FlgRattingPrestador = a.FlgRattingPrestador,

                    })
                };
            }
            else if (codigoCliente.CodigoTipoCliente.Nome == "Prestador")
            {
                var runKiLimpezaOperacaos = repo.RunKiLimpezaOperacaos.Where(a => a.IdProfissional == long.Parse(id) &&
                                                                                  a.DataPedido != null &&
                                                                                  a.FlgAtivo == true)
                    .OrderBy(a => a.DataPedido);

                return new
                {
                    data = runKiLimpezaOperacaos.Select(a => new
                    {
                        UidPedido = a.UidPedido,
                        IdPedido = a.Id,
                        Valor = a.ValorTotal,
                        Tempo = a.TempoTotal,

                        DataPedido = a.DataPedido.Value.ToShortDateString(),
                        HoraPedido = a.DataPedido.Value.ToShortTimeString(),

                        FlgAceiteProfissional = a.FlgAceiteProfissional,
                        DataAceiteProfissional = a.DataAceiteProfissional,

                        FlgChegada = a.FlgChegada,
                        DataChegada = a.DataChegada,

                        FlgFinalizado = a.FlgFinalizado,
                        DataFinalizado = a.DataFinalizado,

                        FlgPagamento = a.FlgPagamento,
                        DataPagamento = a.DataPagamento,
                        NomeProfissional = a.NomeProfissional,

                        EnderecoCompleto = a.EnderecoCompleto,
                        Bairro = a.Bairro,
                        Cidade = a.Cidade, 
                        Estado = a.Estado,
                        UF = a.UF,

                        QtdQuartos = a.QtdQuartos,
                        QtdSalas = a.QtdSalas,
                        QtdBanheiros = a.QtdBanheiros,

                        FlgPassar = a.FlgPassar,
                        FlgArmarios = a.FlgArmarios,
                        FlgCozinha = a.FlgCozinha,
                        FlgFogao = a.FlgFogao,  
                        FlgLouca = a.FlgLouca,
                        FlgMateriais = a.FlgMateriais,
                        FlgGeladeira = a.FlgGeladeira,
                        
                        FlgRatting = a.FlgRatting,
                        FlgRattingPrestador = a.FlgRattingPrestador,

                        Diff = (a.DataPedido.Value - DateTime.Now).TotalHours
                    })
                };
            }

            return new
            {
                Resultado = 0,
                Mensagem = ""
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetAction(string id, string atc)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var runKiLimpezaOperacaos = repo.RunKiLimpezaOperacaos.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);
            if (runKiLimpezaOperacaos == null)
            {
                return new
                {
                    Resultado = 0,
                    Mensagem = ""
                };
            }

            var codigoCliente = repo.CodigoClientes.FirstOrDefault(a => a.Id == runKiLimpezaOperacaos.IdProfissional && a.FlgAtivo == true);
            if (codigoCliente == null)
            {
                return new
                {
                    Resultado = 0,
                    Mensagem = ""
                };
            }

            switch (atc)
            {
                case "1": //ACEITOU
                    runKiLimpezaOperacaos.FlgAceiteProfissional = true;
                    runKiLimpezaOperacaos.DataAceiteProfissional = DateTime.Now;
                    repo.SubmitChanges();

                    var runnotificacao = new Model.RunNotificacao
                    {
                        Uid = Guid.NewGuid(),
                        DataFim = null,
                        DataInicio = DateTime.Now,
                        FlgAtivo = true,
                        Title = "FOCA KI-LIMPREZA " + runKiLimpezaOperacaos.Id + " - " + runKiLimpezaOperacaos.UidPedido.ToString().ToUpper().Split('-')[0],
                        Msg = "Sua tarefa será realizada por " + runKiLimpezaOperacaos.NomeProfissional,
                        IdCodigoCliente = runKiLimpezaOperacaos.IdProfissional
                    };
                    repo.RunNotificacaos.InsertOnSubmit(runnotificacao);
                    repo.SubmitChanges();
                    break;
                case "2": //REJEITOU
                    runKiLimpezaOperacaos.IdProfissional = null;
                    repo.SubmitChanges();
                    break;

                case "3": //CANCELOU
                    runKiLimpezaOperacaos.IdProfissional = null;
                    repo.SubmitChanges();
                    break;
                case "4": //INICIAR O SERVIÇO
                    runKiLimpezaOperacaos.DataChegada = DateTime.Now;
                    runKiLimpezaOperacaos.FlgChegada = true;
                    repo.SubmitChanges();

                    var runnotificacao2 = new Model.RunNotificacao
                    {
                        Uid = Guid.NewGuid(),
                        DataFim = null,
                        DataInicio = DateTime.Now,
                        FlgAtivo = true,
                        Title = "FOCA KI-LIMPREZA " + runKiLimpezaOperacaos.Id + " - " + runKiLimpezaOperacaos.UidPedido.ToString().ToUpper().Split('-')[0],
                        Msg = "Sua tarefa foi iniciada por " + runKiLimpezaOperacaos.NomeProfissional,
                        IdCodigoCliente = runKiLimpezaOperacaos.IdProfissional
                    };
                    repo.RunNotificacaos.InsertOnSubmit(runnotificacao2);
                    repo.SubmitChanges();
                    break;
                case "5": //FINALIZA O SERVIÇO
                    runKiLimpezaOperacaos.DataFinalizado = DateTime.Now;
                    runKiLimpezaOperacaos.FlgFinalizado = true;
                    repo.SubmitChanges();

                    var runnotificacao3 = new Model.RunNotificacao
                    {
                        Uid = Guid.NewGuid(),
                        DataFim = null,
                        DataInicio = DateTime.Now,
                        FlgAtivo = true,
                        Title = "FOCA KI-LIMPREZA " + runKiLimpezaOperacaos.Id + " - " + runKiLimpezaOperacaos.UidPedido.ToString().ToUpper().Split('-')[0],
                        Msg = "Sua tarefa foi finalizada por " + runKiLimpezaOperacaos.NomeProfissional,
                        IdCodigoCliente = runKiLimpezaOperacaos.IdProfissional
                    };
                    repo.RunNotificacaos.InsertOnSubmit(runnotificacao3);
                    repo.SubmitChanges();
                    break;
                default:
                    break;
            }

            var runFilaViva = repo.RunFilaVivas.FirstOrDefault(a => a.IdCodigoClientePrestador == codigoCliente.Id &&
                a.CodigoRegiaoAtuacao.NomeSubBairro == runKiLimpezaOperacaos.Bairro && a.FlgAtivo == true);
            if (runFilaViva != null)
            {
                runFilaViva.Ordem = (repo.RunFilaVivas.Count(a => a.IdCodigoClientePrestador != codigoCliente.Id && a.IdCodigoRegiaoAtuacao == runFilaViva.IdCodigoRegiaoAtuacao) + 1);
                runFilaViva.DataAlteracao = DateTime.Now.Ticks;
                runFilaViva.IdRunDemanda = runKiLimpezaOperacaos.Id;
                repo.SubmitChanges();
            }

            if (codigoCliente.CodigoTipoCliente.Nome == "Prestador")
            {
                var runKiLimpezaOperacaosss = repo.RunKiLimpezaOperacaos.Where(a => a.IdProfissional == long.Parse(id) &&
                                                                                  a.DataPedido != null &&
                                                                                  a.FlgAtivo == true)
                    .OrderBy(a => a.DataPedido);

                return new
                {
                    data = runKiLimpezaOperacaosss.Select(a => new
                    {
                        UidPedido = a.UidPedido,
                        IdPedido = a.Id,
                        Valor = a.ValorTotal,
                        Tempo = a.TempoTotal,

                        DataPedido = a.DataPedido.Value.ToShortDateString(),
                        HoraPedido = a.DataPedido.Value.ToShortTimeString(),

                        FlgAceiteProfissional = a.FlgAceiteProfissional,
                        DataAceiteProfissional = a.DataAceiteProfissional,

                        FlgChegada = a.FlgChegada,
                        DataChegada = a.DataChegada,

                        FlgFinalizado = a.FlgFinalizado, 
                        DataFinalizado = a.DataFinalizado,

                        FlgPagamento = a.FlgPagamento,
                        DataPagamento = a.DataPagamento,
                        NomeProfissional = a.NomeProfissional,

                        EnderecoCompleto = a.EnderecoCompleto,
                        Bairro = a.Bairro,
                        Cidade = a.Cidade,
                        Estado = a.Estado,
                        UF = a.UF,

                        QtdQuartos = a.QtdQuartos,
                        QtdSalas = a.QtdSalas,
                        QtdBanheiros = a.QtdBanheiros,

                        FlgPassar = a.FlgPassar,
                        FlgArmarios = a.FlgArmarios,
                        FlgCozinha = a.FlgCozinha,
                        FlgFogao = a.FlgFogao,
                        FlgLouca = a.FlgLouca,
                        FlgMateriais = a.FlgMateriais,
                        FlgGeladeira = a.FlgGeladeira,

                        FlgRatting = a.FlgRatting,
                        FlgRattingPrestador = a.FlgRattingPrestador,

                        Diff = (a.DataPedido.Value - DateTime.Now).TotalHours

                    })
                };
            }

            return new
            {
                Resultado = 0,
                Mensagem = ""
            };
        } 

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetDemandaKiLimpezaOK(string uidpedido, string bairro, string endereco, /*string genero,*/ string data, string hora, string periodicidade)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var runKiLimpezaOperacaos = repo.RunKiLimpezaOperacaos.FirstOrDefault(a => a.UidPedido.ToString() == uidpedido && a.FlgAtivo == true);
            if (runKiLimpezaOperacaos == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = 10001
                };
            }

            runKiLimpezaOperacaos.DataPedido = DateTime.Parse(data + " " + hora + ":00");
            runKiLimpezaOperacaos.EnderecoCompleto = endereco;
            runKiLimpezaOperacaos.Bairro = bairro.Split(',')[0];
            runKiLimpezaOperacaos.Cidade = bairro.Split(',')[1];
            runKiLimpezaOperacaos.Estado = bairro.Split(',')[1];
            runKiLimpezaOperacaos.UF = bairro.Split(',')[2];
            //runKiLimpezaOperacaos.FlgGenero = genero;
            runKiLimpezaOperacaos.FlgGenero = "F";
            runKiLimpezaOperacaos.Periodicidade = periodicidade;

            repo.SubmitChanges();


            var runnotificacao = new Model.RunNotificacao
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = true,
                Title = "FOCA KI-LIMPREZA " + runKiLimpezaOperacaos.Id + " - " + runKiLimpezaOperacaos.UidPedido.ToString().ToUpper().Split('-')[0],
                Msg = "Sua tarefa foi criada com sucesso ",
                IdCodigoCliente = runKiLimpezaOperacaos.IdProfissional
            };
            repo.RunNotificacaos.InsertOnSubmit(runnotificacao);
            repo.SubmitChanges();

            return new
            {
                Resultado = "1",
                Mensagem = "",
                UidPedido = runKiLimpezaOperacaos.UidPedido,
                IdPedido = runKiLimpezaOperacaos.Id
            };
        } 

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetDemandaKiLimpeza(string id, string horas, string valor, string materiais, string quartos, string banheiro, string sala,
        string armarios, string geladeira, string louca, string cozinha, string fogao, string passar)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes.FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);
            if (codigoCliente == null)
            {
                return new
                {
                    Resultado = "0",
                    Mensagem = 10001
                };
            }

            var runKiLimpezaOperacaos = new Model.RunKiLimpezaOperacao
            {
                IdCodigoCliente = codigoCliente.Id,
                IdUsuario = null,
                DataPedido = null,
                UidPedido = Guid.NewGuid(),
                EnderecoCompleto = null,
                Bairro = null,
                Cidade = null,
                Estado = null,
                UF = null,
                FlgGenero = null,
                TempoTotal = decimal.Parse(horas.Replace(".",",")),
                ValorTotal = decimal.Parse(valor.Replace(".", ",")),
                FlgPagamento = null,
                DataPagamento = null,
                FlgAceiteProfissional = null,
                DataAceiteProfissional = null,
                FlgChegada = null,
                DataChegada = null,
                FlgFinalizado = null,
                DataFinalizado = null,
                QtdQuartos = int.Parse(quartos),
                QtdBanheiros = int.Parse(banheiro),
                QtdSalas = int.Parse(sala),
                FlgArmarios = (armarios == "1"),
                FlgGeladeira = (geladeira == "1"),
                FlgLouca = (louca == "1"),
                FlgCozinha = (cozinha == "1"),
                FlgFogao = (fogao == "1"),
                FlgPassar = (passar == "1"),
                FlgMateriais = (materiais == "1"),
                FlgAtivo = true,
                DataInicio = DateTime.Now,
                DataFim = null
            };
            repo.RunKiLimpezaOperacaos.InsertOnSubmit(runKiLimpezaOperacaos);
            repo.SubmitChanges();
            
            return new
            {
                Resultado = "1",
                Mensagem = "",
                UidPedido = runKiLimpezaOperacaos.UidPedido,
                IdPedido = runKiLimpezaOperacaos.Id
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetRatting(string idpedido, string tipocliente, string value)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var runKiLimpezaOperacaos = repo.RunKiLimpezaOperacaos.FirstOrDefault(a => a.Id == long.Parse(idpedido));

            if (runKiLimpezaOperacaos != null)
            {
                if (tipocliente == "Cliente")
                {
                    runKiLimpezaOperacaos.FlgRatting = true;
                    runKiLimpezaOperacaos.ValueRatting = value;
                    repo.SubmitChanges();

                    var runnotificacao = new Model.RunNotificacao
                    {
                        Uid = Guid.NewGuid(),
                        DataFim = null,
                        DataInicio = DateTime.Now,
                        FlgAtivo = true,
                        Title = "FOCA " + runKiLimpezaOperacaos.Id + " - " + runKiLimpezaOperacaos.UidPedido.ToString().ToUpper().Split('-')[0],
                        Msg = "Sua tarefa foi avaliada pelo cliente",
                        IdCodigoCliente = runKiLimpezaOperacaos.IdProfissional
                    };
                    repo.RunNotificacaos.InsertOnSubmit(runnotificacao);
                    repo.SubmitChanges();
                }
                else if (tipocliente == "Prestador")
                {
                    runKiLimpezaOperacaos.FlgRattingPrestador = true;
                    runKiLimpezaOperacaos.ValueRattingPrestador = value;
                    repo.SubmitChanges();

                    var runnotificacao = new Model.RunNotificacao
                    {
                        Uid = Guid.NewGuid(),
                        DataFim = null,
                        DataInicio = DateTime.Now,
                        FlgAtivo = true,
                        Title = "FOCA " + runKiLimpezaOperacaos.Id + " - " + runKiLimpezaOperacaos.UidPedido.ToString().ToUpper().Split('-')[0],
                        Msg = "Sua receptividade foi avaliada pelo prestador",
                        IdCodigoCliente = runKiLimpezaOperacaos.IdCodigoCliente
                    };
                    repo.RunNotificacaos.InsertOnSubmit(runnotificacao);
                    repo.SubmitChanges();
                }
            }
            return new
            {
                Resultado = 1,
                Mensagem = ""
            };
        }

    }
}