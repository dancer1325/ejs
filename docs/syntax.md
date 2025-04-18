EJS Syntax Reference
====================

* EJS' design
  * flexible
  * easy-to-write
  * ❌NO too many abstractions | HTML base❌

Basic format
------------

* EJS “tag”
  * 👀== MAIN functioning unit | EJS template 👀
  * `<starting content closing>`
    * 💡ALL tags' syntax💡
      * ❌EXCEPT TO literal tags❌
    * ` ` BETWEEN `<starting` `content` `closing>`
      * recommended
      * NOT required

Delimiters
----------

* contained | `starting` & `closing` tags 
* `%` delimiter
  * default one 
* if you want to customize it -> [here](../README.md#custom-delimiters)

Starting tags
-------------

### `<%=`: Escaped output

* allows
  * 👀escaping JS statements == evaluating JS statements 👀
* `<%= content %>`
  * ALLOWED `content` 
    * ANY valid JavaScript operators
      * _Example:_ `<%= name ? name : (lastName || 'John Doe') %>` 
  * if `content` contains forbidden characters (_Example:_ `<`,  `&`) -> AUTOMATICALLY escaped -- with -- HTML codes

#### Example
* TODO: How to create the example?
##### EJS

```ejs
<p>Hello, <%= name %>.</p>
<p>Hello, <%= 'the Most Honorable ' + name %>.</p>
```

##### Locals

```json
{
  "name": "Timoth<y>"
}
```

##### OUTPUT HTML?

```html
<p>Hello, Timoth&lt;y&gt;.</p>
<p>Hello, the Most Honorable Timoth&lt;y&gt;.</p>
```

### `<%-`: Unescaped output

* allows
  * NOT escaping
* use cases
  * 👀local -- contains -- preformatted HTML👀
* recommendations
  * check rendered local is sanitized
    * Reason: 🧠prevent cross-site scripting (XSS) attacks🧠

#### Example
* TODO: How to create the example?
##### EJS

```ejs
<p>Hello, <%- myHtml %>.</p>
<p>Hello, <%= myHtml %>.</p>

<p>Hello, <%- myMaliciousHtml %>.</p>
<p>Hello, <%= myMaliciousHtml %>.</p>
```

##### Locals

```json
{
  "myHtml": "<strong>Timothy</strong>"
, "myMaliciousHtml": "</p><script>document.write()</script><p>"
}
```

##### OUTPUT HTML?

```html
<p>Hello, <strong>Timothy</strong>.</p>
<p>Hello, &lt;strong&gt;Timothy&lt;/strong&gt;.</p>

<p>Hello, </p><script>document.write()</script><p>.</p>
<p>Hello, &lt;/p&gt;&lt;script&gt;document.write()&lt;/script&gt;&lt;p&gt;.</p>
```

### `<%#`: Comments

* allows
  * NOT executing or rendering | resulting HTML
* recommendations
  * use `-%>`
    * Reason: 🧠might cause useless whitespace🧠

#### Example
* TODO: How to create the example?
##### EJS

```ejs
<div>
<%# comment %>
</div>

<div>
<%# comment -- removing -- useless whitespaces -%>
</div>
```

##### HTML

```html
<div>

</div>

<div>
</div>
```

### `<%`: Scriptlets

* allows
  * 👀embedding logic | EJS template 👀
    * ALLOWED logic
      * ANY JavaScript syntax
      * mix JavaScript -- with -- EJS
      * MULTIPLE statements

#### Comments

* == ALL types of JS comments are allowed
* recommendations
  * use `<%#`

* _Example:_ EQUIVALENT comments
  ```ejs
  <%# comment %>
  <%/* comment */%>
  <%// comment %>
  ```

#### Curly brackets

* uses
  * loops
  * conditionals
* allows
  * mixing EJS template + JavaScript scriptlets 
* if you omit brackets -> MIGHT work | SOME statements
  * BUT behavior
    * undefined
    * subject to change

##### _Example:_ 
* TODO: How to create the example?
```ejs
<%# Bad practice %>
<% if (true) %>
  <p>Yay it's true!</p>

<%# Good practice %>
<% if (true) { %>
  <p>Yay it's true!</p>
<% } %>
```

```ejs
<%# These are all valid statements %>
<% var output
     , exclamation = ''
     , shouldOutput = false

   if (true)
     output = 'true!'

   if (true) {
     exclamation = 'Yay! ';
   }

   if (true) shouldOutput = true; %>

<% if (shouldOutput) { %>
  <%= exclamation + 'It\'s ' + output %>
<% } %>
```

#### Line breaks | tag

* recommendations
  * put COMPLETE statements | tag
* use case
  * mixing EJS + JavaScript scriptlet

##### _Example:_
* TODO: How to create the example?
```ejs
<% var stringToShow = thisIsABooleanVariableWithAVeryLongName
                    ? 'OK'
                    : 'not OK' %>
```

```ejs
<% var stringToShow = thisIsABooleanVariableWithAVeryLongName %>
<%                  ? 'OK'                                    %>
<%                  : 'not OK'                                %>
```

#### Semicolons

* use cases
  * ❌NO proper line breaks are preserved❌
##### _Example:_
* TODO: How to create the example?

#### Useless Whitespace

* Reason: 🧠use scriptlets 🧠
* ways to trim it
  1. use `-%>`
  2. use `<%_` OR start the tag | BEGINNING line

#### Example
* TODO: How to create the example?
In the following example, several different coding styles are used simultaneously, to show that EJS is flexible with regards to personal habits.
It does *not* mean that we recommend mixing coding styles in your own project.

##### EJS

```ejs
<dl>
<%for (var i = 0; i < users.length; i++) {    %><%
  var user = users[i]
      , name = user.name // the name of the user
    %><%# comment %>
  <%var age  = user.age; /* the age of the user */%>
  <dt><%= name %></dt>
  <dd><%= age %></dd>
<%}-%>
</dl>
```

##### Locals

```json
{
  "users": [
    {
      "name": "Timothy"
    , "age":  15
    }
  , {
      "name": "Juan"
    , "age":  51
    }
  ]
}
```

##### HTML

```html
<dl>



  <dt>Timothy</dt>
  <dd>15</dd>



  <dt>Juan</dt>
  <dd>51</dd>

</dl>
```

### `<%_` "Whitespace Slurping" Scriptlet

This tag is the same as a Scriptlet, except that it removes all whitespace before it.

#### Example

##### EJS

```ejs
<ul>
  <% users.forEach(function(user, i, arr){ -%>
    <li><%= user %></li>
  <% }); -%>
</ul>

<ul>
  <%_ users.forEach(function(user, i, arr){ -%>
    <li><%= user %></li>
  <%_ }); -%>
</ul>
```

##### HTML

```html
<ul>
      <li>Anne</li>
      <li>Bob</li>
  </ul>

<ul>
    <li>Anne</li>
    <li>Bob</li>
</ul>
```

Ending tags
-----------

There are three flavors of ending tags: the regular one, the
newline-trimming one, and the whitespace-slurping one.

### `%>`: Regular ending tag

As used in all of the examples above, `%>` is the standard tag used to end an
EJS expression.

### `-%>`: Newline-trimming ending tag

`-%>` trims all extra newlines a scriptlet or a comment might cause. It does
not have any effect on output tags.

#### Example

##### EJS

```ejs
Beginning of template
<%  'this is a statement'
 + ' that is long'
 + ' and long'
 + ' and long' %>
End of template
---
Beginning of template
<%  'this is a statement'
 + ' that is long'
 + ' and long'
 + ' and long' -%>
End of template
```

##### Output

```html
Beginning of template

End of template
---
Beginning of template
End of template
```

### `_%>`: Whitespace-slurping ending tag

`_%>` removes all whitespace after it.

Literal tags
------------

To output literal `<%` or `%>`, use `<%%` or `%%>`, respectively. If a customized delimiter is used, use
the same syntax. E.g. use `<$$` to get `<$` if the delimiter is `$`.

In regards to all the other tags, the literal tags are special as they do not
need a closing tag to function.

However, think twice before you use these tags because `<` and `>` characters might
need to be escaped as `&lt;` and `&gt;`, respectively.

#### Example

The following example wrap `<%` and `%>` in a `<pre>`, where it is not necessary to
escape `<` or `>` at all.

##### EJS

```ejs
<pre>This is literal: <%%</pre>
<pre>This is literal too: <%% %></pre>
<pre>This is literal as well: %%></pre>
```

##### HTML

```html
<pre>This is literal: <%</pre>
<pre>This is literal too: <% %></pre>
<pre>This is literal as well: %></pre>
```

## Including other files

EJS offer two ways of including other files. You can even include files that
are not EJS templates, as the case is for CSS stylesheets.

For both flavors, if the file specified does not have an extension, `.ejs` is
automatically appended. If it is an absolute path, that file is included.
Otherwise, the file is assumed to be in the same directory as the parent
template.

The behavior of resolving included file path can be overridden using the
`ejs.resolveInclude` function.


#### Whitespace control

You most probably should not use the `-%>` ending tag on an `include`
directive, as it trims the whitespace after the included file.

#### Example

##### included.ejs

```ejs
<li><%= pet.name %></li>
```

##### main.ejs

```ejs
<ul>
<% pets.forEach(function (pet) { -%>
  <% include included %>
<% }) -%>
</ul>
```

##### Locals

```json
{
  "pets": [
    {
      "name": "Hazel"
    }
  , {
      "name": "Crystal"
    }
  , {
      "name": "Catcher"
    }
  ]
}
```

##### “Preprocessor" output

```ejs
<ul>
<% pets.forEach(function (pet) { -%>
  <li><%= pet.name %></li>
<% }) -%>
</ul>
```

##### HTML

```html
<ul>
  <li>Hazel</li>
  <li>Crystal</li>
  <li>Catcher</li>
</ul>
```

### JavaScript `include()` function

With the release of EJS version 2, we have added a new way of including files
that is more intuitive. The `include()` function is available to the
templates, with the following signature:

```js
include(filename, [locals])
```

One major difference with the method described above is that the variables in
the parent function are not visible to the child template, unless it is
explicitly declared in the `locals` object, or is passed as a local to the
parent template.

Also, the included file is compiled upon execution of the script, which means
performance might be theoretically lower than the “preprocessor” flavor. In
practice however, caching can make this difference negligible.

Some cautions **MUST** to be taken if the included filename is fetched from a
user during rendering time, as one could easily use private files as the file
name, like `/etc/passwd` or `../api-keys`.

#### Example

This has the exact same effect as the example for the `include` directive.

##### included.ejs

```ejs
<li><%= pet.name %></li>
```

##### main.ejs

```ejs
<ul>
<%  pets.forEach(function (pet) { -%>
  <%- include('included', {
        pet: pet
      }) %>
<%  }) -%>
</ul>
```

##### Locals

```json
{
  "pets": [
    {
      "name": "Hazel"
    }
  , {
      "name": "Crystal"
    }
  , {
      "name": "Catcher"
    }
  ]
}
```

##### HTML

```html
<ul>
  <li>Hazel</li>
  <li>Crystal</li>
  <li>Catcher</li>
</ul>
```
