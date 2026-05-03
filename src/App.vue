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

.header {
  background: white;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-link {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}

.header-link:hover {
  color: #42b983;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}
</style>
