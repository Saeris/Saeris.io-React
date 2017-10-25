import loadable from "react-loadable"
import { Main } from "@components/structural"

export default function assemble(opts) {
  return loadable(
    Object.assign(
      {
        loading: ({ error, pastDelay }) => {
          if (error) return <Main id={`Error`} />
          if (pastDelay) return <Main id={`Loading`} />
          return null
        },
        delay: 200
      },
      opts
    )
  )
}
