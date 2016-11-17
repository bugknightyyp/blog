declare class Fenton {
    private height;
    getHeight(): string;
}
interface IFenton extends Fenton {
    getWeight(): string;
}
declare class FentonLike implements IFenton {
    private height;
    getHeight(): this;
    getWeight(): string;
}
