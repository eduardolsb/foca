using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI.WebControls;
using FocaWebServiceApplication.Model;

namespace FocaWebServiceApplication.Controller
{
    public class Login
    {
        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetUpdatePerfil(string id, string imagem, string nomeuser, string usuario, string senha, string celular, string email, string bancoagencia,
            string bancoconta, string banconome, string bancocpf, string banco, string tipopagamento, string tipocartao, string cartaonumero, string cartaonome,
            string cartaodatavencimento, string cartaocodigoseguranca)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes
                .FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);

            if (codigoCliente == null)
            {
                return new
                {
                    Retorno = 0,
                    Mensagem = ""
                };
            }
            codigoCliente.Nome = nomeuser;
            codigoCliente.Email = email;
            codigoCliente.DDD = (celular.Length > 2) ? celular.Substring(1,2) : null;
            codigoCliente.Telefone = (celular.Length > 11) ? celular.Substring(4, (celular.Length - 4)) : null; 

            codigoCliente.Banco = banco;
            codigoCliente.Agencia = bancoagencia;
            codigoCliente.Conta = bancoconta;
            codigoCliente.CPF = bancocpf;
            codigoCliente.NomeCompleto = banconome;
            repo.SubmitChanges();

            var bytes = new UTF8Encoding().GetBytes(senha);
            var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
            var md5Data = Convert.ToBase64String(hashBytes);

            var runUsuario = repo.RunUsuarios.FirstOrDefault(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true);
            if (runUsuario == null)
            {
                runUsuario = new Model.RunUsuario
                {
                    Uid = Guid.NewGuid(),
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    FlgAtivo = true,
                    IdCodigoCliente = codigoCliente.Id,
                    Senha = md5Data,
                    Usuario = codigoCliente.TelefoneCompleto,
                };
                repo.RunUsuarios.InsertOnSubmit(runUsuario);
                repo.SubmitChanges();
            }
            else
            {
                if (senha != "")
                {
                    runUsuario.Senha = md5Data;
                    repo.SubmitChanges();
                }
            }

            var runAcesso = new Model.RunAcesso
            {
                IMEI = "ND",
                IP4 = "ND",
                IP6 = "ND",
                DataAcesso = DateTime.Now,
                IdRunUsuario = runUsuario.Id,
                Dispositivo  = 0
            };
            repo.RunAcessos.InsertOnSubmit(runAcesso);
            repo.SubmitChanges();

