# @ev-fns/gzip

Async gzip file

- gzip `(source: string, destination = source + ".gz") => Promise<void>`

## Install

```sh
yarn add @ev-fns/gzip
```

## Usage

```js
const { gzip } = require("@ev-fns/gzip");

const filename = "./backup_file";

gzip(filename).then(() => {
  console.log("gzip finished");
});
```
