// # MoveMaster.js
//
// Author: Piotr Kowalski
// Contact: piecioshka@gmail.com
// License: The MIT License
// Date: 2014-09-28
//
// ### Example
// ```js
// var logo = document.querySelector('#logo');
// new MoveMaster(logo);
// ```

/*global define */

(function (root) {
    'use strict';

    /**
     * Apply moving to any HTMLElement.
     * Indicated element must have CSS rule `position: absolute; left: [X]; top: [X];` to be elastic on moving.
     * Parent element must have at least `position: relative;`.
     *
     * @param {HTMLElement} object Indicated element to move.
     * @param {HTMLElement} [parent = document.body] Wrapper of indicated element.
     * @constructor
     */
    var MoveMaster = function (object, parent) {
        // Protection incorrect call.
        if (!(this instanceof MoveMaster)) {
            throw new Error('MoveMaster: Use new operator to run MoveMaster constructor!');
        }

        // Protection object is incorrect type.
        if (!(object instanceof root.HTMLElement)) {
            throw new Error('MoveMaster: Expected `object` as instance of HTMLElement!');
        }

        this.element = object;
        this.parent = parent || root.document.body;
        this.x = 0;
        this.y = 0;
        this.isMove = false;
        this.left = 0;
        this.top = 0;

        this.initialize();
    };

    MoveMaster.prototype.initialize = function () {
        var st = root.getComputedStyle(this.element, null);
        this.left = parseInt(st.getPropertyValue('left'), 10);
        this.top = parseInt(st.getPropertyValue('top'), 10);

        this.parent.addEventListener('mousedown', this.start.bind(this));
        this.parent.addEventListener('mousemove', this.move.bind(this));
        this.parent.addEventListener('mouseup', this.stop.bind(this));
    };

    MoveMaster.prototype.update = function (deltaX, deltaY) {
        var newX, newY;

        // Calculate new position on X and Y axis.
        newX = this.left + deltaX;
        newY = this.top + deltaY;

        if (newX > 0 && newX < root.window.innerWidth - this.element.offsetWidth) {
            this.element.style.left = newX + 'px';
        }

        if (newY > 0 && newY < root.window.innerHeight - this.element.offsetHeight) {
            this.element.style.top = newY + 'px';
        }
    };

    MoveMaster.prototype.start = function (evt) {
        if (evt.target === this.element) {
            this.isMove = true;
        }
    };

    MoveMaster.prototype.move = function (evt) {
        if (this.isMove) {
            if (!this.x && !this.y) {
                this.x = evt.clientX;
                this.y = evt.clientY;
            } else {
                this.update(evt.clientX - this.x, evt.clientY - this.y);
            }
        }
    };

    MoveMaster.prototype.stop = function (evt) {
        this.update(evt.clientX - this.x, evt.clientY - this.y);
        this.isMove = false;
    };

    // Exports `MoveMaster`.
    if (typeof root.define === 'function' && root.define.amd) {
        // Support AMD style.
        root.define(MoveMaster);
    } else {
        // Simple add global object.
        root.MoveMaster = MoveMaster;
    }

    // If someone don't like if module returns `undefined`.
    return MoveMaster;

}(this));
