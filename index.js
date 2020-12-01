var url = "(image)";
var select = document.getElementsByClassName("image-picker")[0];
var view = document.getElementById("view");

// Load
function load() {
    var directory = window.location.search.substr(Math.min(window.location.search.length, 1));
    view.style.visibility = "hidden";
    select.innerHTML = '';
    var folders = {};
    for (var i in images) {
        var path = images[i];
        if (path.startsWith(directory)) {
            path = path.substr(directory.length);
            var index = path.indexOf('/');
            if (index == -1) {
                add(directory + path);
            } else {
                var folder = path.substr(0, index);
                if (folder in folders) {
                    folders[folder]++;
                } else {
                    add(folder);
                    folders[folder] = 1;
                }
            }
        }
    }
    select.selectedIndex = -1;
    $("select").imagepicker({
        show_label: true,
        selected: function(select, option, event) {
            var id = select.option[0].getAttribute("id");
            if (id.indexOf('.') == -1) {
                directory = id + "/";
                history.pushState(history.state, directory, "?" + directory);
                load();
            } else {
                url = id;
                updateView();
            }
        }
    });
}
window.onpopstate = load;

function add(item) {
    var option = document.createElement("option");
    option.setAttribute("id", item);
    var image = "icons/folder.png";
    if (item.indexOf('.') != -1) {
        image = src_min + item;
        item = item.substr(1 + item.lastIndexOf('/'));
        var text = item.substr(0, item.lastIndexOf('.')).replace("_", " ").replace( /([A-Z])/g, " $1" );;
        option.text = text;
    } else {
        option.text = item;
    }
    option.setAttribute("data-img-src", image);
    select.add(option);
}


function copyToClipboard(elem) {
    var disabled = elem.disabled;
    elem.disabled = false;
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    elem.disabled = disabled;
    var alert = document.getElementById("alert");
    alert.hidden = false;
    var newone = alert.cloneNode(true);
    alert.parentNode.replaceChild(newone, alert);
    return succeed;
}

function updateView() {
    var input = document.getElementById("command");
    var output = document.getElementById("output");
    var dest = src_local + url;
    if (!src_local.startsWith("file://")) dest = encodeURI(dest);
    else if (dest.indexOf(' ') != -1) dest = '"' + dest + '"';
    output.value = input.value.replace("%image%", dest);
    copyToClipboard(output);
    view.style.visibility = "visible";
    view.setAttribute("src", src_max + url);

    if (typeof variable !== 'undefined' && prevent_copy) {
        $('img').on({
            "contextmenu": function (e) {
                e.preventDefault();
            },
            "mousedown": function (e) {
                e.preventDefault();
            },
            "mouseup": function (e) {
                e.preventDefault();
            }
        });
    }
}

load();