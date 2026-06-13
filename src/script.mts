import type { IMemory } from "./type.d.ts";
import type ITask from "./type.d.ts";
import { freemem, totalmem } from "node:os";
function byteToGbConverter(size: number): number {
  const byteToGb: number = Number.parseFloat(
    (size / 1024 / 1024 / 1024).toFixed(2),
  );
  return byteToGb;
}

function getMemoryInfo(): IMemory {
  const memoryRemaining: number = byteToGbConverter(freemem());
  const memorySize: number = byteToGbConverter(totalmem());
  const memoryUsed: number = parseFloat(
    (memorySize - memoryRemaining).toFixed(),
  );
  return { memoryRemaining, memorySize, memoryUsed };
}

function taskManager(timeInSec: number): void {
  let task: ITask = {
    memory: getMemoryInfo(),
  };
  setInterval((): void => {
    const { memoryRemaining, memoryUsed }: IMemory = getMemoryInfo();

    if (memoryRemaining != task.memory.memoryRemaining) {
      console.log(
        `memoryRemaining=> ${memoryRemaining}GB \n memoryUsed=> ${memoryUsed}GB`,
      );
      task.memory.memoryRemaining = memoryRemaining;
      task.memory.memoryUsed = memoryUsed;
    }
  }, timeInSec * 1000);
}

taskManager(2);
