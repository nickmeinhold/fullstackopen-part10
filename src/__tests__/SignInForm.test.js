import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { SignInForm } from "../components/Signin";

describe("SignInForm", () => {
  it("calls onSubmit with correct arguments when filled and submitted", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SignInForm onSubmit={onSubmit} />
    );

    fireEvent.changeText(getByPlaceholderText("Username"), "myuser");
    fireEvent.changeText(getByPlaceholderText("Password"), "mypassword");
    fireEvent.press(getByText("Sign in"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "myuser",
        password: "mypassword",
      });
    });
  });
});
