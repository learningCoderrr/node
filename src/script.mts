interface IDigitTypes {
  "0x": 16;
  "0o": 8;
  "0b": 2;
}

const digitType: IDigitTypes = {
  "0x": 16,
  "0o": 8,
  "0b": 2,
};
function programmerCalculator(num: number): void {
  const binary: string = num.toString(2);
  const hexDecimal: string = num.toString(16);
  const octal: string = num.toString(8);
  const decimal: string = num.toString(10);
  const final: string = `
  binary=>${binary}
  hexDecimal=>${hexDecimal}
  octal=>${octal}
  decimal=>${decimal}
  `;

  console.log(final);
}

const digit: string = process.argv[0] ?? "";
const typeOfAction: string = digit.slice(0, 2);
const digitTypeValue: number =
  digitType[typeOfAction as keyof IDigitTypes] ?? 10;
programmerCalculator(parseInt(digit, digitTypeValue));
