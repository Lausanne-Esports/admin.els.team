<template functional>
  <div class="three_bounce inline-flex">
    <div class="bounce1 mr-2" :style="{ 'background-color': props.color }" />
    <div class="bounce2 mr-2" :style="{ 'background-color': props.color }" />
    <div class="bounce3" :style="{ 'background-color': props.color }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Loader',
  props: {
    color: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.three_bounce {
  width: 70px;
  text-align: center;
}
.three_bounce > div {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}
.three_bounce .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.three_bounce .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}
@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
