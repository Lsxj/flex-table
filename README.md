# jQuery FlexTable
---
jQuery FlexTable is a simple table library that help you create a flex table.
It was inspired by https://dribbble.com/shots/1903644-Data-Grid/attachments/325113
See it in action here: http://lsxj.github.com/flex-table/example.html

# Usage
---
jQuery FlexTable requires a specific HTML structure in order to work. There is also a small stylesheet that can be used. jQuery is a dependency.

`<head>
   <script type='text/javascript' charset='utf-8' src='jquery.js'></script>
   <script type='text/javascript' charset='utf-8' src='flex-table.js'></script>
   <link rel='stylesheet' href='popbox.css' type='text/css'>
 </head>`

The HTML structure looks like this.

`
<table id='demo'>
    <tr class="table-header">
        <th name = "Column1" data-priority="2">Company</th>
        <th name = "Column2" data-priority="5">Time</th>
        <th name = "Column3" data-priority="4">Address</th>
        <th name = "Column4" data-priority="3">Contact</th>
        <th name = "Column5" data-priority="1">Customer</th>
    </tr>
    <tr>
        <td name = "Column1">Column1</td>
        <td name = "Column2">Column2</td>
        <td name = "Column3">Column3</td>
        <td name = "Column4">Column4</td>
        <td name = "Column5">Column5</td>
    </tr>
</table>
`

Invoke the plugin by calling it on a selector like normal.
`
<script type='text/javascript'>
   $(document).ready(function(){
     var table = new FlexTable({
        table: "#demo",
        maxColNum: 4,
        headerMenu: ".header_menu",
        colgroup: ".table-header"
    });
    table.initialize();
   });
</script>
`

License
---

MIT License

Copyright (c) [2018] [Shi Xuejia]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
