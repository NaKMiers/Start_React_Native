import { VideoFormType } from '@/app/(tabs)/create'
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite'

// appwrite config
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.deewas.start-react-native',
  projectId: '677aa7620032d2aabfeb',
  databaseId: '677aa97500234182508b',
  storageId: '677aabc20003cc080e97',
  userCollectionId: '677be031002f0ffe50d6',
  videoCollectionId: '677be26e002090e22b7c',
  userFavorites: '677d3833003590a72640',
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
    return null
  }
}

// get current user
export const getCurrentUser = async () => {
  try {
    // get current account to get current user
    const curAccount = await getAccount()

    // get current account failed
    if (!curAccount) return null

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

// get all posts
export const getAllPosts = async (postIds: string[] = []) => {
  try {
    let posts
    if (postIds.length > 0) {
      posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
        Query.contains('$id', postIds),
      ])
    } else {
      posts = await databases.listDocuments(config.databaseId, config.videoCollectionId)
    }

    return posts.documents
  } catch (err: any) {
    throw new Error(err)
  }
}

// get latest posts
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(7),
    ])

    return posts.documents
  } catch (err: any) {
    throw new Error(err)
  }
}

// search posts
export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.contains('title', query),
      Query.contains('prompt', query),
    ])

    return posts.documents
  } catch (err: any) {
    throw new Error(err)
  }
}

// get user posts
export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.equal('creator', userId),
      Query.orderDesc('$createdAt'),
    ])

    return posts.documents
  } catch (err: any) {
    throw new Error(err)
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

// get file preview
export const getFileView = async (fileId: string, type: 'video' | 'image') => {
  let fileUrl

  try {
    fileUrl = storage.getFileView(config.storageId, fileId)

    if (!fileUrl) throw Error('Failed to get file preview')

    return fileUrl
  } catch (err: any) {
    throw new Error(err)
  }
}

// upload file
export const uploadFile = async (file: any, type: 'image' | 'video') => {
  // file not found
  if (!file) return

  const extension = file.uri?.split('.').pop()

  const fileBlob = {
    uri: file.uri,
    name: file.fileName || `file-${new Date().getTime()}.${extension}`,
    type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'video/mp4'),
    size: file.fileSize || 0,
  }

  try {
    const uploadedFile = await storage.createFile(config.storageId, ID.unique(), fileBlob)
    const fileUrl = await getFileView(uploadedFile.$id, type)
    return fileUrl
  } catch (err: any) {
    throw new Error(err)
  }
}

// create video
export const createVideo = async (form: VideoFormType) => {
  try {
    const [thumbnail, video] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])

    await databases.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
      title: form.title,
      prompt: form.prompt,
      thumbnail,
      video,
      creator: form.creator,
    })
  } catch (err: any) {
    throw new Error(err)
  }
}

// delete video
export const deleteVideo = async (videoId: string) => {
  try {
    // get user for checking permission
    const user = await getCurrentUser()

    // user not found
    if (!user) throw Error('User not found')

    // get video for checking creator
    const video = await databases.getDocument(config.databaseId, config.videoCollectionId, videoId)

    // video not found
    if (!video) throw Error('Video not found')

    // check if user is not the creator
    if (user.$id !== video.creator.$id) throw Error('Only creator can delete this video')

    const thumbnailFileId = video.thumbnail.split('/')[8]
    const videoFileId = video.video.split('/')[8]

    // delete files from storage
    await Promise.all([
      storage.deleteFile(config.storageId, thumbnailFileId),
      storage.deleteFile(config.storageId, videoFileId),
    ])

    // delete video from database
    await databases.deleteDocument(config.databaseId, config.videoCollectionId, videoId)
  } catch (err: any) {
    throw new Error(err)
  }
}

// get user's favorites
export const getUserFavorites = async (userId: string) => {
  try {
    // get user favorites from database
    const favorites = await databases.listDocuments(config.databaseId, config.userFavorites, [
      Query.equal('userId', userId),
      Query.orderDesc('$createdAt'),
    ])

    return favorites.documents
  } catch (err: any) {
    throw new Error(err)
  }
}

// add post to favorites
export const addFavorites = async (userId: string, videoId: string) => {
  try {
    // add post to user's favorites
    const newFavoritePost = await databases.createDocument(
      config.databaseId,
      config.userFavorites,
      ID.unique(),
      {
        userId,
        videoId,
      }
    )

    return newFavoritePost
  } catch (err: any) {
    throw new Error(err)
  }
}

// remove from favorites
export const removeFavorites = async (id: string) => {
  try {
    // remove video from user favorites
    await databases.deleteDocument(config.databaseId, config.userFavorites, id)
  } catch (err: any) {
    throw new Error(err)
  }
}
