# MoveMaster.js

```

 _____             _____         _               _
|     |___ _ _ ___|     |___ ___| |_ ___ ___    |_|___
| | | | . | | | -_| | | | .'|_ -|  _| -_|  _|_  | |_ -|
|_|_|_|___|\_/|___|_|_|_|__,|___|_| |___|_| |_|_| |___|
                                              |___|

```

We have for instance that structure in DOM:

```html
<img id="logo" src="..." alt="Logo" />`
```

Create in JavaScript file reference to that element:

```javascript
var logo = document.querySelector('#logo');
```

Next, run that one line, to enable logo moving:

```javascript
MoveMaster({
    object: /* HTMLElement */ logo,
    options: document.body,
    hook:  /* HTMLElement */ button
});
```

To enable moving on selected HTMLElement.

## API

In settings:

 - `object` - HTMLElement which will be moved
 - `parent` - HTMLElement of parent element, which will be calculate position. Default `document.body`.
 - `hook` - HTMLElement of another element near moved object. Default `null`.

## Restrictions

Tested only under newest Chrome, Safari, Firefox.

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2014
