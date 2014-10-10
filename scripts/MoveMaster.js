// # MoveMaster.js
//
// Author: Piotr Kowalski
// Contact: piecioshka@gmail.com
// License: The MIT License
// Date: 2014-10-10
//
// ### Example
// ```js
// new MoveMaster({
//     object: document.querySelector('#logo')
// });
// ```

/*global define */

(function (root) {
    'use strict';

    var assert;

    // Aliases.
    var doc = root.document;

    /**
     * Apply moving to any HTMLElement.
     * Indicated element must have CSS rule `position: absolute; left: [X]; top: [X];` to be elastic on moving.
     * Parent element must have at least `position: relative;`.
     *
     * @param {HTMLElement} options.object Indicated element to move.
     * @param {HTMLElement} options.parent Wrapper of indicated element.
     * @param {HTMLElement} options.reference
     * @constructor
     * @throws When invalid run `MoveMaster` (withour operator new).
     * @throws When params object in options object is not instance of HTMLElement.
     */
    var MoveMaster = function (options) {
        assert(this instanceof MoveMaster, 'MoveMaster: Use new operator to run MoveMaster constructor.');
        assert(options.object instanceof root.HTMLElement, 'MoveMaster: Expected `object` as instance of HTMLElement.');

        this.element = options.object;
        this.parent = options.parent || doc.body;
        this.reference = options.reference;
        this.x = 0;
        this.y = 0;
        this.isMove = false;
        this.left = 0;
        this.top = 0;

        this.initialize();
    };

    /**
     * Simple patter to extract first logic to `constuctor` from classic OO.
     */
    MoveMaster.prototype.initialize = function () {
        var st = root.getComputedStyle(this.element, null);
        this.left = parseInt(st.getPropertyValue('left'), 10);
        this.top = parseInt(st.getPropertyValue('top'), 10);

        this.parent.addEventListener('mousedown', this.start.bind(this), false);
        this.parent.addEventListener('mousemove', this.move.bind(this), false);
        this.parent.addEventListener('mouseup', this.stop.bind(this), false);
    };

    /**
     * Method updating object what is moved.
     *
     * @param {number} deltaX
     * @param {number} deltaY
     */
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

    /**
     * Handler call when user run `mousedown` event in parent element.
     *
     * @param {Event} evt
     */
    MoveMaster.prototype.start = function (evt) {
        if (evt.target === this.element || evt.target === this.reference) {
            this.isMove = true;
        }
    };

    /**
     * Handler call on each `mousemove` event.
     *
     * @param {Event} evt
     */
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

    /**
     * Handler of `mouseup` event.
     *
     * @param {Event} evt
     */
    MoveMaster.prototype.stop = function (evt) {
        this.isMove = false;
    };


    // Utilities.
    // ----------

    /**
     * Validate that first parameter is true.
     *
     * @param {*} value
     * @param {string} msg
     */
    assert = function assert(value, msg) {
        if (!value) {
            throw new Error(msg || "Assertion error");
        }
    };


    // Exports `MoveMaster`.
    // ---------------------

    if (typeof root.define === 'function' && root.define.amd) {
        // Support AMD style.
        root.define('MoveMaster', [], MoveMaster);
    } else {
        // Simple add global object.
        root.MoveMaster = MoveMaster;
    }

    // If someone don't like if module returns `undefined`.
    return MoveMaster;

}(this));
