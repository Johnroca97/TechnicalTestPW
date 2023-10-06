import { test, expect } from '@playwright/test'

test('successful rescheduling', async ({ page }) => {
  await page.goto('https://portal-test.zoefin.com/reschedule/66965aa0-9c17-11ed-b52a-53af9ee871d5')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Reschedule')

  //Happy Path
  const day = '20'
  await page.locator(`//div[@data-testid='calendar-day-${day}']//span[contains(text(),'${day}')]`).click()

  const timeSlot = '8'
  await page.locator(`//div[@data-testid='${timeSlot}-availability']`).click()
  
  const typeMeeting = "Video Conference"
  await page.locator(`//p[contains(text(),'${typeMeeting}')]`).click()

  await page.locator('//button[contains(text(),"reschedule")]').click()

  //Validate meeting day
  await page.waitForSelector(`//div[@class='ZUIModal__content-container']`)
  await expect(page.locator(`//div[@class='jsx-2536202604 meeting modal-schedule-meeting']//li[@class='jsx-2536202604 meeting__item']//span[contains(text(),'${day}')]`)).toContainText(day)

  //validate Duration
  const duration = "30"
  await expect(page.locator(`//div[@class='jsx-2536202604 meeting modal-schedule-meeting']//span[contains(text(),'${duration} minutes')]`)).toContainText(duration)

  //Validate Type
  const type = "video"
  await expect(page.locator(`//div[@class='jsx-2536202604 meeting modal-schedule-meeting']//span[contains(text(),'${type}')]`)).toContainText(type)

  await page.waitForTimeout(3000)
  await page.locator(`//button[contains(text(),'Confirm')]`).click()
  

  //Validate successfull message
  const success = "Successfully changed the communication type!"
  await expect(page.locator(`//span[contains(text(),'${success}')]`)).toContainText(success)

});