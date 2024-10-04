// # MoveMaster
//
// Author: Piotr Kowalski
// Contact: piecioshka@gmail.com
// License: The MIT License
// Date: 2015-02-14
//
// ### Example
// ```js
// MoveMaster({
//     target: document.querySelector('#logo'),
//     options: document.body,
//     hook: document.querySelector('#button')
// });
// ```

(function (root) {
    'use strict';

    function applyStyles($element, styles) {
        for (var rule in styles) {
            if (styles.hasOwnProperty(rule)) {
                $element.style[rule] = styles[rule];
            }
        }
    }

    /**
     * Apply moving to any HTMLElement.
     *
     * @param {Object} options
     * @param {HTMLElement} options.target Indicated element to move.
     * @param {HTMLElement} [options.parent=document.body] Wrapper of indicated
     *      element.
     * @param {HTMLElement} [options.hook=options.target] Additional hooker
     *      which moves main object.
     *
     * @constructor
     * @throws When params object in options object is not instance of HTMLElement.
     */
    function MoveMaster(options) {
        if (!(options.target instanceof root.HTMLElement)) {
            throw new Error('MoveMaster: Expected `target` as instance of HTMLElement.');
        }

        var $element = options.target;
        var parent = options.parent || root.document.body;
        var hook = options.hook || $element;

        var left = 0;
        var top = 0;
        var position = isPositionFixed() ? 'fixed' : 'absolute';

        // Disable draggable.
        $element.draggable = false;

        // Check that event target is our element or hooker.
        function isTarget(evt) {
            return evt.target === $element || evt.target === hook;
        }

        // Check initial position CSS property
        function isPositionFixed() {
            var st = root.getComputedStyle($element, null);
            return st.getPropertyValue('position') === 'fixed';
        }

        // Load CSS properties: left, top.
        function loadPosition() {
            var st = root.getComputedStyle($element, null);
            left = parseInt(st.getPropertyValue('left'), 10) || 0;
            top = parseInt(st.getPropertyValue('top'), 10) || 0;
        }

        applyStyles($element, {
            position: position
        });

        // Handler call when user run `mousedown` event in parent element.
        hook.addEventListener('mousedown', function (evt) {
            if (!isTarget(evt)) {
                return;
            }

            var mouseStartLeft = evt.clientX;
            var mouseStartTop = evt.clientY;

            // Handler call on each `mousemove` event.
            function handleMove(moveEvt) {
                var mouseLeft = moveEvt.clientX;
                var mouseTop = moveEvt.clientY;

                var deltaLeft = mouseLeft - mouseStartLeft;
                var deltaTop = mouseTop - mouseStartTop;

                // Calculate new position on X and Y axis.
                $element.style.left = (left + deltaLeft) + 'px';
                $element.style.top = (top + deltaTop) + 'px';
            }

            // Handler of `mouseup` event.
            function stop(stopEvt) {
                parent.removeEventListener('mousemove', handleMove);
                parent.removeEventListener('mouseup', stop);

                // Restore cursor to auto mode.
                stopEvt.target.style.cursor = 'auto';
            }

            parent.addEventListener('mousemove', handleMove);
            parent.addEventListener('mouseup', stop);

            // Update cursor above moving element.
            evt.target.style.cursor = 'move';

            loadPosition();
        });
    }

    // Exports `MoveMaster`.

    if (typeof root.define === 'function' && root.define.amd) {
        // Support AMD style.
        root.define('MoveMaster', [], MoveMaster);
    } else if (typeof root.module === 'object' && module.exports) {
        // Support node.js style
        root.module.exports = MoveMaster;
    } else {
        // Simple add global object.
        root.MoveMaster = MoveMaster;
    }

    // If someone don't like if module returns nothing.
    return MoveMaster;

}(window));
