import 'jest-extended';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeValidFrontmatter(): R;
        }
    }
}