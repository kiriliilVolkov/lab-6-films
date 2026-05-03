<template>
  <div>
    <button @click="goBack">← Назад</button>

    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
      <p><strong>Год:</strong> {{ movie.year }}</p>
      <p><strong>Режиссер:</strong> {{ movie.director }}</p>
      <p><strong>Описание:</strong> {{ movie.description }}</p>
      <p><strong>Рейтинг:</strong> {{ movie.rating }}/10</p>
    </div>

    <div v-else>
      <p>Фильм "{{ decodedTitle }}" не найден</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Movie {
  id: number
  title: string
  year: number
  director: string
  description: string
  rating: number
}

const route = useRoute()
const router = useRouter()
const movie = ref<Movie | null>(null)

const titleParam = computed(() => route.params.title as string)
const decodedTitle = computed(() => decodeURIComponent(titleParam.value))

const moviesData: Movie[] = [
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
]

const findMovie = () => {
  const found = moviesData.find((m) => m.title.toLowerCase() === decodedTitle.value.toLowerCase())
  movie.value = found || null
}

const goBack = () => {
  router.push('/movies')
}

onMounted(() => {
  findMovie()
})
</script>
