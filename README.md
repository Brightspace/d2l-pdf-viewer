# d2l-pdf-viewer
[![Build Status](https://travis-ci.com/Brightspace/d2l-pdf-viewer.svg?branch=master)](https://travis-ci.com/Brightspace/d2l-pdf-viewer)



## Installation

`d2l-pdf-viewer` can be installed using npm:
```shell
npm i --save Brightspace/d2l-pdf-viewer
```

## Usage

Import `d2l-pdf-viewer.js` for side-effects:

```javascript
import 'd2l-pdf-viewer/d2l-pdf-viewer.js';
```

```html
<!-- Basic example of adding a PDF viewer that uses the Brightspace CDN for dependencies -->
<d2l-pdf-viewer src="path/to/my.pdf"></d2l-pdf-viewer>
```

See [the main source file (d2l-pdf-viewer.js)](./d2l-pdf-viewer.js) for documentation of the full public API.

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/3.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#tests):

```shell
npm run test:polymer:local
```

To lint AND run local unit tests:

```shell
npm test
```

If you are adding new langterms or updating existing translations, be sure to `npm run build:lang` and commit the changes to `localize-behavior.js`
