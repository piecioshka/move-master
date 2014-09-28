# MoveMaster - Apply moving everything!

We have for instance `<img id="logo" src="..." alt="Logo" />`.<br />
Create in JS file reference to that element:

```js
var logo = document.querySelector('#logo');
```

Next, run that one line, to enable logo moving:

```
new MoveMaster(/* HTMLElement */ logo);
```

To enable moving on selected HTMLElement.

## Restrictions

Tested only under newest _WebKit_ browsers (Chrome, Safari) and _Gecko_ (Firefox).

## License

[The MIT License][0]


[0]: http://piecioshka.mit-license.org
