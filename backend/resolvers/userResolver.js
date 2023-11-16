import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const UserResolvers = {
  Query: {
    findUsers: async () => {
      const users = await User.find()
      return users
    },

    findOneUser: async (_, args) => {
      try {
        const user = await User.findOne({ _id: args.id })
        if (!user) {
          throw new Error("User not found")
        }
        return user
      } catch (error) {
        console.error(error)
        throw new Error("Failed to find user")
      }
    },
  },

  Mutation: {
    createUser: async (_, { createUserInput }) => {
      try {
        const { name, email, password } = createUserInput
        const existingUser = await User.findOne({ email })

        if (existingUser) {
          throw new Error("User already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = new User({ name, email, password: hashPassword })
        await user.save()
        return user
      } catch (error) {
        if (error.message === "User already exists") {
          throw error
        } else {
          throw new Error("Failed to create new user")
        }
      }
    },

    loginUser: async (_, { createLoginInput }) => {
      try {
        const { email, password } = createLoginInput
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
          throw new Error("user not yet register")
        }

        const comparePassword = await bcrypt.compare(
          password,
          existingUser.password
        )

        if (!comparePassword) {
          throw new Error("invalid credential")
        } else {
          return existingUser
        }
      } catch (error) {
        if (error.message) {
          throw error
        } else {
          throw new Error("Failed while trying to login")
        }
      }
    },
  },
}
