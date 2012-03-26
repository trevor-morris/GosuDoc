<%@ params(p : gw.gosudoc.html.GosuDocPackageHtml) %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title><%=p.Title%></title>
    <link type="text/css" href="<%=p.BaseUrl%>style/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
    <link type="text/css" href="<%=p.BaseUrl%>style/bootstrap.min.css" rel="stylesheet" />
    <link type="text/css" href="<%=p.BaseUrl%>style/prettify.css" rel="stylesheet" />
    <link type="text/css" href="<%=p.BaseUrl%>style/gosudoc.css" rel="stylesheet" />
    <script type="text/javascript" src="<%=p.BaseUrl%>script/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="<%=p.BaseUrl%>script/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="<%=p.BaseUrl%>script/prettify.js"></script>
    <script type="text/javascript" src="<%=p.BaseUrl%>script/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=p.BaseUrl%>script/gosudoc.js"></script>
    <script type="text/javascript" src="<%=p.BaseUrl%>script/gosudocpackage.js"></script>
    <script type="text/javascript">gosuDocBaseUrl = "<%=p.BaseUrl%>"</script>
  </head>
  <body data-spy="scroll" data-target=".subnav" data-offset="50">
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="https://github.com/trevor-morris/GosuDoc">GosuDoc</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class=""><a href="<%=p.BaseUrl%>doc/index.html">Home</a></li>
            </ul>
            <form class="navbar-search pull-left" action="">
              <input type="text" accesskey="g" id="gotoclass" class="search-query span2" placeholder="Goto Class">
            </form>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">
      <header class="jumbotron subhead" id="overview">
        <h1><%=p.Title%></h1>
        <div class="subnav">
          <ul class="nav nav-pills">
<% for (l in p.TypeLists) {%>              <li><a href="#<%=l.Anchor%>"><%=l.Title%></a></li><%}%>
          </ul>
        </div>
      </header>
      <div class="package">
        <div class="details">
          <%=p.Summary%> <%=p.Details%>
        </div>
      </div>
<% for (l in p.TypeLists) {%>      <section id="<%=l.Anchor%>">
        <h2><%=l.Title%></h2>
        <table class="table table-striped table-bordered">
          <tbody>
<% for (t in l.Types) {%>            <tr><td>
                <h3><%=t.LinkFromPackage%></h3>
                <%=t.Summary%>
            </td></tr>
<%}%>
          </tbody>
        </table>
      </section>
<%}%>
    </div>
  </body>
</html>
