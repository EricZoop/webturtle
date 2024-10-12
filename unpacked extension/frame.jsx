document.getElementById('show_window').addEventListener('click', toggleIframe);

function makeFrame() {
    var site = "https://ezipor.pythonanywhere.com/";
    var iframe = "<iframe src='" + site + "' style='width: 340px; height: 280px; border: none; border-radius: 10px; display: block;'></iframe>";
    document.getElementById("iframe").innerHTML = iframe;
    console.log(site);
}

function toggleIframe() {
    var iframe = document.getElementById('iframe').querySelector('iframe');
    if (!iframe) {
        makeFrame();
        iframe = document.getElementById('iframe').querySelector('iframe');
    }

    if (iframe.style.display === 'none') {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
}

makeFrame(); // Create the iframe initially with display: block;