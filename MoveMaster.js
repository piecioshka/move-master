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

    /**
     * Apply moving to any HTMLElement.
     * Indicated element must have CSS rule `position: absolute; left: [X]; top: [X];` to be elastic on moving.
     * Parent element must have at least `position: relative;`.
     *
     * @param {HTMLElement} options.object Indicated element to move.
     * @param {HTMLElement} [options.parent] Wrapper of indicated element.
     * @param {HTMLElement} [options.hook] Additional hooker which moves main object.
     *
     * @constructor
     * @throws When params object in options object is not instance of HTMLElement.
     */
    var MoveMaster = function (options) {
        if (!options.object instanceof root.HTMLElement) {
            throw new Error('MoveMaster: Expected `object` as instance of HTMLElement.');
        }

        var element = options.object;
        var parent = options.parent || root.document.body;
        var hook = options.hook || element;

        var left = 0;
        var top = 0;

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

        // Handler call when user run `mousedown` event in parent element.
        hook.addEventListener('mousedown', function start(evt) {
            if (!isTarget(evt)) {
                return;
            }

            var mouseStartLeft = evt.clientX;
            var mouseStartTop = evt.clientY;

            parent.addEventListener('mousemove', handleMove);
            parent.addEventListener('mouseup', stop);

            // Update cursor above moving element.
            evt.target.style.cursor = 'move';

            // Handler call on each `mousemove` event.
            function handleMove(evt) {
                var mouseLeft = evt.clientX;
                var mouseTop = evt.clientY;

                var deltaLeft = mouseLeft - mouseStartLeft;
                var deltaTop = mouseTop - mouseStartTop;

                // Calculate new position on X and Y axis.
                element.style.left = (left + deltaLeft) + 'px';
                element.style.top = (top + deltaTop) + 'px';
            }

            // Handler of `mouseup` event.
            function stop(evt) {
                parent.removeEventListener('mousemove', handleMove);
                parent.removeEventListener('mouseup', stop);

                // Restore cursor to auto mode.
                evt.target.style.cursor = 'auto';
            }

            loadPosition();
        });
    };

    // Exports `MoveMaster`.

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
