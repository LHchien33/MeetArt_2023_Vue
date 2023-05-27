<template>
  <div class="step-progress position-relative w-75 mx-auto">
    <div class="position-absolute base-bar w-75 top-50 start-0 end-0 mx-auto"></div>
    <ul class="list-unstyled row g-0 mb-0">
      <li class="col step step-1"></li>
      <li class="col step step-2" :class="{'active': activeStep >= 2 }"></li>
      <li class="col step step-3" :class="{'active': activeStep >= 3 }"></li>
      <li class="col step step-4" :class="{'active': activeStep >= 4 }"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['activeStep']
}
</script>

<style scoped>
.base-bar{
  height: 2px;
  background-color: #fff;
}
.step::before {
  content: '1';
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  background-color: var(--bs-beige);
  border: 1px solid var(--bs-secondary);
  color: var(--bs-secondary);
  font-size: 0.875rem;
}

.step-2::before{
  content: '2';
}
.step-3::before{
  content: '3';
}
.step-4::before{
  content: '4';
}

.step-1::before,
.step-progress .active::before{
  background-color: transparent;
  background-image: var(--bs-gradient);
  border: none;
  color: var(--bs-dark-1);
}

.step-progress .active::after{
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-image: var(--bs-gradient);
  transform: translate(-50%, -0.75rem);
}
</style>