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
install --wsl
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
