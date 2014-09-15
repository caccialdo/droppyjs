function bindEvent(node, type, handler, context) {
    if (context) handler = handler.bind(context);
    node.addEventListener(type, handler);
    return {
        detach: node.removeEventListener.bind(node, type, handler)
    }
}