<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {

  }
}
</script>
<style>
 @import url('//at.alicdn.com/t/font_1328028_8w8m647cq5x.css');
 .iconfont{
   font-size: 12px;
 }
  #app {
    height: 100%;
  }
</style>
<style lang="less">
@import url('./assets/style/common.less');
</style>

