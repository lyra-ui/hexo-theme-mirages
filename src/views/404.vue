<template>
  <div
    class="
      absolute
      top-0
      left-0
      right-0
      bottom-0
      flex
      justify-center
      items-center
      flex-wrap
    "
  >
    <div>
      <svg-icon icon-class="404" class-name="w-72 h-72 max-w-full" />
      <div class="text-center mt-8">
        <h3 class="not-found-msg text-3xl font-medium">页面没有找到</h3>
      </div>
      <div>
        <div>
          <a
            href="javascript:void(0)"
            class="my-4 mr-2 ml-2 w-44 no-underline rounded-full"
          >
            返回首页
          </a>
        </div>
        <div class="search-box">
          <input type="text" placeholder="搜索相关内容..." />
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found-msg {
  color: var(--text-normal);
}
a {
  color: var(--text-normal);
  padding: 0.5625rem 2.8125rem;
  display: block;
  opacity: 1;
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  width: 11rem;
  border: {
    width: 0.0625rem;
    style: solid;
  }
  &:active {
    color: none;
    text-decoration: node;
  }
}

input {
  outline: none;
  color: inherit;
  background-color: transparent;
  font-size: 0.875rem;
  overflow: hidden;
  line-height: 1.5;
  vertical-align: bottom;
  width: 8.125rem;
}
i {
  color: var(--text-normal);
}
.search-box {
  display: inline-block;
  padding: 0.5625rem 1.25rem;
  border-radius: 100rem;
  opacity: 1;
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 500;
  color: var(--text-normal);
  border: 0.0625rem solid;
  white-space: nowrap;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 11rem;
}
</style>
