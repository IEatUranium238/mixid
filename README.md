![](https://img.shields.io/npm/l/%40ieaturanium238%2Fmixid) ![](https://img.shields.io/npm/v/%40ieaturanium238%2Fmixid) ![](https://img.shields.io/npm/unpacked-size/%40ieaturanium238%2Fmixid)
# Mixid
**Mixid** (Mix + ID) - Is a simple to use, lightweight Javascript/Typescript library for generating ID strings 
with blended in data and optionally encrypting it.
## Features
- Simple to use
- Lightweight
- Easy to configure
- Optional SHA-256 encryption via Web Crypto API
## Installation
```Bash
npm i @ieaturanium238/mixid
```
*or other npm based package managers*
## Usage
```Typescript
import generateMixid from "@ieaturanium238/mixid";
const id = await generateMixid(["product", "apple"]);
console.log(id);
```

`generateMixid(data, settings?)` - Generate a Mixid string
- data - Data to input into blend
- settings - Settings for Mixid (Optional)
## Settings
### randomBlockSize
- Info: Defines size of random character blocks
- Type: number
- Default: 16
### customBlockFiller
- Info: Defines custom characters for use in blocks
- Note: This overrides noSpecialCharsInBlockFiller!
- Type: string
### noSpecialCharsInBlockFiller
- Info: Removes special characters (such as !,@,#,$ and ect.) from generation, usefull for URLs
- Type: boolean
- Default: false
### encrypt
- Info: Encrypts output
- Type: boolean
- Default: true
## Notes
- Runtime must support Web Crypto API, TextEncoder and crypto.subtle (browser or modern Node.js)
