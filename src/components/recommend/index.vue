<template>
  <div>
    推荐页面
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {SUCCESS} from 'api/config'
export default {
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (SUCCESS === res.code) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
