console.log("Welcome to WebTurtle! 🐢");

let scrapeEmails = document.getElementById('emailscrape_btn');
let scrapeUrls = document.getElementById('urlscrape_btn');
let scrapePhoneNumbers = document.getElementById('phnnmbrscrape_btn');
let emailList = document.getElementById("email_list");
let urlsList = document.getElementById("urls_list");
let phoneList = document.getElementById("phone_list");
let uniqueEmails = new Set();
let uniqueUrls = new Set();
let uniquePhoneNumbers = new Set();

// Handler to receive emails, URLs, or phone numbers from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.emails) {
        // Get emails
        let emails = request.emails;
        
        // Clear previous emails
        emailList.innerHTML = "";
        uniqueEmails.clear();

        // Display unique emails on popup
        if(emails == null || emails.length == 0) {
            // No emails
            let li = document.createElement('li');
            li.innerText = "No emails found";
            emailList.appendChild(li);
        } else {
            emails.forEach((email) => {
                if (!uniqueEmails.has(email)) {
                    uniqueEmails.add(email);
                    let li = document.createElement('li');
                    li.innerText = email;
                    emailList.appendChild(li);
                }
            });
        }
    }

    if (request.urls) {
        // Get URLs
        let urls = request.urls;
        
        // Clear previous URLs
        urlsList.innerHTML = "";
        uniqueUrls.clear();

        // Display unique URLs on popup
        if(urls == null || urls.length == 0) {
            // No URLs
            let li = document.createElement('li');
            li.innerText = "No URLs found";
            urlsList.appendChild(li);
        } else {
            urls.forEach((url) => {
                if (!uniqueUrls.has(url)) {
                    uniqueUrls.add(url);
                    let li = document.createElement('li');
                    li.innerText = url;
                    urlsList.appendChild(li);
                }
            });
        }
    }

    if (request.phoneNumbers) {
        // Get phone numbers
        let phoneNumbers = request.phoneNumbers;

        // Clear previous phone numbers
        phoneList.innerHTML = "";
        uniquePhoneNumbers.clear();

        // Display unique phone numbers on popup
        if (phoneNumbers == null || phoneNumbers.length == 0) {
            // No phone numbers
            let li = document.createElement('li');
            li.innerText = "No phone numbers found";
            phoneList.appendChild(li);
        } else {
            phoneNumbers.forEach((phoneNumber) => {
                if (!uniquePhoneNumbers.has(phoneNumber)) {
                    uniquePhoneNumbers.add(phoneNumber);
                    let li = document.createElement('li');
                    li.innerText = phoneNumber;
                    phoneList.appendChild(li);
                }
            });
        }
    }
});

// Button's click event listener for scraping emails
scrapeEmails.addEventListener("click", async () => {
    // Get the current active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeEmailsFromPage,
    });
});

// Button's click event listener for scraping URLs
scrapeUrls.addEventListener("click", async () => {
    // Get the current active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeUrlsFromPage,
    });
});

// Button's click event listener for scraping phone numbers
scrapePhoneNumbers.addEventListener("click", async () => {
    // Get the current active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapePhoneNumbersFromPage,
    });
});

// Function to scrape emails
function scrapeEmailsFromPage() {
    const emailRegex = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/g;
    let emails = document.body.innerHTML.match(emailRegex);
    chrome.runtime.sendMessage({ emails });
}

// Function to scrape URLs
function scrapeUrlsFromPage() {
    const urlRegex = /(?<="|'|=|>)(https?:\/\/[^\s"'<>\\]+\/)/g;
    let urls = document.body.innerHTML.match(urlRegex);
    chrome.runtime.sendMessage({ urls });
}

// Function to scrape phone numbers
function scrapePhoneNumbersFromPage() {
    // Improved RegEx to parse phone numbers from HTML code
    const phoneRegex = /\b(?:\+?(\d{1,2})\s*)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]\d{4}\b/g; 
    let phoneNumbers = document.body.innerHTML.match(phoneRegex);
    chrome.runtime.sendMessage({ phoneNumbers });
}

document.addEventListener("DOMContentLoaded", function() {
    const emailScrapeBtn = document.getElementById('emailscrape_btn');
    const urlScrapeBtn = document.getElementById('urlscrape_btn');
    const phoneNumberScrapeBtn = document.getElementById('phnnmbrscrape_btn');
    const emailList = document.getElementById('email_list');
    const urlsList = document.getElementById('urls_list');
    const phoneList = document.getElementById('phone_list');
    const emailCounter = document.getElementById('email_counter');
    const urlCounter = document.getElementById('url_counter');
    const phoneCounter = document.getElementById('phone_counter');
    let uniqueEmails = new Set();
    let uniqueUrls = new Set();
    let uniquePhoneNumbers = new Set();

    emailScrapeBtn.addEventListener('click', () => {
        // Show email list and hide URL and phone number lists
        emailList.style.display = 'block';
        urlsList.style.display = 'none';
        phoneList.style.display = 'none';
        emailCounter.innerText = uniqueEmails.size === 1 ? '1 Address Found' : `${uniqueEmails.size} Addresses Found`;
        urlCounter.innerText = '';
        phoneCounter.innerText = '';
    });

    urlScrapeBtn.addEventListener('click', () => {
        // Show URL list and hide email and phone number lists
        emailList.style.display = 'none';
        urlsList.style.display = 'block';
        phoneList.style.display = 'none';
        emailCounter.innerText = '';
        urlCounter.innerText = uniqueUrls.size === 1 ? '1 External Link Found' : `${uniqueUrls.size} External Links Found`;
        phoneCounter.innerText = '';
    });

    phoneNumberScrapeBtn.addEventListener('click', () => {
        // Show phone number list and hide email and URL lists
        emailList.style.display = 'none';
        urlsList.style.display = 'none';
        phoneList.style.display = 'block';
        emailCounter.innerText = '';
        urlCounter.innerText = '';
        phoneCounter.innerText = uniquePhoneNumbers.size === 1 ? '1 Phone Number Found' : `${uniquePhoneNumbers.size} Phone Numbers Found`;
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.emails) {
            // Iterate over received emails and add them to the uniqueEmails set
            request.emails.forEach(email => {
                uniqueEmails.add(email);
            });
            emailCounter.innerText = uniqueEmails.size === 1 ? '1 Address Found' : `${uniqueEmails.size} Addresses Found`;
        }
        if (request.urls) {
            // Iterate over received URLs and add them to the uniqueUrls set
            request.urls.forEach(url => {
                uniqueUrls.add(url);
            });
            urlCounter.innerText = uniqueUrls.size === 1 ? '1 External Link Found' : `${uniqueUrls.size} External Links Found`;
        }
        if (request.phoneNumbers) {
            // Iterate over received phone numbers and add them to the uniquePhoneNumbers set
            request.phoneNumbers.forEach(phoneNumber => {
                uniquePhoneNumbers.add(phoneNumber);
            });
            phoneCounter.innerText = uniquePhoneNumbers.size === 1 ? '1 Phone Number Found' : `${uniquePhoneNumbers.size} Phone Numbers Found`;
        }
    });
});