<%@ params(feature : gw.gosudoc.html.GosuDocFeatureHtml) %>
<div class="feature">
  <div class="overview">
    <h2><%=feature.Overview%></h2>
  </div>
  <div class="details">
    <pre>
<%=feature.Signature%>
</pre>
    <div>
      <span class="summary"><%=feature.Summary%></span><%=feature.Details%>
    </div>
  </div>
</div>
