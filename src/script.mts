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
function additionalZeroOnBinary(
  binary: string,
  redis: 3 | 4,
  extraZero: number = 0,
): string {
  const pairedBinary: string = "0".repeat(extraZero) + binary;
  const pattern: RegExp = new RegExp(`\\d{0,${redis}}`, "g");
  return pairedBinary.match(pattern)?.slice(0, -1).join(" ") ?? "";
}

function fixingZeroCountOnBinary(
  actualLength: number,
  counting: number = 1,
): number {
  const value: number = 4 * counting - actualLength;
  if (value > 0) return value;

  return fixingZeroCountOnBinary(actualLength, counting + 1);
}

function replica(binary: string, redis: 3 | 4): string {
  const actualLength: number = binary.length;
  if (actualLength % redis === 0) return additionalZeroOnBinary(binary, redis);
  const extraZeroCount: number = fixingZeroCountOnBinary(actualLength);
  return additionalZeroOnBinary(binary, redis, extraZeroCount);
}

function programmerCalculator(num: number, action: string): void {
  let binary: string | null = num.toString(2);

  switch (action) {
    case "0x": {
      binary = replica(binary, 4);
      break;
    }
    case "0o": {
      binary = replica(binary, 3);
      break;
    }
    default: {
      binary = num.toString(2);
    }
  }
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

const digit: string = process.argv[2] ?? "";
const typeOfAction: string = digit.slice(0, 2);
const digitExtract: string = digit.slice(2);
const digitTypeValue: number =
  digitType[typeOfAction as keyof IDigitTypes] ?? 10;
if (digitExtract.includes(String(digitTypeValue)) === false) {
  programmerCalculator(parseInt(digitExtract, digitTypeValue), typeOfAction);
} else console.log("InValid number system or InValid Value", digit);
