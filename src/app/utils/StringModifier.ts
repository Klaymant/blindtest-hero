const StringModifier = {
  shorten(str: string, len: number): string {
    return str.length > len ? str.substring(0, len).trim() + '...' : str;
  }
};

export { StringModifier };
