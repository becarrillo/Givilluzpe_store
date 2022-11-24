/* eslint-disable no-undef */
//import { render, screen } from "@testing-library/react";
//import App from "./App";
//import api from "./firebase";
import { result } from "./__mocks__/_request";
// eslint-disable-next-line no-undef
/*test("renders learn react link", () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});
*/


// eslint-disable-next-line no-undef
test("renders should throw state without repeat data", async () => {

  expect.assertions(1);

  const data = await result().then(data => data);
  
  return expect(data).toHaveBeenCalledTimes(1);
  
})