<template>
  <div class="layout"  :class="{'layout-hide-text': spanLeft < 5}">
    <div id="_layout_box_hander" ></div>
    <Row type="flex">
      <Col :span="spanRight">
      <div id="layout-content_id" class="layout-content" style="paddingLeft:180px;">
        <div id="layout-content-main" class="layout-content-main" :style="bodyStyle">

          <div id="app">
            <router-view/>
          </div>

        </div>
      </div>
      </Col>
    </Row>
    <div class="layout-copy">
      &copy;  2011~2016 36氪 | 京ICP备12031756号 | 京公网安备11010802012285号
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {

      spanRight: 24,
      spanLeft:'',
      bodyStyle:{
        height:"200px",
        overflow:'auto',

      }

    }
  },
  mounted(){
   
    vueNavRender(document.getElementById('_layout_box_hander'),document.getElementById('layout-content_id'))
    this.bodyStyle.height = document.documentElement.clientHeight-130 + "px";
    var that = this;
    window.onresize=function(){
      var dom = document.getElementById('layout-content-main');
      if(dom){
        dom.style.height = document.documentElement.clientHeight - 130 + "px"
      }

    }

  }
}
</script>

<style>
  body {
    min-height:100%;
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
