import { getPathname } from "./index";

it("getPathname returns null for wrong paths", () => {
  expect.assertions(2);
  expect(getPathname("abcd")).toEqual(null);
});
