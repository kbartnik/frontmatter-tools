/**
 * Represents a parsed performer entry from frontmatter.
 */
export interface Performer {
    name: string;
    image: string;
}

/**
 * Defines an interface for working with YAML frontmatter.
 */
export interface FrontmatterService {
    /**
     * Parses raw YAML frontmatter text into a structured object.
     * @param raw - The raw YAML frontmatter as a string.
     * @returns A key-value map representing the frontmatter.
     */
    parse(raw: string): Record<string, any>;

    /**
     * Converts a frontmatter object back into a YAML-formatted string.
     * @param data - The frontmatter object.
     * @returns A YAML string suitable for use in Obsidian.
     */
    stringify(data: Record<string, any>): string;

    /**
     * Validates whether the given frontmatter object has the required fields.
     * @param data - The frontmatter object.
     * @returns True if valid, false otherwise.
     */
    isValid(data: Record<string, any>): boolean;

    /**
     * Retrieves the performers from the frontmatter.
     * @param data - The frontmatter object.
     * @returns An array of performers (name and image).
     */
    getPerformers(data: Record<string, any>): Performer[];

    /**
     * Returns the `video_img` field from the frontmatter, if present.
     * @param data - The frontmatter object.
     * @returns A string or undefined.
     */
    getVideoImage(data: Record<string, any>): string | undefined;

    /**
     * Updates the frontmatter object by applying a partial patch.
     * @param data - The original frontmatter.
     * @param patch - The patch values to merge in.
     * @returns A new object with updated values.
     */
    update(data: Record<string, any>, patch: Partial<Record<string, any>>): Record<string, any>;
}