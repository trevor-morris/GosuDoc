<%@ params(list : gw.gosudoc.html.GosuDocTypeRelationshipListHtml) %>
<li><h3><%=list.Label%></h3>
  <ul>
<% for (r in list.References) {%>    <li><%=r.generate()%></li><%}%>
  </ul>
</li>

