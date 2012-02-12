<%@ params(list : gw.gosudoc.html.GosuDocTypeRelationshipListHtml, baseUrl: String) %>
<li><h3><%=list.Label%></h3>
  <ul>
<% for (r in list.References) {%>    <li><%=r.generate(baseUrl)%></li><%}%>
  </ul>
</li>

