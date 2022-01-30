<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="FocaWebServiceApplication.REDEFINIR_SENHA.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <span>Nova senha</span>
        <br/>
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        <br/>
        <br/>
        <span>Repetir nova senha</span>
        <br/>
        <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
        <br/>
        <br/>
        <asp:Button ID="Button1" runat="server" Text="Alterar Senha" OnClick="Button1_Click"  />

    </div> 
    </form>
</body>
</html>
