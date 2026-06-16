import { type Stats } from "node:fs";
import { readdir, stat, rename } from "node:fs/promises";
const usrInputPath: string | undefined = process.argv[2];
if (usrInputPath != null) {
  {
    const parentPath: string = `${usrInputPath}/`;

    const filesFolders: string[] = (await readdir(parentPath)).sort(); //parent directory

    const videoFormats: string[] = [
      "mp4",
      "mkv",
      "avi",
      "mov",
      "webm",
      "wmv",
      "flv",
      "mpeg",
      "mpg",
      "3gp",
      "m4v",
    ];
    let lastNum: number = 0;
    filesFolders.forEach(async (value: string): Promise<void> => {
      const oldPath: string = parentPath + value;
      const stats: Stats = await stat(oldPath); // getting info of path;
      if (stats.isFile() /* checking file */) {
        const [videoName, formate]: (string | undefined)[] = value.split(".");
        if (
          formate != null &&
          videoFormats.includes(formate) &&
          videoName != null
        ) {
          const isAlreadyStructured: number = videoName.search(/\d+_/);
          if (isAlreadyStructured != 0) {
            const videoNumber: string | undefined = videoName.split("_").at(-1);
            const num: number = Number(videoNumber);
            lastNum = !isNaN(num) ? Number(videoNumber) : lastNum + 1;
            const pattern: RegExp = new RegExp(`_?\\d+\\.${formate}`, "i");
            const realVideoName: string = value.replace(pattern, `.${formate}`);
            const customizedVideoFileName: string = `${lastNum}_${realVideoName}`;
            await rename(oldPath, parentPath + customizedVideoFileName);
          } else {
            const num: RegExpMatchArray | null = value.match(/\d+/);
            if (num !== null) lastNum = Number(num);
            console.log(lastNum);
          }
        }
      }
    });
  }
}
