<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default:false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    },20);
  },
  methods: {
    _initScroll() {
      if(!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });

      if (this.listenScroll) {
        this.scroll.on('scroll',(pos) => {
          this.$emit('scroll',pos)
        })
      }
    },
    enable() {//启用 BetterScroll, 默认 开启
      this.scroll && this.scroll.enable();
    },
    disable() {//禁用 BetterScroll，DOM 事件的回调函数不再响应。
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {//滚动到指定的位置
      this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    scrollToElement() {//滚动到指定的目标元素
      this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      },20);
    }
  }
}
</script>
