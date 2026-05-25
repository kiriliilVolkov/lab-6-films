<template>
  <div>
    <button @click="goBack" class="back-btn">← Назад</button>

    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
      <div class="rating">{{ movie.rating }} ★</div>
      <p><strong>Год:</strong> {{ movie.year }}</p>
      <p><strong>Режиссер:</strong> {{ movie.director }}</p>
      <p><strong>Описание:</strong> {{ movie.description }}</p>
    </div>

    <div v-else class="empty">
      Фильм "{{ decodedTitle }}" не найден
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moviesData from '../data/movies.json'

const route = useRoute()
const router = useRouter()

type Movie = {
  id: number
  title: string
  year: number
  director: string
  description: string
  rating: number
}

const movie = ref<Movie | null>(null)
const titleParam = computed(() => route.params.title as string)
const decodedTitle = computed(() => decodeURIComponent(titleParam.value))

const findMovie = () => {
  const data = moviesData as { movies: Movie[] }
  const found = data.movies.find(
    (m) => m.title.toLowerCase() === decodedTitle.value.toLowerCase()
  )
  movie.value = found || null
}

const goBack = () => {
  router.push('/movies')
}

onMounted(() => {
  findMovie()
})
</script>

<style scoped>
.back-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 24px;
}

.back-btn:hover {
  background: #f0f0f0;
}

h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.rating {
  font-size: 20px;
  font-weight: 500;
  color: #e6a817;
  margin-bottom: 16px;
}

p {
  margin-bottom: 8px;
  font-size: 15px;
}

strong {
  font-weight: 500;
  color: #555;
}

.empty {
  text-align: center;
  padding: 48px 20px;
  color: #999;
}
</style>
