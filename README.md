![](http://i.imgur.com/h8Tr6Vk.png)

<img src="http://i1131.photobucket.com/albums/m542/swolf318/Miscellaneous/DroopyCartoonVector2-500x500_zps577024c8.jpg" height="150"/>

# Dro(o)ppy.js

The lightest & fastest way to convert a native *non-multiple* `<select>` element to a customizable widget.

## Features
* **Zero dependencies:** who needs jQuery/Prototype/Backbone for a simple dropdown widget?
* **Ultra-light:** only **2.05kB** gzipped! Droppy's core logic is really small (~200 lines).
* **JS & basic CSS in the same file:** The minimum CSS rules required for the scaffolding of the widget is pre-included in the `.js` file (an extra CSS theme file needs to be supplied to adjust it to your tastes).
* **Theming via external file:** no need to overwrite any CSS rule because the look doesn't match your property. Droppy comes with no theme at all. You are free to [create you own](http://codepen.io/caccialdo/pen/zrIxe/?editors=010) or use the default one in the repo.
* **CSS-powered filtering:** looking for a particular element in your dropdown? You'll be amazed at how fast Droppy handles this task.
* **no listeners set up at body level:** while other dropdown widget libraries rely on them to close any opened dropdown when the user clicks outside of it, Droppy uses a clever `blur` event instead. Say goodbye to body-level event pollution.
* **.destroy() method:** need to get rid of a droppy? Droppy will get out of your way in the cleanest possible way.

## Limitations
* Browser support: IE9+ and modern browsers only. This is more a design choice as making Droppy work on older browser would have brought its weight up significantly.
* No support for `<select>` tags with multiple attribute.
* No right-to-left text direction support.

## Demo & sandbox
Check out the live demo [here](http://caccialdo.github.io/droppyjs/demo).
If you feel ready to tweak the styling and create your own Droppy theme use the sandbox [here](http://codepen.io/caccialdo/pen/zrIxe/?editors=010). Don't hesitate to share your theme with us. We'd love to create a gallery of them.

## How to install? As easy as 1...2...3

You only need to add **3 elements** to the HTML document to get yourself started:

1. Droppy's core logic:
  ```html
  <script src="path/to/droppy.min.js"></script>
  ```

1. a Droppy CSS theme:
  ```html
  <link rel="stylesheet" href="path/to/theme.css"/>
  ```

1. an initialization script:
  ```js
  var select = document.querySelector("#my-select"),
      droppy = new Droppy(select);
  ```

Your final HTMLcode should look like that:

```html
<!doctype html>
<html lang="en">
<head>
    <...>
    <link rel="stylesheet" href="path/to/theme.css"/>
    <script src="path/to/droppy.min.js"></script>
</head>
<body>
<...>
<select id="my-select">
    <option value="one">option one</option>
    <option value="two">option two</option>
    <option value="three">option three</option>
    <...>
</select>
<script>
    var select = document.querySelector("#my-select"),
        droppy = new Droppy(select);
</script>
</body>
</html>
```

## Droppy's options
When creating a new droppy, an configuration object can be passed to the constructor as a second argument. Supported options include:

| Name | Type | Description | Default value |
|------|------|-------------|---------------|
| **maxWidth** | integer | The maximum width in pixels for the dropdown's header. | `–` |
| **searchBox** | boolean | Whether or not to display the search box in the dropdown. | `true` |
| **theme** | string | The name of the theme you would like to use. The widget container will have a class of the same name. | `"default"` |

For e.g. the code needed to setup a customized Droppy with the [darcula](http://ethanschoonover.com/solarized) theme would be:
```js
var droppy = new Droppy(select, {
    theme: "darcula"
});
```

## DIY Droppy
To build Droppy yourself, make you have Node.js and NPM working. Then, `git clone` this repository and:

```sh
cd to/Droppy/project
npm install
npm start
```

Edit the files in the `src` directory and new assets will be automatically created in the `build` directory.

## Contribute
**Fork**, create a **Pull Request** and we'll review, discuss and merge it -- provided it's true to Droppy.js spirit :-D.
