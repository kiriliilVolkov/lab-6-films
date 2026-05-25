import { test, expect } from '@playwright/test'

test.describe('Фильмы сайт', () => {
  test('Главная страница открывается', async ({ page }) => {
    await page.goto('/movies')

    // Ждем загрузки контента
    await page.waitForSelector('.movie-card')

    // Проверяем заголовок в хедере
    await expect(page.locator('.header-link')).toHaveText('Фильмы')

    // Проверяем что есть 4 карточки фильмов
    await expect(page.locator('.movie-card')).toHaveCount(4)

    // Проверяем видимость конкретных фильмов
    await expect(page.getByText('Inception')).toBeVisible()
    await expect(page.getByText('The Matrix')).toBeVisible()
    await expect(page.getByText('Interstellar')).toBeVisible()
    await expect(page.getByText('Pulp Fiction')).toBeVisible()
  })

  test('Переход к фильму Inception и проверка данных', async ({ page }) => {
    await page.goto('/movies')
    await page.waitForSelector('.movie-card')

    // Кликаем по фильму Inception
    await page.locator('.movie-card').filter({ hasText: 'Inception' }).click()

    // Ждем загрузки страницы фильма
    await page.waitForSelector('h2')

    // Проверяем заголовок
    await expect(page.locator('h2')).toHaveText('Inception')

    // Проверяем данные фильма
    await expect(page.getByText('Год: 2010')).toBeVisible()
    await expect(page.getByText('Режиссер: Nolan')).toBeVisible()
    await expect(page.getByText('Описание: Сны во сне')).toBeVisible()

    // Проверяем рейтинг (теперь класс .rating есть)
    await expect(page.locator('.rating')).toBeVisible()
    await expect(page.locator('.rating')).toContainText('8.8')
  })

  test('Кнопка назад работает', async ({ page }) => {
    await page.goto('/movies')
    await page.waitForSelector('.movie-card')

    // Переходим на страницу фильма
    await page.locator('.movie-card').filter({ hasText: 'The Matrix' }).click()
    await page.waitForSelector('h2')

    // Проверяем что мы на странице фильма
    await expect(page.locator('h2')).toHaveText('The Matrix')

    // Нажимаем кнопку назад
    await page.getByRole('button', { name: '← Назад' }).click()

    // Ждем возврата к списку
    await page.waitForSelector('.movies-grid')

    // Проверяем что вернулись к списку
    await expect(page.locator('.movie-card')).toHaveCount(4)
  })

  test('Открываются все фильмы по очереди', async ({ page }) => {
    await page.goto('/movies')
    await page.waitForSelector('.movie-card')

    const movieCards = page.locator('.movie-card')
    const count = await movieCards.count()

    for (let i = 0; i < count; i++) {
      // Получаем название фильма
      const movieTitle = await movieCards.nth(i).locator('h3').textContent()

      // Кликаем по фильму
      await movieCards.nth(i).click()
      await page.waitForSelector('h2')

      // Проверяем что заголовок совпадает
      await expect(page.locator('h2')).toHaveText(movieTitle!)

      // Проверяем что есть основные данные
      await expect(page.locator('.rating')).toBeVisible()
      await expect(page.getByText('Год:')).toBeVisible()
      await expect(page.getByText('Режиссер:')).toBeVisible()
      await expect(page.getByText('Описание:')).toBeVisible()

      // Возвращаемся обратно к списку
      await page.getByRole('button', { name: '← Назад' }).click()
      await page.waitForSelector('.movies-grid')
    }
  })

  test('Открытие фильма через прямой URL', async ({ page }) => {
    // Открываем фильм напрямую по URL
    await page.goto('/movie/Interstellar')
    await page.waitForSelector('h2')

    // Проверяем заголовок
    await expect(page.locator('h2')).toHaveText('Interstellar')

    // Проверяем данные
    await expect(page.getByText('Год: 2014')).toBeVisible()
    await expect(page.getByText('Режиссер: Nolan')).toBeVisible()
    await expect(page.getByText('Описание: Космос')).toBeVisible()
    await expect(page.locator('.rating')).toContainText('8.6')
  })

  test('Несуществующий фильм', async ({ page }) => {
    await page.goto('/movie/NonExistentMovie')

    // Ждем сообщение об ошибке
    await page.waitForSelector('.empty')

    // Проверяем сообщение об ошибке
    await expect(page.locator('.empty')).toBeVisible()
    await expect(page.locator('.empty')).toContainText('не найден')
  })

  test('Редирект с главной на /movies', async ({ page }) => {
    await page.goto('/')

    // Ждем редиректа
    await page.waitForURL('/movies')
    await page.waitForSelector('.movies-grid')

    // Проверяем что нас перекинуло на /movies
    await expect(page).toHaveURL('/movies')
    await expect(page.locator('.movie-card')).toHaveCount(4)
  })

  test('Все фильмы одного режиссера Nolan', async ({ page }) => {
    await page.goto('/movies')
    await page.waitForSelector('.movie-card')

    // Проверяем что у Nolan два фильма
    const nolanMovies = page.locator('.movie-card').filter({ hasText: 'Nolan' })
    await expect(nolanMovies).toHaveCount(2)

    // Проверяем что это Inception и Interstellar
    await expect(nolanMovies.filter({ hasText: 'Inception' })).toBeVisible()
    await expect(nolanMovies.filter({ hasText: 'Interstellar' })).toBeVisible()
  })
})
