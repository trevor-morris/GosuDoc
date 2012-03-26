<%@ params(type : gw.gosudoc.html.GosuDocTypeHtml) %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title><%=type.Title%></title>
    <link type="text/css" href="<%=type.BaseUrl%>style/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
    <link type="text/css" href="<%=type.BaseUrl%>style/bootstrap.min.css" rel="stylesheet" />
    <link type="text/css" href="<%=type.BaseUrl%>style/prettify.css" rel="stylesheet" />
    <link type="text/css" href="<%=type.BaseUrl%>style/gosudoc.css" rel="stylesheet" />
    <script type="text/javascript" src="<%=type.BaseUrl%>script/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/prettify.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/gosudoc.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/gosudoctype.js"></script>
    <script type="text/javascript">gosuDocBaseUrl = "<%=type.BaseUrl%>"</script>
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
              <li class=""><a href="<%=type.BaseUrl%>doc/index.html">Home</a></li>
            </ul>
            <ul class="nav">
              <li class=""><a href="package.html">Package</a></li>
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
        <h1><%=type.Title%></h1>
        <div class="subnav">
          <ul class="nav nav-pills">
<% for (l in type.FeatureLists) {%>              <li><a href="#<%=l.Anchor%>"><%=l.Title%></a></li><%}%>
<% for (r in type.Relationships) {%>            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#"><%=r.Label%> <b class="caret"></b></a>
              <ul class="dropdown-menu">
<% for (ref in r.References) {%>                <li><%=ref.generate(type.BaseUrl)%></li><%}%>
              </ul>
            </li><%}%>
          </ul>
        </div>
      </header>
      <div class="type">
        <div class="details">
          <%=type.Summary%> <%=type.Details%>
        </div>
      </div>
<% for (l in type.FeatureLists) {%>      <section id="<%=l.Anchor%>">
        <h2><%=l.Title%></h2>
        <table class="table table-striped table-bordered">
          <tbody>
<% for (f in l.Features) {%>            <tr><td>
              <div id="<%=f.Anchor%>" class="feature">
                <div class="overview">
                  <h3><%=f.Overview%></h3>
                </div>
                <div class="details">
                  <pre class="prettyprint"><%=f.Signature%></pre>
                  <div><%if (not f.Summary.Empty) {%><span class="summary"><%=f.Summary%></span><%}%><%=f.Details%></div>
<% var defs = f.Definitions; if (defs.HasElements) {%>                  <dl>
<% for (d in defs) {%>                    <dt><%=d.First%></dt><dd><%=d.Second%></dd><%}%>
                  </dl><%}%>
                </div>
              </div>
            </td></tr>
<%}%>
          </tbody>
        </table>
      </section>
<%}%>
    </div>
  </body>
</html>
