import {fetchAllocations} from "./AllocationsCard";

describe("Fetch Allocations", () => {
  it("should return no allocations if input is not set", async () => {
    expect(await fetchAllocations("")).toEqual([]);
  });
});
