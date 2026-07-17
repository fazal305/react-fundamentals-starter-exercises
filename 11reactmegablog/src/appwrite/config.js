import { Client, ID, Query, Storage, TablesDB } from "appwrite";
import conf from "../conf/conf";

class BlogService {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl || "")
      .setProject(conf.appwriteProjectId || "");

    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ slug, title, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.error("Appwrite create post failed:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.error("Appwrite update post failed:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });

      return true;
    } catch (error) {
      console.error("Appwrite delete post failed:", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.error("Appwrite get post failed:", error);
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries,
      });
    } catch (error) {
      console.error("Appwrite list posts failed:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.error("Appwrite upload failed:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });

      return true;
    } catch (error) {
      console.error("Appwrite delete file failed:", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: conf.appwriteBucketId,
      fileId,
    });
  }
}

const blogService = new BlogService();

export { Query };
export default blogService;
