/**
 * Created by sxj on 2017/4/11.
 */

function FlexTable(options) {
    this.tableName = options.table;
    this.maxColNum = options.maxColNum;
    this.table = document.querySelector(this.tableName);
    this.colgroup = document.querySelector(options.colgroup);
    this.headerMenu = document.querySelector(options.headerMenu);
    this.rows = this.table.rows;
    this.tds = this.table.querySelectorAll('td');
    this.ths = this.colgroup.querySelectorAll('th');
    this.colNum = this.ths.length;
    this.backdrop = document.querySelector('modal_backdrop');
    if (this.backdrop == null) {
        this.backdrop = document.createElement("div");
        this.backdrop.setAttribute('class', 'modal_backdrop');
        document.body.appendChild(this.backdrop);
    }
}

FlexTable.prototype.initialize = function () {
    var self = this;
    this.backdrop.addEventListener('click', function () {
        self.hideMenu();
    });
    this.backdrop.addEventListener('contextmenu', function () {
        self.hideMenu();
    });
    this.sortByPriority();
    this.initCell();
    this.initHeaderMenu();
    this.hideOverCol();
    this.wrap();
};

FlexTable.prototype.initCell = function () {
    var self = this;
    for (var i = 0; i < this.tds.length; i++) {
        this.containerize(this.tds[i]);
    }
    for (var i = 0; i < this.colNum; i++) {
        this.containerize(this.ths[i]);
        this.ths[i].addEventListener('contextmenu', function () {
            self.showHeaderMenu();
        });
    }
};

FlexTable.prototype.initHeaderMenu = function () {
    var self = this;

    let content = "";
    //i=0 means display first column
    for (var i = 0; i < this.colNum; i++) {
        var name = this.ths[i].innerText.trim();
        var joinName = name.replace(" ", "_");
        var c = "<li><input type='checkbox' name='" + joinName + "' "
            + "id='" + joinName + "_" + self.tableName + "' " + "checked"
            + "><label class='pointer' title='" + joinName
            + "' for='" + joinName + "_" + self.tableName
            + "' >" + name + "</label></li>";
        content += c;
    }

    this.headerMenu.innerHTML += content;

    var menuItems = this.headerMenu.querySelectorAll("input[type='checkbox']");

    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('change', function () {
            var isChecked = this.checked;
            if (this.name == "all") {
                self.selectAllColumn(isChecked);
            }
            else {
                isChecked ? self.showColumn(this.name) : self.hideColumn(this.name);
            }
        });
    }
};

FlexTable.prototype.sortByPriority = function () {
    //Ascending a.dataset.priority - b.dataset.priority
    var priorityCols = $(this.ths).sort(function (a, b) {
        return b.dataset.priority - a.dataset.priority;
    }).map(function () {
        return this.cellIndex;
    }).get();

    $(this.rows).each(function () {
        $(this).children().sort(function (a, b) {
            a = $.inArray(a.cellIndex, priorityCols);
            b = $.inArray(b.cellIndex, priorityCols);
            return a > b;
        }).prependTo(this);
    });

    //update ths
    this.ths = this.colgroup.querySelectorAll('th');
};

FlexTable.prototype.showHeaderMenu = function () {
    event.preventDefault();
    this.showMenu(this.headerMenu, event.clientX, event.clientY);
};

FlexTable.prototype.selectAllColumn = function (isChecked) {
    var self = this;
    var items = this.headerMenu.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < items.length; i++) {
        items[i].checked = isChecked;
        isChecked ? self.showColumn(items[i].name) : self.hideColumn(items[i].name);
    }
};

FlexTable.prototype.hideOverCol = function () {
    var self = this;
    var isHide = false;
    for (var i = this.maxColNum; i < this.colNum; i++) {
        isHide = true;
        var name = this.ths[i].getAttribute("name");
        this.hideColumn(name);
        this.uncheckHeaderMenu(name);
    }
    if (isHide) {
        var more = document.createElement("div");
        more.innerText = "MORE";
        more.classList.add("ellipsis");
        document.querySelector(this.tableName.replace("_table", "")).appendChild(more);
        more.addEventListener("click", function () {
            self.showHeaderMenu();
        });
    }
};

