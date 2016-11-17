var Fenton = (function () {
    function Fenton() {
        this.height = 'Tall';
    }
    Fenton.prototype.getHeight = function () {
        return this.height;
    };
    return Fenton;
}());
var FentonLike = (function () {
    function FentonLike() {
        this.height = 123;
    }
    FentonLike.prototype.getHeight = function () {
        return this;
    };
    FentonLike.prototype.getWeight = function () {
        return 'Don\'t ask';
    };
    return FentonLike;
}());
