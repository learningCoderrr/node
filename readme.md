# Node.js

## Demo of NodeJs

We can create a new HTTP server with the help of the Node.js module `http`.

```js
const http = require("node:http");
const cb = (req, res) => {
  res.end("Hello sended by the server");
};
const server = http.createServer(cb);
server.listen(500); //listen on the specific port number on localhost.
```

We can also spawn a new process using Node.js with the help of the `child_process` module.

```js
const { exec } = require("node:child_process");
exec("start chrome");
```

---

## What is a Process?

A process is a running instance of any application on a system, using allocated memory and other resources provided by the OS — most importantly, CPU time.

- A process is not always started by another process — sometimes a process has no parent process and runs automatically.
- A process that is spawned by another process has a **parent process**.
- A single process can start many other processes.
- The OS identifies every process with a **PID** (Process ID).
- A process always has a **main thread**, and depending on need, it can create multiple threads.
- It can also generate other process if needed for different memory space.

**Process states:** `initialized`, `waiting`, `running`, `sleeping`, `terminated`

The OS doesn't run a process on a CPU core for a long time — it switches between other processes make functional of system so that other processes also get a chance to run (otherwise the system could crash or freeze). This switching is known as **context switching**.

We can access the process ID (`pid`) and parent process ID (`ppid`) from Node.js to identify the current process and its parent.

```js
console.log(process.id);
console.log(process.ppid);
```

---

## What are Threads?

A processor has physical cores, and on top of physical cores are logical cores (virtual threads), which allow better CPU utilization and smoother task execution.

> Total logical cores = physical cores + virtual threads

