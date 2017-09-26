import { createError } from "@/utilities"

export const unknownError = createError(`UnknownError`, {
  message: `An unknown error has occured`
})

export const missingArgument = argName =>
  createError(`MissingArgument`, {
    message: `Missing Argument: "${argName}" cannot be empty.`
  })
