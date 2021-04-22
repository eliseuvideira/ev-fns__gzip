import fs from "fs";
import path from "path";
import { gzip } from "../src";

describe("gzip", () => {
  it("gzips a file", async () => {
    expect.assertions(3);

    const content = "file content".repeat(5);

    const filename = path.join(__dirname, Date.now().toString());
    const gzipFilename = filename + ".gz";

    await fs.promises.writeFile(filename, content);
    const fileStats = await fs.promises.stat(filename);

    await gzip(filename, gzipFilename);

    try {
      const gzipStats = await fs.promises.stat(gzipFilename);

      const statError = jest.fn();
      let error: any = null;

      try {
        await fs.promises.stat(filename);
      } catch (err) {
        error = err;
        statError(err);
      }

      expect(statError).toHaveBeenCalled();
      expect(statError).toHaveBeenLastCalledWith(error);
      expect(gzipStats.size).toBeLessThan(fileStats.size);
    } finally {
      await fs.promises.unlink(gzipFilename);
    }
  });

  it("gzips as .gz if not output filename", async () => {
    expect.assertions(2);

    const content = `${Date.now()}`.repeat(5);

    const filename = path.join(__dirname, Date.now().toString());

    await fs.promises.writeFile(filename, content);

    await gzip(filename);

    try {
      try {
        const stat = await fs.promises.stat(filename + ".gz");
        expect(stat.isFile()).toBe(true);
        expect(stat.size).toBeGreaterThan(0);
      } catch (err) {
        fail("gzip file doesn't exists");
      }
    } finally {
      await fs.promises.unlink(filename + ".gz");
    }
  });
});
