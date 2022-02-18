export default interface Constructable<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
    new(...args: any) : T;
}
