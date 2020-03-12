debug = require ('../models/conn');
const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');

async function searchJobs(i) {
   const url = await axios.get('https://indeed.com/jobs?q=Web+Developer&l=Atlanta')
    // return fetch(`${url}${i}`)
        .then(response =>  response)
        
        .then(res => {
            const jobs = [];
            const $ = cheerio.load(res.data);

            $('.result').each((index, element) => {
                const title = $(element).children('.title').text();
                const linkToJob = $(element).children('.title').children('a').attr('href')
                const body = $(element).children('.summary').text();
                jobs[index] = { title, linkToJob, body };
            });
            console.log(jobs);
            return jobs;
            // Prints tbe second child of results class results for that page in console.
            //    console.log($('.result').children().eq(1).text());
        });
        return url;
};
module.exports = searchJobs;