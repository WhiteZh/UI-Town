<script setup lang="ts">

</script>

<template>
  <div class="page-wrap">
    <div class="navbar">
      <div class="container nav-container">
        <div class="brand">
          <img src="@/assets/logo.png" alt="UI Town" class="brand-logo"/>
        </div>
        <div class="nav-right-warp">
          <div class="nav-menu">
            <RouterLink class="nav-link no-link-style" :to="{ name: 'browse' }">About</RouterLink>
            <RouterLink class="nav-link no-link-style" :to="{ name: 'browse' }">Codes</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="section hero">
      <div class="container">
        <div class="hero-slider-content">
          <div class="column hero-image-column">
            <h2 class="scribble-text slider-name">HOME OF UI</h2>
            <div class="hero-slider-image-wrap">
              <img src="@/assets/66a4b146bcdd29211150f142_Home.png" alt="HOME OF UI" class="hero-slider-image"/>
            </div>
          </div>
          <div class="column max-600" style="align-self: center; justify-self: center;">
            <textarea class="label _30-margin">HI I'M UI-TOWN</textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label {
  margin-bottom: 0;
  color: hsla(233.25, 83.33%, 18.82%, 1.00);
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.label._30-margin {
  margin-bottom: 30px;
}

.column.max-600 {
  max-width: 600px;
}

.hero-slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0%;
}

.hero-slider-image-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 700px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.scribble-text {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: "Permanent Marker", sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
}

.scribble-text.slider-name {
  position: relative;
  margin-bottom: -15px;
  color: #8ea5a0;
}

.column {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.column.hero-image-column {
  z-index: 2;
  align-items: center;
}

.hero-slider-content {
  display: grid;
  width: 100%;
  grid-auto-columns: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
}

* {
  font-family: "Red Hat Display", sans-serif;
  font-size: 14px;
  line-height: 1.6rem;
  color: #081158;
}

.page-wrap {
  overflow: hidden;
}

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: white;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  max-width: 1450px;
  position: relative;
}

.container {
  position: relative;
  z-index: 2;
  width: 95%;
  max-width: 1450px;
}

.container.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  height: 20px;
  padding-left: 0px;
  border-bottom-style: none;
}

.brand-logo {
  display: block;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.nav-right-warp {
  display: flex;
  justify-content: left;
  align-items: center;
}

.nav-menu {
  display: flex;
  justify-content: left;
  align-items: center;
}

.nav-link {
  display: block;
  padding: 20px 10px;
}

.section {
  position: relative;
  display: flex;
  padding-top: 150px;
  padding-bottom: 150px;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}

.section.hero {
  background-color: whitesmoke;
}
</style>