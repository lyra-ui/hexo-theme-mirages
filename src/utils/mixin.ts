import { useRouter } from 'vue-router'
import { isExternal } from '.'

export default function (): any {
  const router = useRouter()
  const pushPage = (path: string) => {
    if (isExternal(path)) {
      window.open(path)
    } else {
      router.push({
        path: path
      })
    }
  }
  return {
    pushPage
  }
}
