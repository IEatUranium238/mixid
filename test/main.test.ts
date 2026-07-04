import { describe, it, expect, vi, beforeEach } from "vitest";
import generateMixid from "../src/mixid.ts";

function mockMathRandom(values: number[]) {
  let i = 0;
  vi.spyOn(Math, "random").mockImplementation(() => {
    const val = values[i % values.length];
    i++;
    return val;
  });
}

function mockCryptoDigest() {
  const fakeDigest = new Uint8Array(32).fill(1);

  vi.stubGlobal("crypto", {
    subtle: {
      digest: vi.fn().mockResolvedValue(fakeDigest),
    },
  });
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("generateMixid", () => {
  it("errors if data array is empty", async () => {
    await expect(generateMixid([])).rejects.toThrow(
      "Mixid - supply atleast 1 peice of data to blend!",
    );
  });

  it("returns encrypted hex string by default", async () => {
    mockCryptoDigest();

    const result = await generateMixid(["abc"]);

    expect(result).toHaveLength(64);
    expect(result).toMatch(/^[0-9a-f]+$/);
  });

  it("returns raw string when encrypt is false", async () => {
    mockMathRandom([0]);

    const result = await generateMixid(["A"], {
      encrypt: false,
      randomBlockSize: 2,
      customBlockFiller: "ABC",
    });

    expect(result).toBe("AAA");
  });

  it("respects noSpecialCharsInBlockFiller & randomBlockSize", async () => {
    mockMathRandom([0]);

    const result = await generateMixid(["X"], {
      encrypt: false,
      randomBlockSize: 3,
      noSpecialCharsInBlockFiller: true,
    });
    console.log(result);

    expect(result.length).toBe(4);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });
});
