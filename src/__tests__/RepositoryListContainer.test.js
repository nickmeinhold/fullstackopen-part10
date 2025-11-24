import { render, within } from "@testing-library/react-native";
import { NativeRouter } from "react-router-native";
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryListContainer", () => {
  it("renders repository info correctly", async () => {
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

    const { getByTestId } = render(
      <NativeRouter>
        <RepositoryListContainer repositories={repositories} />
      </NativeRouter>
    );

    // First repo
    const repo1 = getByTestId("repositoryItem-repo1");
    expect(within(repo1).getByText("user/repo1")).toBeTruthy();
    expect(within(repo1).getByText("First repo")).toBeTruthy();
    expect(within(repo1).getByText("TypeScript")).toBeTruthy();
    expect(within(repo1).getByText("1.2k")).toBeTruthy(); // formatted forksCount
    expect(within(repo1).getByText("5.7k")).toBeTruthy(); // formatted stargazersCount
    expect(within(repo1).getByText("88")).toBeTruthy(); // ratingAverage
    expect(within(repo1).getByText("42")).toBeTruthy(); // reviewCount
    expect(getByTestId("githubButton-repo1")).toBeTruthy();

    // Second repo
    const repo2 = getByTestId("repositoryItem-repo2");
    expect(within(repo2).getByText("user/repo2")).toBeTruthy();
    expect(within(repo2).getByText("Second repo")).toBeTruthy();
    expect(within(repo2).getByText("JavaScript")).toBeTruthy();
    expect(within(repo2).getByText("432")).toBeTruthy(); // forksCount
    expect(within(repo2).getByText("876")).toBeTruthy(); // stargazersCount
    expect(within(repo2).getByText("95")).toBeTruthy(); // ratingAverage
    expect(within(repo2).getByText("12")).toBeTruthy(); // reviewCount
    expect(getByTestId("githubButton-repo2")).toBeTruthy();
  });
});
