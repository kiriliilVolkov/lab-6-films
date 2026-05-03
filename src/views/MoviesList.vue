<template>
  <div>
    <ul>
      <li v-for="movie in filteredMovies" :key="movie.id">
        <router-link :to="`/movie/${movie.title}`">
          {{ movie.title }} ({{ movie.year }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

const movies = ref([
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    director: 'Nolan',
    description: 'Сны во сне',
    rating: 8.8,
  },
  {
    id: 2,
    title: 'The Matrix',
    year: 1999,
    director: 'Wachowski',
    description: 'Симуляция',
    rating: 8.7,
  },
  {
    id: 3,
    title: 'Interstellar',
    year: 2014,
    director: 'Nolan',
    description: 'Космос',
    rating: 8.6,
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    year: 1994,
    director: 'Tarantino',
    description: 'Криминал',
    rating: 8.9,
  },
])

const filteredMovies = computed(() => {
  if (!searchQuery.value) return movies.value
  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>
