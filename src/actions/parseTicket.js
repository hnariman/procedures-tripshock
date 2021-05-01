const puppeteer = require("puppeteer");
const parseTicket = async () => {
  console.log(" parses ...");
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    //executablePath: "/usr/bin/google-chrome",
    //args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   userDataDir: "/home/hnariman/.config/google-chrome/",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://tripshock.monday.com/boards/807299943/pulses/1243874000?userId=21710399",
    {
      waitUntil: "networkidle0",
    }
  );
  await page.type("#user_email", "hnariman@gmail.com");
  await page.type("#user_password", "12345");
  await page.click('.submit_button');

  await page.waitForSelector(".pulse_title");
  const titles = await page.$eval("h2", (el) => el.innerHTML);
  await browser.close();
  console.log("title values: ", titles);
};

//parseTicket();

module.exports = parseTicket;