FlexTable.prototype.uncheckHeaderMenu = function (name) {
    var item = this.headerMenu.querySelector("input[name=" + name + "]");
    item.checked = false;
    var allCheck = this.headerMenu.querySelector(".header_menu_all input");
    allCheck.checked = false;
};

FlexTable.prototype.hideColumn = function (name) {
    var allCheck = this.headerMenu.querySelector(".header_menu_all input");
    allCheck.checked = false;

    var items = document.querySelectorAll(this.tableName + ' [name=' + name + ']');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.add('hide');
    }
};

FlexTable.prototype.showColumn = function (name) {
    var items = document.querySelectorAll(this.tableName + ' [name=' + name + ']');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('hide');
    }

    var uncheckedItems = this.colgroup.querySelectorAll(".hide");
    if (uncheckedItems.length == 0) {
        var allCheck = this.headerMenu.querySelector(".header_menu_all input");
        allCheck.checked = true;
    }
};

FlexTable.prototype.showMenu = function (m, x, y) {
    this.backdrop.style.visibility = 'visible';
    m.style.position = 'fixed';
    m.style.top = y + 'px';
    m.style.left = x + 'px';
    m.classList.remove("empty");
};

FlexTable.prototype.hideMenu = function () {
    this.headerMenu.classList.add("empty");
    this.backdrop.style.visibility = 'hidden';
};

FlexTable.prototype.containerize = function (cell) {
    var self = this;
    var container = document.createElement('DIV');
    var children = cell.children;
    if (children.length > 0) {
        for (var i = 0; i < children.length; i++) {
            container.appendChild(children[i]);
        }
    }
    else {
        var content = document.createTextNode(cell.innerHTML);
        container.appendChild(content);
    }
    container.setAttribute('class', 'content-cell');
    container.addEventListener('click', function () {
        self.cellClick(container.parentNode);
    });

    cell.innerHTML = '';
    cell.appendChild(container);

    return container;
};

FlexTable.prototype.cellClick = function (cell) {
    var oldPop = document.querySelector('.pop-cell');
    if (oldPop) {
        oldPop.parentNode.removeChild(oldPop);
    }
    var i = cell.cellIndex;
    var currentCol = this.colgroup.children[i];

    if (this.isOverflow(cell.children[0])) {
        if (currentCol.getAttribute('class') == 'unwrap')
            this.popupContent(cell);
        else {
            this.unwrap(currentCol);
        }
    }
    else {
        this.wrap();
    }
};

FlexTable.prototype.wrap = function () {
    var cols = this.colgroup.children;
    for (var i = 0; i < cols.length; i++) {
        cols[i].classList.add('wrap');
        cols[i].classList.remove('unwrap');
        cols[i].style.width = Math.floor(100 / cols.length) + '%';
    }
};

FlexTable.prototype.unwrap = function (el) {
    el.classList.add('unwrap');
    el.classList.remove('wrap');
    el.style.width = '100%';
};

FlexTable.prototype.isOverflow = function (el) {
    var curOverflow = el.style.overflow;
    if (!curOverflow || curOverflow === "visible") {
        el.style.overflow = "hidden";
    }
    var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
    el.style.overflow = curOverflow;
    return isOverflowing;
};

FlexTable.prototype.popupContent = function (el) {
    var dim = el.getBoundingClientRect();
    var pop = document.createElement("DIV");
    var children = el.children[0].children;
    if (children.length > 0) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i].cloneNode(true);
            pop.appendChild(child);
        }
    }
    else {
        var content = document.createTextNode(el.children[0].innerHTML);
        pop.appendChild(content);
    }
    pop.setAttribute('class', 'pop-cell');
    pop.setAttribute('onclick', 'event.preventDefault()');
    pop.style.width = dim.width;
    el.appendChild(pop);
};

