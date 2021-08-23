import request from './request'
import { Page } from '@/models/Article.class'
import { HexoConfig } from '@/models/HexoConfig.class'
import { Categories, Post, PostList, SpecificPostsList, Tags } from '@/models/Article.class'
import { AxiosResponse } from 'axios'

type Response = Promise<AxiosResponse<any>>

export async function fetchHexoConfig(): Response {
  return request.get<HexoConfig>('/site.json')
}

export async function fetchPostsList(currentPage: number): Response {
  return request.get<PostList>(`/posts/${currentPage}.json`)
}

export async function fetchPostBySlug(slug: string): Promise<AxiosResponse<any>> {
  return request.get<Post>(`/articles/${slug}.json`)
}

export async function fetchAllCategories(): Response {
  return request.get<Categories>(`/categories.json`)
}

export async function fecthCategoryBySlug(slug: string): Response {
  return request.get<SpecificPostsList>(`/categories/${slug}.json`)
}

export async function fetchAllTags(): Response {
  return request.get<Tags>(`/tags.json`)
}

export async function fetchTagBySlug(slug: string): Response {
  return request.get<SpecificPostsList>(`/tags/${slug}.json`)
}

export async function fetchPageBySource(source: string): Response {
  return request.get<Page>(`/pages/${source}/index.json`)
}
