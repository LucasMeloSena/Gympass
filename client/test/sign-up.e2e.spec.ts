import { expect, test } from '@playwright/test'

import { errorMessage } from '@/lib/errors'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome').fill('John Doe')
  await page.getByLabel('Celular').fill('(31) 9 0000-0001')
  await page.getByLabel('E-mail').fill('johndoe@example.com')
  await page.getByLabel('Senha').nth(0).fill('123456')
  await page.getByLabel('Confirmar Senha').fill('123456')
  const navigationPromise = page.waitForNavigation()
  await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

  const toast = page.getByText('Cadastro realizado com sucesso!')
  await expect(toast).toBeVisible()

  await navigationPromise
  expect(page.url()).toContain('/sign-in')
})

test('sign up with existing user email', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome').fill('John Doe II')
  await page.getByLabel('Celular').fill('(31) 9 0000-0001')
  await page.getByLabel('E-mail').fill('samemail@example.com')
  await page.getByLabel('Senha').nth(0).fill('123456')
  await page.getByLabel('Confirmar Senha').fill('123456')
  await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

  const toast = page.getByText(errorMessage.USER_ALREADY_EXISTS)
  await expect(toast).toBeVisible()
})
