# Droppy.js

The lightest & fastest way to convert a native *non-multiple* `<select>` element to a customizable widget.

## Features
* **Zero dependencies:** who needs jQuery/Prototype/Backbone for a simple dropdown widget?
* **Ultra-light:** only **1.7kB** gunzipped! Droppy's core logic is really small (less that 150 lines).
* **JS & basic CSS in the same file:** The minimum CSS rules required for the scaffolding of the widget is pre-included in the `.js` file (an extra CSS theme file needs to be supplied to adjust it to your tastes).
* **Theming via external file:** no need to overwrite any CSS rule because the look doesn't match your property. Droppy comes with no theme at all. You are free to create you own or use the default one in the repo.
* **CSS-powered filtering:** looking for a particular element in your dropdown? You'll be amazed at how fast Droppy handles this task.
* **no listeners set up at body level:** while other dropdown widget libraries rely on them to close any opened dropdown when the user clicks outside of it, Droppy uses a clever `blur` event instead. Say goodbye to body-level event pollution.
* **.destroy() method:** need to get rid of a droppy? Droppy will get out of your way in the cleanest possible way.

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
  var droppy = new Droppy({
      select: document.querySelector("#my-select")
  });
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
    var droppy = new Droppy({
        select: document.querySelector("#my-select")
    });
</script>
</body>
</html>
```

## Droppy's options

When creating a new droppy, some options can be passed to the constructor. These options include:

| Name         | Type        | Description                                            | Default value | Required |
|--------------|-------------|--------------------------------------------------------|---------------|:--------:|
| **select**   | NodeElement | The select element to *widgetize*.                     | -             | **Y**    |
| **maxWidth** | integer     | The maximum width in pixels for the dropdown's header. | 250           | N        |

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
