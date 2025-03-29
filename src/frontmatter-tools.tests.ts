import { mock, instance, when, verify } from 'ts-mockito';
import { FrontmatterService } from './frontmatter-service';
import { frontmatterTools } from './frontmatter-tools';

// This describe block tests the real implementation of the FrontmatterTools
describe('FrontmatterTools (real implementation)', () => {
    const raw = `
  title: Trivial
  video_img: preview.jpg
  performers:
    - name: Yann Andre
      image: yann.webp
`;

    // This test checks if the YAML parsing function correctly parses valid input
    it('parses valid YAML correctly', () => {
        const data = frontmatterTools.parse(raw);
        // Verifying that the parsed title matches the expected value
        expect(data.title).toBe('Trivial');
        // Verifying that the parsed video image matches the expected value
        expect(data.video_img).toBe('preview.jpg');
    });

    // This test checks if the isValid function returns true for valid frontmatter data
    it('isValid returns true for valid frontmatter', () => {
        const data = frontmatterTools.parse(raw);
        // Verifying that the isValid function correctly identifies valid data
        expect(frontmatterTools.isValid(data)).toBe(true);
    });

    // This test checks if the getPerformers function extracts the performer list correctly
    it('getPerformers extracts performer list', () => {
        const data = frontmatterTools.parse(raw);
        const performers = frontmatterTools.getPerformers(data);
        // Verifying that the number of extracted performers is as expected
        expect(performers).toHaveLength(1);
        // Verifying that the name of the first performer matches the expected value
        expect(performers[0].name).toBe('Yann Andre');
    });

    // This test checks if the stringify function serializes the object to YAML correctly
    it('stringify serializes to YAML', () => {
        const yaml = frontmatterTools.stringify({
            title: 'Test',
            performers: ['A', 'B'],
        });
        // Verifying that the serialized output contains the expected title
        expect(yaml).toContain('title: Test');
        // Verifying that the serialized output contains the expected performer names
        expect(yaml).toContain('- A');
    });
});

// This describe block tests the mocked implementation of FrontmatterService using ts-mockito
describe('FrontmatterService mock', () => {
    // This test checks if the mock service returns expected performer data
    it('returns mock performer data', () => {
        const svcMock = mock<FrontmatterService>();

        const fakeData = { performers: [{ name: 'Gaspard', image: 'gaspard.jpg' }] };
        // Setting up the mock to return the fake performer data when the method is called
        when(svcMock.getPerformers(fakeData)).thenReturn(fakeData.performers);

        const svc = instance(svcMock);
        const result = svc.getPerformers(fakeData);

        // Verifying that the result contains the expected number of performers
        expect(result).toHaveLength(1);
        // Verifying that the name of the first performer in the result matches the expected value
        expect(result[0].name).toBe('Gaspard');

        // Verifying that the mocked method was called exactly once with the fake data
        verify(svcMock.getPerformers(fakeData)).once();
    });
});