# MoveMaster

```

 _____             _____         _
|     |___ _ _ ___|     |___ ___| |_ ___ ___
| | | | . | | | -_| | | | .'|_ -|  _| -_|  _|
|_|_|_|___|\_/|___|_|_|_|__,|___|_| |___|_|

```

We have for instance that structure in DOM:

```html
<img id="logo" src="..." alt="Logo" />`
```

Create in JavaScript file reference to that element:

```js
var logo = document.querySelector('#logo');
```

Next, run that one line, to enable logo moving:

```js
new MoveMaster({
    object: /* HTMLElement */ logo
});
```

To enable moving on selected HTMLElement.

## API

In settings:

 - `object` - HTMLElement which will be moved
 - `parent` - HTMLElement of parent element, which will be calculate position
 - `reference` - HTMLElement of another element near moved object.

## Restrictions

Tested only under newest _WebKit_ browsers (Chrome, Safari) and _Gecko_ (Firefox).

## License

[The MIT License][0]


[0]: http://piecioshka.mit-license.org
