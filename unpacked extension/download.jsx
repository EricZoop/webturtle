document.addEventListener("DOMContentLoaded", function() {
    const downloadTxtBtn = document.getElementById('download_txt_btn');
    const emailScrapeBtn = document.getElementById('emailscrape_btn');
    const urlScrapeBtn = document.getElementById('urlscrape_btn');
    const phoneNumberScrapeBtn = document.getElementById('phnnmbrscrape_btn');

    const alertContainer = document.querySelector('.alert'); // Select the alert container

    


    // Hide the download button initially
    downloadTxtBtn.style.display = 'none';

    emailScrapeBtn.addEventListener('click', () => {
        // Show the download button when Parse Emails button is clicked
        downloadTxtBtn.style.display = 'inline-block';
        // Clear the alert when a different button is clicked
        alertContainer.textContent = '';
    });

    urlScrapeBtn.addEventListener('click', () => {
        // Show the download button when Parse URLs button is clicked
        downloadTxtBtn.style.display = 'inline-block';
        // Clear the alert when a different button is clicked
        alertContainer.textContent = '';
    });

    phoneNumberScrapeBtn.addEventListener('click', () => {
        // Show the download button when Parse Phone button is clicked
        downloadTxtBtn.style.display = 'inline-block';
        // Clear the alert when a different button is clicked
        alertContainer.textContent = '';
    });


    downloadTxtBtn.addEventListener('click', () => {
        const emailList = document.getElementById('email_list');
        const urlsList = document.getElementById('urls_list');
        const phoneList = document.getElementById('phone_list');

        let contentToDownload = '';

        // Check which list is visible and get its content
        if (emailList.style.display !== 'none') {
            // Get content of email list
            contentToDownload = getEmailListContent(emailList);
        } else if (urlsList.style.display !== 'none') {
            // Get content of URLs list
            contentToDownload = getUrlsListContent(urlsList);
        } else if (phoneList.style.display !== 'none') {
            // Get content of URLs list
            contentToDownload = getPhoneListContent(phoneList);
        }

        // Generate timestamp
        const now = new Date();
        const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;

        // Check if there is content to download
        if (contentToDownload.trim() !== '') {
            // Trigger download with timestamp in the title
            downloadTxtFile(contentToDownload, timestamp);
        } else {
            // Display message in the alert container
            alertContainer.textContent = 'There is no content to download.';
        }
    });

    function getEmailListContent(emailList) {
        return Array.from(emailList.querySelectorAll('li')).map(li => li.textContent).join('\n');
    }

    function getUrlsListContent(urlsList) {
        return Array.from(urlsList.querySelectorAll('li')).map(li => li.textContent).join('\n');
    }

    function getPhoneListContent(phoneList) {
        return Array.from(phoneList.querySelectorAll('li')).map(li => li.textContent).join('\n');
    }

    function downloadTxtFile(content, timestamp) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `download_${timestamp}.txt`; // Include timestamp in the filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});