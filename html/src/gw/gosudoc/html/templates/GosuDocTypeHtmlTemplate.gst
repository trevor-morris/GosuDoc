        <%@ params(type : gw.gosudoc.html.GosuDocTypeHtml) %>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title><%=type.Title%></title>
    <base href="<%=type.BaseUrl%>"/>
    <link type="text/css" href="css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
    <link type="text/css" href="css/gosudoc.css" rel="stylesheet" />
    <script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="js/gosudoc.js"></script>
  </head>
  <body>
    <div id="navbar">
      Goto Class:
      <input type="text" id="search"/>
    </div>
    <div class="type">
      <h1><%=type.Title%></h1>
      <div class="details">
        <%=type.Summary%> <%=type.Details%>
      </details>
    </div>
    <%=type.featureLists()%>
  </body>
</html>
