<%@ params( listTitle : String, anchor : String, features : List<gw.gosudoc.html.GosuDocFeatureHtml> ) %>
<a name="<%=anchor%>"><h2><%=listTitle%></h2></a>
<table class="table table-striped table-bordered">
  <tbody>
<% for (f in features) {%>    <tr><td><%=f.generate()%></td></tr><%}%>
  </tbody>
</table>
