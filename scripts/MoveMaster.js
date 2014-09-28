(function (root) {
    'use strict';

    var doc = root.document;

    var MoveMaster = function (object) {
        this.element = object;
        this.x = 0;
        this.y = 0;
        this.isMove = false;
        this.left = 0;
        this.top = 0;
        this.initialize();
    };

    MoveMaster.prototype.initialize = function () {
        var st = window.getComputedStyle(this.element, null);
        this.left = parseInt(st.getPropertyValue('left'), 10);
        this.top = parseInt(st.getPropertyValue('top'), 10);

        doc.body.addEventListener('mousedown', this.start.bind(this));
        doc.body.addEventListener('mousemove', this.move.bind(this));
        doc.body.addEventListener('mouseup', this.stop.bind(this));
    };

    MoveMaster.prototype.update = function (deltaX, deltaY) {
        var newX = this.left + deltaX;
        var newY = this.top + deltaY;

        if (newX > 0 && newX < root.window.innerWidth - this.element.width) {
            this.element.style.left = newX + 'px';
        }

        if (newY > 0 && newY < root.window.innerHeight - this.element.height) {
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
    return (root.MoveMaster = MoveMaster);

}(this));
