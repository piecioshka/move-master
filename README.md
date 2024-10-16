# move-master

[![node version](https://img.shields.io/node/v/move-master.svg)](https://www.npmjs.com/package/move-master)
[![npm version](https://badge.fury.io/js/move-master.svg)](https://badge.fury.io/js/move-master)
[![downloads count](https://img.shields.io/npm/dt/move-master.svg)](https://www.npmjs.com/package/move-master)
[![size](https://packagephobia.com/badge?p=move-master)](https://packagephobia.com/result?p=move-master)
[![license](https://img.shields.io/npm/l/move-master.svg)](https://piecioshka.mit-license.org)

🔨 Move ANY element on page

## Preview 🎉

<https://codepen.io/piecioshka/full/dXAJdq/>

## How it works?

We have for instance that structure in DOM:

```html
<img id="logo" src="..." alt="Logo" />
```

Create in JavaScript file reference to that element:

```javascript
var logo = document.querySelector('#logo');
```

Next, run that one line, to enable logo moving:

```javascript
const MoveMaster = require('move-master');

MoveMaster({
    target: /* HTMLElement */ logo,
    options: document.body,
    hook:  /* HTMLElement */ button
});
```

To enable moving on selected HTMLElement.

## API

In settings:

- `target` - HTMLElement which will be moved
- `parent` - HTMLElement of parent element, which will be calculate position.
  - Default `document.body`.
- `hook` - HTMLElement of another element near moved object.
  - Default `null`.

## License

[The MIT License](https://piecioshka.mit-license.org) @ 2014
