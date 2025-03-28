// src/frontmatter-tools.test.ts
import { mock, instance, when, verify } from 'ts-mockito';

interface FrontmatterReader {
    load(): string;
}

function parseFrontmatter(reader: FrontmatterReader): any {
    const yamlText = reader.load();
    return { title: yamlText }; // fake parsing
}

test('parseFrontmatter calls load and parses value', () => {
    const readerMock = mock<FrontmatterReader>();
    when(readerMock.load()).thenReturn('Trivial');

    const reader = instance(readerMock);
    const result = parseFrontmatter(reader);

    expect(result.title).toBe('Trivial');
    verify(readerMock.load()).once(); // ✅ verifies that .load() was called once
});