export const NumberModifier = {
  separateThousands(num: number, seperationCharacter = ','): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seperationCharacter);
  }
};