<template>
  <div class='edit-detail'>
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
          <div class="weui-cell__hd">姓名</div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入姓名" v-model="form.name">
          </div>
          <div class="weui-cell__ft"></div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd">手机号码</div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入手机号码" v-model="form.telphone">
          </div>
          <div class="weui-cell__ft"></div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd">金额</div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入总金额" v-model="form.money">
          </div>
          <div class="weui-cell__ft"></div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd">箱数</div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入箱数" v-model="form.box">
          </div>
          <div class="weui-cell__ft"></div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd">物流信息</div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入单号以及物流类型" v-model="form.wuliudh">
          </div>
          <div class="weui-cell__ft"></div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd">地址</div>
        </div>

        <div class="weui-cell textarea-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" type="text" placeholder="请输人详细地址信息" rows="3" v-model="form.address"></textarea>
          </div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd">备注</div>
        </div>

        <div class="weui-cell textarea-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" type="text" placeholder="请输人备注信息" rows="3" v-model="form.suggestion"></textarea>
          </div>
        </div>

      </div>

      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" @click="_get_data">确定</a>
      </div>

    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const axios = require('axios')
export default {
  data () {
    return {
      header: {
        title: '编辑',
        showRight: false,
        showLeft: true,
        leftText: '返回'
      },
      PAGE: {},
    }
  },
  mounted () {
    this.PAGE = {...this.$route.query}
    // this._get_data()
  },
  computed: {
    form() {
      let params = {
        name: '',
        telphone: '',
        address: '',
        money: '',
        box: '', /* //箱数 */
        wuliudh: '', /* //物流单号 */
        suggestion: '' /* //备注 */
      };
      if(this.PAGE.id){
        return this._ex_obj(params,this.store_getItemData());
      }else{
        return params;
      }
    }
  },
  methods: {
    ...mapGetters('base', ['store_getItemData']),
    ...mapMutations('base', ['clear_store']),
    _ex_obj(obj,params){
      for (const key in obj) {
        obj[key] = params[key]
      }
      return obj;
    },
    click_header_left () {
      this.clear_store();
      this.$router.back();
    },
    _get_data (callback) {
      if (window.ENV.test) {
        let data = require('@/test/list.json')
        this.datalist = data && data.data.rows || []
        return
      }
      let url = this.PAGE.id ? "http://www.sgyhl18.club:520/api/edit2" : "http://www.sgyhl18.club:520/api/add2";
      let params = this.PAGE.id ? {...this.form, ...{id: this.PAGE.id}} : this.form;
      axios.post(url,params)
        .then((response) => {
          if (response.data.code === 0) {
            this.click_header_left();
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
<style lang="scss" scoped>
.edit-detail{
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
    .weui-cells{
      .weui-cell{
        line-height: 1rem;
        width: 100%;
        .weui-cell__hd{
          color: #333;
          width: 1.5rem;
        }
        .weui-cell__bd{
          text-align: left;
          width:80%;
          input{
            width: 100%;
          }
        }
        &.textarea-cell{
          width: 100%;
          .weui-cell__bd{
            width: 90%;
            textarea{
              resize: none;
              width: 100%;
              padding: .2rem;
            }
          }
        }
      }
    }
  }
}

</style>
