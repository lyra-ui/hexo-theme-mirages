import { useAppStore } from '@/store/app'
import router from '.'

router.beforeEach(async (from, to, next) => {
  const appStore = useAppStore()
  appStore.startLoading()
  next()
})

router.afterEach(async () => {
  const appStore = useAppStore()
  appStore.endLoading()
})
