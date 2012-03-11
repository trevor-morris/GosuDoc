<%@ params(docSet : gw.gosudoc.html.GosuDocSetHtml) %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>GosuDoc Index</title>
    <link type="text/css" href="<%=docSet.BaseUrl%>style/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
    <link type="text/css" href="<%=docSet.BaseUrl%>style/bootstrap.min.css" rel="stylesheet" />
    <link type="text/css" href="<%=docSet.BaseUrl%>style/prettify.css" rel="stylesheet" />
    <link type="text/css" href="<%=docSet.BaseUrl%>style/gosudoc.css" rel="stylesheet" />
    <script type="text/javascript" src="<%=docSet.BaseUrl%>script/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="<%=docSet.BaseUrl%>script/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="<%=docSet.BaseUrl%>script/prettify.js"></script>
    <script type="text/javascript" src="<%=docSet.BaseUrl%>script/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=docSet.BaseUrl%>script/gosudoc.js"></script>
    <script type="text/javascript" src="<%=docSet.BaseUrl%>script/gosudocindex.js"></script>
    <script type="text/javascript">gosuDocBaseUrl = "<%=docSet.BaseUrl%>"</script>
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
          <a class="brand" href="#">GosuDoc</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="active"><a href="index.html">Home</a></li>
            </ul>
            <form class="navbar-search pull-left" action="">
              <input type="text" accesskey="g" id="gotoclass" class="search-query span2" placeholder="Goto Class">
            </form>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">
      <section id="...packages">
        <h1>Package Index</h1>
        <table class="table table-striped table-bordered">
          <tbody>
<% for (p in docSet.Packages) {%>            <tr><td>
                <h3><%=p.LinkFromIndex%></h3>
                <%=p.Summary%>
            </td></tr><%}%>
          </tbody>
        </table>
      </section>
    </div>
  </body>
</html>
