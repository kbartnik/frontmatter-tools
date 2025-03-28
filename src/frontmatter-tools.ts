import { FrontmatterService, Performer } from './frontmatter-service';

// Minimal YAML parser with support for inline object entries in arrays
// The fromYaml function converts a YAML string into a JavaScript object.
// It handles inline objects (e.g., - name: Yann Andre) and supports lists of primitives.
function fromYaml(yamlString: string): Record<string, any> {
    const lines = yamlString.split(/\r?\n/);
    const result: Record<string, any> = {};
    let currentKey: string | null = null;
    const indentRegex = /^\s+/;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const indentMatch = line.match(indentRegex);
        const indent = indentMatch ? indentMatch[0].length : 0;

        if (trimmed.startsWith('-')) {
            const itemLine = trimmed.slice(1).trim();
            const objMatch = itemLine.match(/^([^\s:]+):\s*(.+)$/);
            const nextLine = lines[i + 1] || '';
            const nextIndent = (nextLine.match(indentRegex) || [''])[0].length;

            // Case 1: Inline object (e.g. - name: Yann Andre)
            if (objMatch && !itemLine.includes('{') && !itemLine.includes('[')) {
                const obj: Record<string, any> = {};
                obj[objMatch[1]] = parseYamlValue(objMatch[2]);

                // Look for continuation lines for this object
                let j = i + 1;
                while (j < lines.length && (lines[j].match(indentRegex) || [''])[0].length > indent) {
                    const [k, v] = lines[j].trim().split(/:(.*)/).map(x => x.trim());
                    obj[k] = parseYamlValue(v);
                    j++;
                }

                if (currentKey) {
                    (result[currentKey] ||= []).push(obj);
                }
                i = j - 1;
            } else {
                // Case 2: Primitive value
                if (currentKey) {
                    (result[currentKey] ||= []).push(parseYamlValue(itemLine));
                }
            }
        } else {
            const [key, value] = trimmed.split(/:(.*)/).map(part => part.trim());
            if (value === '') {
                currentKey = key.trim();
                result[currentKey] = [];
            } else {
                result[key.trim()] = parseYamlValue(value);
                currentKey = null;
            }
        }
    }

    return result;
}

// The parseYamlValue function attempts to convert string values to their appropriate types.
// It recognizes boolean values, null, numeric values, and returns the string as is for all other cases.
function parseYamlValue(value: string): any {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (!isNaN(Number(value))) return Number(value);
    return value;
}

// The toYaml function serializes JavaScript objects and arrays back into YAML format.
// It handles both objects and arrays, ensuring proper indentation and formatting.
function toYaml(data: Record<string, any>): string {
    const lines: string[] = [];
    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            lines.push(`${key}:`);
            for (const item of value) {
                if (typeof item === 'object') {
                    lines.push(`  - ${Object.entries(item)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join('\n    ')}`);
                } else {
                    lines.push(`  - ${item}`);
                }
            }
        } else if (typeof value === 'object' && value !== null) {
            lines.push(`${key}:`);
            for (const [k, v] of Object.entries(value)) {
                lines.push(`  ${k}: ${v}`);
            }
        } else {
            lines.push(`${key}: ${value}`);
        }
    }
    return lines.join('\n');
}

export const frontmatterTools: FrontmatterService = {
    // Parses a YAML string into a JavaScript object.
    parse: fromYaml,

    // Serializes a JavaScript object back into a YAML string.
    stringify: toYaml,

    // Validates the structure of the frontmatter data.
    isValid(data) {
        return (
            data &&
            typeof data.title === 'string' &&
            'video_img' in data &&
            Array.isArray(data.performers)
        );
    },

    // Extracts and formats performer information from the frontmatter data.
    getPerformers(data) {
        const performers: Performer[] = Array.isArray(data.performers)
            ? data.performers.map((p: any) => ({
                name: p.name || '',
                image: p.image || '',
            }))
            : [];
        return performers;
    },

    // Retrieves the video image from the frontmatter data, returning undefined if not present.
    getVideoImage(data) {
        return data.video_img ?? undefined;
    },

    // Updates the frontmatter data with a patch, merging the two objects.
    update(data, patch) {
        return { ...data, ...patch };
    },
};