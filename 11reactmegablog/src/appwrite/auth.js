import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl || "")
      .setProject(conf.appwriteProjectId || "");

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      return this.login({ email, password });
    } catch (error) {
      console.error("Appwrite signup failed:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.error("Appwrite login failed:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Appwrite logout failed:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
