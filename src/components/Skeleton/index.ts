import ObSkeleton from './Skeleton.vue'
import ObSkeletonTheme from './SkeletonTheme.vue'
import { App } from 'vue'

export const registerObSkeleton = (app: App): void => {
  app.component(ObSkeleton.name, ObSkeleton)
  app.component(ObSkeletonTheme.name, ObSkeletonTheme)
}
