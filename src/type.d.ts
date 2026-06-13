interface IMemory {
  memorySize: number;
  memoryRemaining: number;
  memoryUsed: number;
}
interface ITask {
  memory: IMemory;
}
export { IMemory };
export default ITask;
