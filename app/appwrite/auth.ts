import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";

const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(OAuthProvider.Google);
  } catch (error) {
    console.log("Error login with Google: ", error);
  }
};

const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log("Error during logout: ", error);
  }
};

const getUser = async () => {
  try {
    const user = await account.get();
    if (!user) return redirect("/sign-in");

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ]
    );

    return documents.length > 0 ? documents[0] : redirect("/sign-in");
  } catch (error) {
    console.log("Error getting user: ", error);
    return null;
  }
};

const getGooglePicture = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch Google profile picture");

    const { photos } = await response.json();
    return photos?.[0]?.url || null;
  } catch (error) {
    console.log("Error fetching Google picture: ", error);
    return null;
  }
};

const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not found");

    const { providerAccessToken } = (await account.getSession("current")) || {};
    const profilePicture = providerAccessToken
      ? await getGooglePicture(providerAccessToken)
      : null;

    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: profilePicture,
        joinedAt: new Date().toISOString(),
      }
    );
    if (!createdUser.$id) redirect("/sign-in");
  } catch (error) {
    console.log("Error storing user data: ", error);
  }
};

const getExistingUser = async (id: string) => {
  try {
    const { documents, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", id)]
    );
    return total > 0 ? documents[0] : null;
  } catch (error) {
    console.log("Error getting existing user: ", error);
  }
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string = ""
) => {
  try {
    const res = await account.create(ID.unique(), email, password, name);
    return res;
  } catch (error) {
    console.log("Error while creating new user: ", error);
  }
};

const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await account.createEmailPasswordSession(email, password);
    return res;
  } catch (error) {
    console.log("Error while log in in: ", error);
  }
};

const getAllUsers = async (limit: number, offset: number) => {
  try {
    const { documents: users, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.limit(limit), Query.offset(offset)]
    );

    if (total === 0) return { users: [], total };

    return { users, total };
  } catch (error) {
    console.log("Error fetching all users: ", error);
    return { users: [], total: 0 };
  }
};

export {
  getUser,
  logoutUser,
  getAllUsers,
  storeUserData,
  loginWithGoogle,
  getExistingUser,
  getGooglePicture,
  loginUserWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
