var count = 0,
    indexOf = Array.prototype.indexOf,
    DEFAULT_MAX_WIDTH = 150,
    style;

function bindEvent(node, type, handler, context) {
    if (context) handler = handler.bind(context);
    node.addEventListener(type, handler);
    return {
        detach: node.removeEventListener.bind(node, type, handler)
    }
}

var Droppy = function Droppy (select, cfg) {
    if (!select) throw new Error("You need to provide a select element to the constructor.");
    this.select = select;

    cfg = cfg || {};

    if (!style) {
        style = document.createElement("style");
        style.innerHTML = '{{droppy.min.css}}';
        document.head.insertBefore(style, document.head.firstElementChild);
    }

    this.render();
    count++;

    this.style = document.createElement("style");
    document.body.appendChild(this.style);

    this.label = this.container.querySelector("label");
    this.checkbox = this.container.querySelector("input[type=checkbox]");
    this.drop = this.container.querySelector(".droppy-drop");
    this.search = this.drop.querySelector("input[type=text]");
    this.inputs = this.drop.querySelectorAll("input[name^=hovered]");

    this.label.style.maxWidth = (cfg.maxWidth || DEFAULT_MAX_WIDTH) + "px";
    this.label.style.width = window.getComputedStyle(this.drop).width;

    this.bind();

    return this;
};

var DroppyPrototype = Droppy.prototype;

DroppyPrototype.render = function () {
    var markup, defaultName, i, label, checked,
        options = this.select.querySelectorAll("option");

    this.container = document.createElement("span");
    this.container.className = "droppy-container";

    defaultName = this.select.querySelector("option:checked").innerHTML;
    markup = '' +
        '<input id="droppy-' + count + '" class="droppy-hidden" type="checkbox"/>' +
        '<label for="droppy-' + count + '">' + defaultName + '</label>' +
        '<div>' +
        '<div class="droppy-drop">' +
        '<input type="text" placeholder="type to filter"/>';

    for (i = 0; i < options.length; i++) {
        label = options[i].innerHTML;
        checked = options[i].selected ? " checked" : "";

        markup += '' +
            '<input type="radio" name="selected-' + count + '" class="droppy-hidden"' + checked + '/>' +
            '<input type="radio" name="hovered-' + count + '" class="droppy-hidden" data-value="' + label.toLowerCase() + '"' + checked + '/>' +
            '<label for="droppy-' + count + '" data-value="' + label.toLowerCase() + '" title="' + label + '">' + label + '</label>';
    }

    markup += '</div></div>';
    this.container.innerHTML = markup;

    this.select.parentNode.insertBefore(this.container, this.select);
    this.select.classList.add("droppy-hidden");
};

DroppyPrototype.bind = function () {
    this.handles = [
        bindEvent(this.container, "mousedown", this.onMouseDown, this),
        bindEvent(this.container, "click", this.onClick, this),
        bindEvent(this.container, "keydown", this.onKeyDown, this),
        bindEvent(this.container, "keyup", this.onKeyUp, this),
        bindEvent(this.container, "mouseover", this.onMouseOver, this),
        bindEvent(this.search, "blur", this.onBlur, this)
    ];
};

DroppyPrototype.onMouseDown = function () {
    this.cancelBlur = this.checkbox.checked;
};

DroppyPrototype.onClick = function (e) {
    if (e.target === this.label) {
        this.onLabelClick(e);
    } else if (this.drop.contains(e.target) && e.target !== this.drop && e.target !== this.search) {
        this.onOptionClick(e);
    }
};

DroppyPrototype.onLabelClick = function () {
    this.search.focus();
};

DroppyPrototype.onOptionClick = function (e) {
    this.label.innerHTML = e.target.innerHTML;
    e.target.previousElementSibling.previousElementSibling.checked = true;
    this.unFilter();
};

DroppyPrototype.onKeyDown = function (e) {
    if (e.keyCode === 27) { // Esc
        this.checkbox.checked = false;
        this.unFilter();
    } else if (e.keyCode === 38) { // Up
        e.preventDefault();
        this.keyNav(-1);
    } else if (e.keyCode === 40) { // Down
        this.keyNav(1);
    } else if (e.keyCode === 13) { // Enter
        this.checkbox.checked = false;
        this.onOptionClick({target: this.drop.querySelector("input[name^=hovered]:checked").nextElementSibling});
    }
};

DroppyPrototype.onKeyUp = function (e) {
    this.filter(e.target.value);
};

DroppyPrototype.onMouseOver = function (e) {
    if (this.drop.contains(e.target) && e.target !== this.drop && e.target !== this.search) {
        e.target.previousElementSibling.checked = true;
    }
};

DroppyPrototype.onBlur = function () {
    if (this.cancelBlur) return;
    this.checkbox.checked = false;
    this.unFilter();
};

DroppyPrototype.keyNav = function (step) {
    var inputs = this.inputs,
        hovered = this.drop.querySelector("input[name^=hovered]:checked"),
        startIndex = step > 0 ? 0 : inputs.length - 1,
        endIndex = step > 0 ? inputs.length - 1 : 0;

    if (indexOf.call(inputs, hovered) === endIndex) {
        inputs[startIndex].checked = true;
    } else {
        inputs[indexOf.call(inputs, hovered) + step].checked = true;
    }
};

DroppyPrototype.filter = function (value) {
    var style = "",
        hovered = this.drop.querySelector("input[name^=hovered]:checked");

    if (value) {
        style = '.droppy-container > div label:not([data-value*="' + value.toLowerCase() + '"]) {display:none;}';
        this.inputs = this.drop.querySelectorAll('input[name^=hovered][data-value*="' + value.toLowerCase() + '"]');

        if (!this.inputs.length) {
            this.drop.querySelector("input[name^=selected]:checked").nextElementSibling.checked = true;
        } else if (indexOf.call(this.inputs, hovered) === -1) {
            this.inputs[0].checked = true;
        }
    } else {
        this.inputs = this.drop.querySelectorAll("input[name^=hovered]");
    }

    this.style.innerHTML = style;
};

DroppyPrototype.unFilter = function () {
    this.filter("");
    this.search.value = "";
};

DroppyPrototype.destroy = function () {
    this.handles.forEach(function (handle) {
        handle.detach();
    }, this);
    this.container.parentNode.removeChild(this.container);
    document.body.removeChild(this.style);
    this.select.classList.remove("droppy-hidden");
    this.container = undefined;
};

window.Droppy = Droppy;