<template>
  <div class='list'>
    <!-- header -->
    <div class='header'>
      <div class='header-left'>{{header.leftText}}</div>
      <div class='header-title'>{{header.title}}</div>
      <div class='header-right'>
        <div v-show="header.showRight">关闭</div>
      </div>
    </div>
    <!-- container -->
    <div class="page-container">
      <div v-for="(item,index) in datalist" class="list-item" :key="index">
        <div class="item-left">
          <div>
            <b>{{item.name}}</b>
            <span>{{item.telphone}}</span>
          </div>
          <div>
            <span>总价: </span>
            <b>{{item.money}}</b>
          </div>
          <div>
            <span>箱数: </span>
            <b>{{item.box}}</b>
          </div>
          <div>
            <span>地址: </span>
            <b>{{item.address}}</b>
          </div>
        </div>
        <div class="item-right">
          <div>编辑</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      datalist:[], //接口返回数据
      header: {
        title: '列表数据',
        showRight: false,
        showLeft: true,
        leftText: '返回',
      }
    }
  },
  mounted( ) {
    this._get_data()
  },
  methods:  {
    _get_data (callback) {
      if (ENV.test) {
        let data = require('@/test/list.json')
        console.error(data, '测试数据')
        this.datalist = data && data.data || []
        return
      }
      axios.post('ttp://106.12.88.65/api/list')
      .then(function (response) {
        console.log('请求成功返回数据', response)
        if(response.code == '0'){
          console.log('请求成功返回数据', response.data)
        }
        typeof callback == 'function' && callback()
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="css">
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
  }
  .header .header-left,
  .header .header-right{
    padding: .2rem;
  }
  .page-container{
    text-align: left;
    padding: 10px 15px;
    padding-top: .2rem;
  }
  .list-item{
    display: flex;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    padding: 15px;
    margin-bottom: .3rem;
    background-color: #fff;
  }

</style>
