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
    <script type="text/javascript" src="<%=type.BaseUrl%>script/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=type.BaseUrl%>script/prettify.js"></script>
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
            <form class="navbar-search pull-left" action="">
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
<% for (l in type.FeatureLists) {%>          <a class="btn" href="#<%=l.Anchor%>"><%=l.Title%></a><%}%>
<% for (r in type.Relationships) {%>          <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
            <%=r.Label%>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
<% for (ref in r.References) {%>            <li><%=ref.generate(type.BaseUrl)%></li><%}%>
          </ul><%}%>
        </div>
      </div>
      <div class="type">
        <div class="details">
          <%=type.Summary%> <%=type.Details%>
        </div>
      </div>
<% for (l in type.FeatureLists) {%>      <a name="<%=l.Anchor%>"><h2><%=l.Title%></h2></a>
      <table class="table table-striped table-bordered">
        <tbody>
<% for (f in l.Features) {%>          <tr><td>
            <a name="<%=f.Anchor%>"><!----></a>
            <div class="feature">
              <div class="overview">
                <h3><%=f.Overview%></h3>
              </div>
              <div class="details">
                <pre class="prettyprint">
            <%=f.Signature%>
            </pre>
                <div>
                  <span class="summary"><%=f.Summary%></span><%=f.Details%>
                </div>
<% var defs = f.Definitions; if (defs.HasElements) {%>                <dl>
<% for (d in defs) {%>                  <dt><%=d.First%></dt><dd><%=d.Second%></dd><%}%>
                </dl><%}%>
              </div>
            </div>
          </td></tr><%}%>
        </tbody>
      </table><%}%>
    </div>
  </body>
</html>
