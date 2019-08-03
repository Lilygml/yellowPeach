<template>
  <div class='list'>
    <!-- header -->
    <div class='header'>
      <div class='header-left' @click.stop.prevent="click_header_left">{{header.leftText}}</div>
      <div class='header-title'>{{header.title}}</div>
      <div class='header-right'>
        <div v-show="header.showRight">关闭</div>
      </div>
    </div>
    <!-- container -->
    <div class="page-container">
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__hd">HHHH</div>
          <div class="weui-cell__bd">hfhiehue</div>
          <div class="weui-cell__ft">></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      datalist: [], //  接口返回数据
      header: {
        title: '列表数据',
        showRight: false,
        showLeft: true,
        leftText: '返回'
      }
    }
  },
  mounted () {
    console.error(0)
    this._get_data()
  },
  methods: {
    click_header_left () {
      this.$router.back()
    },
    _get_data (callback) {
      if (window.ENV.test) {
        let data = require('@/test/list.json')
        console.error(data, '测试数据')
        this.datalist = data && data.data.rows || []
        return
      }
      axios.post('http://www.sgyhl18.club:520/api/list')
        .then(function (response) {
          console.log('请求成功返回数据', response)
          if (response.code === '0') {
            console.log('请求成功返回数据', response.data)
          }
          typeof callback === 'function' && callback()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss">
  .header{
    display: flex;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    height: 1.2rem;
    padding: 0 0.5rem;
    background-color: #ff9800;
    color: #fff;
    font-size: .35rem;
    .header-left,
    .header-right{
      padding: .2rem;
    }
  }
  .page-container{
    text-align: left;
    padding: 10px 15px;
    padding-top: .2rem;
    .list-item{
      display: flex;
      justify-content: space-between;
      justify-items: center;
      align-items: center;
      padding: 15px;
      margin-bottom: .3rem;
      background-color: #fff;
      .item-left{
        width: 80%;
        .cell-item{
          line-height: .6rem;
          b{
            display: inline-block;
            width: 50%;
          }
        }
      }
      .item-right{
        border-left: 1px solid #e5e5e5;
        padding-left: .5rem;
        i{
          display: inline-block;
          width: .6rem;
          height: .6rem;
          background: url('../assets/img/edit.png') no-repeat center;
          background-size: 100%;
          padding-bottom: .2rem;
        }
      }
    }
  }

</style>
