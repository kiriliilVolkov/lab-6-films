<template>
  <div>
    <div class="header">
      <router-link to="/movies" class="header-link">Фильмы</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background: #f5f5f5;
}

.header {
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #eee;
}

.header-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 20px;
}
</style>
