 // Wait for the page to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {
    // Create a hamburger menu icon for mobile devices
    const nav = document.querySelector('nav');
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '☰';
    
    // Add the hamburger menu to the page
    const header = document.querySelector('header');
    header.insertBefore(hamburgerMenu, nav);
    
    // Make the hamburger menu show/hide the navigation when clicked
    hamburgerMenu.addEventListener('click', function() {
        const navList = document.querySelector('nav ul');
        navList.classList.toggle('show');
    });
    
    // Hide the menu when clicking elsewhere on the page
    document.addEventListener('click', function(event) {
        const navList = document.querySelector('nav ul');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        
        // If clicked outside the menu and hamburger icon, hide the menu
        if (!navList.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            navList.classList.remove('show');
        }
    });
});