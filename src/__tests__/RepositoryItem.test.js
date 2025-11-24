import { render } from "@testing-library/react-native";
import RepositoryItem from "../components/RepositoryItem";

describe("RepositoryItem", () => {
  it("renders repository info correctly", () => {
    const repository = {
      id: "repo1",
      fullName: "user/repo",
      description: "A test repository",
      language: "TypeScript",
      forksCount: 1234,
      stargazersCount: 5678,
      ratingAverage: 88,
      reviewCount: 42,
      ownerAvatarUrl: "https://example.com/avatar.png",
    };

    const { getByText } = render(<RepositoryItem repository={repository} />);

    expect(getByText("user/repo")).toBeTruthy();
    expect(getByText("A test repository")).toBeTruthy();
    expect(getByText("TypeScript")).toBeTruthy();
    expect(getByText("1.2k")).toBeTruthy(); // formatted forksCount
    expect(getByText("5.7k")).toBeTruthy(); // formatted stargazersCount
    expect(getByText("88")).toBeTruthy(); // ratingAverage
    expect(getByText("42")).toBeTruthy(); // reviewCount
  });
});
