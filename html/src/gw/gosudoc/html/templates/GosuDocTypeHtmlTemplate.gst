<%@ params(type : gw.gosudoc.html.GosuDocTypeHtml) %>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title><%=type.Title%></title>
    <link type="text/css" href="<%=type.BaseUrl%>style/bootstrap.min.css" rel="stylesheet" />
    <link type="text/css" href="<%=type.BaseUrl%>style/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
    <link type="text/css" href="<%=type.BaseUrl%>style/gosudoc.css" rel="stylesheet" />
    <script type="text/javascript" src="<%=type.BaseUrl%>script/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/gosudoc.js"></script>
    <script type="text/javascript">gosuDocBaseUrl = "<%=type.BaseUrl%>"</script>
  </head>
  <body>
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#">GosuDoc</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="active"><a href="#">Home</a></li>
            </ul>
            <form class="navbar-search pull-right" action="">
              <input type="text" accesskey="g" id="search" class="search-query span2" placeholder="Goto Class">
            </form>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">
      <h1><%=type.Title%></h1>
      <div class="btn-toolbar">
        <div class="btn-group">
<%if (type.HasConstructors) {%>          <a class="btn" href="#..constructors">Constructors</a><%}%>
<%if (type.HasProperties) {%>          <a class="btn" href="#..properties">Properties</a><%}%>
<%if (type.HasMethods) {%>          <a class="btn" href="#..methods">Methods</a><%}%>
<%for (r in type.Relationships) {%>          <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
            <%=r.Label%>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
<%for (ref in r.References) {%>            <li><%=ref.generate(type.BaseUrl)%></li><%}%>
          </ul><%}%>
        </div>
      </div>
      <div class="type">
        <div class="details">
          <%=type.Summary%> <%=type.Details%>
        </div>
      </div>
      <%=type.featureLists()%>
    </div>
  </body>
</html>
