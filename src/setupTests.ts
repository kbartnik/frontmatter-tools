// Enable extended matchers like toIncludeAllMembers(), toStartWith(), etc.
import 'jest-extended';

// Add a custom matcher for validating frontmatter structure
expect.extend({
    toBeValidFrontmatter(received: any) {
        const pass =
            typeof received === 'object' &&
            received !== null &&
            typeof received.title === 'string' &&
            'video_img' in received &&
            'performers' in received;

        return {
            message: () =>
                pass
                    ? 'expected object NOT to be valid frontmatter'
                    : 'expected object to contain at least "title", "video_img", and "performers"',
            pass,
        };
    }
});