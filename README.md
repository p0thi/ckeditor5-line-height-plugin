# ckeditor5-line-height-plugin

Plugin for CKEditor5 to create button to change the line height of the selected block.

## Get Started

First, install the build from npm:

```bash
npm install --save ckeditor5-line-height-plugin
```
or using yarn:
```bash
yarn add ckeditor5-line-height-plugin
```

Use it in your application:

```js
import LineHeight from 'ckeditor5-line-height-plugin/src/lineheight';
```
#### ***Some users had prblems with styling. In this case try importing this plugin as your first import.***
Add it to your editor:
```js
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [
            ...,
            LineHeight, // add it to your plugins array
        ],
        lineHeight: { // specify your otions in the lineHeight config object. Default values are [ 0, 0.5, 1, 1.5, 2 ]
            options: [ 0.5, 1, 1.5, 2, 2.5 ]
        }
        toolbar: [
            ...,
            'lineHeight', // add the button to your toolbar
        ]
    } )
```
## Localization

Currently supported translations:
* English
* German

## License

Licensed under the terms of [GNU General Public License Version 3](http://www.gnu.org/licenses/gpl.html).