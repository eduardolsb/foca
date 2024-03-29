USE [master]
GO
/****** Object:  Database [foca]    Script Date: 24/01/2019 18:00:30 ******/
CREATE DATABASE [foca] ON  PRIMARY 
( NAME = N'foca', FILENAME = N'C:\Program Files (x86)\Parallels\Plesk\Databases\MSSQL\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\foca.mdf' , SIZE = 3328KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'foca_log', FILENAME = N'C:\Program Files (x86)\Parallels\Plesk\Databases\MSSQL\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\foca_log.ldf' , SIZE = 3456KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [foca] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [foca].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [foca] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [foca] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [foca] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [foca] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [foca] SET ARITHABORT OFF 
GO
ALTER DATABASE [foca] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [foca] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [foca] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [foca] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [foca] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [foca] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [foca] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [foca] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [foca] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [foca] SET  DISABLE_BROKER 
GO
ALTER DATABASE [foca] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [foca] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [foca] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [foca] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [foca] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [foca] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [foca] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [foca] SET RECOVERY FULL 
GO
ALTER DATABASE [foca] SET  MULTI_USER 
GO
ALTER DATABASE [foca] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [foca] SET DB_CHAINING OFF 
GO
USE [foca]
GO
/****** Object:  User [cooper]    Script Date: 24/01/2019 18:00:33 ******/
CREATE USER [cooper] FOR LOGIN [cooper] WITH DEFAULT_SCHEMA=[cooper]
GO
/****** Object:  User [bdez]    Script Date: 24/01/2019 18:00:33 ******/
CREATE USER [bdez] FOR LOGIN [bdez] WITH DEFAULT_SCHEMA=[bdez]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [cooper]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [cooper]
GO
ALTER ROLE [db_datareader] ADD MEMBER [cooper]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [cooper]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [bdez]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [bdez]
GO
ALTER ROLE [db_datareader] ADD MEMBER [bdez]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [bdez]
GO
/****** Object:  Schema [bdez]    Script Date: 24/01/2019 18:00:34 ******/
CREATE SCHEMA [bdez]
GO
/****** Object:  Schema [cooper]    Script Date: 24/01/2019 18:00:35 ******/
CREATE SCHEMA [cooper]
GO
/****** Object:  Table [cooper].[RunKiLimpezaOperacao]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [cooper].[RunKiLimpezaOperacao](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoCliente] [bigint] NULL,
	[IdUsuario] [bigint] NULL,
	[IdProfissional] [bigint] NULL,
	[NomeProfissional] [varchar](500) NULL,
	[DataPedido] [datetime] NULL,
	[UidPedido] [uniqueidentifier] NULL CONSTRAINT [DF_RunKiLimpezaOperacao_UidPedido]  DEFAULT (newid()),
	[EnderecoCompleto] [varchar](1000) NULL,
	[Bairro] [varchar](150) NULL,
	[Cidade] [varchar](150) NULL,
	[Estado] [varchar](150) NULL,
	[UF] [varchar](150) NULL,
	[FlgGenero] [varchar](50) NULL,
	[TempoTotal] [numeric](18, 2) NULL,
	[ValorTotal] [numeric](18, 2) NULL,
	[FlgPagamento] [bit] NULL,
	[DataPagamento] [datetime] NULL,
	[FlgAceiteProfissional] [bit] NULL,
	[DataAceiteProfissional] [datetime] NULL,
	[FlgChegada] [bit] NULL,
	[DataChegada] [datetime] NULL,
	[FlgFinalizado] [bit] NULL,
	[DataFinalizado] [datetime] NULL,
	[QtdQuartos] [int] NULL,
	[QtdBanheiros] [int] NULL,
	[QtdSalas] [int] NULL,
	[FlgArmarios] [bit] NULL,
	[FlgGeladeira] [bit] NULL,
	[FlgLouca] [bit] NULL,
	[FlgCozinha] [bit] NULL,
	[FlgFogao] [bit] NULL,
	[FlgPassar] [bit] NULL,
	[FlgMateriais] [bit] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_RunKiLimpezaOperacao_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_RunKiLimpezaOperacao_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_RunKiLimpezaOperacao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CodigoAtributo]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CodigoAtributo](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](500) NULL,
	[Descricao] [varchar](1000) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_CodigoAtributo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CodigoAtributoCodigoCliente]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CodigoAtributoCodigoCliente](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoAtributo] [bigint] NULL,
	[IdCodigoCliente] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_CodigoAtributoCodigoCliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CodigoAtuacaoCodigoAtributo]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CodigoAtuacaoCodigoAtributo](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoRegiaoAtuacao] [bigint] NULL,
	[IdCodigoAtributo] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_CodigoAtuacaoCodigoAtributo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CodigoCliente]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CodigoCliente](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoTipoCliente] [bigint] NULL,
	[Nome] [varchar](1000) NULL,
	[Email] [varchar](500) NULL,
	[DDD] [varchar](10) NULL,
	[Telefone] [varchar](50) NULL,
	[TelefoneCompleto] [varchar](50) NULL,
	[Banco] [varchar](50) NULL,
	[Agencia] [varchar](50) NULL,
	[Conta] [varchar](50) NULL,
	[CPF] [varchar](50) NULL,
	[NomeCompleto] [varchar](500) NULL,
	[FlgPerfilConfirmado] [bit] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_CodigoCliente_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_CodigoCliente_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_CodigoCliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CodigoMeioPagamento]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CodigoMeioPagamento](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoCliente] [bigint] NULL,
	[Nome] [varchar](500) NULL,
	[Descricao] [varchar](1000) NULL,
	[FlgCartao] [bit] NULL,
	[NumeroCartao] [nvarchar](500) NULL,
	[NomeCartao] [nvarchar](50) NULL,
	[DataValidade] [nvarchar](50) NULL,
	[NumeroSeguranca] [nvarchar](50) NULL,
	[InfoAdd] [nvarchar](50) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_CodigoMeioPagamento_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_CodigoMeioPagamento_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_CodigoMeioPagamento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CodigoOperacao]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CodigoOperacao](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[NomeDemanda] [nvarchar](500) NULL,
	[CodigoDemanda] [nvarchar](50) NULL,
	[Valor] [numeric](18, 2) NULL,
	[ValorInteiro] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_CodigoOperacao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CodigoRegiaoAtuacao]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CodigoRegiaoAtuacao](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CodigoRegiao] [varchar](500) NULL,
	[NomeSubBairro] [nvarchar](500) NULL,
	[Cidade] [nvarchar](500) NULL,
	[Estado] [nvarchar](500) NULL,
	[UF] [nvarchar](50) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_CodigoRegiaoAtuacao_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_CodigoRegiaoAtuacao_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_CodigoRegiaoAtuacao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CodigoRegiaoAtuacaoCodigoCliente]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CodigoRegiaoAtuacaoCodigoCliente](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoRegiaoAtuacao] [bigint] NULL,
	[IdCodigoCliente] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_CodigoRegiaoAtuacaoCodigoCliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CodigoTipoCliente]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CodigoTipoCliente](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](50) NULL,
	[Descricao] [varchar](50) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_CodigoTipoCliente_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_CodigoTipoCliente_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_CodigoTipoCliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RunAcesso]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RunAcesso](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdRunUsuario] [bigint] NULL,
	[DataAcesso] [datetime] NULL CONSTRAINT [DF_RunAcesso_DataAcesso]  DEFAULT (getdate()),
	[Dispositivo] [int] NULL,
	[IMEI] [varchar](50) NULL,
	[IP4] [varchar](50) NULL,
	[IP6] [varchar](50) NULL,
 CONSTRAINT [PK_RunAcesso] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RunCodigoConfirmacao]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RunCodigoConfirmacao](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoCliente] [bigint] NULL,
	[Codigo] [nvarchar](50) NULL,
	[FlgEmail] [bit] NULL,
	[FlgTelefone] [bit] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_RunCodigoConfirmacao_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_RunCodigoConfirmacao_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_RunCodigoConfirmacao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RunImage]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RunImage](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Image] [nvarchar](max) NULL,
	[FlgAtivo] [nchar](10) NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_RunImage_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_RunImage_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_RunImage] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RunImageCodigoCliente]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RunImageCodigoCliente](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoCliente] [bigint] NULL,
	[IdRunImage] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_RunImageCodigoCliente_DataInicio]  DEFAULT (getdate()),
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_RunImageCodigoCliente_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_RunImageCodigoCliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RunLancamento]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RunLancamento](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoCliente] [bigint] NULL,
	[DataOperacao] [datetime] NULL,
	[ValorOperacao] [numeric](18, 2) NULL,
	[ValorOperacaoInteiro] [bigint] NULL,
	[FlgPagamento] [bit] NULL,
	[DataConfirmacaoPagamento] [datetime] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_RunLancamento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RunLancamentoRunPagamento]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RunLancamentoRunPagamento](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdRunLancamento] [bigint] NULL,
	[IdRunPagamento] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_RunLancamentoRunPagamento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RunOperacao]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RunOperacao](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdRunLancamento] [bigint] NULL,
	[IdCodigoOperacao] [bigint] NULL,
	[IdCodigoCliente] [bigint] NULL,
	[ValorOperacao] [numeric](18, 2) NULL,
	[ValorOperacaoInteiro] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_RunOperacao] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RunPagamento]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RunPagamento](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdTipoOperacao] [bigint] NULL,
	[IdMeioPagamento] [bigint] NULL,
	[IdCodigoCliente] [bigint] NULL,
	[ValorPago] [numeric](18, 2) NULL,
	[ValorPagoInteiro] [bigint] NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_RunPagamento] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RunRating]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RunRating](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoClienteCliente] [bigint] NULL,
	[IdCodigoClientePretador] [bigint] NULL,
	[IndiceAvaliacao] [int] NULL,
	[DescricaoAvaliacao] [varchar](1000) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL,
	[DataFim] [datetime] NULL,
	[Uid] [uniqueidentifier] NULL,
 CONSTRAINT [PK_RunRating] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RunUsuario]    Script Date: 24/01/2019 18:00:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RunUsuario](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCodigoCliente] [bigint] NULL,
	[Usuario] [varchar](500) NULL,
	[Senha] [nvarchar](50) NULL,
	[FlgAtivo] [bit] NULL,
	[DataInicio] [datetime] NULL CONSTRAINT [DF_RunUsuario_DataInicio]  DEFAULT (getdate()),
	[DataFim] [date] NULL,
	[Uid] [uniqueidentifier] NULL CONSTRAINT [DF_RunUsuario_Uid]  DEFAULT (newid()),
 CONSTRAINT [PK_RunUsuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[CodigoAtributo] ADD  CONSTRAINT [DF_CodigoAtributo_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[CodigoAtributo] ADD  CONSTRAINT [DF_CodigoAtributo_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[CodigoAtributoCodigoCliente] ADD  CONSTRAINT [DF_CodigoAtributoCodigoCliente_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[CodigoAtributoCodigoCliente] ADD  CONSTRAINT [DF_CodigoAtributoCodigoCliente_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[CodigoAtuacaoCodigoAtributo] ADD  CONSTRAINT [DF_CodigoAtuacaoCodigoAtributo_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[CodigoAtuacaoCodigoAtributo] ADD  CONSTRAINT [DF_CodigoAtuacaoCodigoAtributo_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[CodigoOperacao] ADD  CONSTRAINT [DF_CodigoOperacao_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[CodigoOperacao] ADD  CONSTRAINT [DF_CodigoOperacao_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[CodigoRegiaoAtuacaoCodigoCliente] ADD  CONSTRAINT [DF_CodigoRegiaoAtuacaoCodigoCliente_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[CodigoRegiaoAtuacaoCodigoCliente] ADD  CONSTRAINT [DF_CodigoRegiaoAtuacaoCodigoCliente_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[RunLancamento] ADD  CONSTRAINT [DF_RunLancamento_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[RunLancamento] ADD  CONSTRAINT [DF_RunLancamento_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[RunLancamentoRunPagamento] ADD  CONSTRAINT [DF_RunLancamentoRunPagamento_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[RunLancamentoRunPagamento] ADD  CONSTRAINT [DF_RunLancamentoRunPagamento_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[RunOperacao] ADD  CONSTRAINT [DF_RunOperacao_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[RunOperacao] ADD  CONSTRAINT [DF_RunOperacao_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[RunPagamento] ADD  CONSTRAINT [DF_RunPagamento_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[RunPagamento] ADD  CONSTRAINT [DF_RunPagamento_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[RunRating] ADD  CONSTRAINT [DF_RunRating_DataInicio]  DEFAULT (getdate()) FOR [DataInicio]
GO
ALTER TABLE [dbo].[RunRating] ADD  CONSTRAINT [DF_RunRating_Uid]  DEFAULT (newid()) FOR [Uid]
GO
ALTER TABLE [dbo].[CodigoAtributoCodigoCliente]  WITH CHECK ADD  CONSTRAINT [FK_CodigoAtributoCodigoCliente_CodigoAtributo] FOREIGN KEY([IdCodigoAtributo])
REFERENCES [dbo].[CodigoAtributo] ([Id])
GO
ALTER TABLE [dbo].[CodigoAtributoCodigoCliente] CHECK CONSTRAINT [FK_CodigoAtributoCodigoCliente_CodigoAtributo]
GO
ALTER TABLE [dbo].[CodigoAtributoCodigoCliente]  WITH CHECK ADD  CONSTRAINT [FK_CodigoAtributoCodigoCliente_CodigoCliente] FOREIGN KEY([IdCodigoCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[CodigoAtributoCodigoCliente] CHECK CONSTRAINT [FK_CodigoAtributoCodigoCliente_CodigoCliente]
GO
ALTER TABLE [dbo].[CodigoAtuacaoCodigoAtributo]  WITH CHECK ADD  CONSTRAINT [FK_CodigoAtuacaoCodigoAtributo_CodigoAtributo] FOREIGN KEY([IdCodigoAtributo])
REFERENCES [dbo].[CodigoAtributo] ([Id])
GO
ALTER TABLE [dbo].[CodigoAtuacaoCodigoAtributo] CHECK CONSTRAINT [FK_CodigoAtuacaoCodigoAtributo_CodigoAtributo]
GO
ALTER TABLE [dbo].[CodigoAtuacaoCodigoAtributo]  WITH CHECK ADD  CONSTRAINT [FK_CodigoAtuacaoCodigoAtributo_CodigoRegiaoAtuacao] FOREIGN KEY([IdCodigoRegiaoAtuacao])
REFERENCES [dbo].[CodigoRegiaoAtuacao] ([Id])
GO
ALTER TABLE [dbo].[CodigoAtuacaoCodigoAtributo] CHECK CONSTRAINT [FK_CodigoAtuacaoCodigoAtributo_CodigoRegiaoAtuacao]
GO
ALTER TABLE [dbo].[CodigoCliente]  WITH CHECK ADD  CONSTRAINT [FK_CodigoCliente_CodigoTipoCliente] FOREIGN KEY([IdCodigoTipoCliente])
REFERENCES [dbo].[CodigoTipoCliente] ([Id])
GO
ALTER TABLE [dbo].[CodigoCliente] CHECK CONSTRAINT [FK_CodigoCliente_CodigoTipoCliente]
GO
ALTER TABLE [dbo].[CodigoMeioPagamento]  WITH CHECK ADD  CONSTRAINT [FK_CodigoMeioPagamento_CodigoCliente] FOREIGN KEY([IdCodigoCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[CodigoMeioPagamento] CHECK CONSTRAINT [FK_CodigoMeioPagamento_CodigoCliente]
GO
ALTER TABLE [dbo].[CodigoRegiaoAtuacaoCodigoCliente]  WITH CHECK ADD  CONSTRAINT [FK_CodigoRegiaoAtuacaoCodigoCliente_CodigoCliente] FOREIGN KEY([IdCodigoCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[CodigoRegiaoAtuacaoCodigoCliente] CHECK CONSTRAINT [FK_CodigoRegiaoAtuacaoCodigoCliente_CodigoCliente]
GO
ALTER TABLE [dbo].[CodigoRegiaoAtuacaoCodigoCliente]  WITH CHECK ADD  CONSTRAINT [FK_CodigoRegiaoAtuacaoCodigoCliente_CodigoRegiaoAtuacao] FOREIGN KEY([IdCodigoRegiaoAtuacao])
REFERENCES [dbo].[CodigoRegiaoAtuacao] ([Id])
GO
ALTER TABLE [dbo].[CodigoRegiaoAtuacaoCodigoCliente] CHECK CONSTRAINT [FK_CodigoRegiaoAtuacaoCodigoCliente_CodigoRegiaoAtuacao]
GO
ALTER TABLE [dbo].[RunAcesso]  WITH CHECK ADD  CONSTRAINT [FK_RunAcesso_RunUsuario] FOREIGN KEY([IdRunUsuario])
REFERENCES [dbo].[RunUsuario] ([Id])
GO
ALTER TABLE [dbo].[RunAcesso] CHECK CONSTRAINT [FK_RunAcesso_RunUsuario]
GO
ALTER TABLE [dbo].[RunCodigoConfirmacao]  WITH CHECK ADD  CONSTRAINT [FK_RunCodigoConfirmacao_CodigoCliente] FOREIGN KEY([IdCodigoCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[RunCodigoConfirmacao] CHECK CONSTRAINT [FK_RunCodigoConfirmacao_CodigoCliente]
GO
ALTER TABLE [dbo].[RunImageCodigoCliente]  WITH CHECK ADD  CONSTRAINT [FK_RunImageCodigoCliente_CodigoCliente] FOREIGN KEY([IdCodigoCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[RunImageCodigoCliente] CHECK CONSTRAINT [FK_RunImageCodigoCliente_CodigoCliente]
GO
ALTER TABLE [dbo].[RunImageCodigoCliente]  WITH CHECK ADD  CONSTRAINT [FK_RunImageCodigoCliente_RunImage] FOREIGN KEY([IdRunImage])
REFERENCES [dbo].[RunImage] ([Id])
GO
ALTER TABLE [dbo].[RunImageCodigoCliente] CHECK CONSTRAINT [FK_RunImageCodigoCliente_RunImage]
GO
ALTER TABLE [dbo].[RunLancamento]  WITH CHECK ADD  CONSTRAINT [FK_RunLancamento_CodigoCliente] FOREIGN KEY([IdCodigoCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[RunLancamento] CHECK CONSTRAINT [FK_RunLancamento_CodigoCliente]
GO
ALTER TABLE [dbo].[RunLancamentoRunPagamento]  WITH CHECK ADD  CONSTRAINT [FK_RunLancamentoRunPagamento_RunLancamento] FOREIGN KEY([IdRunLancamento])
REFERENCES [dbo].[RunLancamento] ([Id])
GO
ALTER TABLE [dbo].[RunLancamentoRunPagamento] CHECK CONSTRAINT [FK_RunLancamentoRunPagamento_RunLancamento]
GO
ALTER TABLE [dbo].[RunLancamentoRunPagamento]  WITH CHECK ADD  CONSTRAINT [FK_RunLancamentoRunPagamento_RunPagamento] FOREIGN KEY([IdRunPagamento])
REFERENCES [dbo].[RunPagamento] ([Id])
GO
ALTER TABLE [dbo].[RunLancamentoRunPagamento] CHECK CONSTRAINT [FK_RunLancamentoRunPagamento_RunPagamento]
GO
ALTER TABLE [dbo].[RunOperacao]  WITH CHECK ADD  CONSTRAINT [FK_RunOperacao_CodigoCliente] FOREIGN KEY([IdCodigoCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[RunOperacao] CHECK CONSTRAINT [FK_RunOperacao_CodigoCliente]
GO
ALTER TABLE [dbo].[RunOperacao]  WITH CHECK ADD  CONSTRAINT [FK_RunOperacao_CodigoOperacao] FOREIGN KEY([IdCodigoOperacao])
REFERENCES [dbo].[CodigoOperacao] ([Id])
GO
ALTER TABLE [dbo].[RunOperacao] CHECK CONSTRAINT [FK_RunOperacao_CodigoOperacao]
GO
ALTER TABLE [dbo].[RunOperacao]  WITH CHECK ADD  CONSTRAINT [FK_RunOperacao_RunLancamento] FOREIGN KEY([IdRunLancamento])
REFERENCES [dbo].[RunLancamento] ([Id])
GO
ALTER TABLE [dbo].[RunOperacao] CHECK CONSTRAINT [FK_RunOperacao_RunLancamento]
GO
ALTER TABLE [dbo].[RunPagamento]  WITH CHECK ADD  CONSTRAINT [FK_RunPagamento_CodigoMeioPagamento] FOREIGN KEY([IdMeioPagamento])
REFERENCES [dbo].[CodigoMeioPagamento] ([Id])
GO
ALTER TABLE [dbo].[RunPagamento] CHECK CONSTRAINT [FK_RunPagamento_CodigoMeioPagamento]
GO
ALTER TABLE [dbo].[RunRating]  WITH CHECK ADD  CONSTRAINT [FK_RunRating_CodigoCliente] FOREIGN KEY([IdCodigoClienteCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[RunRating] CHECK CONSTRAINT [FK_RunRating_CodigoCliente]
GO
ALTER TABLE [dbo].[RunRating]  WITH CHECK ADD  CONSTRAINT [FK_RunRating_CodigoCliente1] FOREIGN KEY([IdCodigoClientePretador])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[RunRating] CHECK CONSTRAINT [FK_RunRating_CodigoCliente1]
GO
ALTER TABLE [dbo].[RunUsuario]  WITH CHECK ADD  CONSTRAINT [FK_RunUsuario_CodigoCliente] FOREIGN KEY([IdCodigoCliente])
REFERENCES [dbo].[CodigoCliente] ([Id])
GO
ALTER TABLE [dbo].[RunUsuario] CHECK CONSTRAINT [FK_RunUsuario_CodigoCliente]
GO
USE [master]
GO
ALTER DATABASE [foca] SET  READ_WRITE 
GO


/******   
SELECT TOP 1000 [Id]
      ,[IdCodigoTipoCliente]
      ,[Nome]
      ,[Email]
      ,[DDD]
      ,[Telefone]
      ,[TelefoneCompleto]
      ,[Banco]
      ,[Agencia]
      ,[Conta]
      ,[CPF]
      ,[NomeCompleto]
      ,[FlgPerfilConfirmado]
      ,[FlgAtivo]
      ,[DataInicio]
      ,[DataFim]
      ,[Uid]
  FROM [foca].[dbo].[CodigoCliente]

Id                   IdCodigoTipoCliente  Nome                                                                                                                                                                                                                                                             Email                                                                                                                                                                                                                                                            DDD        Telefone                                           TelefoneCompleto                                   Banco                                              Agencia                                            Conta                                              CPF                                                NomeCompleto                                                                                                                                                                                                                                                     FlgPerfilConfirmado FlgAtivo DataInicio              DataFim                 Uid
-------------------- -------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------- -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------- -------- ----------------------- ----------------------- ------------------------------------
1                    1                    Administrador                                                                                                                                                                                                                                                    foca@unydata.com                                                                                                                                                                                                                                                 21         32641480                                           NULL                                               NULL                                               NULL                                               NULL                                               NULL                                               NULL                                                                                                                                                                                                                                                             NULL                1        2017-09-05 23:48:00.493 NULL                    65FFD60C-42EB-43B1-8F93-E4AF34DE4909
(7 row(s) affected)
******/

/****** 
SELECT TOP 1000 [Id]
      ,[CodigoRegiao]
      ,[NomeSubBairro]
      ,[Cidade]
      ,[Estado]
      ,[UF]
      ,[FlgAtivo]
      ,[DataInicio]
      ,[DataFim]
      ,[Uid]
  FROM [foca].[dbo].[CodigoRegiaoAtuacao]
  Id                   CodigoRegiao                                                                                                                                                                                                                                                     NomeSubBairro                                                                                                                                                                                                                                                    Cidade                                                                                                                                                                                                                                                           Estado                                                                                                                                                                                                                                                           UF                                                 FlgAtivo DataInicio              DataFim                 Uid
-------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------- -------- ----------------------- ----------------------- ------------------------------------
1                    NULL                                                                                                                                                                                                                                                             Barra da Tijuca                                                                                                                                                                                                                                                  Rio de Janeiro                                                                                                                                                                                                                                                   Rio de Janeiro                                                                                                                                                                                                                                                   RJ                                                 1        2017-09-05 23:13:39.223 NULL                    98542014-3CB3-4C72-ABB4-6484647D5B9D
2                    NULL                                                                                                                                                                                                                                                             Campo Grande                                                                                                                                                                                                                                                     Rio de Janeiro                                                                                                                                                                                                                                                   Rio de Janeiro                                                                                                                                                                                                                                                   RJ                                                 1        2017-09-05 23:14:02.103 NULL                    F36F92B1-AFE7-4160-A4A0-AA56181918F1

(2 row(s) affected)
******/



/******   
SELECT TOP 1000 [Id]
      ,[Nome]
      ,[Descricao]
      ,[FlgAtivo]
      ,[DataInicio]
      ,[DataFim]
      ,[Uid]
  FROM [foca].[dbo].[CodigoTipoCliente]

  Id                   Nome                                               Descricao                                          FlgAtivo DataInicio              DataFim                 Uid
-------------------- -------------------------------------------------- -------------------------------------------------- -------- ----------------------- ----------------------- ------------------------------------
1                    Administrador                                      Modelo de gestão                                   1        2017-09-05 23:36:55.557 NULL                    7E9D0021-27B7-43CC-808E-0DA6BF90E335
2                    Cliente                                            Modelo de consumo                                  1        2017-09-05 23:41:42.120 NULL                    59CBA15E-2C1C-426F-BA4D-E55C63E06212
3                    Prestador                                          Modelo do prestador                                1        2017-09-05 23:41:58.053 NULL                    CA9BCE7A-A051-48FA-88EB-3D4BED80A11E

(3 row(s) affected)
  ******/