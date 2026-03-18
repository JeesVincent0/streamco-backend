export class Slug {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Factory method to create and validate a Slug.
   * You can pass either a raw name (e.g., "Just Chatting!")
   * or a pre-formatted slug (e.g., "just-chatting").
   */
  public static create(rawInput: string): Slug {
    if (!rawInput || rawInput.trim() === '') {
      throw new Error('Slug cannot be empty.');
    }

    const formattedSlug = rawInput
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (formattedSlug.length < 2) {
      throw new Error(
        'Slug must be at least 2 characters long after formatting.',
      );
    }

    if (formattedSlug.length > 100) {
      throw new Error('Slug cannot exceed 100 characters.');
    }

    const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formattedSlug);
    if (!isValid) {
      throw new Error(`Invalid slug format generated: ${formattedSlug}`);
    }

    return new Slug(formattedSlug);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Slug): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Slug)) {
      return false;
    }
    return this.value === other.getValue();
  }
}
