<template>
  <div>
    <div v-if="filteredMovies.length === 0" class="empty">
      Фильмы не найдены
    </div>
    <div v-else class="movies-grid">
      <router-link
        v-for="movie in filteredMovies"
        :key="movie.id"
        :to="`/movie/${movie.title}`"
        class="movie-card"
      >
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.year }} • {{ movie.director }}</p>
        <div> рейтинг: {{ movie.rating }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import moviesData from '../data/movies.json'

type Movie = {
  id: number
  title: string
  year: number
  director: string
  description: string
  rating: number
}

const searchQuery = ref('')
const movies = ref<Movie[]>((moviesData as { movies: Movie[] }).movies)

const filteredMovies = computed(() => {
  if (!searchQuery.value) return movies.value
  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<style scoped>
.movies-grid {
  display: grid;
  gap: 16px;
}

.movie-card {
  display: block;
  padding: 20px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: border-color 0.2s;
}

.movie-card:hover {
  border-color: #999;
}

.movie-card h3 {
  font-size: 18px;
  margin-bottom: 4px;
}

.movie-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.empty {
  text-align: center;
  padding: 48px 20px;
  color: #999;
}
</style>
