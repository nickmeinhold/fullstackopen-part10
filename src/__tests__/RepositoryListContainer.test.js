import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryListContainer", () => {
  it("renders repository info correctly", () => {
    const repositories = {
      edges: [
        {
          node: {
            id: "repo1",
            fullName: "user/repo1",
            description: "First repo",
            language: "TypeScript",
            forksCount: 1234,
            stargazersCount: 5678,
            ratingAverage: 88,
            reviewCount: 42,
            ownerAvatarUrl: "https://example.com/avatar1.png",
          },
        },
        {
          node: {
            id: "repo2",
            fullName: "user/repo2",
            description: "Second repo",
            language: "JavaScript",
            forksCount: 432,
            stargazersCount: 876,
            ratingAverage: 95,
            reviewCount: 12,
            ownerAvatarUrl: "https://example.com/avatar2.png",
          },
        },
      ],
    };

    const { getByText, getByTestId } = render(
      <RepositoryListContainer repositories={repositories} />
    );

    // First repo
    const repo1 = getByTestId("repositoryItem-repo1");
    expect(getByText("user/repo1")).toBeTruthy();
    expect(getByText("First repo")).toBeTruthy();
    expect(getByText("TypeScript")).toBeTruthy();
    expect(getByText("1.2k")).toBeTruthy(); // formatted forksCount
    expect(getByText("5.7k")).toBeTruthy(); // formatted stargazersCount
    expect(getByText("88")).toBeTruthy(); // ratingAverage
    expect(getByText("42")).toBeTruthy(); // reviewCount

    // Second repo
    const repo2 = getByTestId("repositoryItem-repo2");
    expect(getByText("user/repo2")).toBeTruthy();
    expect(getByText("Second repo")).toBeTruthy();
    expect(getByText("JavaScript")).toBeTruthy();
    expect(getByText("432")).toBeTruthy(); // forksCount
    expect(getByText("876")).toBeTruthy(); // stargazersCount
    expect(getByText("95")).toBeTruthy(); // ratingAverage
    expect(getByText("12")).toBeTruthy(); // reviewCount
  });
});
