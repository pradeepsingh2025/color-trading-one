export class ColorTradingGame {
  constructor() {
    this.colors = {
      GREEN: { name: 'green', probability: 0.233, payout: 2.5 },
      VIOLET: { name: 'violet', probability: 0.333, payout: 2.0 },
      RED: { name: 'red', probability: 0.434, payout: 1.4 }
    };
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  generateResult() {
    const random = Math.random();
    const randomNumber = Math.floor(Math.random() * 10);
    
    let cumulativeProbability = 0;
    let winningColor;
    
    for (const [key, color] of Object.entries(this.colors)) {
      cumulativeProbability += color.probability;
      if (random <= cumulativeProbability) {
        winningColor = color;
        break;
      }
    }
    
    return {
      number: randomNumber,
      color: winningColor,
      timestamp: Date.now()
    };
  }
}