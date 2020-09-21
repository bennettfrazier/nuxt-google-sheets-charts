<template>
  <div>
    <Nuxt />
    <UiFooter />
  </div>
</template>

<style lang="scss">
// defaults from create-nuxt-app (other than font)
html {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
