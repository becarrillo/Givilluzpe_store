import AdminAuth from "./Auth";

// eslint-disable-next-line no-undef
test("This render should throw state without repeat data", () => {
  // eslint-disable-next-line no-undef
  expect(AdminAuth["testDetail"]).toBeCalledTimes(1);
});