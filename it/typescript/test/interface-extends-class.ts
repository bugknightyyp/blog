class Fenton {
    private height = 'Tall';
    getHeight() {
        return this.height;
    }
}

interface IFenton extends Fenton {
    getWeight() : string;
}

class FentonLike implements IFenton {
    private height = 123
    getHeight() {
        return this;
    }
    getWeight() {
        return 'Don\'t ask';
    }
}
