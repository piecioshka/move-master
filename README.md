# MoveMaster

```
oo          MM'""""'YMM dP oo                     dP
            M' .mmm. `M 88                        88
dP .d8888b. M  MMMMMooM 88 dP .d8888b. 88d888b. d8888P
88 Y8ooooo. M  MMMMMMMM 88 88 88ooood8 88'  `88   88
88       88 M. `MMM' .M 88 88 88.  ... 88    88   88
dP `88888P' MM.     .dM dP dP `88888P' dP    dP   dP
            MMMMMMMMMMM

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
