
<template lang="html">
      <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
			</div>
</template>
<script>

export default {
 
}
</script>

<style scoped>
  .spinner {
  width: 60px;
  height: 60px;

  position: relative;
  margin: 100px auto;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #328ECC;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: bounceLoading 2.0s infinite ease-in-out;
  animation: bounceLoading 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes bounceLoading {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes bounceLoading {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
.ui-ladding-dowm {
    float: left;
    width: 100%;
    margin: 0 5px 0px 5px;
    border-radius: 5px;
    text-align: center;
    background-color: transparent;
}
.ui-ladding-dowm-line {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 15px;
    background-color: #499df1;
    margin: 0px 3px;
}
.ui-ladding-dowm-1 {
    animation: k-loadingP 1s infinite;
}
.ui-ladding-dowm-2 {
   animation: k-loadingP 1s infinite;
    animation-delay: .15s;
}
.ui-ladding-dowm-3 {
    animation: k-loadingP 1s infinite;
    animation-delay: .30s;
}
.ui-ladding-dowm-4 {
    animation: k-loadingP 1s infinite;
    animation-delay: .45s;
}
@keyframes k-loadingP
{
0% {transform: scale(1);opacity: 0.9}
50% {transform: scale(.5);opacity: 0.3}
100% {transform: scale(1);opacity: 0.9}
}

</style>