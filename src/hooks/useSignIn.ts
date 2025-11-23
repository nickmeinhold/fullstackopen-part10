import { MutationResult, useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

type SignInFunction = (credentials: {
  username: string;
  password: string;
}) => Promise<string | undefined>;

/**
 * useSignIn hook
 * Usage: const [signIn, { data, loading, error }] = useSignIn();
 * signIn({ username, password })
 */
const useSignIn = (): [SignInFunction, MutationResult<any>] => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });
    const accessToken = data?.authenticate?.accessToken;
    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      client.resetStore();
    }
    return accessToken;
  };

  return [signIn, result];
};

export default useSignIn;
