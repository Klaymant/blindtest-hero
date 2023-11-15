
const Randomizer = {
  generateNbs(amount: number, maxValue: number): number[] {
    const randomNbs: number[] = [];

    while (randomNbs.length < amount) {
      const randomNb = Math.floor(Math.random() * maxValue);

      if (!randomNbs.includes(randomNb))
        randomNbs.push(randomNb);
    }

    return randomNbs;
  }
};

export { Randomizer };