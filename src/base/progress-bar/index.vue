<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn" ref="progressBtn"
         @touchstart="onTouchStart"
         @touchmove="onTouchMove"
         @touchend="onTouchEnd"
         ></div>
      </div>
    </div>
  </div>
</template>

<script>
import {prefixStyle} from 'common/js/dom'
// const progressBtnWidth = 16
const transform = prefixStyle('transform')
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    onTouchStart(e) {
      console.log(e)
      this.touch.init = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    onTouchMove(e) {
      console.log('move', e)
      if (!this.touch.init) {
        return
      }
      let deltaX = e.touches[0].pageX - this.touch.startX
      let offsetWidth = Math.min(this.$refs.progressBar.clientWidth - 16, Math.max(0, this.touch.left + deltaX))
      this._setOffsetWidth(offsetWidth)
      this._triggerPercent()
    },
    onTouchEnd() {
      this.touch.init = false
    },
    progressClick(e) {
      // 当我们点击progressBar时，获取offsetX不对
      // this._setOffsetWidth(e.offsetX)
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._setOffsetWidth(offsetWidth)
      this._triggerPercent()
    },
    _setOffsetWidth(offsetWidth) {
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    },
    _triggerPercent() {
      const progressWidth = this.$refs.progressBar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / progressWidth
      this.$emit('percentChange', percent)
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent > 0 && !this.touch.init) {
        let btnWidth = this.$refs.progressBtn.clientWidth
        let width = this.$refs.progressBar.clientWidth - btnWidth / 2
        let offsetWidth = newPercent * width
        this._setOffsetWidth(offsetWidth)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
