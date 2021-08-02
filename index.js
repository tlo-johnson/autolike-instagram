require("dotenv").config();
require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const profileToLike = process.env.PROFILE_TO_LIKE;

const run = async () => {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://www.instagram.com/");
    await driver.wait(until.elementLocated(By.css('input[name="username"]')));
    driver.findElement(By.css('input[name="username"]')).sendKeys(username);
    driver.findElement(By.css('input[name="password"]')).sendKeys(password);
    await wait(2);
    driver.findElement(By.css('button[type="submit"]')).click();
    await wait(5);
    await driver.get(`http://www.instagram.com/${profileToLike}`);
    await driver.wait(until.elementLocated(By.css("article a")));

    const posts = await driver.findElements(By.css("article a"));
    for (let post of posts) {
      post.click();
      await driver.wait(until.elementLocated(By.css('svg[aria-label="Like"]')));
      driver.findElement(By.css('svg[aria-label="Like"]')).click();
      await wait(2);
      driver.findElement(By.css('svg[aria-label="Close"]')).click();
      await wait(2);
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("quitting driver ...");
    await driver.quit();
  }
};

run().then(() => process.exit());

const wait = async (seconds) => await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