            var runImageCodigoClientess = repo.RunImageCodigoClientes.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true);
            foreach (var ricc in runImageCodigoClientess)
            {
                var _ricc = repo.RunImageCodigoClientes.FirstOrDefault(a => a.Id == ricc.Id && a.FlgAtivo == true);
                _ricc.FlgAtivo = false;
                _ricc.DataFim = DateTime.Now;
                repo.SubmitChanges();
            }

            var newimage = new Model.RunImage
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = "true",
                Image = imagem
            };
            repo.RunImages.InsertOnSubmit(newimage);
            repo.SubmitChanges();

            var newRunImageCodigoCliente = new Model.RunImageCodigoCliente
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = true,
                IdCodigoCliente = codigoCliente.Id,
                IdRunImage = newimage.Id
            };
            repo.RunImageCodigoClientes.InsertOnSubmit(newRunImageCodigoCliente);
            repo.SubmitChanges();

            //if (bancoagencia != "" && bancoconta != "" && banconome != "" && bancocpf != "" && banco != "0")
            if (cartaodatavencimento != "" && cartaocodigoseguranca != "" && cartaonome != "" && cartaonumero != "" && tipocartao != "0")
            {
                var codigoPagamento = new Model.CodigoMeioPagamento
                {
                    Uid = Guid.NewGuid(),
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    FlgAtivo = true,
                    FlgCartao = true,
                    DataValidade = cartaodatavencimento,
                    NomeCartao = cartaonome,
                    NumeroSeguranca = cartaocodigoseguranca,
                    NumeroCartao = cartaonumero,
                    Nome = tipocartao,
                    Descricao = tipopagamento,
                    InfoAdd = tipocartao,
                    IdCodigoCliente = codigoCliente.Id
                };
                repo.CodigoMeioPagamentos.InsertOnSubmit(codigoPagamento);
                repo.SubmitChanges();
            }


            var cartao = repo.CodigoMeioPagamentos.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
            {
                DataValidade = a.DataValidade,
                NomeCartao = a.NomeCartao,
                NumeroSeguranca = a.NumeroSeguranca,
                NumeroCartao = a.NumeroCartao,
                Nome = a.Nome,
                Descricao = a.Descricao,
                InfoAdd = a.InfoAdd,
            });

            var runUsuario1 = repo.RunUsuarios.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
            {
                Usuario = a.Usuario,
                Senha = a.Senha
            });

            return new
            {
                Retorno = 1,
                Mensagem = "",
                Id = codigoCliente.Id,
                IdCodigoTipoCliente = codigoCliente.IdCodigoTipoCliente,
                Nome = codigoCliente.Nome,
                Email = codigoCliente.Email,
                DDD = codigoCliente.DDD,
                Telefone = codigoCliente.Telefone,
                Usuario = codigoCliente.TelefoneCompleto,

                Banco = codigoCliente.Banco,
                Agencia = codigoCliente.Agencia,
                Conta = codigoCliente.Conta,
                CPF = codigoCliente.CPF,
                NomeCompleto = codigoCliente.NomeCompleto,

                Cartao = cartao,

                RunUsuario = runUsuario1,

                StatusPrestador = codigoCliente.CodigoClienteCodigoStatusPrestadors.Where(a=> a.FlgAtivo == true && a.IdCodigoCliente == codigoCliente.Id).Select(a=> new
                { 
                    Id = a.CodigoStatusPrestador.Id,
                    Nome = a.CodigoStatusPrestador.Nome,
                    Descricao = a.CodigoStatusPrestador.Descricao,
                }),
                
                Atividades = codigoCliente.RunKiLimpezaOperacaos.Where(a => a.IdProfissional == codigoCliente.Id && a.DataFinalizado.Value.Month == DateTime.Now.Month
                && a.DataFinalizado.Value.Year == DateTime.Now.Year).Select(a => new
                {
                    ValorTotal = a.ValorTotal,
                    TempoTotal = a.TempoTotal,
                }),

                IdImagem = ((codigoCliente.RunImageCodigoClientes.Any(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true)) ?
                        codigoCliente.RunImageCodigoClientes.FirstOrDefault(b => b.IdCodigoCliente == codigoCliente.Id && b.FlgAtivo == true).IdRunImage : 0)
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetUpdatePerfilPrestador(string id, string imagem, string nomeuser, string usuario, string senha, string celular, string email, string bancoagencia,
            string bancoconta, string banconome, string bancocpf, string banco, string ramo, string[] arrayAtividades)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes
                .FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);

            if (codigoCliente == null)
            {
                return new
                {
                    Retorno = 0,
                    Mensagem = ""
                };
            }
            codigoCliente.Nome = nomeuser;
            codigoCliente.Email = email;
            codigoCliente.DDD = (celular.Length > 2) ? celular.Substring(1, 2) : null;
            codigoCliente.Telefone = (celular.Length > 11) ? celular.Substring(4, (celular.Length - 4)) : null;

            codigoCliente.Banco = banco;
            codigoCliente.Agencia = bancoagencia;
            codigoCliente.Conta = bancoconta;
            codigoCliente.CPF = bancocpf;
            codigoCliente.NomeCompleto = banconome;
            repo.SubmitChanges();

            var bytes = new UTF8Encoding().GetBytes(senha);
            var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
            var md5Data = Convert.ToBase64String(hashBytes);

            var runUsuario = repo.RunUsuarios.FirstOrDefault(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true);
            if (runUsuario == null)
            {
                runUsuario = new Model.RunUsuario
                {
                    Uid = Guid.NewGuid(),
                    DataFim = null,
                    DataInicio = DateTime.Now,
                    FlgAtivo = true,
                    IdCodigoCliente = codigoCliente.Id,
                    Senha = md5Data,
                    Usuario = codigoCliente.TelefoneCompleto,
                };
                repo.RunUsuarios.InsertOnSubmit(runUsuario);
                repo.SubmitChanges();
            }
            else
            {
                if (senha != "")
                {
                    runUsuario.Senha = md5Data;
                    repo.SubmitChanges();
                }
            }

            var runAcesso = new Model.RunAcesso
            {
                IMEI = "ND",
                IP4 = "ND",
                IP6 = "ND",
                DataAcesso = DateTime.Now,
                IdRunUsuario = runUsuario.Id,
                Dispositivo = 0
            };
            repo.RunAcessos.InsertOnSubmit(runAcesso);
            repo.SubmitChanges();

            var runImageCodigoClientess = repo.RunImageCodigoClientes.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true);
            foreach (var ricc in runImageCodigoClientess)
            {
                var _ricc = repo.RunImageCodigoClientes.FirstOrDefault(a => a.Id == ricc.Id && a.FlgAtivo == true);
                _ricc.FlgAtivo = false;
                _ricc.DataFim = DateTime.Now;
                repo.SubmitChanges();
            }

            var newimage = new Model.RunImage
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = "true",
                Image = imagem
            };
            repo.RunImages.InsertOnSubmit(newimage);
            repo.SubmitChanges();

            var newRunImageCodigoCliente = new Model.RunImageCodigoCliente
            {
                Uid = Guid.NewGuid(),
                DataFim = null,
                DataInicio = DateTime.Now,
                FlgAtivo = true,
                IdCodigoCliente = codigoCliente.Id,
                IdRunImage = newimage.Id
            };
            repo.RunImageCodigoClientes.InsertOnSubmit(newRunImageCodigoCliente);
            repo.SubmitChanges();

            if (ramo != "0")
            {
                var codigoAtributo = repo.CodigoAtributos.FirstOrDefault(a => a.Nome == ramo && a.FlgAtivo == true);
                if (codigoAtributo != null)
                {
                    var ultCodigoAtributoCodigoClientes = repo.CodigoAtributoCodigoClientes.FirstOrDefault(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true);
                    if (ultCodigoAtributoCodigoClientes != null)
                    {
                        ultCodigoAtributoCodigoClientes.FlgAtivo = false;
                        ultCodigoAtributoCodigoClientes.DataFim = DateTime.Now;
                        repo.SubmitChanges();
                    }

                    var codigoAtributoCodigoClientes = new Model.CodigoAtributoCodigoCliente
                    {
                        FlgAtivo = true,
                        DataInicio = DateTime.Now,
                        DataFim = null,
                        Uid = Guid.NewGuid(),
                        IdCodigoAtributo = codigoAtributo.Id,
                        IdCodigoCliente = codigoCliente.Id
                    };
                    repo.CodigoAtributoCodigoClientes.InsertOnSubmit(codigoAtributoCodigoClientes);
                    repo.SubmitChanges();
                }
            }

            if (arrayAtividades.Length > 0)
            {
                var ultCodigoClienteRegiaoAtuacao = repo.CodigoRegiaoAtuacaoCodigoClientes.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true);
                foreach (var regiao in ultCodigoClienteRegiaoAtuacao)
                {
                    var delCodigoClienteRegiaoAtuacao = repo.CodigoRegiaoAtuacaoCodigoClientes.FirstOrDefault(a => a.Id == regiao.Id && a.FlgAtivo == true);
                    if (delCodigoClienteRegiaoAtuacao != null)
                    {
                        delCodigoClienteRegiaoAtuacao.FlgAtivo = false;
                        delCodigoClienteRegiaoAtuacao.DataFim = DateTime.Now;
                        repo.SubmitChanges();
                    } 
                }

                foreach (var regiao in arrayAtividades)
                {
                    var codigoRegiaoAtuacao = repo.CodigoRegiaoAtuacaos.FirstOrDefault(a => a.CodigoRegiao == regiao);

                    var codigoRegiaoCodigoCliente = new Model.CodigoRegiaoAtuacaoCodigoCliente
                    {
                        FlgAtivo = true,
                        DataInicio = DateTime.Now,
                        DataFim = null,
                        Uid = Guid.NewGuid(),
                        IdCodigoRegiaoAtuacao = codigoRegiaoAtuacao.Id,
                        IdCodigoCliente = codigoCliente.Id
                    };
                    repo.CodigoRegiaoAtuacaoCodigoClientes.InsertOnSubmit(codigoRegiaoCodigoCliente);
                    repo.SubmitChanges();
                }
            }

            var runFilaViva =repo.RunFilaVivas.Where(a => a.IdCodigoClientePrestador == codigoCliente.Id && a.FlgAtivo == true);
            if (runFilaViva.Any())
            {
                foreach (var rfv in runFilaViva)
                {
                    var delRunFila = repo.RunFilaVivas.FirstOrDefault(a => a.Id == rfv.Id);
                    if (delRunFila != null)
                    {
                        repo.RunFilaVivas.DeleteOnSubmit(delRunFila);
                        repo.SubmitChanges();
                    }
                }
            }

            var codigoRegiaoAtuacaos = codigoCliente.CodigoRegiaoAtuacaoCodigoClientes.Where(
                    a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
                    {
                        Id = a.CodigoRegiaoAtuacao.Id
                    });

            foreach (var cra in codigoRegiaoAtuacaos)
            {
                var runFila = new Model.RunFilaViva
                {
                    FlgAtivo = true,
                    DataInicio = DateTime.Now,
                    DataFim = null,
                    Uid = Guid.NewGuid(),
                    IdCodigoAtributo = 1,
                    IdCodigoRegiaoAtuacao = cra.Id,
                    IdCodigoClientePrestador = codigoCliente.Id,
                    DataAlteracao = DateTime.Now.Ticks,
                    Ordem = (repo.RunFilaVivas.Count(a => a.IdCodigoClientePrestador != codigoCliente.Id && a.IdCodigoRegiaoAtuacao == cra.Id) + 1),
                    IdRunDemanda = null,
                    FlgAceiteDemanda = null,
                    FlgCancelaDemanda = null,
                    FlgRecusaDemanda = null
                };
                repo.RunFilaVivas.InsertOnSubmit(runFila);
                repo.SubmitChanges();
            }

            var cartao = repo.CodigoMeioPagamentos.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
            {
                DataValidade = a.DataValidade,
                NomeCartao = a.NomeCartao,
                NumeroSeguranca = a.NumeroSeguranca,
                NumeroCartao = a.NumeroCartao,
                Nome = a.Nome,
                Descricao = a.Descricao,
                InfoAdd = a.InfoAdd,
            });

            var runUsuario1 = repo.RunUsuarios.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
            {
                Usuario = a.Usuario,
                Senha = a.Senha
            });

            return new
            {
                Retorno = 1,
                Mensagem = "",
                Id = codigoCliente.Id,
                IdCodigoTipoCliente = codigoCliente.IdCodigoTipoCliente,
                Nome = codigoCliente.Nome,
                Email = codigoCliente.Email,
                DDD = codigoCliente.DDD,
                Telefone = codigoCliente.Telefone,
                Usuario = codigoCliente.TelefoneCompleto,

                Banco = codigoCliente.Banco,
                Agencia = codigoCliente.Agencia,
                Conta = codigoCliente.Conta,
                CPF = codigoCliente.CPF,
                NomeCompleto = codigoCliente.NomeCompleto,

                Cartao = cartao,

                RunUsuario = runUsuario1,

                CodigoAtributo = codigoCliente.CodigoAtributoCodigoClientes.Where(a=> a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a=> new
                {
                    Nome = a.CodigoAtributo.Nome
                }),

                CodigoRegiaoAtuacao = codigoCliente.CodigoRegiaoAtuacaoCodigoClientes.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
                {
                    Nome = a.CodigoRegiaoAtuacao.CodigoRegiao
                }),

                StatusPrestador = codigoCliente.CodigoClienteCodigoStatusPrestadors.Where(a => a.FlgAtivo == true && a.IdCodigoCliente == codigoCliente.Id).Select(a => new
                {
                    Id = a.CodigoStatusPrestador.Id,
                    Nome = a.CodigoStatusPrestador.Nome,
                    Descricao = a.CodigoStatusPrestador.Descricao,
                }),

                Atividades = codigoCliente.RunKiLimpezaOperacaos.Where(a => a.IdProfissional == codigoCliente.Id && a.FlgFinalizado == true).Select(a => new
                {
                    ValorTotal = a.ValorTotal,
                    TempoTotal = a.TempoTotal,
                }),

                IdImagem = ((codigoCliente.RunImageCodigoClientes.Any(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true)) ?
                        codigoCliente.RunImageCodigoClientes.FirstOrDefault(b => b.IdCodigoCliente == codigoCliente.Id && b.FlgAtivo == true).IdRunImage : 0)
            };
        }


        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object LogImediate(string id)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes
                .FirstOrDefault(a => a.Id == long.Parse(id) && a.FlgAtivo == true);

            if (codigoCliente == null)
            {
                return new
                {
                    Retorno = 0,
                    Mensagem = ""
                };
            }

            var cartao = repo.CodigoMeioPagamentos.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a=> new
            {
                DataValidade = a.DataValidade,
                NomeCartao = a.NomeCartao,
                NumeroSeguranca = a.NumeroSeguranca,
                NumeroCartao = a.NumeroCartao,
                Nome = a.Nome,
                Descricao = a.Descricao,
                InfoAdd = a.InfoAdd
            });

            var runUsuario = repo.RunUsuarios.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a=> new 
            {
                Usuario = a.Usuario,
                Senha = a.Senha
            });

            return new
            {
                Retorno = 1,
                Mensagem = "",
                Id = codigoCliente.Id,
                IdCodigoTipoCliente = codigoCliente.IdCodigoTipoCliente,
                Nome = codigoCliente.Nome,
                Email = codigoCliente.Email,
                DDD = codigoCliente.DDD,
                Telefone = codigoCliente.Telefone,
                Usuario = codigoCliente.TelefoneCompleto,

                Banco = codigoCliente.Banco,
                Agencia = codigoCliente.Agencia,
                Conta = codigoCliente.Conta,
                CPF = codigoCliente.CPF,
                NomeCompleto = codigoCliente.NomeCompleto,

                Cartao = cartao,

                RunUsuario = runUsuario,

                CodigoAtributo = codigoCliente.CodigoAtributoCodigoClientes.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
                {
                    Nome = a.CodigoAtributo.Nome
                }),

                CodigoRegiaoAtuacao = codigoCliente.CodigoRegiaoAtuacaoCodigoClientes.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
                {
                    Nome = a.CodigoRegiaoAtuacao.CodigoRegiao
                }),

                StatusPrestador = codigoCliente.CodigoClienteCodigoStatusPrestadors.Where(a => a.FlgAtivo == true && a.IdCodigoCliente == codigoCliente.Id).Select(a => new
                {
                    Id = a.CodigoStatusPrestador.Id,
                    Nome = a.CodigoStatusPrestador.Nome,
                    Descricao = a.CodigoStatusPrestador.Descricao,
                }),

                Atividades = repo.RunKiLimpezaOperacaos.Where(a => a.IdProfissional == codigoCliente.Id 
                    && a.FlgFinalizado == true && a.FlgAtivo == true).Select(a => new
                {
                    ValorTotal = a.ValorTotal,
                    TempoTotal = a.TempoTotal,
                }),

                AprovacaoPrestador = repo.RunKiLimpezaOperacaos.Where(a => a.IdProfissional == codigoCliente.Id && a.FlgAceiteProfissional == null && a.FlgAtivo == true).Select(a => new
                {
                    ValorTotal = a.ValorTotal,
                    TempoTotal = a.TempoTotal,
                    Id = a.Id
                }), 

                RattingCliente = repo.RunKiLimpezaOperacaos.Where(a=> 
                    a.FlgRatting == null && 
                    a.FlgFinalizado == true &&
                    a.IdCodigoCliente == codigoCliente.Id && 
                    a.FlgAtivo == true).Select(a=> new
                {
                    IdRunKiLimpezaOperacao = a.Id
                }),

                RattingPrestador = repo.RunKiLimpezaOperacaos.Where(a => 
                    a.FlgRattingPrestador == null &&
                    a.FlgFinalizado == true &&
                    a.IdProfissional == codigoCliente.Id &&
                    a.FlgAtivo == true).Select(a => new
                    {
                        IdRunKiLimpezaOperacao = a.Id
                }), 

                IdImagem = ((codigoCliente.RunImageCodigoClientes.Any(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true)) ?
                        codigoCliente.RunImageCodigoClientes.FirstOrDefault(b => b.IdCodigoCliente == codigoCliente.Id && b.FlgAtivo == true).IdRunImage : 0)
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetLogin(string user, string senha)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var bytes = new UTF8Encoding().GetBytes(senha);
            var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
            var md5Data = Convert.ToBase64String(hashBytes);

            var usuario = repo.RunUsuarios.FirstOrDefault(a => a.Senha == md5Data && a.Usuario == user && a.FlgAtivo == true);

            if (usuario == null)
            {
                return new
                {
                    Retorno = 0,
                    Mensagem = 100001
                };
            }

            var codigoCliente = repo.CodigoClientes.FirstOrDefault(a => a.Id == usuario.IdCodigoCliente && a.FlgAtivo == true);

            var cartao = repo.CodigoMeioPagamentos.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
            {
                DataValidade = a.DataValidade,
                NomeCartao = a.NomeCartao,
                NumeroSeguranca = a.NumeroSeguranca,
                NumeroCartao = a.NumeroCartao,
                Nome = a.Nome,
                Descricao = a.Descricao,
                InfoAdd = a.InfoAdd,
            });

            var runUsuario = repo.RunUsuarios.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
            {
                Usuario = a.Usuario,
                Senha = a.Senha
            });

            return new
            {
                Retorno = 1,
                Mensagem = "",
                Id = codigoCliente.Id,
                IdCodigoTipoCliente = codigoCliente.IdCodigoTipoCliente,
                Nome = codigoCliente.Nome,
                Email = codigoCliente.Email,
                DDD = codigoCliente.DDD,
                Telefone = codigoCliente.Telefone,
                Usuario = codigoCliente.TelefoneCompleto,

                Banco = codigoCliente.Banco,
                Agencia = codigoCliente.Agencia,
                Conta = codigoCliente.Conta,
                CPF = codigoCliente.CPF,
                NomeCompleto = codigoCliente.NomeCompleto,

                Cartao = cartao,

                RunUsuario = runUsuario,

                CodigoAtributo = codigoCliente.CodigoAtributoCodigoClientes.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
                {
                    Nome = a.CodigoAtributo.Nome
                }),

                CodigoRegiaoAtuacao = codigoCliente.CodigoRegiaoAtuacaoCodigoClientes.Where(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true).Select(a => new
                {
                    Nome = a.CodigoRegiaoAtuacao.CodigoRegiao
                }),

                StatusPrestador = codigoCliente.CodigoClienteCodigoStatusPrestadors.Where(a => a.FlgAtivo == true && a.IdCodigoCliente == codigoCliente.Id).Select(a => new
                {
                    Id = a.CodigoStatusPrestador.Id,
                    Nome = a.CodigoStatusPrestador.Nome,
                    Descricao = a.CodigoStatusPrestador.Descricao,
                }),

                Atividades = codigoCliente.RunKiLimpezaOperacaos.Where(a => a.IdProfissional == codigoCliente.Id && a.FlgFinalizado == true && a.FlgAtivo == true).Select(a => new
                {
                    ValorTotal = a.ValorTotal,
                    TempoTotal = a.TempoTotal,
                    Id = a.Id
                }),

                AprovacaoPrestador = codigoCliente.RunKiLimpezaOperacaos.Where(a => a.IdProfissional == codigoCliente.Id && a.FlgAceiteProfissional == null && a.FlgAtivo == true).Select(a => new
                {
                    ValorTotal = a.ValorTotal,
                    TempoTotal = a.TempoTotal,
                    Id = a.Id
                }), 

                RattingCliente = repo.RunKiLimpezaOperacaos.Where(a =>
                    a.FlgRatting == null &&
                    a.FlgFinalizado == true &&
                    a.IdCodigoCliente == codigoCliente.Id &&
                    a.FlgAtivo == true).Select(a => new
                    {
                        IdRunKiLimpezaOperacao = a.Id
                    }),

                RattingPrestador = repo.RunKiLimpezaOperacaos.Where(a =>
                    a.FlgRattingPrestador == null &&
                    a.FlgFinalizado == true &&
                    a.IdProfissional == codigoCliente.Id &&
                    a.FlgAtivo == true).Select(a => new
                    {
                        IdRunKiLimpezaOperacao = a.Id
                    }), 

                IdImagem = ((codigoCliente.RunImageCodigoClientes.Any(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true)) ?
                        codigoCliente.RunImageCodigoClientes.FirstOrDefault(b => b.IdCodigoCliente == codigoCliente.Id && b.FlgAtivo == true).IdRunImage : 0)
            };
        }

        [WebMethod(EnableSession = true), ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static object SetEsqueciSenha(string user)
        {
            var repo = new Model.FocaDataClassesDataContext();

            var codigoCliente = repo.CodigoClientes.FirstOrDefault(a => a.TelefoneCompleto == user && a.FlgAtivo == true);

            if (codigoCliente != null)
            {
                var usuario = repo.RunUsuarios.FirstOrDefault(a => a.IdCodigoCliente == codigoCliente.Id && a.FlgAtivo == true);

                if (user.Contains("@"))
                {
                    CodigoConfirmacao.SendMail("carloselsb@gmail.com", user,
                        "Foca | Gerar nova senha para " + codigoCliente.NomeCompleto,
                        "<div style='width:100%;height:1000px;'>" +
                        "" +
                        "<h2> FOCA </h2>" +
                        "<hr/>" +
                        "<br/>" +
                        "<br/>" +
                        "<p> Clique no link para gerar uma nova senha de acesso: <a href='" + CONFIG.Core.URL + "/REDEFINIR_SENHA/Default.aspx?Key=" + codigoCliente.Uid + "'> clique aqui </a>. " +
                        "</br>" +
                        "</br>" +
                        "Nao se esqueça de complementar seus dados de cadastro e mante-los sempre atualizados. </p>" +
                        "</div>");
                }
                else
                {
                    var notificacao = new Model.RunNotificacao
                    {
                        Uid = Guid.NewGuid(),
                        DataFim = null,
                        DataInicio = DateTime.Now,
                        FlgAtivo = true,
                        IdCodigoCliente = codigoCliente.Id,
                        Title = "Recuperacao de senha",
                        Msg = "Foi enviado um link para gerar nova senha: " + CONFIG.Core.URL + "/REDEFINIR_SENHA/Default.aspx?Key=" + codigoCliente.Uid + ""
                    };
                    repo.RunNotificacaos.InsertOnSubmit(notificacao);
                    repo.SubmitChanges();
                }
            }
            
            return new
            {
                Retorno = 1,
                Mensagem = ""
            };
        }
    }
} 