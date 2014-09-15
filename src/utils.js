function bindEvent(node, type, handler, context) {
    if (context) handler = handler.bind(context);
    node.addEventListener(type, handler);
    return {
        detach: node.removeEventListener.bind(node, type, handler)
    }
}

/**
 * Original code from Chosen
 * cf. https://github.com/harvesthq/chosen/blob/master/coffee/lib/abstract-chosen.coffee#L260
 */
function browserIsNotSupported (navigator) {
    var isIE = navigator.appName === "Microsoft Internet Explorer" && document.documentMode < 9,
        isIOS = /iP(od|hone)/i.test(navigator.userAgent),
        isAndroid = /Android/i.test(navigator.userAgent);

    return isIE || isIOS || isAndroid;
}