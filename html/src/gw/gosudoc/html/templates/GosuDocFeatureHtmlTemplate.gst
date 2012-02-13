<%@ params(feature : gw.gosudoc.html.GosuDocFeatureHtml) %>
<a name="<%=feature.Anchor%>"><!----></a>
<div class="feature">
  <div class="overview">
    <h3><%=feature.Overview%></h3>
  </div>
  <div class="details">
    <pre class="prettyprint">
<%=feature.Signature%>
</pre>
    <div>
      <span class="summary"><%=feature.Summary%></span><%=feature.Details%>
    </div>
<% var defs = feature.Definitions; if (defs.HasElements) {%>    <dl>
<% for (d in defs) {%>      <dt><%=d.First%></dt><dd><%=d.Second%></dd><%}%>
    </dl><%}%>
  </div>
</div>
