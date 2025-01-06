import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite'

// appwrite config
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.deewas.start-react-native',
  projectId: '677aa7620032d2aabfeb',
  databaseId: '677aa97500234182508b',
  userCollectionId: '677aa9bc001f6aedb5f0',
  videoCollectionId: '677aa9f800015167999d',
  storageId: '677aabc20003cc080e97',
}

// create client instance for using appwrite
const client: Client = new Client()
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)

const account: Account = new Account(client)
const storage = new Storage(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

// create user
export const createUser = async (username: string, email: string, password: string) => {
  try {
    // create new account
    const newAccount = await account.create(ID.unique(), email, password, username)

    // create account failed
    if (!newAccount) throw Error('Failed to create user')

    // create avatar
    const avatarUrl = avatars.getInitials(username)

    // sign in to new account
    await signIn(email, password)

    // create new user to database - user collection
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    )

    return newUser
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

// sign in
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

// get account
export const getAccount = async () => {
  try {
    const currentAccount = await account.get()
    return currentAccount
  } catch (err: any) {
    throw new Error(err)
  }
}

// get current user
export const getCurrentUser = async () => {
  try {
    // get current account to get current user
    const curAccount = await getAccount()

    console.log('curAccount', curAccount)

    // get current account failed
    if (!curAccount) throw Error

    // get current user from current account id
    const curUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal('accountId', curAccount.$id),
    ])

    // get current user failed
    if (!curUser) throw Error

    // return current user
    return curUser.documents[0]
  } catch (err: any) {
    console.error(err)
    return null
  }
}

// sign out
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (err: any) {
    throw new Error(err)
  }
}
