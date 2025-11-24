import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  namespace: string;

  constructor(namespace: string = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    return await AsyncStorage.getItem("accessToken");
  }

  async setAccessToken(accessToken: string) {
    await AsyncStorage.setItem("accessToken", accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem("accessToken");
  }
}

export default AuthStorage;
