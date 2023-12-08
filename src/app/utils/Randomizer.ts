
const Randomizer = {
  generateNbs(amount: number, maxValue: number, valuesToExclude: number[]): number[] {
    const randomNbs: number[] = [];
    const values: number[] = Array
      .from({ length: maxValue }, (_, i) => i)
      .filter(nb => !valuesToExclude.includes(nb));

    while (randomNbs.length < amount) {
      const randomIndex = Math.floor(Math.random() * values.length);
      const randomNb = values.splice(randomIndex, 1)[0];

      randomNbs.push(randomNb);
    }

    return randomNbs;
  },
};

export { Randomizer };