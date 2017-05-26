class NoSuchElement extends Error {
    constructor() {
        super('no such element');
    }
}
class NullPointerException extends Error {
    constructor() {
        super('null pointer');
    }
}

export {
    NoSuchElement,
    NullPointerException,
};
