import { test, expect } from '@playwright/test'

test('Cancel meeting', async ({ page }) => {
  await page.goto('https://portal-test.zoefin.com/reschedule/66965aa0-9c17-11ed-b52a-53af9ee871d5')

  await page.locator(`//div[@class='jsx-1690130522 schedule-dashboard__cancel-wrapper']//button[contains(text(),'Cancel Meeting')]`).click()

  await page.locator(`//div[@class='jsx-2434811024 question-dropdown']//button[@class='ZUIDropdown__main-selector  ']`).click()

  const options = ['I already found an Advisor', 'The advisor is not a good fit', 'I stopped looking for an advisor', 'I cannot attend the meeting']
  const indexToSelect = 0

  await page.locator(`//div[contains(text(),'${options[indexToSelect]}')]`).click()

  if (indexToSelect === 0 || indexToSelect === 1 || indexToSelect === 3) {

    await page.locator(`//body/div[@id='__next']/div[2]/div[3]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]`).click()
    await page.locator(`//div[contains(text(),'Zoe Advisor')]`).click()
    await page.locator(`//div[@class='jsx-897037293 modal-cancel__buttons']//button[contains(text(),'Cancel Meeting')]`).click()

  } else if (indexToSelect === 2) {

    await page.locator(`//div[@class='jsx-897037293 modal-cancel__buttons']//button[contains(text(),'Cancel Meeting')]`).click()

  }

  await page.waitForTimeout(3000)




});