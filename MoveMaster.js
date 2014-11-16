// # MoveMaster.js
//
// Author: Piotr Kowalski
// Contact: piecioshka@gmail.com
// License: The MIT License
// Date: 2014-11-16
//
// ### Example
// ```js
// MoveMaster({
//     object: document.querySelector('#logo'),
//     options: document.body,
//     hook: document.querySelector('#button')
// });
// ```

/*global define */

(function (root) {
    'use strict';

    // Main module
    // -----------

    /**
     * Apply moving to any HTMLElement.
     * Indicated element must have CSS rule `position: absolute; left: [X]; top: [X];` to be elastic on moving.
     * Parent element must have at least `position: relative;`.
     *
     * @param {HTMLElement} options.object Indicated element to move.
     * @param {HTMLElement} options.parent Wrapper of indicated element.
     * @param {HTMLElement} options.hook
     * @constructor
     * @throws When invalid run `MoveMaster` (without operator new).
     * @throws When params object in options object is not instance of HTMLElement.
     */
    var MoveMaster = function (options) {
        if (!options.object instanceof root.HTMLElement) {
            throw new Error('MoveMaster: Expected `object` as instance of HTMLElement.');
        }

        var element = options.object;
        var parent = options.parent || root.document.body;
        var hook = options.hook || null;
        var isMove = false;

        var left = 0;
        var top = 0;

        var startX = 0;
        var startY = 0;

        // Disable draggable.
        element.draggable = false;

        // Check that event target is our element or hooker.
        function isTarget(evt) {
            return evt.target === element || evt.target === hook;
        }

        // Load CSS properties: left, top.
        function loadPosition() {
            var st = root.getComputedStyle(element, null);
            left = parseInt(st.getPropertyValue('left'), 10) || 0;
            top = parseInt(st.getPropertyValue('top'), 10) || 0;
        }

        // Method updating object what is moved.
        function update(deltaX, deltaY) {
            // Calculate new position on X and Y axis.
            element.style.left = (left + deltaX) + 'px';
            element.style.top = (top + deltaY) + 'px';
        }

        // Handler call when user run `mousedown` event in parent element.
        function start(evt) {
            if (isTarget(evt)) {
                parent.addEventListener('mousemove', move, false);
                parent.addEventListener('mouseup', stop, false);

                isMove = true;

                startX = evt.clientX;
                startY = evt.clientY;

                // Update cursor above moving element.
                evt.target.style.cursor = 'move';
            }
        }

        // Handler call on each `mousemove` event.
        function move(evt) {
            if (isMove) {
                update(evt.clientX - startX, evt.clientY - startY);
            }
        }

        // Handler of `mouseup` event.
        function stop(evt) {
            parent.removeEventListener('mousemove', move, false);
            parent.removeEventListener('mouseup', stop, false);

            isMove = false;
            // Restore cursor to auto mode.
            evt.target.style.cursor = 'auto';

            loadPosition();
        }

        loadPosition();

        parent.addEventListener('mousedown', start, false);
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
