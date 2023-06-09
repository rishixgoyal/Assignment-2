const fs = require('fs');
const { resolve } = require('path');
const path = require("path");

// Globally declared arrays
let posts = [];
let categories = [];

// => Read the posts.json and categories.json files and store the data in global arrays
function initialize() {
    // Ensures that the categories file is read and assigned first before usage
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "data", "posts.json"), 'utf8', (err, data) => {
            if (err) {
                // Error Handling
              reject("Unable to read posts file");
            }

            // Saving posts
            posts = JSON.parse(data);

            // Only reading categories file if posts has been read
            fs.readFile(path.join(__dirname, "data", "categories.json"), 'utf8', (err, data) => {
                if (err) {
                    // Error Handling
                  reject("Unable to read categories file");
                }

                // Saving categories
                categories = JSON.parse(data);

                // Communicates back to server stating that the operation was a success
                resolve();
              });
          });
    })
}

// => Provides full array of "posts" objects 
function getAllPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject("No results returned");
        } else {
            resolve(posts);
        }
    })
}

// => Provides an array of "post" objects whose published property is true 
function getPublishedPosts() {
    return new Promise((resolve, reject) => {
        let publishedPosts = [];
        posts.forEach((post) => {
            if (post.published === true) {
                publishedPosts.push(post);
            }
        })

        if (publishedPosts.length > 0) {
            resolve(publishedPosts);
        } else {
            reject("No results returned");
        }
    })    
}

// => Provides full array of "category" objects 
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("No results returned");
        } else {
            resolve(categories);
        }
    })
}

module.exports = { initialize, getAllPosts, getPublishedPosts, getCategories };
