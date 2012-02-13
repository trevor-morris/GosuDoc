<%@ params(type : gw.gosudoc.html.GosuDocTypeHtml) %>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title><%=type.Title%></title>
    <link type="text/css" href="<%=type.BaseUrl%>style/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
    <link type="text/css" href="<%=type.BaseUrl%>style/gosudoc.css" rel="stylesheet" />
    <script type="text/javascript" src="<%=type.BaseUrl%>script/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/gosudoc.js"></script>
    <script type="text/javascript">gosuDocBaseUrl = "<%=type.BaseUrl%>"</script>
  </head>
  <body>
    <div id="navbar">
      Goto Class:
      <input type="text" accesskey="g" id="search"/>
    </div>
    <div class="type">
      <h1><%=type.Title%></h1>
      <%=type.relationships()%>
      <div class="details">
        <%=type.Summary%> <%=type.Details%>
      </details>
    </div>
    <%=type.featureLists()%>
  </body>
</html>
