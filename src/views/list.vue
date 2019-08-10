<template>
  <div class='list'>
    <!-- header -->
    <div class='header'>
      <div class='header-left'>{{header.leftText}}</div>
      <div class='header-title'>{{header.title}}</div>
      <div class='header-right'>
        <div v-show="header.showRight" @click.stop.prevent="click_add">新增</div>
      </div>
    </div>
    <!-- container -->
    <div class="page-container">
      <div v-for="(item,index) in datalist" class="list-item" :key="index">
        <div class="item-left">
          <div class="cell-item">
            <b>{{item.name}}</b>
            <span>{{item.telphone}}</span>
          </div>
          <div class="cell-item">
            <b>总价: {{item.money}}</b>
            <span>箱数: {{item.box}}</span>
          </div>
          <div class="cell-item">
            <span>{{item.address}}</span>
          </div>
        </div>
        <div class="item-right">
          <div class="item-edit" @click.stop.prevent="click_edit(item)">
            <i>&nbsp;</i>
            <div>编辑</div>
          </div>
          <div class="item-delete" @click.stop.prevent="click_delete(item)">
            <i>&nbsp;</i>
            <div>删除</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const axios = require('axios')
export default {
  data () {
    return {
      datalist: [], //  接口返回数据
      header: {
        title: '列表数据',
        showRight: true,
        showLeft: true,
        leftText: '返回'
      }
    }
  },
  mounted () {
    this._get_data()
  },
  methods: {
    ...mapMutations('base', ['store_setItemData']),
    _get_data (callback) {
      let suecess = (data) => {
         this.datalist = data;
         typeof callback === 'function' && callback();
      }
      if (window.ENV.test) {
        let data = require('@/test/list.json')
        console.error(data, '测试数据')
        let _data = data && data.data.rows || []
        suecess(_data)
        return
      }
      axios.post('https://www.sgyhl18.club/api/list')
        .then(function (response) {
          console.log('请求成功返回数据', response)
          let _data =  response.data.data;
          console.error(_data)
          if (_data.code === 0) {
            console.log('请求成功返回数据', _data.rows)
            suecess(_data.rows || [])
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    click_add(){
      this.$router.push({
        path: '/index/edit',
      })
    },
    click_edit (item) {
      this.store_setItemData(item);
      this.$router.push({
        path: '/index/edit',
        query: {
          id: item.id || ''
        }
      })
    },
    click_delete (item) {
      axios.post('https://www.sgyhl18.club/api/remove2',{ids: String(item.id)})
        .then((response) => {
          console.log('请求成功返回数据', response.data)
          let _data =  response.data;
          if (_data.code === 0) {
            this._get_data();
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .list{
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
          width: 20%;
          border-left: 1px solid #e5e5e5;
          padding-left: .5rem;
          display: flex;
          justify-content: space-between;
          .item-delete{
            i{
              display: inline-block;
              width: .6rem;
              height: .6rem;
              background: url('../assets/img/delete.png') no-repeat center;
              background-size: 100%;
              padding-bottom: .2rem;
            }
          }
          .item-edit{
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
    }
  }

</style>