- Threads perform specific work for a process, allowing multiple tasks to run concurrently.
- With a single thread, only one task can be done at a time; with multithreading (or more logical cores), more work can be done efficiently.
- Threads consume CPU time and use **shared memory** (the process's memory).
- Each thread has a **TID** (Thread ID) to identify it within a process.

**Process vs Thread:**

- A process takes more memory than a thread because a process allocates its own memory, while a thread uses the process's memory.
- If a thread crashes, the whole process (and its threads) can crash.
- If one process spawns another process and that child process has an issue, the parent process is unaffected — only the specific process crashes.

We can also create threads using Node.js. JavaScript itself is single-threaded, but Node.js uses **worker threads** and **libuv** internally for multithreading.

```js
const { Worker } = require("worker_threads");
new Worker("path");
```

---

## What is `env`?

`env` (environment variable) is a key-value pair storage mechanism, storing data as strings for both key and value. It's used to store important information like paths, API keys, passwords, etc.

**Where env values are used:** processes, user-specific settings, OS-level settings.

- Env values are copied automatically not inherited — if a process is started by a parent process, the parent's env values are passed to the child.
- Multiple values in a single key can be split using `;` (semicolon) on Windows and `:` (colon) on Linux/macOS.

**Common commands:**

```bash
env                     # view env variables
printenv                # view env variables

setx key "value"        # set a user-specific env variable (not system-wide)

unset KEY                # delete an env variable in the current terminal process

export key=value          # create a new env variable in bash

env -u KEYNAME nodejs      # stop an env value from passing to the child process like nodejs

key2=value2 key1=value1 nodejs  # pass env values specifically to a new child process only
```

We can also pass env values to a process (like Node.js) using a `.env` file or any plain text file (env files are just normal text files).

To check env values from Node.js:

```js
console.log(process.env);
```

---

## What is WSL?

**WSL (Windows Subsystem for Linux)** is a way of installing Linux on Windows (like a lightweight virtual machine).

- It installs a Linux distribution (e.g., Ubuntu) on Windows without needing a full virtual machine.

### To install `WSL` cmd is

```bash
 wsl --install
```

- we can control this operating system by the help of terminal it's own shell (bash) only .Totally `CLI` based operating system.It can be seems like how the linux is installed in server and operating it.

## Indicators of files in OS.

- There's a **symbolic link** in the home directory, which is just a link to another folder.

**File type indicators:**
| Symbol | Meaning |
|--------|---------|
| `l` | Symbolic link |
| `d` | Directory |
| `-` | File |

**Running commands in a bash terminal — two ways:**

1. Write the file name with a relative path, or use the `bash` command with the file path .This enforce a new process to generate:
   ```bash
   bash fileNamePathName
   ```
2. Use the `source` command with the file path .This file will run on current shell or process:
   ```bash
   source fileNamePathName
   ```

**Difference:** Running a file directly (with execute permission) or using there interpreter to run that creates a **new process** , and its output is shown there in same shell but internally creates a new process and evaluate there. Using `source` cmd runs the file in the **same process** — no new process/thread is created.

---

## File Permissions

- On Windows, files like `.html`, `.css`, `.sh`, etc., have execution permission by default — running the file path directly executes it.
- A file executes when either its absolute path is given, or (if it's in the same folder) with `./file.extension`.
- On Linux, files don't have execute permission by default — it must be explicitly set.

**Types of executable files:**

1. **Script files** — bash, `.js`, `.py`, `.cmd`, `.bat`, etc.
2. **Binary files** — `.exe`, `.deb`, `.rpm`

### File/Folder Permissions in Linux

Only 3 permissions exist:

| Permission | Symbol | Value |
| ---------- | ------ | ----- |
| Read       | `r`    | 4     |
| Write      | `w`    | 2     |
| Execute    | `x`    | 1     |

- On Windows, `r`, `w`, `x` are all allowed by default.
- On Linux, only `r` and `w` are allowed by default — `x` must be set manually.

**User types in Linux:**

- **Current user (`u`)** — the user running the current session.
- **Group users (`g`)** — users in the same group as the current user.
- **Other users (`o`)** — users not in the same group as the current user.

**Entry types:** file (`-`), directory (`d`), symbolic link (`l`)

### Changing Permissions with `chmod`

`-` removes a permission, `+` adds a permission.

```bash
chmod -r filePath/folderPath     # remove read permission only to current user
chmod +w filePath/folderPath     # add write permission only to current user
chmod g-r filePath/folderPath    # remove read permission from group users only
```

We can also set permissions using numbers: `4` = read, `2` = write, `1` = execute. Sum the values for multiple permissions.

```bash
chmod 611 filePath/folderPath
```

This breaks down as:

- **Current user** → `6` = read (4) + write (2)
- **Group user** → `1` = execute (1)
- **Other user** → `1` = execute (1)

---

## Command Priority in Bash

When a command is typed in a bash terminal, it's resolved in this priority order:

1. **Alias** — checked first; if the command matches an alias, the alias runs instead of the original command.
2. **Function** — if a matching function exists, it runs.
3. **Built-in** — built-in shell commands run next.
4. **Hash** — paths to executables found via the `PATH` variable are cached in a hash table for faster lookup next time. Use `hash` cmd to view it.
5. **Executable** — any file with execute permission (script or binary) can be run as a command.

To check where a command comes from:

```bash
type cmdName # provides path and what's the type
which cmdName # provides path
```

### The `PATH` Variable

When we install something like Python or Node.js, we can run the executable by name alone, even though the file isn't in the current directory. This works because of the `PATH` environment variable, which lists directories the system/terminal searches when resolving a command. Adding a directory to `PATH` makes its executables accessible system-wide or user-wide, depending on where it was added.

---

## CommonJS Modules

CommonJS is the default module system in Node.js for importing and exporting modules between files.

- `require()` returns whatever was assigned to `module.exports` in the target file.
- To export something, assign it to `module.exports`, or use the `exports` variable (which points to `module.exports`).
- CommonJS wraps the entire file in a **module wrapper function** (an IIFE) — this is why each module has its own local scope.
- If you reassign `exports` directly, it becomes unlinked from `module.exports` and won't be exported. Reassigning `module.exports` directly still works correctly.

CommonJS is enabled by default. If `package.json` specifies `"type": "module"`, you must use the `.cjs` extension to keep using CommonJS in that file.

---

## ES6 Modules

ES6 modules were introduced after CommonJS, as part of the ES6+ update.

- Uses the `import` and `export` keywords.
- Enabled by setting `"type": "module"` in `package.json`, or by using the `.mjs` file extension (no need of `package.json`).
- Only works with `.js` or `.mjs` files — full paths are required, or it throws an error.
- Creates a **module scope** (a distinct scope per module).

### `import.meta`

Used in ES6 modules to access the directory name and file name.

---

## Types of Node.js Modules

1. **Core/native modules** — built into Node.js (e.g., `fs`, `http`, `net`, `worker_threads`, `child_process`,`process`).
2. **Third-party / npm packages** — external modules that simplify development present inside node_module folder(e.g., `axios`, `react`, `express`).
3. **User modules** — modules created by the developer (e.g., `math.js`, `useDefined.js`).

All module types can be accessed via either the ES6 or CommonJS module system.

---

## Creating Your Own npm Package

1. Create a `package.json` file.
2. Create `.cjs` and `.mjs` files to support both CommonJS and ES6 module systems.
3. In `package.json`, configure exports:

```json
"exports": {
  "import": ".mjs",
  "require": ".cjs"
}
```

- Users using `import` get the `.mjs` file; users using `require()` get the `.cjs` file.
- If only a single file exists, use `"main": "path"` instead.

**Other important `package.json` fields:**

| Field             | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `version`         | Package version                             |
| `keywords`        | SEO for the npm registry                    |
| `author`          | Owner/contributor info                      |
| `name`            | Package name                                |
| `description`     | Package description                         |
| `dependencies`    | Packages the project depends on             |
| `devDependencies` | Dependencies only needed during development |
| `scripts`         | Custom run commands (`npm run scriptName`)  |

Some script keys are "special" and run without needing `npm run` — just `npm scriptName`:
`start`, `restart`, `stop`, `test`, etc.

Once this is set up, the package is ready to use and can be published to npm (typically along with a `README.md`).

### Semantic Versioning Symbols

| Symbol | Example   | Meaning                                                                                                                            |
| ------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `^`    | `^1.0.0`  | Updates minor and patch versions only, not major. If major version is `0` (e.g. `0.2.4`), only patch updates happen automatically. |
| `~`    | `~2.3.4`  | Updates patch version only.                                                                                                        |
| `>=`   | `>=2.5.3` | Installs/updates to this version or any newer version.                                                                             |
| `>`    | `>2.4.5`  | Installs/updates to any version greater than this.                                                                                 |
| `<`    | `<4.34.4` | Installs/updates to a version less than this.                                                                                      |
| `<=`   | `<=4.3.3` | Installs/updates up to this version.                                                                                               |
| (none) | `3.5.3`   | Installs this exact version only.                                                                                                  |
| `*`    | `*`       | Always installs/updates to the latest version.                                                                                     |

---

## Shebang (`#!`)

The shebang (`#!`) tells the terminal which interpreter to use when running a script. It's written at the top of the file, followed immediately by the interpreter path (no space).

**Two ways to write it:**

1. If the interpreter is globally available:

   ```bash
   #!/usr/bin/env node
   ```

   This searches the `PATH` variable to find and run the interpreter.

2. If not globally available, use the full path:
   ```bash
   #!C:/Program\ File/node/node.exe
   ```

---

## `fs` (Promises) Module

### Reading a File

```js
readFile("path", "encoding"); // encoding optional; without it, returns a Buffer
```

### Writing a File

Overwrites existing content:

```js
writeFile("path", "content", "encoding");
```

### Appending to a File

Adds content without overwriting existing content:

```js
appendFile("path", "content", "encoding");
```

### Creating a File

Use `appendFile` or `writeFile` with an empty string as content if the file doesn't exist yet:

```js
appendFile("file.txt", "", "encoding");
writeFile("file.txt", "", "encoding");
```

### Creating a Folder

```js
mkdir("fileName");
```

### Removing a File/Folder

```js
rm("pathOfFile"); // remove a file
rm("pathOfFolder", { recursive: true }); // remove a folder (with or without contents)
```

### Renaming a File/Folder

```js
rename("path/cnt.txt", "path/newname.txt"); // rename a file
rename("path/folder", "path/folding"); // rename a folder
```

### Moving a File/Folder

The same `rename` function is used — just provide a new path:

```js
rename("C:/User/find3/OneDrive/Desktop/nodejs.jpeg", "./js.jpeg"); // move a file
rename("C:/User/find3/OneDrive/Desktop/Backend", "./Backend_With_Node"); // move a folder
```

### Copying a File

```js
copyFile("./path.txt", "../otherPath.txt");
```

### Copying a Folder

```js
cp("C:/window/emptyFolder", "C:/copyEmptyFolder"); // copy an empty folder
cp("../router", "./routs", { recursive: true }); // copy folder with contents
```

### Reading a Directory

```js
readdir("path"); // returns an array of files and directories
```

### Checking File vs Directory

```js
stat("path"); // use .isDirectory() or .isFile() on the result
```

---

## `fs` Module (Non-Promise)

### Watching for File Changes

```js
fs.watch("pathOfFile", (typeOfUpdate, filePath) => {
  // callback runs whenever a change occurs
});
```

---

## Data Representation Systems

There are two systems used to represent storage sizes:

### 1. SI (International System of Units)

- Used by hardware manufacturers (SSD, HDD, pen drives, mobile companies).
- Uses powers of 10 (10³ = 1000).

| Unit | Value      |
| ---- | ---------- |
| 1 KB | 1000 Bytes |
| 1 MB | 1000 KB    |
| 1 GB | 1000 MB    |
| 1 TB | 1000 GB    |

### 2. IEC (International Electrotechnical Commission)

- Used by operating systems and software to display storage sizes.
- Uses powers of 2 (2¹⁰ = 1024).

| Unit  | Value      |
| ----- | ---------- |
| 1 KiB | 1024 Bytes |
| 1 MiB | 1024 KiB   |
| 1 GiB | 1024 MiB   |
| 1 TiB | 1024 GiB   |

### Real-Life Example

A pen drive sold as "32 GB" (manufacturer's SI value) actually contains:

```
32 × 1000³ = 32,000,000,000 bytes
```

When the OS calculates the same bytes using IEC:

```
32,000,000,000 ÷ 1024³ ≈ 29.8 GiB
```

This is why a 32 GB pen drive appears as about 29.8 GiB on Windows/Linux/macOS — no storage is missing, only the measurement system differs.

**Difference example:**

```
32 GB  = 32 × 1000³ = 32,000,000,000 Bytes
32 GiB = 32 × 1024³ = 34,359,738,368 Bytes
```

---

## Number Systems in JavaScript

JS supports HEX, BINARY, and OCTAL literals, which are automatically converted to decimal:

```js
0xfa; // HEX
0b101; // BINARY
0o712; // OCTAL
```

# Converting Between Number Systems

## 1. Decimal → Binary / Octal / Hexadecimal (Division Method)

Repeatedly divide the decimal value by the target base, keeping track of the remainders. Read the remainders **bottom-to-top** to get the converted number.

```
divisor  = base value (2, 8, or 16)
dividend = decimal value

|  divisor  |  dividend  |  remainder  |
|  divisor  |  quotient  |  remainder  |
|    ...    |    ...     |     ...     |
```

Keep dividing the quotient by the divisor until the quotient becomes `0`. Reading the remainders from last to first gives the converted number.

### Example: Decimal → Binary

Convert `25` to binary (divisor = `2`)

```
| divisor | dividend | remainder |
|    2    |    25    |     1     |
|    2    |    12    |     0     |
|    2    |     6    |     0     |
|    2    |     3    |     1     |
|    2    |     1    |     1     |
|    2    |     0    |   (stop)  |
```

Reading remainders bottom-to-top: `25` → `11001`

### Example: Decimal → Octal

Convert `227` to octal (divisor = `8`)

```
| divisor | dividend | remainder |
|    8    |   227    |     3     |
|    8    |    28    |     4     |
|    8    |     3    |     3     |
|    8    |     0    |   (stop)  |
```

Reading remainders bottom-to-top: `227` → `0o343`

### Example: Decimal → Hexadecimal

Convert `214` to hexadecimal (divisor = `16`)

```
| divisor | dividend | remainder |
|   16    |   214    |   6 (6)   |
|   16    |    13    |  13 (D)   |
|   16    |     0    |   (stop)  |
```

Reading remainders bottom-to-top: `214` → `0xD6`

---

## 2. Binary / Octal / Hexadecimal → Decimal (Multiplication Method)

Break the number down digit by digit, and multiply each digit by the base raised to its positional power — starting from power `0` on the rightmost digit, increasing to the left.

**Example:**

```
0o343  (octal)

= 3 × 8² + 4 × 8¹ + 3 × 8⁰
= 3 × 64 + 4 × 8 + 3 × 1
= 192 + 32 + 3
= 227
```

### Example: Binary → Decimal

```
0b11001  (binary)

= 1 × 2⁴ + 1 × 2³ + 0 × 2² + 0 × 2¹ + 1 × 2⁰
= 16 + 8 + 0 + 0 + 1
= 25
```

### Example: Hexadecimal → Decimal

```
0xD6  (hexadecimal)

= D × 16¹ + 6 × 16⁰
= 13 × 16 + 6 × 1
= 208 + 6
= 214
```

---

## 3. Binary ↔ Hexadecimal

### Binary → Hex

Starting from the right, group the binary digits into sets of **4**. Convert each group into its decimal value, then represent any value greater than `9` with a letter (`A`–`F`).

**Example:** `11010110`

```
| group  |  1101  |  0110  |
| value  |   13   |   6    |
| hex    |   D    |   6    |
```

**Result:** `11010110` → `0xD6`

### Hex → Binary

Convert each hex digit individually into its **4-digit binary** equivalent, then join the groups together.

**Example:** `0x2F`

```
| digit    |  2   |  F   |
| binary   | 0010 | 1111 |
```

**Result:** `0x2F` → `00101111`

---

## 4. Binary ↔ Octal

### Binary → Octal

Starting from the right, group the binary digits into sets of **3**. Convert each group into its decimal value (`0`–`7`).

**Example:** `11010110`

```
| group  |  011  |  010  |  110  |
| octal  |   3   |   2   |   6   |
```

**Result:** `11010110` → `0o326`

### Octal → Binary

Convert each octal digit individually into its **3-digit binary** equivalent, then join the groups together.

**Example:** `0o326`

```
| digit    |  3  |  2  |  6  |
| binary   | 011 | 010 | 110 |
```

**Result:** `0o326` → `011010110`

---

## 5. Hexadecimal ↔ Octal

### Hex → Octal

Convert each hex digit into its **4-digit binary** equivalent, join them all together, then regroup the full binary string into sets of **3** (from the right) and convert each group into octal.

**Example:** `0xD6`

```
Step 1 - hex to binary (4-bit groups):
| digit    |  D   |  6   |
| binary   | 1101 | 0110 |

Step 2 - join:  11010110

Step 3 - regroup into 3-bit groups (from the right):
011 010 110

Step 4 - binary to octal:
| group  |  011  |  010  |  110  |
| octal  |   3   |   2   |   6   |
```

**Result:** `0xD6` → `0o326`

### Octal → Hex

Convert each octal digit into its **3-digit binary** equivalent, join them all together, pad with leading zeros so the length is a multiple of **4**, then regroup into sets of **4** and convert each group into hexadecimal.

**Example:** `0o326`

```
Step 1 - octal to binary (3-bit groups):
| digit    |  3  |  2  |  6  |
| binary   | 011 | 010 | 110 |

Step 2 - join:  011010110   (9 bits)

Step 3 - pad with leading zeros to reach a multiple of 4 (12 bits):
000011010110

Step 4 - regroup into 4-bit groups (from the right):
0000 1101 0110

Step 5 - binary to hex:
| group  |  0000  |  1101  |  0110  |
| hex    |   0    |   D    |   6    |
```

**Result:** `0o326` → `0xD6`

> Note: always add the padding zeros to the **left** of the binary string (the most significant end) — padding on the right would change the value.

## Converting one number system to another using JS method.

### Decimal to Hexadecimal,Octal,Binary

```js
//divider
const num = 345;
num.toString(2); // toString(baseValue)
```

### Hexadecimal,Octal,Binary to Decimal

```js
// multiple
const num = "4E5F"; //if the number is in string then we have to use `parseInt` function
parseInt(num, 16); // parseInt(valueInString,baseValue)
```

### Viewing Hex/Binary with `xxd`

`xxd` (hex dump) is a bash executable that converts a file's text into hex format.

```bash
xxd src/test.js          # view hex dump
xxd -g 1 src/test.js     # split hex digits individually (use -g N to group by N bytes)
xxd -b src/test.js       # view binary instead of hex
```

# Understanding UTF-8

## What is Unicode?

Think of Unicode as a giant directory — a master list that assigns a unique **code point** (a specific hexadecimal number) to every character, symbol, and emoji in virtually every written language on Earth. For example:

- `A` → `U+0041`
- `अ` → `U+0905`
- `😀` → `U+1F600`

Unicode itself doesn't say _how_ to store these numbers as bytes on disk or in memory — that's where UTF-8 comes in.

## What is UTF-8?

> UTF Full form => Unicode Transform Formate
> UTF-8 is an **encoding scheme**: a set of rules for converting Unicode code points into actual binary data (and back again).

- **Encoding** = turning a character's code point into bytes, so it can be stored or transmitted.
- **Decoding** = reading those bytes back and reconstructing the original character.

UTF-8 is smart about size — it doesn't use a fixed number of bytes for every character. Instead, it uses **1 to 4 bytes** depending on how large the code point is. This variable-length design is a big reason UTF-8 became the dominant encoding on the web: it's backward-compatible with ASCII, efficient for common characters, and flexible enough to represent every character in Unicode.

## How UTF-8 Encoding Works

Every UTF-8 byte carries a small "header" — a fixed bit pattern at the start that tells the decoder how many bytes make up the current character and where the actual data bits are.

| Bytes used | Code point range       | Data capacity | Byte pattern                                |
| :--------: | :--------------------- | :------------ | :------------------------------------------ |
|     1      | `U+0000` – `U+007F`    | 7 bits        | `0xxxxxxx`                                  |
|     2      | `U+0080` – `U+07FF`    | 11 bits       | `110xxxxx` `10xxxxxx`                       |
|     3      | `U+0800` – `U+FFFF`    | 16 bits       | `1110xxxx` `10xxxxxx` `10xxxxxx`            |
|     4      | `U+10000` – `U+10FFFF` | 21 bits       | `11110xxx` `10xxxxxx` `10xxxxxx` `10xxxxxx` |

The `x` positions hold the actual character data; everything else is header bits used purely for decoding.

### 1 byte — ASCII range

Characters that fit in 7 bits (the classic ASCII table) only need a single byte. The header bit is always `0`:

```
01010101
^
header bit
```

### 2 bytes

Used when a character needs more than 7 bits but fits within 11 bits.

```
110xxxxx  10xxxxxx
```

### 3 bytes

Used when a character needs more than 11 bits but fits within 16 bits.

```
1110xxxx  10xxxxxx  10xxxxxx
```

### 4 bytes

Used when a character needs more than 16 bits (up to 21 bits) — this covers things like emoji and rarer historic scripts.

```
11110xxx  10xxxxxx  10xxxxxx  10xxxxxx
```

## A Note on Combined Characters

Some visual characters aren't a single code point at all — they're built by combining multiple code points together. Each of those code points gets encoded separately, so the total byte count adds up quickly.

**Example:** `त्र`

This single glyph is actually a combination of three separate characters:

| Component | Meaning                           |
| :-------: | :-------------------------------- |
|     त     | ta                                |
|     ्     | virama (joins the next consonant) |
|     र     | ra                                |

Each of these three characters falls in the Devanagari block, which requires **3 bytes** per character in UTF-8. So the full glyph `त्र` takes:

$$3 \text{ characters} \times 3 \text{ bytes} = 9 \text{ bytes total}$$

## Why UTF-8 Won

UTF-8 isn't the only encoding — UTF-16 and UTF-32 also exist — but UTF-8 became the de facto standard because it:

- Is fully backward-compatible with ASCII (any valid ASCII file is already valid UTF-8)
- Handles the full range of Unicode, from 8-bit to 32-bit needs, using a compact variable-length scheme
- Is supported virtually everywhere, making it the safest default for the web, files, and APIs

# UTF-16 and UTF-32

## UTF-16

UTF-16 encodes each character using a **code unit** of 2 bytes (16 bits) — that's 4 hexadecimal digits.

- Most common characters (in the Basic Multilingual Plane) fit in a single 2-byte code unit.
- Characters that need more than 16 bits (e.g. emoji, rare scripts) are represented using a **surrogate pair** — two 2-byte code units combined, giving 4 bytes total.
- Because its _minimum_ unit size is 16 bits, it's called **UTF-16**.

## UTF-32

UTF-32 always uses a **fixed** 4 bytes (32 bits) per character — that's 8 hexadecimal digits.

- Every character, regardless of complexity, takes exactly 4 bytes. Nothing more, nothing less.
- Since its storage size is fixed at 32 bits, it's called **UTF-32**.

| Encoding | Bytes per unit                   | Hex digits  | Size behavior |
| -------- | -------------------------------- | ----------- | ------------- |
| UTF-16   | 2 (up to 4 with surrogate pairs) | 4 (up to 8) | Variable      |
| UTF-32   | 4 (fixed)                        | 8           | Fixed         |

---

# Endianness

Every computer architecture has its own convention for the _order_ in which it stores the bytes of a multi-byte value.

A good analogy is how different countries write dates:

- India: `DD/MM/YYYY`
- USA: `MM/DD/YYYY`

Both represent the same date, but the _order_ is different — and if you don't know which convention is being used, you'll misread it. Computers face the same problem when storing multi-byte data: without knowing the byte order, the same bytes can be interpreted as completely different values. This is why a **BOM (Byte Order Mark)** is used to declare the order being used.

## Types of Endianness

### 1. Big Endian (BE)

Stores bytes from **most significant to least significant**, left to right — the same order humans naturally read numbers in.

```
0x4b5a  →  [4b, 5a]
```

### 2. Little Endian (LE)

Stores bytes from **least significant to most significant** — reversed order.

```
0x76f7  →  [f7, 76]
```

Both BE and LE are used across UTF-16, UTF-32, etc.

---

# BOM (Byte Order Mark)

The BOM tells a system how to interpret (or reorder) the bytes it reads, based on the endianness used when the data was written.

- The BOM is the reserved character **`U+FEFF`**.
- When encoded, it appears as **2 bytes** at the very start of the data (a header).
- The _order_ those 2 bytes appear in reveals whether the rest of the file is Big Endian or Little Endian.

## Little Endian BOM

Bytes appear as `FF FE`.

Example (UTF-16, value `0x0873`, `0x76ba`):

```
0x0873 76ba  →  [FF, FE, 73, 08, ba, 76]
```

## Big Endian BOM

Bytes appear as `FE FF`.

Example (UTF-16, value `0x127b`, `0x3a8c`):

```
0x127b 3a8c  →  [FE, FF, 12, 7b, 3a, 8c]
```

> **Note:** UTF-8 does not need a BOM for byte-order purposes since it's a byte-oriented (not word-oriented) encoding, though a UTF-8 BOM is sometimes still seen in the wild as a file-format signature.

## Array Buffer in JavaScript

Array buffers are arrays of storage, meaning we can store binary data in them. Anything that we store inside this binary array is stored in RAM (system memory). We can store data in binary form, not in KB, MB, GB, etc.
With the help of Array Buffers, we can store up to 2GiB of binary data in RAM using JavaScript.

> We wouldn't be able to write or read the data in an Array Buffer; we can only inspect it and view the value.
> In the browser or in a Node.js environment, we can create an `ArrayBuffer` to allocate memory in ram with the help of `ArrayBuffer` constructor function. The params of this constructor function take a number's of binary's space in `RAM`. If nothing is written, the binary value is `00000000` and the memory is not occupied. If some value is written, then it occupies the ram space.

```js
const buffers = new ArrayBuffer(1024);
console.log(buffers);
```

# 🔢 Signed and Unsigned Numbers

## ➕➖ Signed Numbers

A **signed** binary number can represent both **positive** and **negative** values.

Modern computers use **two's complement** to represent signed integers.

The **MSB (Most Significant Bit)** — the leftmost bit — tells you the sign:

| MSB | Meaning               |
| --- | --------------------- |
| `0` | ✅ Positive (or zero) |
| `1` | ❌ Negative           |

---

### 🔹 Example: MSB = 0 (Positive)

```text
011110
^
MSB = 0  →  Positive number
```

**Decimal value:** `30`

---

### 🔹 Converting a Negative Signed Binary Number

When MSB = `1`, follow these **3 simple steps**:

1. **Invert** every bit (`0 → 1`, `1 → 0`)
2. **Add 1** to the result
3. **Convert** to decimal and add a **minus sign** (`-`)

> This process is called **two's complement**.

**Example:**

```text
10000001
^
MSB = 1  →  Negative number
```

**Step 1 — Invert the bits:**

```text
01111110
```

**Step 2 — Add 1:**

```text
  01111110
+        1
-----------
  01111111
```

**Step 3 — Convert to decimal:**

```text
01111111 = 127
```

**Final Result:**

```text
10000001 = -127 ✅
```

---

## 🔵 Unsigned Numbers

An **unsigned** binary number represents **only non-negative values** (0 and positive numbers).

🔑 **Key difference:** There is **no sign bit** — every single bit contributes purely to the number's value.

### Examples

```text
101010 = 42
```

```text
10000001 = 129
```

> ⚠️ **Important:** Even though the MSB is `1` in the second example, the value is still **positive (129)** — because we're reading it as **unsigned**, not signed!

---

## 🆚 Signed vs Unsigned — Quick Comparison

| Feature                            | Signed                   | Unsigned                |
| ---------------------------------- | ------------------------ | ----------------------- |
| Can be negative?                   | ✅ Yes                   | ❌ No                   |
| Uses MSB as sign bit?              | ✅ Yes                   | ❌ No                   |
| Same bit pattern, different value? | ➡️ `10000001` = **-127** | ➡️ `10000001` = **129** |

**💡 Takeaway:** The exact same sequence of bits can mean **completely different numbers** depending on whether it's interpreted as signed or unsigned!

## ✍️ Writing to ArrayBuffer

We **can't directly** update or add values into an `ArrayBuffer`. To read or write data, we need to use either a **Typed Array** or a **DataView**.

---

### 🔍 DataView

```ts
const buffer = new ArrayBuffer(10); // new ArrayBuffer(digits in byte);
const view = new DataView(buffer);
// 👆 new DataView(buffer, startingIndexInBuffer)

view.setInt8(0, 0xff);
// sets a SIGNED 8-bit value → view.setInt8(index, data)

view.getInt8(0);
// gets a SIGNED 8-bit value → view.getInt8(index)

view.getUint8(0);
// gets an UNSIGNED 8-bit value → view.getUint8(index)

view.setUint8(1, 203);
// sets an UNSIGNED 8-bit value → view.setUint8(index, data)

// multi byte writing binary

view.setInt16(4, 0xff83, true);
// view.setInt16(index, 2 byte binary data, littleEndian?)

view.getInt16(4, true);
// view.getInt16(index, littleEndian?)

view.setUint16(4, 0xffff, true);
// view.setUint16(index, 2 byte binary data, littleEndian?)

view.getUint16(4, true);
// view.getUint16(index, littleEndian?)

view.setInt32(6, 0xfadfb6bc, true);
// view.setInt32(index, 4 byte binary data, littleEndian?)

view.getInt32(6, true);
// view.getInt32(index, littleEndian?)

view.setUint32(6, 0xffffffff);
// view.setUint32(index, 4 byte binary data) → no 3rd arg = big endian (default)

view.getUint32(6);
// view.getUint32(index) → no 2nd arg = big endian (default)
```

---

### 🆚 Quick Reference

| Method                                  | Type                          | Bytes   |
| --------------------------------------- | ----------------------------- | ------- |
| `setInt8(index, data)`                  | Set **signed** 8-bit value    | 1 byte  |
| `getInt8(index)`                        | Get **signed** 8-bit value    | 1 byte  |
| `setUint8(index, data)`                 | Set **unsigned** 8-bit value  | 1 byte  |
| `getUint8(index)`                       | Get **unsigned** 8-bit value  | 1 byte  |
| `setInt16(index, data, littleEndian?)`  | Set **signed** 16-bit value   | 2 bytes |
| `getInt16(index, littleEndian?)`        | Get **signed** 16-bit value   | 2 bytes |
| `setUint16(index, data, littleEndian?)` | Set **unsigned** 16-bit value | 2 bytes |
| `getUint16(index, littleEndian?)`       | Get **unsigned** 16-bit value | 2 bytes |
| `setInt32(index, data, littleEndian?)`  | Set **signed** 32-bit value   | 4 bytes |
| `getInt32(index, littleEndian?)`        | Get **signed** 32-bit value   | 4 bytes |
| `setUint32(index, data, littleEndian?)` | Set **unsigned** 32-bit value | 4 bytes |
| `getUint32(index, littleEndian?)`       | Get **unsigned** 32-bit value | 4 bytes |

> ⚠️ **`littleEndian` param:**
>
> - `true` → **little endian** (least significant byte stored first)
> - `false` / omitted → **big endian** (most significant byte stored first) — this is the **default**

---

### 🔑 Important: Setter Doesn't Matter — Only the Getter Does!

Whether you **write** a value using a `signed` setter (`setInt8`, `setInt16`...) or an `unsigned` setter (`setUint8`, `setUint16`...), the **raw binary bits stored in memory are exactly the same**.

The **type of setter you used has no effect on how it's stored** — it's just raw bits sitting in the buffer. What actually matters is **which getter you use to read it back**.

```ts
view.setInt8(0, 0xff); // stores raw bits: 11111111

view.getInt8(0); // reads as SIGNED → -1
view.getUint8(0); // reads as UNSIGNED → 255
```

👉 **Same bits `11111111`, but two completely different results** — because `getInt8` interprets the MSB as a sign bit, while `getUint8` treats every bit as part of the value.

> 💡 **Takeaway:** Signed vs unsigned is not a property of the _stored data_ — it's just **how you choose to interpret it when reading**. The buffer only stores raw bits; meaning is added at read-time.

## 🧩 Typed Array

A **Typed Array** helps you read and write values in an `ArrayBuffer` — just like `DataView`, but **much easier to use**.

It behaves like a **regular array** — you can use all normal array methods and properties, **except** ones that change its length (like `push`, `pop`, `splice`).

---

### 🔹 Creating a Typed Array

There are a few different ways to create one:

```ts
// 1️⃣ Attach to an existing ArrayBuffer
const buffer: ArrayBuffer = new ArrayBuffer(100);
const test1: Int8Array = new Int8Array(buffer);

// 2️⃣ Create an empty buffer directly (simplest way)
const test2: Int8Array = new Int8Array(200);
// 👆 creates a buffer of 200 bytes

// 3️⃣ Create WITH values directly
const test3: Int8Array = new Int8Array([0xff, 0xdf, 0x68, 0xdd]);
// 👆 creates a buffer already filled with these values
```

> 💡 **Note:** Typed Arrays always work with **little endian** by default, and this **cannot be changed** (unlike `DataView`, which lets you choose).

---

### 🔹 Byte Size Per Element

Depending on which Typed Array you use, each index stores a different number of bytes:

| Constructor      | Bytes per element | Interpreted as |
| ---------------- | ----------------- | -------------- |
| `Int8Array()`    | 1 byte            | Signed         |
| `Int16Array()`   | 2 bytes           | Signed         |
| `Int32Array()`   | 4 bytes           | Signed         |
| `Uint8Array()`   | 1 byte            | Unsigned       |
| `Uint16Array()`  | 2 bytes           | Unsigned       |
| `Uint32Array()`  | 4 bytes           | Unsigned       |
| `Float16Array()` | 2 bytes           | Floating point |
| `Float32Array()` | 4 bytes           | Floating point |
| `Float64Array()` | 8 bytes           | Floating point |

---

### 🔹 Reading & Writing Values

```ts
const typedArray: Uint16Array = new Uint16Array(10);
// 👆 length = 10, each element = 2 bytes
// total memory used = 10 × 2 = 20 bytes

typedArray[0] = 0xffdf; // ✅ write
console.log(typedArray[0]); // ✅ read
```

---

### 🎯 Quick Takeaway

| Feature            | DataView                      | Typed Array                       |
| ------------------ | ----------------------------- | --------------------------------- |
| Ease of use        | More manual                   | Simpler (array-like syntax)       |
| Endianness control | ✅ Yes (choose per call)      | ❌ No (always little endian)      |
| Access style       | `view.getInt8(0)`             | `typedArray[0]`                   |
| Best for           | Mixed types / precise control | Same type across the whole buffer |

## 🗂️ Node.js Buffer

`Buffer` is Node.js's way to work with raw binary data in memory — **without you having to manually create an `ArrayBuffer`**.

Node.js `Buffer` uses a **Typed Array** internally to read/write data — it does **not** use `DataView`.

---

### 🔹 Creating a Buffer

```js
import { Buffer } from "node:buffer";
// 👆 needed only if you want to manually create a buffer
```

There are **two main methods** to allocate memory for a buffer:

---

### 1️⃣ `Buffer.alloc(size)` — Safe, but Slower

- Allocates memory and **actively clears it (fills with zeros)** before giving it to you.
- Because it has to clean the memory first, it's **slower** — especially for large sizes.
- ✅ **Safe** — you'll never see old/leftover data by accident.

```js
Buffer.alloc(5024);
// allocates 5024 bytes, all zeroed out, ready to use safely
```

---

### 🧠 First, Understand How Memory Actually Works

When data is **deleted or garbage collected (GC)**, the data does **not** actually get erased from that memory space. It just **stays there as it is**.

That old data will **remain in memory for a long time** — until some new data is written on top of it. If nothing writes new data into that space, the **old data just keeps sitting there, untouched, unchanged**.

> 💡 In simple words: "Deleting" data doesn't clean it. It only marks the space as "free to use again." The actual old values stay in memory until something overwrites them.

This is exactly why `allocUnsafe()` can show old data — it's simply the leftover bits from whatever was stored there before.

---

### 2️⃣ `Buffer.allocUnsafe(size)` — Fast, but Risky

- Allocates memory **without clearing it first** — so it may contain **old/stale data** that was already sitting in that memory space (as explained above).
- ⚡ **Faster than `alloc()`** — but this speed benefit really only shows up with **larger allocations**.

> 🔑 **Important detail:** For **small allocations (below ~5 KiB)**, Node.js **still clears the memory anyway** — same as `alloc()`. It's only when you ask for **more than ~5 KiB** that it skips the cleaning step completely and gives you the raw memory as-is (which may have old data in it). That's where the real speed boost comes from.

```js
Buffer.allocUnsafe(5000);
// small-ish allocation → Node may still clear it internally
// ⚠️ For allocations ABOVE ~5 KiB, it skips clearing → much faster, but old data may appear
```

---

### 🆚 Quick Comparison

| Feature              | `alloc()`                       | `allocUnsafe()`                                  |
| -------------------- | ------------------------------- | ------------------------------------------------ |
| Clears memory first? | ✅ Always                       | ⚠️ Only for small sizes (~<5 KiB)                |
| Speed on large data  | 🐢 Slower                       | ⚡ Much faster                                   |
| Initial data         | ✅ Always zeroed                | ⚠️ May contain old data (large allocations)      |
| Safety               | ✅ Safe by default              | ⚠️ Must manually overwrite before use            |
| Best for             | Small / security-sensitive data | Large buffers you'll immediately fill completely |

> 💡 **Rule of thumb:** Use `alloc()` unless you have a **performance-critical** reason to use `allocUnsafe()` for **large** buffers. If you do use it, make sure to **completely overwrite** every byte yourself right away — otherwise old memory data could leak through into your application.

## 🏊 Buffer Pool

### 🤔 First — Why Does a Buffer Pool Even Exist?

Every time you create a `Buffer`, Node needs to **ask the operating system for some memory**. Asking the OS for memory again and again — even for tiny buffers — takes time. It's a bit like going to the shop every single time you need one spoon of sugar, instead of just keeping a sugar jar at home.

So Node created a smarter solution: **keep one big "jar" of memory ready in advance**, and whenever a small buffer is needed, just take a small piece from that jar instead of going to the OS again.

That "jar" is called the **Buffer Pool**.

---

### 📦 What Exactly Is the Buffer Pool?

It's just **one pre-allocated chunk of memory**, created using an `ArrayBuffer` internally, when your Node app starts (or the first time it's needed).

You can check its size like this:

```js
Buffer.poolSize;
```

By default, this is **8192 bytes (8 KiB)**.

Think of it as: Node has already taken **one big 8 KiB block of memory** from the OS, ready and waiting. Now whenever a small buffer request comes in, Node just **slices a small piece off this block** instead of asking the OS fresh each time.

---

### 🔑 So When Does Node Actually Use the Pool?

Not every buffer uses the pool. Node has a rule to decide.

Let's say you write:

```js
Buffer.allocUnsafe(1000);
```

Node checks: **is 1000 smaller than half of poolSize?**

```
poolSize = 8192
half of poolSize = 4096

Is 1000 < 4096? → YES ✅
```

Since your requested size is **less than half the pool**, Node says: _"Okay, this is small enough — I'll just cut a piece from the existing pool instead of creating new memory."_ This is fast, because no new request to the OS is needed.

---

### 🚫 But What If You Ask for a Big Size?

```js
Buffer.allocUnsafe(5000);
```

Now Node checks again:

```
half of poolSize = 4096
Is 5000 < 4096? → NO ❌
```

Since 5000 is **bigger than half the pool size**, Node decides: _"This is too big to take from the shared pool — I'll create a completely separate, brand new `ArrayBuffer` just for this one buffer."_

**Why?** Because if Node gave a huge chunk of the shared pool to just one buffer, there wouldn't be much pool left for other small buffers. So Node protects the pool by only sharing it for **small** requests.

---

### 🔄 What Happens When the Pool Runs Out of Space?

Imagine the pool is 8 KiB, and bit by bit, small buffers keep taking slices from it. Eventually, the pool becomes **full** — no space left to give.

When that happens, Node simply says: _"This pool is used up, let me create a fresh new pool"_ — and a new 8 KiB (or whatever size you've set) pool is created to keep serving future small buffer requests.

> 💡 **Important detail:** If you change `Buffer.poolSize` to a different value, it does **NOT** affect the pool that's currently in use. Your new size will only apply the **next time** Node needs to create a new pool (i.e., when the current one runs out).

---

### ⚡ Why Does Using the Pool Make Things Faster?

Because taking a slice from **memory that's already been allocated** is much quicker than making a **fresh request to the operating system** every time. It's the difference between:

- 🐢 Going outside to buy sugar every time (no pool)
- ⚡ Just scooping from the jar already sitting on your kitchen counter (using the pool)

---

### 🔹 Which Methods Actually Use the Buffer Pool?

**1️⃣ `Buffer.allocUnsafe(size)`**

- Grabs memory **without cleaning it first**.
- If the size qualifies (less than half the pool), it takes a slice from the pool — fast, but may contain old leftover data since nothing was cleaned.

**2️⃣ `Buffer.from(data)`**

- Used when you already have data (like an array of numbers, or an `ArrayBuffer`) and want to turn it into a Buffer.
- It also uses the pool when possible, so creating it is quicker than starting completely from scratch.

**3️⃣ `Buffer.concat([...])`**

- Used to **join multiple buffers into one single buffer**.
- Instead of creating a fresh new memory space and copying everything in a slow way, it uses the pool (when possible) to combine the data more efficiently.

---

### 🆚 Quick Summary Table

| Method                     | Uses Buffer Pool?                  | What it actually does                                 |
| -------------------------- | ---------------------------------- | ----------------------------------------------------- |
| `Buffer.allocUnsafe(size)` | ✅ Yes (only if size < poolSize/2) | Fast raw memory, may contain old data                 |
| `Buffer.from(data)`        | ✅ Yes                             | Builds a buffer from existing array/ArrayBuffer data  |
| `Buffer.concat([...])`     | ✅ Yes                             | Merges multiple buffers into one                      |
| `Buffer.alloc(size)`       | ❌ No                              | Always creates clean, zeroed memory (safe but slower) |

---

### 🎯 The Big Picture Takeaway

The Buffer Pool is Node's way of **avoiding repeated, slow trips to the operating system** for small memory requests. It pre-allocates a chunk of memory once, and hands out small pieces of it whenever needed — as long as the request isn't too big. Once the pool is full or a request is too large, Node falls back to creating **fresh memory separately**.

## 🔤 Base64

**Base64** is an **encoder and decoder**. Its job is to take **binary data** and convert it into a **printable text (string) format**.

That binary data can be **anything** — text, a PDF, a `.docx`, a PNG, a WebP, an MP4, an MP3 — literally anything, because **at the physical level, every single file is just binary**. What makes it a "text file" or "image file" or "audio file" is only **how the interpreter/decoder chooses to read that binary** — the underlying bits themselves don't carry a label.

> 💡 **Example:** The bits `101010001` could be a chunk of an audio file, or it could just as easily be a plain number, or an ASCII character — the bits alone don't tell you what they "are." Meaning is added by whoever reads/interprets them.

**Base64's only job:** take that binary and turn it into readable text characters.

---

### 📏 Rules for Converting to Base64

1. The total number of bytes must be a **multiple of 3**.
2. If it's not, add **dummy (zero) bytes** at the end until it becomes a multiple of 3.
3. Break the bits down into **chunks of 6 bits each**.

---

### 🔹 Example 1: Text (ASCII/Unicode)

If your input is text, it first gets converted into binary using a text encoding scheme (like `UTF-8`, `UTF-16`, `UTF-32`).

```text
text   → abcd
binary → 01100001 01100010 01100011 01100100
```

This is **4 bytes** — not a multiple of 3 — so we pad it with **2 dummy zero bytes** to make it **6 bytes** (the next multiple of 3):

```text
padded binary → 01100001 01100010 01100011 01100100 00000000 00000000
```

Now break it into **6-bit chunks**:

```text
011000 010110 001001 100011 011001 000000 000000 000000
```

Each 6-bit chunk maps to a Base64 character, giving us:

```text
YWJjZA==
```

**Final result:** `YWJjZA==`

> ⚠️ **Important:** The last **two** characters become `==` (padding symbols), **not** actual computed letters like `AA`. This is because those last 2 characters come **entirely from the dummy bytes we added**, not from real data — so Base64 marks them with `=` instead of showing a "fake" letter.
>
> **Simple rule:** the number of `=` at the end always matches how many dummy bytes you had to add (1 dummy byte → one `=`, 2 dummy bytes → `==`).

---

### 🔹 Example 2: A Plain Number (No Text Encoder)

```text
decimal → 27
binary  → 00011011   (1 byte)
```

Pad to 3 bytes (multiple of 3) by adding 2 dummy bytes:

```text
00011011 00000000 00000000
```

Break into 6-bit chunks:

```text
000110 110000 000000 000000
```

**Final result:** `Gw==`

> Again — 2 dummy bytes were added, so the output ends in `==`.

---

### 🆚 Quick Reference: Padding Rule

| Real bytes left over      | Dummy bytes added | `=` symbols at the end |
| ------------------------- | ----------------- | ---------------------- |
| 2 bytes                   | 1 dummy byte      | `=` (one)              |
| 1 byte                    | 2 dummy bytes     | `==` (two)             |
| 0 (already multiple of 3) | none              | no padding needed      |

---

### Using Base64 in JavaScript

In If we want to convert this thing using javascript we has to use `btoa` function. It also known as binary to ascii. Base64 also known as ascii subset

```js
const base64 = btoa("hello");
console.log(base64);

const base642 = btoa(0xfad);
// JavaScript first converts the number into its string form (0xfad → "4013"),
// then btoa reads each character separately and converts it into a byte using its char code (0–255).
// It looks similar to UTF-8 because for normal digits/letters, char code and UTF-8 byte value are the same,
// but btoa is not running actual UTF-8 encoding — it's just char-code-to-byte conversion.

console.log(base642);

//textValue to binary using `atob` function ascii to binary
const finalValue = atob("YWJjZA==");
console.log(finalValue);
```

> 💡 **Important:** `btoa` only works correctly with characters that have char codes 0–255. Passing text with special/Unicode characters outside that range will throw an error — you'd need to convert it via `TextEncoder` first.

---

## ⚡ Event Driven Architecture

**Event Driven Architecture** is a way of designing an application around **events** — where different parts of the app react to things happening.

There are **3 main core concepts** in this architecture:

1. Event Emitter
2. Event Listener
3. Event Handler

---

### 1️⃣ Event Emitter

The thing that **triggers / emits** an action or event is called an **Event Emitter**.

**Examples:**

- In the DOM (JavaScript), elements like `<h1>`, `<sub>`, `<sup>`, `<time>`, `<div>`, `<section>`, etc. are Event Emitters — they emit events like click, hover, drag, etc.
- In a chat app, the **members sending messages** are the Event Emitters.

---

### 2️⃣ Event Listener

The one that **watches for** an event created by an Event Emitter, and pays attention when that **specific event** happens.

**Examples:**

- An `<h1>` element creates many events when a user interacts with it — hover, drag, mouse-in, etc. But if we only care about the **click** event, then we specifically **listen** for that one action.
- With Google Assistant, **we (the user)** act as the Event Emitter, and **Google Assistant is the Listener** — it's always listening for the phrase `"Hi Google..."`.

---

### 3️⃣ Event Handler

Once the Event Listener detects the action, it needs to **do something** in response — that "something" is handled by the **Event Handler**.

**Examples:**

- When we click an `<h1>` element (Event Emitter), that click event is picked up by a listener, and then a **callback function runs** — that callback is the Event Handler.
- With Google Assistant: the user is the Event Emitter, and the Assistant acts as **both Listener and Handler** — it ignores random actions, but the moment it hears `"Hi Google..."`, it listens **and** responds — that response is the handling part.

---

### 🆚 Quick Comparison

| Concept            | Role                          | Example                          |
| ------------------ | ----------------------------- | -------------------------------- |
| **Event Emitter**  | Triggers/creates the event    | User clicking, sending a message |
| **Event Listener** | Watches for a specific event  | `addEventListener("click", ...)` |
| **Event Handler**  | Responds when the event fires | The callback function that runs  |

---

### 🔧 How Node.js Uses This

Node.js relies heavily on **Event Driven Architecture** to handle all its **I/O operations** — and all of this happens **asynchronously** (without blocking the rest of the code).

Common I/O operations that use this pattern:

1. 📄 Reading/Writing files
2. 🌐 Network requests/responses
3. ⌨️ Taking user input
4. ...and many more

---

### 🔹 Example: Reading a File in Node.js

```js
fs.readFile("file.txt", (err, data) => {
  console.log(data);
});
```

Here's how the 3 concepts map to this code:

| Concept            | What's happening                                                            |
| ------------------ | --------------------------------------------------------------------------- |
| **Event Emitter**  | The OS starts reading the file, and once done, it emits a "done" event      |
| **Event Listener** | The `readFile()` method — its job is to listen for that event               |
| **Event Handler**  | The `cb` (callback function) — it handles the response once the event fires |

> 💡 **Takeaway:** In Node.js, almost every I/O task follows the same flow: **something triggers an action (Emitter) → something is watching for it to finish (Listener) → something runs in response (Handler)**. This is exactly what makes Node.js efficient at handling many operations at once without blocking.

## 🎯 EventEmitter Class in Node.js

Node.js gives us a built-in `EventEmitter` class that lets us **create our own custom events** and **handle them** using Event Listeners and Event Handlers.

It provides an **object** where we can define events and emit (trigger) them ourselves in our program.

> 💡 This is a **custom** event system we build — separate from Node's own internal events (like the file-reading example from before). Node.js uses this same `EventEmitter` class internally too.

---

### 🔧 Basic Setup

```js
import EventEmitter from "node:events";

const event = new EventEmitter();

const handleJump = function () {
  console.log("Handler of jump");
};
```

---

### 🔹 `.on()` — Listen Every Time

`event.on(eventName, handler)` creates a listener that runs **every single time** the event is emitted — it stays active and doesn't get removed after use.

```js
event.on("jump", handleJump);
event.on("jump", (event) =>
  console.log("I am the second handler for jumping " + event),
);
```

> 💡 We can attach **multiple handlers** to the same event — all of them will run whenever that event fires.

---

### 🔹 `.once()` — Listen Only One Time

`event.once(eventName, handler)` also creates a listener, but it only runs **once**. After it fires a single time, it's automatically **removed from memory**.

```js
event.once("electricity", (event) => {
  console.warn("Would not touch the cable it is " + event);
});
```

---

### 🔹 `.emit()` — Trigger the Event

`event.emit(eventName, ...args)` is how we **manually fire** an event, running all its attached listeners.

```js
event.emit("jump", "30m");
event.emit("electricity", "200v");
```

---

### 🔹 `.off()` — Remove a Listener

`event.off(eventName, handler)` removes a **specific handler** from an event. If there are multiple handlers attached to the same event, only the **matching one** gets removed — the others stay active.

```js
event.off("jump", handleJump);
```

---

### 🆚 Quick Reference

| Method                  | Purpose                    | Runs how many times?            |
| ----------------------- | -------------------------- | ------------------------------- |
| `.on(event, handler)`   | Add a listener             | ♾️ Every time the event fires   |
| `.once(event, handler)` | Add a one-time listener    | 1️⃣ Only once, then auto-removed |
| `.emit(event, ...args)` | Trigger the event          | Fires all attached listeners    |
| `.off(event, handler)`  | Remove a specific listener | Removes just that one handler   |

## 🌊 Streams

### 🤔 First — Why Do Streams Even Exist?

Imagine you want to read a file that is **100GB** in size. Normally, to read a file, you'd think: "just load the whole file into memory (RAM), then use it." But here's the problem — **RAM is limited**. A normal computer might have 8GB, 16GB, or maybe 32GB of RAM. There is **no way** to fit a 100GB file into that.

Even if the file was smaller — say 2GB — loading the **entire file at once** into memory is wasteful and slow. It blocks other things from happening, and it uses up a huge chunk of memory just for one operation.

So the question becomes: **how do we read/write large amounts of data without needing large amounts of memory?**

The answer is: **don't load it all at once. Load it little by little, use that little piece, then throw it away, and load the next little piece.**

That's exactly what a **Stream** does.

---

### 📦 What Exactly Is a Stream?

A Stream is simply a **connection between two points** — let's call them **Point A** (source) and **Point B** (destination). Once this connection is set up, data doesn't move all at once. Instead, it moves in **small chunks**, one after another, until everything has been transferred.

Because only a **small chunk** is in memory at any given moment (not the whole file), the memory usage stays **low and manageable** — no matter how huge the total file is.

---

### 🚛 A Real-Life Example to Understand It

Imagine a truck carrying **1 ton of sand**, and you need to move all of it from the truck onto the ground.

You obviously **can't** lift 1 ton of sand in one go — that's physically impossible for a person.

So what do you do instead? You take a **small bag**, fill it with a small amount of sand, carry it to the ground, empty it, then go back for another bag. You repeat this process **again and again** — bag after bag — until eventually, **all 1 ton of sand** has been moved.

It takes some time because you're doing it in small batches, but at no point are you ever overloaded — you're only ever carrying **one small, manageable bag** at a time.

This is **exactly** how a Stream works with data:

- The "truck" = the data source (a file, network, etc.)
- The "ground" = the destination (memory, another file, a server, etc.)
- The "sand bag" = a small chunk of data (a buffer)
- "Carrying bag after bag" = the Stream transferring chunk after chunk

---

### 🔹 Types of Streams

There are **4 types** of streams, and each one describes a different **direction** or **behavior** of data movement.

---

#### 1️⃣ Readable Streams — Data flows INTO memory

A Readable Stream takes data from some source (like a file on disk, or data from a network) and brings it **into memory**, one chunk at a time — **without permanently storing the whole thing**.

> 📺 **Example:** When you watch a YouTube video, the video isn't fully downloaded onto your hard drive first. Instead, small chunks of the video are continuously streamed into memory, played, and then discarded — that's why you can start watching almost immediately, without waiting for the entire video to download.

---

#### 2️⃣ Writable Streams — Data flows OUT of memory to a destination

A Writable Stream does the opposite — it takes data (from memory) and sends it **out to some destination**. Memory is only used **temporarily** to hold the current chunk being sent — it's not the final resting place of the data.

> 📤 **Example:** When you upload a video to a social media app, your device reads the video in small chunks and **sends** each chunk to the server. The data moves from **Point A (your device)** to **Point B (the server)** gradually — this is a Writable Stream in action.

---

#### 3️⃣ Duplex Streams — Reading AND Writing happens together, in real time

A Duplex Stream can do **both jobs at once** — reading and writing — simultaneously, without needing to fully finish one before starting the other.

> 📞 **Example:** Think about a voice call. While you're talking, you're **sending** your voice (writing), and at the very same time, you're **hearing** the other person (reading). Nothing is being saved anywhere — the data just flows both ways, live, back and forth, continuously.

---

#### 4️⃣ Transform Streams — Data changes shape while it moves

A Transform Stream is a Duplex Stream with a twist — it doesn't just pass data through unchanged, it **converts the data into a different format** as it flows from source to destination.

> 🔄 **Example:** Imagine you have a JavaScript object in your program, but you want to send it somewhere as **JSON text**. A Transform Stream can take the object, **convert it into a JSON string** _while it's being transferred_, so by the time it reaches the destination, it's already in the correct format.

---

### 🆚 Quick Comparison

| Stream Type   | What it does                        | Direction                        | Real-life analogy           |
| ------------- | ----------------------------------- | -------------------------------- | --------------------------- |
| **Readable**  | Brings data INTO memory             | Source → Memory                  | Watching a YouTube video    |
| **Writable**  | Sends data OUT from memory          | Memory → Destination             | Uploading a video           |
| **Duplex**    | Reads and writes at the same time   | Both directions, live            | A voice call                |
| **Transform** | Reads, converts format, then writes | Both directions, with conversion | Object → JSON while sending |

---

### 💻 Using Streams in Node.js

Node's built-in `fs` (file system) module lets us create streams easily using **callbacks** — this is the simplest, most beginner-friendly way to use streams.

```js
import fs from "node:fs";

const stream = fs.createReadStream("filepath", { highWaterMark: /* bytes */ });
```

Let's break this line down carefully:

- `fs.createReadStream(...)` → creates a **Readable Stream** — meaning it's set up to read data from a file, chunk by chunk.
- `"filepath"` → the location of the file we want to read from.
- `highWaterMark` → this option controls **how big each chunk should be** (in bytes). Think of it as: "how much sand fits in one bag before we carry it." A smaller `highWaterMark` means smaller, more frequent chunks; a larger one means bigger, less frequent chunks.

---

### 🔧 Streams Work Using Event Driven Architecture

Remember earlier we learned about **Event Emitters, Listeners, and Handlers**? Streams use exactly this pattern to tell us what's happening as data flows through them.

```js
stream.on("data", (chunk) => {
  console.log(chunk);
});
```

**What's happening here, step by step:**

1. The stream starts reading the file.
2. As soon as **one chunk** (a small piece of the file, i.e., a buffer) has been read into memory, the stream **emits** a `"data"` event.
3. Our `.on("data", ...)` listener catches that event and runs the handler — in this case, just logging the chunk.
4. This process **repeats automatically** for every new chunk that gets read — the `"data"` event keeps firing again and again until the whole file has been read.

```js
stream.on("end", () => {
  console.log("The end of buffer");
});
```

**What's happening here:**

1. Once **every single chunk** of the file has been read and transferred (from Point A, the file, to Point B, our memory/handler), there's nothing left to send.
2. At that point, the stream emits a special `"end"` event — signaling: _"I'm done, there's no more data coming."_
3. Our `.on("end", ...)` listener catches this and runs whatever code we want to run once the transfer is fully complete.

---

### 🎯 Quick Reference: Stream Events

| Event    | When it fires                             | What it tells you                             |
| -------- | ----------------------------------------- | --------------------------------------------- |
| `"data"` | Every time a new chunk arrives            | "Here's a piece of your data — handle it now" |
| `"end"`  | Once, after all data has been transferred | "I'm finished — no more chunks are coming"    |

---

### 🎯 The Big Picture Takeaway

Streams solve a very real problem: **you cannot always fit an entire piece of data into memory at once**, especially with large files or continuous data (like a video call or a huge file transfer). Instead of trying to load everything at once, a Stream breaks the data into **small, manageable chunks**, moves them **one at a time** from source to destination, and uses **events** (`"data"`, `"end"`, etc.) to let your code know exactly what's happening at each step — all while keeping memory usage low and the whole process efficient.

## 🚦 Status of a Stream

While a stream is running, you often need to know **what state it's currently in** — is it flowing, paused, ended, or resumed? Node gives us **methods, properties, and event listeners** to check this at every stage.

---

### 1️⃣ `readableFlowing` — Is Data Currently Flowing?

This property tells us whether the stream is **actively sending chunks** from Point A into memory right now.

```js
readStream.readableFlowing;
```

It can be in **3 possible states**:

| Value   | Meaning                                                                              |
| ------- | ------------------------------------------------------------------------------------ |
| `null`  | The data flow **hasn't started yet** — no listener has been attached to consume data |
| `false` | The stream is **paused** — data is not currently flowing                             |
| `true`  | The stream is **flowing/resumed** — data is actively moving                          |

> 💡 **Simple way to remember:** `null` = "not started," `false` = "on hold," `true` = "actively running."

---

### 2️⃣ Checking If a Stream Has Ended

Once every chunk has been transferred and there's nothing left to read, the stream is considered **ended**. There are **two ways** to check this:

**Option 1 — Using a property:**

```js
streamReader.readableEnded;
// returns true once the stream has completely finished
```

**Option 2 — Using an event listener:**

```js
streamReader.on("end", () => {
  console.log("Stream has ended");
});
// this event fires automatically the moment the stream finishes
```

---

### 3️⃣ Checking If a Stream Is Paused

If a stream is **paused**, it means data has temporarily **stopped flowing**, even though the stream isn't finished yet. We can check this using a method or an event listener:

**Option 1 — Using a method:**

```js
streamReader.isPaused();
// returns true if the stream is currently paused
```

**Option 2 — Using an event listener:**

```js
streamReader.on("pause", () => {
  console.log("Stream has been paused");
});
// fires the moment the stream gets paused
```

---

### 4️⃣ Checking If a Stream Has Resumed

When a paused stream **starts flowing again**, Node emits a `"resume"` event to let us know:

```js
streamReader.on("resume", () => {
  console.log("Stream has resumed");
});
```

---

### 🔧 Controlling the Stream: Pause & Resume

Besides just _checking_ the stream's status, we can also **control it directly** using these two methods:

```js
streamReader.pause();
// stops the stream from sending more chunks from Point A to memory (temporarily halts the flow)

streamReader.resume();
// starts sending chunks again — continues the flow from where it left off
```

> 💡 **Real-world use case:** Pausing is useful when the destination (e.g., memory or a slow network connection) can't keep up with incoming data — you pause the stream, let things catch up, then resume once ready. This prevents overwhelming the receiving end.

---

### 🆚 Quick Reference Table

| Status            | Property/Method to check                      | Event to listen for  |
| ----------------- | --------------------------------------------- | -------------------- |
| Is data flowing?  | `readableFlowing` (`null` / `false` / `true`) | —                    |
| Has it ended?     | `readableEnded`                               | `.on("end", ...)`    |
| Is it paused?     | `isPaused()`                                  | `.on("pause", ...)`  |
| Has it resumed?   | —                                             | `.on("resume", ...)` |
| Pause the stream  | `.pause()`                                    | —                    |
| Resume the stream | `.resume()`                                   | —                    |

---

### 🎯 Takeaway

A stream isn't just a one-way, uncontrollable pipe of data — it has a **clear lifecycle** (not started → flowing → paused → resumed → ended), and Node gives us both **properties/methods** (to check the current state at any moment) and **event listeners** (to react automatically the instant the state changes). Together, these let you build reliable, controlled data pipelines instead of blindly hoping everything transfers correctly.

## 📄 More Methods & Properties of Readable Streams

```js
import fs from "node:fs";

const readStream = fs.createReadStream("read.txt", {
  highWaterMark: 100,
});
// 👆 this starts opening the file and preparing it for reading in chunks

readStream.on("open", () => {
  console.log("File has been opened");
});
// fires once — the moment the file is successfully opened, before any data starts flowing

readStream.on("data", (chunk) => {
  console.log("Run one time");
  readStream.destroy(new Error("we stopped for some error"));
  // 👆 this stops the stream immediately and permanently — it cannot be resumed after this
  // this Error is what gets passed to the "error" event listener below
});

readStream.on("error", (err) => {
  console.log(err);
});
// fires whenever the stream encounters any error — including the one we manually
// triggered above using destroy()

readStream.on("close", () => {
  console.log("Stream has been closed");
});
// fires once the underlying file has been fully closed —
// this happens after the stream ends OR after it's destroyed
```

---

### 🔍 Breaking Down Each Event

**1️⃣ `"open"` Event**
Fires **once**, right when the file is successfully opened — before any actual data reading begins. Useful if you want to confirm the file exists and is accessible.

**2️⃣ `"data"` Event**
Fires every time a new chunk is read into memory. In this example, the moment we get the **first chunk**, we intentionally call `.destroy()` to stop the stream — this is why the log only shows `"Run one time"` once, even though normally `"data"` would fire repeatedly for every chunk.

**3️⃣ `.destroy(error?)` Method**
This **immediately and permanently stops** the stream. Unlike `.pause()` (which can be resumed later with `.resume()`), `destroy()` completely shuts the stream down — there's no going back. You can optionally pass an `Error` object into it, which then gets forwarded to the `"error"` event listener.

**4️⃣ `"error"` Event**
Fires whenever something goes wrong with the stream — whether it's a real system error (like a missing file) or a manual error we trigger ourselves (like in this example, using `.destroy()`).

**5️⃣ `"close"` Event**
Fires once the file has been **fully closed** at the system level. This happens after the stream either finishes normally (`"end"`) or is forcefully stopped (`.destroy()`).

---

### 🆚 Quick Reference

| Event/Method     | Fires When                        | Notes                                      |
| ---------------- | --------------------------------- | ------------------------------------------ |
| `"open"`         | File is successfully opened       | Fires once, before data starts flowing     |
| `"data"`         | A new chunk is read               | Fires repeatedly, once per chunk           |
| `.destroy(err?)` | You manually call it              | Immediately & permanently stops the stream |
| `"error"`        | Any error occurs (manual or real) | Receives the error object                  |
| `"close"`        | File is fully closed              | Happens after stream ends or is destroyed  |

> 💡 **Takeaway:** `.destroy()` is different from `.pause()` — pausing is temporary and can be resumed, but destroying a stream is **final**. Once destroyed, the `"error"` event (if an error was passed) and then the `"close"` event will fire, and no more data will ever come from that stream.

## ✍️ Write Stream

### 🤔 What Is a Write Stream?

A **Write Stream** is a tool that lets us send data (in small pieces, called buffers/chunks) from our program into somewhere else — most commonly, into a file. Instead of writing one giant piece of data all at once, it writes little by little, piece by piece.

---

### 🔧 Creating a Write Stream

```js
import fs from "node:fs";

const writeStream = fs.createWriteStream("filePath.txt", {
  highWaterMark: 1000 * 1024, // this sets a memory limit, explained in detail below
});
```

Here, `fs.createWriteStream(...)` sets up a stream that's ready to write data into `"filePath.txt"`. The second argument is an options object, and `highWaterMark` is one of its settings — we'll come back to exactly what this does a bit later.

---

### 📝 Writing Data — The `.write()` Method

To actually put data into the file, we use the `.write()` method.

```js
writeStream.write("hello");
```

- If the file `"filePath.txt"` **doesn't exist yet**, it gets **created**, and `"hello"` is written into it.
- If the file **already existed** with some old content in it, this first `.write()` call **replaces/overwrites** that old content with `"hello"`.

Now, if we call `.write()` again on the **same stream**:

```js
writeStream.write("Bolo");
```

This does **NOT** overwrite the file again. Instead, it simply **adds** `"Bolo"` right after whatever was already written. So the file now contains `"helloBolo"`.

> 💡 **Simple rule to remember:** The overwrite behavior only happens the very first time a stream starts writing to a file. Every call after that just keeps **appending** more content, one write at a time.

---

### 🌊 Now, the Real Problem: What Happens When Data Comes In Too Fast?

Let's say we're reading data from one place (using a Read Stream) and writing it somewhere else (using a Write Stream) — a very common pattern, for example, copying a large file from one location to another.

Here's the important part to understand clearly:

**If data is arriving too fast, the Write Stream doesn't actually write it out to the final destination right away.** Instead, it just **allocates memory** to hold onto the incoming data, piece by piece, as it keeps arriving.

So then, when does it actually write?

Once the **incoming side** (the Read Stream sending the data) **stops or pauses**, that's when the Write Stream finally gets a chance to **write out everything it was holding** — and finishes the job.

Here's the scenario:

1. A Read Stream is reading data very quickly and constantly sending chunks to the Write Stream.
2. As long as data keeps arriving without a pause, the Write Stream keeps **allocating memory** to hold each new chunk — rather than writing it out immediately.
3. If the Read Stream keeps sending data non-stop, without ever pausing, the Write Stream keeps allocating **more and more memory** to hold all this backlog of unwritten data.
4. Over time, if this keeps happening endlessly, the memory being used just to **hold waiting data** can grow larger and larger — becoming a real problem for the system's memory usage.
5. Only once the Read Stream pauses (or stops sending) does the Write Stream get the opportunity to actually **write out the data it was holding** to the final destination, and clear that memory.

So to summarize simply: **the incoming data just sits in memory, waiting**, and the actual writing happens once there's a pause in the incoming flow — that's exactly what can cause memory to grow out of control if incoming data keeps arriving non-stop.

---

### 🚦 The Solution: Backpressure

To prevent this memory problem, Node.js has a built-in mechanism called **backpressure**.

Here's exactly how it works:

When data is coming in **too fast**, the Write Stream **doesn't actually write it out yet**. Instead, it just keeps **allocating memory** to hold onto this incoming data — piece after piece — while it waits for a good moment to write.

Once the incoming side (the Read Stream) **stops or pauses** sending new data, that's when the Write Stream finally gets the chance to **write out everything it was holding**, and finishes the job.

So the actual writing to the final destination doesn't happen continuously while data is rushing in — it happens once things slow down or pause, giving the Write Stream room to catch up.

Every single time you call `.write(data)`, it also **returns a value** back to you — a **boolean** (`true` or `false`) — telling you the current status of the Write Stream's internal memory usage.

| What `.write()` returns | What it means                                                                                                                                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `true`                  | Everything is fine. The amount of data currently held in memory (waiting to be written) is still **within the allowed limit**. You can safely keep sending more data.                                                                                                 |
| `false`                 | Too much data is now sitting in memory. The amount being held has now **crossed the limit** set by `highWaterMark`. This is a warning sign telling you: _"Please stop sending more data for now — I have too much waiting already, and I need time to write it out."_ |

This is exactly where `highWaterMark` comes into play — it's simply the **threshold number** (in bytes) that defines "how much unwritten data is okay to have waiting in memory before we consider it too much."

**Example to make this concrete:**

```text
highWaterMark = 1 MB   (the limit we set)
```

If the amount of data currently sitting in memory, waiting to be written, goes **above 1 MB**, then the next time you call `.write()`, it will return `false` — signaling that the limit has been crossed.

---

### 🔹 What Do We Do When We Get `false`?

When `.write()` returns `false`, the correct thing to do is to **pause** whatever is sending us the data — usually, this means pausing the Read Stream that's feeding data into our Write Stream.

```js
const canContinue = writeStream.write(chunk);

if (!canContinue) {
  readStream.pause();
  // this tells the Read Stream: "stop sending more chunks for now"
}
```

By pausing the Read Stream, we stop **more** data from piling up in memory, giving the Write Stream a chance to catch up and actually write out the backlog it's already holding.

---

### 🔹 The `"drain"` Event — "Okay, You Can Continue Now"

While the Read Stream is paused, the Write Stream keeps doing its job in the background — writing whatever data it's holding out to the final destination (like the disk), bit by bit, at its own natural speed.

Eventually, once the Write Stream has successfully written out **enough** of that backlog — bringing the amount of unwritten data back down to a safe level — it emits a special event called `"drain"`.

Think of `"drain"` as the Write Stream saying: _"Okay, I've cleared out enough space now. You can go ahead and send me more data again."_

```js
writeStream.on("drain", () => {
  readStream.resume();
  // this tells the Read Stream: "you can start sending data again"
});
```

So the full cycle looks like this:

```text
1. Read Stream sends data → Write Stream tries to write it
2. If data comes in faster than it can be written → memory usage grows
3. .write() returns false when it crosses the highWaterMark limit
4. We pause the Read Stream (stop new data from coming in)
5. Write Stream keeps writing its backlog to the final destination in the background
6. Once enough backlog is cleared → Write Stream emits "drain"
7. We resume the Read Stream → cycle continues
```

This back-and-forth (pause when `false`, resume on `"drain"`) is what keeps memory usage under control, no matter how large the total amount of data being transferred is.

---

### 🆚 Quick Reference Table

| Concept                           | What it means, in simple words                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `.write(data)` (1st time)         | Creates the file (if it doesn't exist) or replaces its old content                   |
| `.write(data)` (every time after) | Adds (appends) more content to the file                                              |
| `highWaterMark`                   | The memory limit — how much unwritten data is allowed to wait before it's "too much" |
| `.write()` returns `true`         | Safe to keep sending more data                                                       |
| `.write()` returns `false`        | Too much data waiting — pause the data source                                        |
| `"drain"` event                   | Fires once the backlog has been written out enough — safe to resume sending data     |

---

### 🎯 The Big Picture Takeaway

When data arrives too fast, the Write Stream doesn't write it out right away — it just **holds it in memory**, allocating more and more space as more data keeps coming in. It only gets the chance to actually **write everything out** once the incoming side pauses or stops sending data.

Backpressure solves the memory-growth risk this creates. `.write()` returns `false` as a warning the moment memory usage crosses the `highWaterMark` limit — this is our cue to **pause** the source sending us data, giving the Write Stream room to catch up and actually write out its backlog. Once it has, it fires the `"drain"` event — our cue to **resume** sending data again. This simple pause-and-resume cycle is what keeps memory usage safe and predictable, no matter how much total data is being moved.

## 🔚 Ending the Writable Stream

Unlike a Readable Stream (which automatically closes once all data has been read), a **Writable Stream doesn't close on its own**. We have to **explicitly tell it to close** once we're done writing.

---

### 🔧 The `.end()` Method

We use the `.end()` method to close a Write Stream.

```js
import fs from "node:fs";

const writeStream = fs.createWriteStream("file.txt", { highWaterMark: 6 });

writeStream.end("My last data");
```

Here's what `.end()` actually does:

1. **Optionally writes one last piece of data.** If you pass an argument (like `"My last data"` above), that value gets written to the file **first**, just like a normal `.write()` call.
2. **Closes the stream.** Once that final data is written, the stream is marked as **finished** — no more `.write()` calls are allowed after this.
3. **Releases memory.** Since the stream is done, Node frees up the resources it was using to keep the stream open.

---

### 🏁 The `"finish"` Event

When we call `.end()`, it doesn't necessarily mean the file has **fully finished writing** at that exact instant — there might still be some buffered data left to actually get written out to the disk.

Once **all the data has been completely written out** to the file (fully finished, nothing left pending), the stream emits a `"finish"` event.

```js
writeStream.on("finish", () => {
  console.log("All data has been fully written to the file");
});
```

---

### 🆚 Quick Reference

| Method/Event     | What it does                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| `.write(data)`   | Writes a chunk, keeps the stream open for more writes                                                  |
| `.end(data?)`    | Optionally writes one final chunk, then **closes** the stream permanently                              |
| `"finish"` event | Fires once **all data has been fully written** to the destination — confirms writing is truly complete |

> ⚠️ **Important:** Once `.end()` is called, calling `.write()` again on that same stream will throw an error — the stream is considered fully done.

---

### 🎯 Takeaway

Readable Streams end automatically once they run out of data to read — but Writable Streams **don't know on their own** when you're finished writing. That's why we must explicitly call `.end()` to signal: _"I'm done writing, close this stream and free up its resources."_ You can also use `.end()` as a shortcut to write one last piece of data right before closing. And to confirm that the data has **actually fully finished being written** (not just that `.end()` was called), we listen for the `"finish"` event.

## States of Writable Streams

1. `writable` => Property shows boolean value whether the writeStream is available to write or not
2. `writableEnded` => Property shows the boolean value whether `.end()` has already been called on the writeStream (so it's no longer eligible to write)
3. `writableFinished` => Property shows the boolean value whether the stream has completed writing all data and finished . This becomes `true` right around when the `"finish"` event fires.
4. `destroyed` => Property shows `true` if the stream is destroyed, otherwise `false`
5. `.destroy()` => This method destroys and closes the stream immediately, and can optionally take an error as an argument, which then gets passed to the `"error"` event

## 🔗 Pipe and Unpipe

Earlier, we manually handled backpressure ourselves — checking `.write()`'s return value, calling `.pause()`, and listening for `"drain"` to `.resume()`. That's a lot of manual code just to move data safely from a Readable Stream to a Writable Stream.

The `.pipe()` method does **all of that for us automatically** — it connects a Readable Stream directly to a Writable Stream, and internally handles pausing/resuming and backpressure/drain, without us having to write any of that logic ourselves.

---

### 🔧 `.pipe()` — Connecting Streams

```js
readStream.pipe(writeStream);
```

This single line does what we previously did manually with `.write()`, checking `false`, `.pause()`, and `"drain"` — all wrapped into one simple call.

> 💡 **In short:** `.pipe()` takes data as it's read from the Readable Stream and automatically writes it into the Writable Stream, pausing and resuming the flow behind the scenes whenever needed to respect backpressure.

---

### 🔧 `.unpipe()` — Disconnecting Streams

If we want to **stop** the piping — meaning stop sending data from the Readable Stream into the Writable Stream — we use `.unpipe()`.

```js
setTimeout(
  () => {
    readStream.unpipe(writeStream);
  } /* delay in ms */,
);
```

This disconnects the two streams, so data from `readStream` will **no longer** be automatically sent into `writeStream` after this point.

> ⚠️ **Note:** The correct method name is `setTimeout` (not `setTimeOut`) — JavaScript's timer function.

---

### ⚠️ Important: Always Handle the `"error"` Event

If something goes wrong while piping — for example, the source file doesn't exist, or there's a disk/network issue — and there's **no `"error"` listener attached**, Node will **crash the entire application**.

This is because unhandled errors on streams don't just fail silently — they get thrown, and if nothing is listening to catch that error, the whole process stops.

To prevent this, we should always attach an `"error"` event listener to our streams:

```js
readStream.on("error", (err) => {
  console.log("Something went wrong:", err);
});

writeStream.on("error", (err) => {
  console.log("Something went wrong:", err);
});
```

> 💡 This is especially important when using `.pipe()`, since we're not manually controlling every step — we still need to make sure any errors from either stream are caught, so our app doesn't crash unexpectedly.

---

### 🆚 Quick Reference

| Method/Event                     | What it does                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| `readStream.pipe(writeStream)`   | Connects the two streams — automatically handles data transfer, pausing, resuming, and backpressure |
| `readStream.unpipe(writeStream)` | Disconnects the two streams — stops the automatic data transfer                                     |
| `"error"` event                  | Must be listened to — otherwise an error will **crash the application**                             |

---

### 🎯 Takeaway

`.pipe()` exists to save us from writing repetitive backpressure-handling code every time we want to move data from a Readable Stream to a Writable Stream. Instead of manually checking `.write()`'s return value and juggling `.pause()`/`.resume()`/`"drain"` ourselves, `.pipe()` handles all of that internally — making it the simplest and most common way to connect streams in Node.js. But since `.pipe()` handles things automatically, we must still remember to attach `"error"` listeners ourselves — otherwise, any stream error will crash our entire application.

# Data Streams (OS) — stdin, stdout, stderr

---

## 1. What Is a Data Stream?

When the operating system starts a program (a **process**), it gives that program **three open channels** to talk with the outside world. These channels are called **standard streams**.

Think of a stream like a **pipe**. Data flows through it in one direction. The program does not need to know what is on the other side of the pipe — it could be your keyboard, your screen, a file, or even another program.

| #   | Stream          | Short name | File Descriptor (fd) | Direction                                        | Usually connected to |
| --- | --------------- | ---------- | -------------------- | ------------------------------------------------ | -------------------- |
| 1   | Standard Input  | `stdin`    | `0`                  | Data comes **into** the program                  | Keyboard             |
| 2   | Standard Output | `stdout`   | `1`                  | Data goes **out of** the program (normal output) | Terminal screen      |
| 3   | Standard Error  | `stderr`   | `2`                  | Data goes **out of** the program (error output)  | Terminal screen      |

### What is a file descriptor (fd)?

A **file descriptor** is just a **number**. The OS uses this number to keep track of something that is open — it could be a real file, a keyboard, a screen, a pipe, or a network connection. In Unix-like systems (Linux, macOS), almost everything is treated like a "file" internally, even a keyboard or a screen.

The numbers `0`, `1`, and `2` are **always reserved** for `stdin`, `stdout`, and `stderr`. They are set up automatically by the OS _before_ your program even starts running. You don't have to create them yourself.

---

## 2. How `stdin` Works in a Terminal (Step by Step)

### The basic flow

```
Keyboard → OS (kernel) → Input Buffer → stdin → Program
```

When you press keys on your keyboard, the letters do **not** go straight into the running program. They first go into a small storage area inside the operating system called a **buffer**. This buffer belongs to a part of the OS called the **TTY driver** (TTY = "teletype," an old name that stuck around). This part of the OS handles keyboard input for terminals — showing your typed letters, letting you press Backspace, and deciding when to send the data to the program.

### Example: typing "HELLO"

Say you type the word `HELLO`. Before any program reads it, it just sits in the buffer like this:

```
-----------
|H|E|L|L|O|
-----------
```

- If **no program has read it yet**, it just stays there, waiting.
- Once a program actually **reads** it (using a `read()` operation), those letters are taken out of the buffer. The space is now free and can be reused for the next thing you type.

So the buffer is like a waiting room — data sits there until a program is ready to pick it up.

### Echo mode — why you can see what you type

You might think the _program_ you're running is the one showing your typed letters on screen. That's not true. It's actually the **terminal itself** doing this, through something called **echo mode**.

- **Echo ON** (the normal setting): every key you press is instantly shown on the screen.
- **Echo OFF**: keys are typed and sent to `stdin` as usual, but they are **not shown** on screen.

A common example is typing your password for `sudo` or during an `ssh` login. The program tells the terminal to turn echo off, so even though you're really typing, nothing appears on the screen. Your keystrokes still go into the buffer and to `stdin` — you just can't see them.

### Canonical mode vs raw mode — why pressing Enter matters

This explains why a program usually only gets your text **after** you press Enter.

| Mode                                                                | What happens                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Canonical mode** (also called "cooked mode") — the normal default | The OS holds your typed text **line by line** inside the buffer. Nothing is sent to the program until you press **Enter**. Pressing Enter tells the OS "this line is done, send it now." This also lets you use Backspace to fix mistakes before sending.                    |
| **Raw mode** (also called "non-canonical mode")                     | Every single key press is sent to the program **immediately** — there is no waiting for Enter, and no line-by-line buffering. Programs like `vim`, text-based games, or password-typing screens switch the terminal into this mode so they can react to each key right away. |

So in short: **canonical mode = wait for Enter, raw mode = react to every keystroke instantly.**

---

## 3. `stdin` Between Two Processes (Parent → Child)

A running program can start another program. The one that starts it is called the **parent process**, and the new one is called the **child process**.

When a parent creates a child process, the parent is given **control over the child's `stdin`**. This means the parent can send data directly into the child — without needing a keyboard at all.

**Parent process — sending data into the child:**

```js
childProcess.stdin.write("Hello");
```

**Child process — receiving that data:**

```js
process.stdin.on("data", (chunks) => {
  console.log(chunks);
});
```

This is the exact same idea behind pipes in the terminal, like `command1 | command2`. The OS connects `command1`'s output straight into `command2`'s input. When you use Node's `child_process` module, you're just doing this same thing, but with code instead of the `|` symbol.

---

## 4. `stdout` — Sending Output From a Program to the Terminal

`stdout` is how a program sends its **normal output** to whatever is listening on the other end. When you run a program directly in a terminal, the terminal itself is the one listening.

```js
import process from "node:process";
process.stdout.write("Data from program");
```

**Step by step:**

1. Your program (which is a **child process** of the terminal) writes data to `stdout`.
2. The **terminal** (its parent process) reads that data.
3. The terminal displays it on your screen.

---

## 5. `stdout` Between Two Processes (Child → Parent)

If a child process writes something to its own `stdout`, it does **not** automatically show up on your screen. Instead, it goes to whoever is set up to read the child's `stdout` — usually the **parent process**.

**Child process — writing data:**

```js
process.stdout.write("data send from child to parent");
```

**Parent process — reading the child's data:**

```js
childProcess.stdout.on("data", (chunks) => {
  console.log(chunks.toString());
});
```

Note: the parent must listen on `childProcess.stdout`, **not** on its own `process.stdin`. Its own `stdin` is only for things typed on the parent's keyboard — it has nothing to do with what the child wrote.

If the child uses `console.log(...)` instead of `process.stdout.write(...)` directly, it still works the same way. That's because `console.log()` internally calls `process.stdout.write()` for you (and just adds a new line at the end). So no matter which one the child uses, the parent still catches it the same way, with `childProcess.stdout.on("data", ...)`.

---

## 6. `stderr` — The Error Channel

`stderr` works the same way as `stdout` mechanically — a program writes to it, and a parent/terminal reads it. The only difference is **purpose**: `stderr` (fd `2`) is meant only for error messages and warnings, kept separate from normal output.

```js
process.stderr.write("Something went wrong");
```

### Why have a separate error stream at all? Why not just use stdout for everything?

- **You can send them to different places.** In bash:

  ```bash
  node app.js > output.log 2> errors.log
  ```

  Normal messages go into `output.log`, and error messages go into `errors.log` — even though on screen they'd normally look mixed together.

- **Pipes only carry stdout by default.** If you do `command1 | command2`, only `command1`'s normal output (`stdout`) gets piped into `command2`. Errors from `command1` still show up on your screen directly, so you don't miss them.

- **stderr shows up faster.** `stderr` is usually sent immediately (not held in a buffer), while `stdout` can be delayed a little. This means if a program crashes, you still see the error message right away.

---

## 7. Buffering — Why Output Sometimes Seems Delayed

A **buffer** is just a temporary holding area for data before it's actually sent or shown. Streams don't always send data the instant you write it — sometimes they wait and send a batch all at once. This is called **buffering**, and it works differently for each stream:

| Stream   | How it usually buffers                                                                                                                                                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stdin`  | Holds data line by line until you press Enter (this is canonical mode, explained above)                                                                                                                                                                                               |
| `stdout` | **Line-buffered** when connected to a terminal — sends data each time it sees a new line (`\n`). But when `stdout` is redirected into a file or another program, it becomes **block-buffered** — it waits until it has a bigger chunk of data (or the program ends) before sending it |
| `stderr` | **Not buffered at all** — sent immediately, every time                                                                                                                                                                                                                                |

This is why sometimes when you pipe a program's output into a file or another command, the output seems to show up in "bursts" instead of line by line. It's not lost — it's just sitting in a buffer, waiting to be flushed out.

---

## 8. Conclusion — Streams Are a Two-Way Relationship

A stream only makes sense when you think of it as connecting **two sides**: one side writes, and the other side reads.

- If Program A **reads** something from a stream, that data must have come from Program B **writing** it in first.
- If Program A **writes** something into a stream, it's only useful once some other program (Program B) **reads** it out.

So `stdin`, `stdout`, and `stderr` never work alone. They always connect a **writer** and a **reader** — whether that's a program and a keyboard, a program and a screen, or one program talking to another program.

```
Program A  --writes-->  [ stream / buffer ]  --reads-->  Program B
```

## 🔗 Piping Between Two Processes (Unix, WSL, Linux, Mac)

**Piping** is a way to connect **two separate processes** so that the output of one becomes the input of the other. This is made possible with the help of the **Linux terminal (shell)** and the **Linux kernel**, which manages the actual data transfer between processes behind the scenes.

---

### 🔧 How Piping Works

If we want to send data **from one process to another**, we use the pipe symbol: `|`

Here's the core idea:

- The **first process** sends out data through its `stdout` (standard output) stream.
- The **second process** receives that data through its `stdin` (standard input) stream.

```bash
node script.js | node app.js
```

**What's happening here:**

1. `node script.js` runs and produces some output — whatever it sends via `stdout`.
2. Instead of that output going to the terminal screen (as it normally would), the shell **redirects** it directly into the `stdin` of `node app.js`.
3. `node app.js` can then read that incoming data through its own `process.stdin`.

**Another example:**

```bash
echo "mohan g kaha ho" | node app.js
```

Here, the `echo` command's output (`"mohan g kaha ho"`) is sent through `stdout`, and piped directly into `node app.js`'s `stdin` — so `app.js` receives and can process that text.

> 💡 **Simple way to remember:** Whatever a process would normally **print to the screen** (`stdout`), piping instead sends it **directly into another process's input** (`stdin`) — connecting them like a pipe carrying water from one container to another.

---

## 📄 Redirection (Unix, WSL, Linux, Mac)

**Redirection** is similar to piping, but instead of connecting two _processes_ together, it connects a process's stream to a **file**.

There are two directions redirection can go:

1. Sending a process's `stdout` output **into a file** (instead of the screen).
2. Reading a file's content and feeding it **into a process's `stdin`** (instead of typing it manually).

---

### 🔹 `>` — Overwrite Redirection

```bash
node throwValue.js > transfer.txt
```

**What this does:**

- If `transfer.txt` **doesn't exist**, it gets **created**, and the `stdout` output from `throwValue.js` is written into it.
- If `transfer.txt` **already exists** (with old content), this **overwrites** that old content completely with the new output.

> 💡 **Comparison to Write Streams:** This behaves just like calling `.write()` for the **very first time** on a Write Stream — the first write replaces any existing content. Every write **after** that (using `>>`, explained next) just appends more, instead of overwriting again.

---

### 🔹 `>>` — Append Redirection

```bash
node append.js >> transfer.txt
```

**What this does:**

- If `transfer.txt` **doesn't exist**, it gets **created** first.
- If it **already has content** (from a previous run, or from `>`), this **appends** the new `stdout` output right after the existing content — without erasing anything that was already there.

---

### 🔹 `<` — Input Redirection

```bash
node get.js < transfer.txt
```

**What this does:**

- Instead of typing input manually into the terminal for `get.js` to read, this takes the **entire content of `transfer.txt`** and feeds it directly into `get.js`'s `stdin` — as if someone had typed that file's content into the terminal for the program to read.

---

### 🆚 Quick Reference

| Symbol | Name               | What it does                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------------- |
| `\|`   | Pipe               | Connects one process's `stdout` directly to another process's `stdin`                       |
| `>`    | Overwrite redirect | Sends a process's `stdout` into a file — creates it if missing, **overwrites** if it exists |
| `>>`   | Append redirect    | Sends a process's `stdout` into a file — creates it if missing, **appends** if it exists    |
| `<`    | Input redirect     | Feeds a file's content into a process's `stdin`                                             |

---

### 🎯 Takeaway

**Piping** (`|`) connects two running processes together — one's output becomes the other's input, without needing a file in between. **Redirection** (`>`, `>>`, `<`) instead connects a process's input/output to a **file** — either saving what a process outputs, or feeding a file's content in as if it were typed input. Both rely on the same underlying idea: `stdout` sends data out, and `stdin` receives data in — piping and redirection just decide **where that data goes to** or **comes from**.

## 🔢 File Descriptor

A **File Descriptor (fd)** is simply a **whole number** (never a float) that the operating system uses to **keep track of an open file** within a running process. Instead of referring to files by their full name or path internally, the OS just assigns them a number — and uses that number to manage things like reading, writing, or closing that file.

---

### 🔧 Getting a File Descriptor in Node.js

```js
import fs from "node:fs";

const fd = fs.openSync("learn.txt");
console.log(fd); // e.g. 3
```

### 🤔 Why Does the First File You Open Get `fd = 3`, Not `0`?

This is because of something we've already learned: **every process automatically gets 3 built-in streams from the OS** the moment it starts — `stdin`, `stdout`, and `stderr`. These already **occupy** file descriptor numbers `0`, `1`, and `2`.

| Stream   | File Descriptor |
| -------- | --------------- |
| `stdin`  | `0`             |
| `stdout` | `1`             |
| `stderr` | `2`             |

Since numbers `0`, `1`, and `2` are **already reserved** for these standard I/O streams, the **very next available number** — `3` — is what gets assigned to the **first file you open** in your program. If you open a second file after that, it would typically get `4`, then `5`, and so on.

---

### 🆚 Quick Reference

| fd Number     | Assigned To                   |
| ------------- | ----------------------------- |
| `0`           | `stdin`                       |
| `1`           | `stdout`                      |
| `2`           | `stderr`                      |
| `3`           | First file you open           |
| `4`, `5`, ... | Next files you open, in order |

---

### 🎯 Takeaway

A file descriptor is just a simple whole number the OS uses to **keep track of open files** (and streams) for a process. Since every process automatically starts with `stdin` (0), `stdout` (1), and `stderr` (2) already occupying the first three numbers, any file **you** open in your code will start counting from **3** onward.

## 📖 Reading a File Using File Descriptor

Once we have a **file descriptor (fd)** for an opened file, we can use it to actually **read data** from that file using the `read` method.

---

### 🔧 Setting It Up

```js
import { read, openSync } from "node:fs";

const fd = openSync("text.txt");
// opens the file and returns its file descriptor (a number)

const customBuffer = Buffer.alloc(100);
```

---

### 🔹 Reading Without Options

```js
read(fd, (err, bytesRead, buffer) => {
  console.log(bytesRead, buffer);
});
```

- `err` → if something went wrong during reading, the error will be here.
- `bytesRead` → tells us **how many bytes were actually read** from the file.
- `buffer` → the buffer containing the data that was read.

> 💡 When called without extra options, Node uses **default settings** — it typically allocates its own internal buffer and reads from the beginning of the file.

---

### 🔹 Reading With Options

```js
read(
  fd,
  { buffer: customBuffer, length: 10, offset: 5 },
  (err, bytesRead, buffer) => {
    process.stdout.write(String(bytesRead));
    process.stdout.write(buffer.toString());
  },
);
```

Here, we pass an **options object** as the second argument, letting us control exactly how the read happens:

| Option   | What it means                                                                                                                                                                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buffer` | The buffer **we provide** to store the read data into — here, our `customBuffer`                                                                                                                         |
| `length` | How many bytes to read from the file **at most** — here, `10` bytes                                                                                                                                      |
| `offset` | **Where in our buffer** to start placing the read data — here, starting at position `5` (so the first 5 bytes of `customBuffer` stay untouched, and the read data starts filling in from index 5 onward) |

---

### 🆚 Quick Reference: Reading

| Parameter                           | Purpose                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `fd`                                | The file descriptor of the already-opened file                                                             |
| `buffer` (option)                   | Where the read data gets stored                                                                            |
| `length` (option)                   | Max number of bytes to read                                                                                |
| `offset` (option)                   | Position in the buffer to start writing the read data                                                      |
| Callback `(err, bytesRead, buffer)` | Runs once reading is complete — gives us any error, how many bytes were read, and the buffer with the data |

---

## ✍️ Writing to a File Using File Descriptor

Just like reading, we can also **write data** to a file using its file descriptor — with the `write` method.

```js
import fs from "node:fs";

const fd = fs.openSync("text.txt", "w");
// in second argument `w` is important because it tells the os to open the file for writing by  default it's read only
fs.write(fd, "data", (err, bytesWritten, dataWritten) => {
  console.log(bytesWritten, dataWritten);
});
```

we can pass the permission of the file in second argument

### Permission like

- "w" //write
- "r" //read
- "w+" //write and read
- "r+" //read and write

  **Breaking this down:**

- `fd` → the file descriptor of the already-opened file we want to write into.
- `"data"` → the actual string (or buffer) we want to write to the file.
- Callback `(err, bytesWritten, dataWritten)`:
  - `err` → if something went wrong during writing, the error shows up here.
  - `bytesWritten` → tells us **how many bytes were actually written** to the file.
  - `dataWritten` → the actual data that was written (echoes back what was passed in).

> 💡 **Note:** Just like `.write()` on a Write Stream, this uses the given file descriptor to write directly at the file's current position — it doesn't automatically manage opening/closing the file for you; that's handled separately via `openSync`/`closeSync`.

---

### 🆚 Quick Reference: Writing

| Parameter                                   | Purpose                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `fd`                                        | The file descriptor of the already-opened file                                                        |
| Data argument (`"data"`)                    | The string/buffer content to write into the file                                                      |
| Callback `(err, bytesWritten, dataWritten)` | Runs once writing is complete — gives us any error, how many bytes were written, and the data written |

---

### 🎯 Takeaway

Both `read()` and `write()` let us work with files at a **low level**, directly through their file descriptor — giving us precise control over exactly how much data to read/write, and where. This is more manual than using Readable/Writable Streams, but it's useful when you need fine-grained control, like reading or writing only a specific chunk of a file rather than the whole thing at once.

## closing file

In last we close the file if we opened it.Close using `close` method

```js
fs.close(fd);
```

## 📂 Open, Close, Read, Write Using `fs/promises`

Instead of using callbacks (like `fs.open`, `fs.read`, `fs.write`), we can use the **Promise-based version** of the file system module — `fs/promises` — which lets us use `async/await` for cleaner, more readable code.

---

### 🔧 Opening a File

```js
import { open } from "node:fs/promises";
// This is a completely separate module built specifically for Promise-based file operations.

const fileHandle = await open("filepath.extension", "w+");
console.log(fileHandle.fd); // the file descriptor, stored inside the returned object
```

- `open(path, flag)` returns a special object called a **`FileHandle`** — think of it as a "handle" (a reference) that represents the currently open file. All future read/write/close operations are done **through this handle**.
- The **flag** `"w+"` means: open the file for **both reading and writing**; create it if it doesn't exist.
- `fileHandle.fd` gives you the underlying **file descriptor number**, same concept as before.

---

### 🔧 Setting Up Buffers

```js
const rBuff = Buffer.allocUnsafe(1000); // buffer to hold data we READ
const wBuff = Buffer.allocUnsafe(400); // buffer to hold data we WRITE
```

> 💡 Remember: `allocUnsafe` creates the buffer fast but may contain old/stale data — since we're about to fill it with actual read/write data anyway, that's generally fine here.

---

### ✍️ Writing to the File

```js
await fileHandle.write(wBuff);
// writes the contents of wBuff into the file
// returns an object containing: how many bytes were written, and the buffer that was written
```

### 📖 Reading From the File

```js
await fileHandle.read(rBuff);
// reads data from the file INTO rBuff
// returns an object containing: how many bytes were read, and the buffer with that data
```

> 💡 If there's no more data left to read (e.g., you're at the end of the file), this will return **0 bytes read**, and `rBuff` will remain empty/unchanged for those unread portions.

---

### 🔄 The Position Problem — Reading After Writing

Here's an important detail: when using the **same `fileHandle`** for both reading and writing, the file keeps track of an internal **"current position"** — like a cursor. Every time you `write()` or `read()`, that cursor **moves forward** based on how much data was processed.

So if you `write()` first, the cursor ends up at the **end** of what was just written. If you then try to `read()` **without specifying a position**, it'll try to read starting from **where the cursor currently is** (the end) — meaning there's nothing left to read, since you're past all the existing data.

**Solution:** explicitly tell `read()` **where to start reading from**, instead of relying on the current cursor position.

```js
await fileHandle.read(rBuff, 0, rBuff.length, 10);
// reads starting from byte position 10 in the file
```

The full signature looks like this:

```js
fileHandle.read(buffer, offset, length, position);
```

| Parameter  | Meaning                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------- |
| `buffer`   | The buffer to store the read data into                                                    |
| `offset`   | Where in the **buffer** to start placing the data                                         |
| `length`   | How many bytes to read                                                                    |
| `position` | Where in the **file** to start reading from (this is the key fix for our cursor problem!) |

---

### 🔒 Closing the File

```js
await fileHandle.close();
// closes the file, releasing the file descriptor and any resources tied to it
```

> ⚠️ **Important:** Always remember to call `.close()` once you're done. Forgetting to close a file handle can lead to resource leaks — the file descriptor stays "occupied" even though you no longer need it.

---

### 🆚 Quick Reference

| Method                                              | Purpose                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| `open(path, flag)`                                  | Opens a file, returns a `FileHandle`                                        |
| `fileHandle.write(data)`                            | Writes data (string or buffer) to the file                                  |
| `fileHandle.read(buffer, offset, length, position)` | Reads data from the file into a buffer, optionally from a specific position |
| `fileHandle.close()`                                | Closes the file, releasing its resources                                    |

---

### 🎯 Takeaway

`fs/promises` gives us a cleaner, `async/await`-based way to open, read, write, and close files — avoiding deeply nested callbacks. The one tricky part to remember: since read and write share the **same internal position cursor** on a file handle, reading right after writing (without specifying a position) may return nothing useful — you need to explicitly tell `read()` **where** in the file to start reading from.

## 🌊 Creating Read/Write Streams Using the Promise-Based `fs/promises`

We've already seen how `open()` from `fs/promises` gives us a **`FileHandle`** object. What's useful is that this same `FileHandle` object also lets us create **Readable** and **Writable Streams** directly from it — meaning we can read or write the file in **chunks**, instead of all at once.

---

### 🔧 Setting Up

```js
import { open } from "node:fs/promises";

const readFileHandle = await open("C:/user/find3/.ssh/github");
const writeFileHandle = await open("streams.txt", "w");
```

- `readFileHandle` → a `FileHandle` for the file we want to **read from**.
- `writeFileHandle` → a `FileHandle` for the file we want to **write to** (opened with `"w"` — write mode, creating the file if it doesn't exist).

---

### 🔧 Creating the Streams

```js
const readStream = readFileHandle.createReadStream({
  highWaterMark: 2 * 1024, // reads in 2 KiB chunks
});

const writeStream = writeFileHandle.createWriteStream({
  highWaterMark: 3 * 1024, // buffers up to 3 KiB before backpressure kicks in
});
```

- `createReadStream()` → turns the `FileHandle` into a **Readable Stream**, letting us consume the file's data chunk-by-chunk.
- `createWriteStream()` → turns the `FileHandle` into a **Writable Stream**, letting us write data into the file chunk-by-chunk.
- `highWaterMark` works exactly the same way here as it did with the regular `fs.createReadStream`/`fs.createWriteStream` we covered earlier — it sets the chunk size (for reading) or the memory threshold before backpressure (for writing).

---

### 🔗 Connecting Them Together

```js
readStream.pipe(writeStream);
```

Just like before, we have **two options** for moving data from the Read Stream to the Write Stream:

1. **Manually manage everything ourselves** — handling backpressure (`.write()` returning `false`), pausing/resuming, and calling `.end()` on the Write Stream when done.
2. **Use `.pipe()`** (or Node's `pipeline()` utility) — which automatically handles backpressure, pausing/resuming, and even properly closes/ends the Writable Stream once the Readable Stream finishes — all without us writing that logic manually.

> 💡 **Note:** As mentioned in the Pipe & Unpipe section earlier, don't forget to attach `"error"` listeners on both streams — since an unhandled stream error can crash the whole application, even when using `.pipe()`.

---

### 🆚 Quick Reference

| Method                                  | What it does                                                                |
| --------------------------------------- | --------------------------------------------------------------------------- |
| `fileHandle.createReadStream(options)`  | Creates a Readable Stream from an already-open file handle                  |
| `fileHandle.createWriteStream(options)` | Creates a Writable Stream from an already-open file handle                  |
| `readStream.pipe(writeStream)`          | Connects the two, automatically managing backpressure and stream completion |

---

### 🎯 Takeaway

The Promise-based `fs/promises` module isn't limited to just one-off `read()`/`write()` calls — its `FileHandle` object can also produce full Readable and Writable **Streams**, giving us the best of both worlds: the cleaner `async/await` style for opening files, combined with the memory-efficient, chunk-based approach of Streams for actually moving large amounts of data.

## Computer NetWorking

### What is Computer NetWorking

Net meaning connection between two 2 or more nodes and working means the data should be transferred from one place to another.

A computer network form when the device is connected through 2 or more devices.When device is connected then data can be transferred from any device with the help of wire or wireless .

In computer networking we learn about protocols which means how the device connect with each other with the help of protocols meaning set of rules to connect or transfer the data in other device

## 📖 Story of Computer Networks

> 📝 **Note:** I've fixed the historical facts, names, dates, and spellings from your draft, and expanded each part with more context. The storytelling flow is kept the same — just corrected and detailed.

### 🗣️ Before Networking: The Communication Problem

In earlier days, humans had no fast way to share information with someone far away. Messages had to travel physically — by **birds (pigeons), horses, or postal mail** — and all of these were extremely slow.

### ☎️ The Telephone Era

In the 19th century, **Alexander Graham Bell** invented the **telephone** (patented in 1876), a device that converts **voice → electrical signal → voice** again at the receiving end.

> 🔤 **Word origin:** _Tele_ = long distance, _Phone_ = sound/voice.

Bell later co-founded the **Bell Telephone Company (1877)**, which laid massive amounts of telephone cabling both within the USA and internationally. This same cabling infrastructure would later become important for computer networking.

### 🚀 The Cold War and the Space Race

After World War II, a **Cold War** (a rivalry for global power and technological dominance, not a direct armed war) began between the **USA** and the **USSR (Soviet Union)** — "Russia" was the largest and leading republic of the USSR.

#### 🛰️ Sputnik and Its Impact

In **1957**, the USSR launched **Sputnik 1**, the world's first artificial satellite. This alarmed the USA, as it proved Soviet technology could be ahead of American technology.

In response, the USA:

- Formed **ARPA** (Advanced Research Projects Agency) in 1958 to fund advanced technological/defense research.
- Intensified its space program, which eventually led to the **Apollo 11** Moon landing in 1969.

#### 🖧 ARPANET

Before ARPANET, computers already existed and stored data digitally in **binary (0s and 1s)**, but there was no way to connect computers to each other. To share data or research papers between institutions, people had to:

- Physically carry storage media (like floppy disks/magnetic tapes) from one place to another, or
- Read out research content over a telephone call.

This was slow and inefficient. So ARPA funded a project to connect computers over long-distance cables (reusing telephone-line infrastructure) so that data could move electronically instead of physically.

This resulted in **ARPANET**, which went live in **1969**, initially connecting **four university/research nodes**:

| Node | Institution                                    |
| ---- | ---------------------------------------------- |
| 1    | University of California, Los Angeles (UCLA)   |
| 2    | Stanford Research Institute (SRI)              |
| 3    | University of California, Santa Barbara (UCSB) |
| 4    | University of Utah                             |

To make computers talk to each other in an organized way, engineers designed a set of rules for **how data should be transferred, in what order, and in what size (chunks)**. These rules are what we now call a **protocol**. ARPANET's original protocol was called **NCP (Network Control Protocol)** — this came _before_ TCP/IP, not after.

##### 💬 The First Message

On **October 29, 1969**, engineers at UCLA attempted to send the word **"LOGIN"** to the SRI computer over ARPANET.

This is considered the **first message ever sent over a computer network**, and this network eventually evolved into what we now call the **internet**.

Other universities and research labs, inspired by ARPANET's success, began building their own similar networks using their own custom protocols.

### 🔌 The Protocol Problem — Birth of TCP/IP

Since different networks used **different, incompatible protocols**, computers on one network couldn't communicate with computers on another network — even if they were physically connected by cable, their "rules of communication" didn't match.

#### 🌐 TCP/IP

This problem was solved in the early 1970s–80s by **Vint Cerf** and **Bob Kahn**, who designed:

- **TCP (Transmission Control Protocol):** Breaks data into small **chunks (packets)**, adds metadata (like sequence numbers) so the receiving computer knows the correct order to reassemble them, and ensures reliable delivery.
- **IP (Internet Protocol):** Gives every device a unique **IP address** so it can be identified and located on the network.

All ARPANET networks officially switched over to TCP/IP on **January 1, 1983** — an event historically nicknamed **"Flag Day."** This standardization is what let independently-built networks finally interconnect — forming the true beginning of the modern **internet** (a network _of_ networks).

#### 🔢 IP Addressing

Since there were too many computers to identify by arbitrary names alone, engineers assigned each device a numeric address — the **IP address**.

An IPv4 address always follows a fixed structure of **4 numbers (octets)** separated by dots:

```
xxx.xxx.xxx.xxx
```

Example: `192.168.1.1`

Each `xxx` ranges from 0–255.

#### ✉️ Other Early Protocols

Once computers could reliably talk to each other, more specialized protocols were built on top of TCP/IP for specific purposes:

| Protocol | Full Form                     | Purpose                                                     |
| -------- | ----------------------------- | ----------------------------------------------------------- |
| SMTP     | Simple Mail Transfer Protocol | Sending email                                               |
| FTP      | File Transfer Protocol        | Transferring files between computers                        |
| Telnet   | Teletype Network              | Remotely logging into another computer using its IP address |

### 🗂️ Naming the Computers

#### 📄 The hosts.txt Era

As more organizations joined the network, remembering every computer by its numeric IP address became difficult. So a single master text file — called **`hosts.txt`** — was maintained, mapping IP addresses to human-readable names, including a category suffix describing the organization type:

```
xxx.xxx.xxx.xxx  ->  ford.com
```

Common suffixes included:

| Suffix | Meaning                 |
| ------ | ----------------------- |
| `.com` | Commercial organization |
| `.gov` | Government organization |
| `.org` | Non-profit/organization |
| `.edu` | Educational institution |

Whenever someone wanted to register a new computer name, they had to contact the NIC and get the `hosts.txt` file manually updated — which didn't scale as the network grew rapidly. Users would use the **`telnet`** command with an IP address (looked up from `hosts.txt`) to connect to a remote computer.

#### 🌍 Birth of DNS

In **1983**, **Paul Mockapetris** solved this scaling problem by inventing the **DNS (Domain Name System)** — a distributed system that automatically translates human-readable **domain names** into **IP addresses**.

Once DNS was integrated with tools like `telnet` (and later, browsers), users could simply type a domain name, and DNS would resolve it to the correct IP address behind the scenes — no manual file lookup needed. The machines running DNS services also had their own IP addresses, just like any other device on the network.

### 🕸️ The World Wide Web

#### 👨‍💻 Tim Berners-Lee and Hypertext

In 1989, **Sir Tim Berners-Lee**, a British computer scientist working at **CERN** (the European particle physics laboratory in Switzerland), identified a new problem: research papers often referenced _extra information_ stored on a completely different computer. Readers had to manually find and connect to that other computer just to access the referenced content.

His idea was **hypertext** — text containing clickable links that automatically take you to related information, wherever it's stored, without manual lookup.

To make this real, he created three foundational technologies between 1989–1991:

#### 🏷️ HTML — HyperText Markup Language

A structural/markup language for writing documents that could contain **hyperlinks** — clickable references embedded directly in the text, pointing to other documents (potentially on other computers).

#### 🔗 HTTP — HyperText Transfer Protocol

The protocol used to **request and transfer** these HTML documents between a client (browser) and a server, using the target computer's IP address. HTTP itself runs **on top of TCP** — TCP handles the reliable delivery of data, while HTTP defines the rules of _what_ is being requested and sent (web pages, in this case).

#### 🖥️ The Web Browser

Berners-Lee also built the first web browser, originally called **"WorldWideWeb"** (later renamed **Nexus** to avoid confusion with the web itself). This software could read HTML files and **render** them visually, and let users click hyperlinks to jump between documents on different computers.

### 📈 Rapid Growth

With HTML, HTTP, and the browser in place, the **World Wide Web** opened to the public in the early 1990s, and the internet began growing explosively. Soon after:

- **CSS (Cascading Style Sheets)** was introduced (proposed by Håkon Wium Lie, 1994) to control the visual styling of web pages.
- **JavaScript** was created by **Brendan Eich** in 1995 (for Netscape) to add interactivity and dynamic behavior to web pages.

Together, **HTML + CSS + JavaScript** became — and remain — the three core building blocks of the modern web.

### 🕰️ Quick Timeline Summary

| Year      | Event                                                                        |
| --------- | ---------------------------------------------------------------------------- |
| 1876      | Alexander Graham Bell invents the telephone                                  |
| 1957      | USSR launches Sputnik 1                                                      |
| 1958      | USA forms ARPA in response                                                   |
| 1969      | ARPANET goes live; first message ("LO" of "LOGIN") sent between UCLA and SRI |
| 1969      | Apollo 11 Moon landing (separate space-race outcome)                         |
| 1983      | TCP/IP officially adopted ("Flag Day")                                       |
| 1983      | DNS invented by Paul Mockapetris                                             |
| 1989–1991 | Tim Berners-Lee invents HTML, HTTP, and the first web browser at CERN        |
| 1994      | CSS proposed                                                                 |
| 1995      | JavaScript created                                                           |

## 🖥️ Networking Devices

> 📝 **Note:** Fixed the terminology mix-ups, added the OSI layer each device operates at (this is commonly asked in exams), and corrected a few outdated claims — same H2/H3 structure as your draft.

### 🌐 Node

A **node** is any device connected to a network that can send, receive, or forward data — meaning it actively participates in the network. This is a **broad/umbrella term** and includes end-user devices _and_ networking hardware like routers, switches, and hubs.

### 💻 Host

A **host** is a specific _type_ of node — an **end device** that originates or receives data for actual use (not just forwarding it), has its own unique **IP address**, and runs applications. Examples: a laptop, a smartphone, a server.

> ⚠️ **Clarification:** Since every host is also a node (it sends/receives/participates in the network), **Host is a subset of Node** — this part of your original note was correct. The distinction is: **all hosts are nodes, but not all nodes are hosts** (a switch, for example, is a node but not a host, because it doesn't originate/consume the actual data — it just forwards it).

| Term | Includes                                   | Has its own IP? | Example                     |
| ---- | ------------------------------------------ | --------------- | --------------------------- |
| Node | Any connected device (broadest term)       | Not always      | Router, switch, printer, PC |
| Host | End devices that send/receive data for use | Yes             | Laptop, phone, server       |

### 🔌 HUB

A **Hub** is a **Layer 1 (Physical Layer)** device that connects multiple computers using cables (e.g., **RJ45**). Its major limitation: it has no intelligence — it **broadcasts** every incoming signal to **all connected ports**, instead of sending it to the intended recipient.

- Devices whose address doesn't match the data simply **discard it**.
- Only the intended device processes and accepts the data.
- Because it can't distinguish between devices, a hub is often called a **"dumb" device**.
- Hubs also cause a lot of **collisions** (multiple devices trying to talk at once on the same shared channel), since all ports share a single collision domain.

Hubs are essentially obsolete today, almost entirely replaced by **switches**.

### 🔀 Switch

A **Switch** is an upgrade over the hub, operating mainly at **Layer 2 (Data Link Layer)**. Instead of broadcasting to everyone, it learns and maintains a table of **MAC addresses** of connected devices, and forwards data **only to the specific port** the destination device is connected to.

Benefits over a hub:

- Reduces unnecessary network traffic.
- Each port effectively gets its own collision domain, improving overall speed and efficiency.
- More secure, since data isn't exposed to every device on the network.

### ☎️ Modem

**Modem** = **Mo**dulator + **Dem**odulator. It converts **digital signals** (from your computer) into **analog signals** (to transmit over telephone/cable lines) and vice versa on the receiving end.

> ⚠️ Modems are **still very much in use today** — just not usually over plain old telephone lines anymore. Modern **cable modems** and **DSL modems** are standard equipment for many home internet connections, converting the analog signal on the cable/telephone line to digital data for your router/computer.

### 🔦 ONT (Optical Network Terminal)

An **ONT** converts the **optical (light-based) signal** carried over fiber-optic cable into a **digital electrical signal** that regular devices can use — typically handed off to other devices over an **Ethernet (RJ45) cable**. This is the standard entry-point device for **Fiber-To-The-Home (FTTH)** connections.

### 📡 Router

A **Router** operates mainly at **Layer 3 (Network Layer)** and is responsible for directing data packets between different networks, based on **IP addresses** (not MAC addresses like a switch). A modern home router typically does the job of several devices combined:

- Routing traffic between your local network and the internet (its core job).
- Switching (connecting multiple wired devices).
- Wireless access point (connecting devices over Wi-Fi).

It has its own **CPU, memory, and storage** to run its operating system/firmware. Many modern routers also come with a **built-in ONT**, removing the need for a separate ONT box — the fiber cable can plug directly into the router.

A router also handles **signal conversion** to enable wireless transmission:

- It converts a **digital signal** into a **wireless (radio) signal** to broadcast Wi-Fi to connected devices.
- If it has a built-in ONT, it can also convert the **optical signal** (light, carried over fiber) directly into a **wireless signal** — going straight from fiber to Wi-Fi without a separate conversion step.

### 🌉 Bridge

A **Bridge** operates at **Layer 2** and connects **two LAN segments together**, forwarding traffic based on MAC addresses — essentially making two separate LANs function as one larger network.

> ⚠️ A bridge does **not** create a **MAN (Metropolitan Area Network)**. A MAN is a much larger-scale network spanning a city, typically built by ISPs/enterprises connecting many LANs together using routers and dedicated MAN infrastructure (fiber backbones, etc.) — not a simple bridge. A bridge's job is much smaller in scope: merging two nearby LAN segments.

Bridges are rarely used standalone today, since modern switches and routers can perform the same segment-joining function.

### 📶 Repeater

A **Repeater** extends the range of a wireless network by **receiving, amplifying, and re-broadcasting** the signal. It connects to the router wirelessly and rebroadcasts on the same or an adjacent channel.

**Downside:** Since it _receives_ and _re-transmits_ wirelessly using the same radio, it effectively has to split its airtime between listening and talking — usually resulting in **roughly half the original bandwidth** for devices connected through it, compared to connecting directly to the router.

### 📡 Access Point

An **Access Point (AP)** also extends wireless coverage, but connects to the main router/switch via a **wired Ethernet (RJ45) cable** rather than wirelessly. It converts the wired digital signal into a wireless (Wi-Fi) signal for nearby devices.

Because the backhaul (connection back to the router) is wired instead of wireless, an access point delivers **much better speed and reliability** than a repeater — wired connections generally have more stable bandwidth than wireless ones.

### 📊 Quick Comparison

| Device       | OSI Layer           | Forwards Based On       | Main Use                                 |
| ------------ | ------------------- | ----------------------- | ---------------------------------------- |
| Hub          | Layer 1 (Physical)  | Broadcasts to all       | Legacy — obsolete                        |
| Switch       | Layer 2 (Data Link) | MAC address             | Connect devices within a LAN             |
| Bridge       | Layer 2 (Data Link) | MAC address             | Join two LAN segments                    |
| Router       | Layer 3 (Network)   | IP address              | Connect different networks / to internet |
| Modem        | Physical            | N/A (signal conversion) | Digital ⇄ Analog conversion              |
| ONT          | Physical            | N/A (signal conversion) | Optical ⇄ Digital conversion             |
| Repeater     | Physical            | N/A (signal boost)      | Extend Wi-Fi range (wireless backhaul)   |
| Access Point | Layer 2             | MAC address             | Extend Wi-Fi range (wired backhaul)      |

## 🌐 Types of Network

> 📝 **Note:** Corrected the definitions and spellings, and added the actual scale/range and examples for each — this is a common exam topic so I've made it precise.

### 👤 PAN — Personal Area Network

A **PAN** is a network built around a **single person's own devices**, covering a **very short range** (usually within about 10 meters). It's not limited to just two devices connected "peer to peer" — it can include several personal devices at once.

> ⚠️ PAN isn't specifically about "two computers." It's about **connecting your own personal devices together**, over a very short distance.

**Examples:** Connecting your phone to wireless earbuds via Bluetooth, connecting a phone to a laptop via USB, a smartwatch synced with your phone.

### 🏠 LAN — Local Area Network

A **LAN** connects two or more devices within a **small, limited physical area** — like a single home, office, school, or building.

**Examples:** All the computers and printers connected to Wi-Fi in one office; a home network connecting your laptop, phone, and smart TV.

### 🏙️ MAN — Metropolitan Area Network

A **MAN** connects multiple **LANs together across a larger area — typically a whole city or metropolitan region**. It's bigger than a LAN but smaller than a WAN.

> ⚠️ Also, a MAN isn't just "too many LANs connected" randomly — it specifically refers to networking infrastructure spanning a **city-wide** area, usually built and maintained by an ISP or a city/government body.

**Examples:** A cable TV network across a city; a network connecting all branches of a university across a city; a metropolitan ISP backbone.

### 🌍 WAN — Wide Area Network

A **WAN** connects networks across **large geographical distances** — spanning cities, countries, or even continents.

> ⚠️ A WAN isn't specifically "nations connected together" — it just means the network spans a **very large geographic area**, larger than a single city. It can connect offices of the same company across different cities/countries, or connect entire countries together.

**Examples:** The **Internet** itself is the largest and most well-known WAN; a company's network connecting its branch offices in different countries.

### 📊 Quick Comparison

| Type | Full Form                 | Coverage Area                    | Typical Example           |
| ---- | ------------------------- | -------------------------------- | ------------------------- |
| PAN  | Personal Area Network     | A few meters (around one person) | Phone ⇄ Bluetooth earbuds |
| LAN  | Local Area Network        | One building/home/office         | Office Wi-Fi network      |
| MAN  | Metropolitan Area Network | A city/metro region              | City-wide ISP network     |
| WAN  | Wide Area Network         | Country/continent/global         | The Internet              |

## 🌐 Some Info About Router (or Any Routing Device)

Whenever we connect one device to another, we use either a **wired** or **wireless** connection so they can communicate.

In the case of Wi-Fi, we use a **router** to connect multiple devices together (and to the internet).

Every router runs its own **DHCP (Dynamic Host Configuration Protocol)** service, which automatically **assigns an IP address** to each device that connects to it — you don't have to set it manually.

> 📝 **Note:** It's not exactly a _random_ IP — DHCP assigns the **next available IP address** from a defined range/pool that the router is configured to use, not a fully random number.

A router actually deals with **two different IP addresses**:

| IP type    | What it identifies                                                                                | Assigned by                                                             |
| ---------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **LAN IP** | The router's address _inside_ your local network (and the addresses it hands out to your devices) | The router's own DHCP service                                           |
| **WAN IP** | The router's address as seen from the _internet_ (outside world)                                  | Your ISP (Internet Service Provider), assigned to the router's WAN port |

So devices _inside_ your home talk to the router using its **LAN IP**, while the _internet_ talks to your router using its **WAN IP**.

> 💡 To view your router's LAN IP, check the **gateway IP** on your device's network settings — the "default gateway" _is_ your router's LAN IP, since the router itself is basically a small computer with its own IP address.

## 🔢 IPv4 Address

An **IPv4 address** is **not a protocol** — it's an **address**, used to identify a device on a network so data can be sent to the correct destination.

> **IP = Internet Protocol** (Address)

An IPv4 address is made of **32 bits** (binary digits), split into **4 groups (octets)**, where each group is **1 byte (8 bits)**.

**Example:**

```
Decimal:  192.100.10.1
Binary:   11000000.01100100.00001010.00000001
Combined: 11000000011001000000101000000001   (32 bits total)
```

Each group (byte) can hold a maximum decimal value of **255**, because the largest 8-bit binary number is `11111111`:

```
255.255.255.255
```

Each byte can represent **256 different values** — from `0` to `255` (0 counts as a value too, so it's `0–255` = 256 total possibilities).

### 🔁 Loopback Address (Localhost)

A special block of IP addresses is reserved to always refer to **the current device itself** — this is called the **loopback address**:

```
127.0.0.1  →  127.255.255.255
```

> ⚠️ This entire block (over 16 million addresses) is reserved just for loopback, even though in practice almost everyone only ever uses `127.0.0.1`. Reserving such a huge block for a single purpose is a good example of the kind of **address wastage** that made IPv4's limited 32-bit space (only ~4.3 billion total addresses) run out faster than expected. This is one of the major reasons **IPv6** was designed — it uses **128-bit** addresses, giving a vastly larger address space so we don't need to worry about running out or being this conservative with reserved blocks.

## 🎭 Subnet Mask

A **subnet mask** works _alongside_ an IP address — think of it as a **template/indicator** that tells you which part of the IP address is **fixed (the network)** and which part is allowed to **change (the individual devices/hosts)**.

Like an IPv4 address, a subnet mask is also **32 bits (4 bytes)** long.

> 📝 **Note:** Traditionally, subnet masks are written so each byte is either fully `1`s (`255`) or fully `0`s (`0`) — but technically a subnet mask can split _within_ a byte too (this is where **CIDR notation**, like `/24` or `/16`, comes in — the number after the slash tells you exactly how many bits, not just bytes, are network bits). For simplicity, we'll stick to full-byte examples here since that's the easiest to understand first.

**Meaning of the bits:**

- `1` = **Network ID** portion → this part must stay the **same** for every device in the network.
- `0` = **Host** portion → this part is what **varies** between devices in the same network.

**Example:**

```
Subnet mask:  255.255.0.0
Binary:       11111111.11111111.00000000.00000000
```

This means the **first 2 groups (octets)** of the IP address are the fixed **network ID**, and the **last 2 groups** are free to change for each device (**host ID**):

| Device   | IP Address   | Network part (fixed) | Host part (varies) |
| -------- | ------------ | -------------------- | ------------------ |
| Device 1 | `10.12.10.2` | `10.12`              | `10.2`             |
| Device 2 | `10.12.13.5` | `10.12`              | `13.5`             |
| Device 3 | `10.12.11.2` | `10.12`              | `11.2`             |

All three devices belong to the **same network** (`10.12.x.x`) because their network portion matches — only their host portion differs.

> 💡 In short: the subnet mask tells your device _how much_ of the IP address to treat as the "neighborhood" (network) and how much is the individual "house number" (host) within that neighborhood.

## 🔄 Dynamic and Static IP Address

### ⚡ Dynamic IP Address

A **dynamic IP address** is assigned automatically by a **DHCP server** (usually your router) to any device that connects to the network. The DHCP server picks an available IP address from its configured range/pool and assigns it — automatically avoiding conflicts, since it keeps track of which addresses are already in use.

**Key traits:**

- Assigned automatically — no manual setup needed.
- Can **change over time** (e.g., after the device reconnects, or after the DHCP "lease" — the time period an IP is valid for — expires).
- Very unlikely to conflict, since the DHCP server tracks which addresses are already given out.

**Used for:** Most everyday **private devices** — laptops, phones, smart TVs — since they only need to work inside your own local network and don't need to stay fixed for the outside world to find them.

### 📌 Static IP Address

A **static IP address** is **manually configured** on a device instead of being assigned by DHCP. This might be done when:

- The DHCP server is turned off, or
- You specifically need the device to always keep the **same IP address** (for example, a printer, a home server, or a security camera that other devices need to reliably find at a fixed address).

> ⚠️Static IPs don't inherently conflict _more_ than dynamic ones — the risk only comes from **human error**: since you're typing the address in by hand, you could accidentally pick one that's already in use by another device. This is called an **IP address conflict**, and it usually causes both devices to lose network connectivity until it's fixed.

**Important safeguard:** A properly configured DHCP server **will not** assign an IP address that has already been manually (statically) reserved or is already active on the network — it checks before handing out addresses, which helps avoid conflicts from the DHCP side.

A **static IP** is generally used when a device needs to be **publicly reachable from anywhere on the internet**, like a website's server — since it needs to be found at the **same address every time**, a dynamic (changing) IP would break things, as DNS records pointing to it would go stale.

**Example:** When you visit `google.com`, your device doesn't need to "search" for it randomly — the domain name reliably resolves to Google's server IP address, letting you connect to the same service every time you visit.

> ⚠️ It's not a strict _rule_ that public-facing servers are always static — it's more of a **common practice**, since a dynamic IP would keep changing and break the domain's DNS records. Large services like Google actually use extra techniques on top of this — like **load balancing** and **multiple servers behind the same domain** — so what looks like "one unchanging IP" from the outside is often a whole fleet of servers behind the scenes. But the core idea holds: **a publicly reachable service needs a stable, predictable address, so static IPs (or IPs that behave like static ones) are the standard choice** for that use case.

### 📊 Quick Comparison

| Feature            | Dynamic IP                         | Static IP                                                    |
| ------------------ | ---------------------------------- | ------------------------------------------------------------ |
| Assigned by        | DHCP server (automatic)            | Manually by the user                                         |
| Changes over time? | Yes, can change                    | No, stays fixed                                              |
| Conflict risk      | Very low (DHCP tracks usage)       | Higher, if set incorrectly by hand                           |
| Best for           | Everyday devices (phones, laptops) | Devices needing a fixed address (servers, printers, cameras) |

## 🌐 Private and Public IP Addresses

### 🌍 Public IP Address

A **public IP address** is an address that is **globally unique and reachable from anywhere on the internet**.

> ⚠️ Public IPs are **not always static**. Most home internet connections actually get a **dynamic public IP** from the ISP (it can change when your router restarts or after some time). Only specific use-cases — like hosting a website, a company server, or something that needs a permanently reachable address — typically pay extra for a **static public IP**. So "static" is common for servers, but it's not a rule that _all_ public IPs are static.

Because IPv4 only has a limited number of addresses (about **4.3 billion total**), public IPs are a **scarce resource** — ISPs can't hand out unlimited unique public addresses to every device in the world. This scarcity is exactly why the **Public vs Private IP** system was created: to let many devices share a much smaller number of public addresses.

> ⚠️ A server doesn't "reject" a private IP exactly — the real reason is that **private IP addresses simply aren't routable on the public internet**. Internet routers are configured to **drop/ignore** any traffic addressed to a private IP range, since that range only has meaning _inside_ a local network. So a server on the internet has no way to even reach a private IP directly in the first place — it's not a rejection, it's more like the private address doesn't "exist" from the internet's point of view.

#### 📡 CG-NAT (Carrier-Grade NAT)

Because public IPv4 addresses are so limited, many ISPs use **CG-NAT (Carrier-Grade Network Address Translation)**. Here's how it works:

- Normally, your home router gets **one public IP** from the ISP on its WAN port, and it shares that single public IP among all your home devices using NAT.
- With **CG-NAT**, the ISP goes a step further: even your router's "WAN IP" is actually just another **private IP**, assigned by the ISP's own equipment. The ISP then shares **one real public IP address among many different customers/homes at once**, translating traffic at their end.

This lets an ISP serve far more customers than they have public IPv4 addresses for — at the cost of making things like port forwarding or hosting a server from home much harder, since you don't have a true dedicated public IP anymore.

**A simple way to picture this (try it yourself):**

Every router has two sides — a **WAN port** (where it receives internet/upstream connection) and **LAN ports** (where it hands out local IPs to your devices).

Now imagine you take a second router, and instead of plugging its WAN port into an ISP modem, you plug it into a **LAN port of your first (main) router**:

- The **main router** treats the second router just like any other device — and hands it a normal **private LAN IP** (via DHCP), the same way it would for your laptop or phone.
- But the **second router** doesn't know or care that it just received a private IP — it just sees _something_ on its WAN port and treats that as its own "internet connection." Any device connected to the second router's LAN ports gets a private IP **from the second router**, and their traffic gets NAT'd once by the second router, and then NAT'd _again_ by the main router before it actually reaches the real internet.

This is called **Double NAT**, and it's exactly the same underlying idea as **CG-NAT**: the "WAN IP" a router sees isn't guaranteed to be a real public internet address — it might just be a private IP handed out by _another_ router (or by the ISP's own equipment, in CG-NAT's case) one level further upstream. The device doing the NAT has no way of knowing, on its own, whether its WAN IP is the "final" public IP or just another private IP one hop away from the real internet.

### 🏠 Private IP Address

A **private IP address** is used only **within a local network** (like your home or office) — it can't be reached directly from the public internet.

#### 🔁 NAT (Network Address Translation)

**NAT** is the process a router uses to translate between private and public IP addresses — allowing many devices with private IPs to share **one public IP** when accessing the internet. When a private device sends a request out to the internet, the router swaps the private IP (and port) for its own public IP (and a unique port), and reverses this translation for the response coming back — this is how multiple devices can browse the internet "at once" using just one public IP address.

Private IP addresses are handed out to local devices by a router (or another local routing device), typically through **DHCP**.

> ⚠️ Private IPs don't just "start with 192, 172, 10" loosely — they come from three specific reserved ranges, officially defined by the **IETF** in **RFC 1918**:

| Range                             | CIDR             |
| --------------------------------- | ---------------- |
| `10.0.0.0` – `10.255.255.255`     | `10.0.0.0/8`     |
| `172.16.0.0` – `172.31.255.255`   | `172.16.0.0/12`  |
| `192.168.0.0` – `192.168.255.255` | `192.168.0.0/16` |

> 📝 Note the `172` range specifically: only `172.16.x.x` through `172.31.x.x` is private — not the _entire_ `172.x.x.x` range.

Private IPs are used only for communication **within** the local network — to reach the outside world (like accessing a website), the request has to go through **NAT**, converting it to the router's public IP first.

#### 🎯 Special Reserved Addresses

- **`0.0.0.0` (the "wildcard" address):** This is a special address used when _starting_ a server, meaning **"listen on every available network interface on this device"** — not a specific address you connect _to_. So if a server is bound to `0.0.0.0`, it becomes reachable through **any** of the device's own IP addresses (e.g., its LAN IP, localhost, etc.), rather than just one specific one.

  > ⚠️ `0.0.0.0` isn't "the IP assigned by the router" — it's a special instruction meaning "all interfaces," which happens to include whatever IP the router _did_ assign you.

- **Loopback (`127.0.0.1` – `127.255.255.255`):** As covered earlier, this entire block always refers back to **the current device itself**. While the whole range is technically reserved, in practice almost everyone only ever uses `127.0.0.1`.

## ⚖️ Benefits and Drawbacks of Public vs Private IP

### 🌍 Public IP

**Benefits:**

- A server hosted on a public IP is accessible from **anywhere on the internet**.
- (For comparison: a server hosted on a _private_ IP is only reachable by devices on the **same local network**, i.e., connected to the same router.)

**Drawbacks:**

- Consumes IPv4 addresses, which are a **limited/scarce resource**.
- Greater **security risk** — since the server is directly exposed to the entire internet, it's a bigger target for attacks (unauthorized access attempts, scanning, hacking, etc.).

### 🏠 Private IP

**Benefits:**

- Doesn't consume the global (public) IPv4 pool at all — private ranges are **reserved specifically for local use** (as defined by the IETF in RFC 1918) and can be **reused simultaneously across millions of different networks** without any conflict, since they're never exposed to the internet directly.
- Devices using only a private IP are **not directly reachable from the internet**, which significantly reduces (though doesn't fully eliminate) their exposure to external attacks — this is one reason home devices behind a router are relatively safer by default.

**Drawbacks:**

- A server hosted only on a private IP **cannot be accessed directly from the internet** — it's limited to the local network unless something like **port forwarding** or a **VPN** is set up to bridge that gap.

### 🔑 Key Takeaway

- **Private IPs can safely repeat/overlap across different networks** — your home router's `192.168.1.1` and your neighbor's `192.168.1.1` can coexist without any conflict, because private IPs are **never routed across the public internet**; they only ever matter within their own local network.
- **Public IPs must always be globally unique** — no two devices on the internet can have the same public IP at the same time, since that address has to be resolvable from anywhere in the world.

> ⚠️ The reason private IPs can be reused safely isn't because "they change frequently" — it's because they're **confined to their own local network** and never travel across the public internet. Similarly, public IPs aren't unique because they "don't change" — dynamic public IPs _do_ change sometimes, but at any given moment, no two devices anywhere on the internet can hold the same public IP simultaneously.

## 🌐 Info About IPv6

An **IPv6 address** is much bigger than IPv4 — it holds **128 bits** total, split into **8 groups**, where each group is **16 bits** (written as 4 hexadecimal digits).

> ⚠️ "8×2 binary in a group" was a bit unclear — to be precise: **8 groups × 16 bits each = 128 bits total**. Each group is shown as **4 hex digits** (since 1 hex digit = 4 bits, and 4 × 4 = 16 bits).

### ✂️ The Way IPv6 Is Written (Shortening Rules)

**Rule 1 — Drop leading zeros within each group:**

```
Full:      2409:40e4:1223:774c:00bc:dbc3:003b:27fd
Shortened: 2409:40e4:1223:774c:bc:dbc3:3b:27fd
```

The leading `00` in `00bc` and `003b` is dropped — you keep only the meaningful digits of each group.

**Rule 2 — Replace one run of consecutive all-zero groups with `::`:**

```
Full:      2409:40e4:1223:774c:0000:0000:003b:27fd
Shortened: 2409:40e4:1223:774c::3b:27fd
```

**Rule 3 — `::` can only be used ONCE in an address:**

If there are **two separate** runs of zero-groups in the same address, only the **longest** run gets replaced by `::` — any other lone zero group is written as a plain `0`, not compressed further. This is because using `::` more than once would make it impossible to know exactly how many zero-groups belong in each gap.

```
Full:      2409:0000:0000:774c:0000:003b:0000:27fd
Shortened: 2409::774c:0:3b:0:27fd
```

Here, the first run (`0000:0000`) is the longest, so it becomes `::`. The two other lone `0000` groups later in the address are simply written as `0` each, not compressed.

### 🔁 Loopback Address

IPv6 has only **one loopback address**:

```
Full:      0000:0000:0000:0000:0000:0000:0000:0001
Shortened: ::1
```

### 🏷️ The 3 Types of IPv6 Addresses a Device Can Have

A router (or the device's own auto-configuration) can assign a device **three different kinds** of IPv6 addresses, each for a different purpose:

#### 1️⃣ Global Unicast Address (the "main" address)

```
2409:40e4:1223:774c:5a96:98f9:54a0:7d7a
```

This is the device's stable, **globally routable public address** — this is the one you'd use to run a server that needs to be reachable from anywhere on the internet.

#### 2️⃣ Temporary Address (Privacy Address)

```
2409:40e4:1223:774c:bc32:dbc3:143b:27fd
```

This address is used as the **source address when your device initiates outgoing connections** (like browsing a website) — not for running a server. It changes periodically (typically every so often, like once a day) specifically to make it **harder for outside websites/servers to track your device** over time using a fixed, unchanging address. This is officially called a **Temporary/Privacy Address** (defined in RFC 4941).

#### 3️⃣ Link-Local Address

```
fe80::575c:c96e:8406:fc43%5
```

This address only works for communication with **other devices on the same local network segment (the same "link")** — it's never sent out to the wider internet.

> 📝 **Note:** It's similar to loopback in that it's confined and not internet-routable, but it's **not the same thing** — loopback (`::1`) only ever refers back to your _own_ device, while a link-local address lets your device talk to _other devices on the same local link_ (useful for things like local device discovery), not just itself.

> 💡 The `%5` at the end is called the **zone ID (or scope ID)** — since link-local addresses aren't globally unique, this tells the operating system exactly _which network interface_ (e.g., Wi-Fi vs Ethernet) the address applies to.

### 🔌 Compatibility

If a system only supports **IPv6** and the other system it's trying to reach only supports **IPv4** (or vice versa), they generally **cannot connect directly** — the two protocols aren't compatible on their own. (In practice, techniques like **dual-stack** setups, or translation mechanisms like **NAT64/DNS64**, are used to bridge this gap where needed.)

### 🌐 Accessing a Server via IPv6

Since IPv6 addresses already use colons (`:`) — the same character normally used to separate an address from a port number — you must wrap the address in **square brackets** to avoid ambiguity:

```
[ipv6-address]:portNumber
```

**Example:**

```
[2409:40e4:1223:774c:5a96:98f9:54a0:7d7a]:8080
```

## 🔀 Port Forwarding

**Port forwarding** becomes necessary when you have **multiple servers** running on **different devices** inside the same local network, but only **one public IP address** (on the router) facing the internet.

Since every device behind the router shares that single public IP (via NAT), the router needs a way to know: _"when a request comes in on a specific port, which internal device/server should it actually go to?"_ That's exactly what port forwarding does — it creates a **rule mapping an incoming port on the router to a specific private IP address (and port) on the local network**.

**Example:**

| Incoming request to router | Forwarded to (internal device) |
| -------------------------- | ------------------------------ |
| Port `8080`                | `192.168.1.10:80` (Server A)   |
| Port `2222`                | `192.168.1.15:22` (Server B)   |

Without port forwarding, the router wouldn't know which internal device an incoming request is meant for, since **all internal devices share the same public IP** from the outside world's perspective.

### 🔢 Default Ports (Why You Don't Always Need to Type One)

When you visit a server using just its IP address (or domain), and you don't type a port number, your browser automatically assumes a **default port** based on the protocol:

| Protocol | Default Port |
| -------- | ------------ |
| HTTP     | `80`         |
| HTTPS    | `443`        |

> ⚠️ port `80` (HTTP) — worth also knowing that **HTTPS** (the secure, encrypted version most modern websites use) defaults to port **`443`**, not `80`. So:
>
> - `http://192.168.1.10` → automatically means `192.168.1.10:80`
> - `https://192.168.1.10` → automatically means `192.168.1.10:443`

If a server is running on **any other port** (like `8080`), you **do** need to type it explicitly:

```
http://192.168.1.10:8080
```
