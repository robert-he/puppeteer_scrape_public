const fs = require('fs');

const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch(); //this launches a puppeteer instance, aka a headless browser 
    const page = await browser.newPage();
    await page.goto("https://mioym.com/the-team/");

    await page.screenshot( {path: 'full-page-screenshot.png', fullPage: true}) //takes screenshot of contents of selected page 

    await page.pdf({ path: 'full-page-pdf.pdf', format: 'A4'}); //takes pdf of contents of selected page 

    //const html = await page.content();  //grabs all the html of a page 
    //const title = await page.evaluate(() => document.title); // DOM manipulation, trying to return document.title
    //console.log(title);

    // const text = await page.evaluate(() => document.body.innerText);
    // const links = await page.evaluate(() => 
    //     Array.from(document.querySelectorAll('a'),(e) => e.href )
    // );

    const courses = await page.evaluate(() => 
    Array.from(document.querySelectorAll('.team-one__single'),(e) => ({
        photo: e.querySelector('.team-one__img-box .team-one__img img').src, 
        bio_link: e.querySelector('.team-one__content .team-one__name a').href,
        name: e.querySelector('.team-one__content .team-one__name a').textContent,
        title: e.querySelector('.team-one__content .team-one__sub-title').textContent,
    }) )
);

    console.log(courses);

    //save data to JSON file
    fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
        if(err) throw err;
        console.log('Filed saved');
    })

    await browser.close();
}
run(); 