import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('E-mail').fill('johndoe@example.com')
  await page.getByLabel('Senha').fill('123456')
  const navigationPromise = page.waitForNavigation()
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  await navigationPromise
  expect(page.url()).toContain('/plans')
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('E-mail').fill('johndoe@example.com')
  await page.getByLabel('Senha').fill('12345678')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText('Credenciais inválidas!')
  await expect(toast).toBeVisible()
})
