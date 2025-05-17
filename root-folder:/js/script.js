 // Wait for the page to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {
    // Book information 
    const books = [
        {
            title: "The Great Adventure",
            author: "John Smith",
            description: "A thrilling journey through unknown lands and mysterious civilizations. Follow the protagonist as they discover hidden treasures and ancient secrets.",
            image: "image/book1.jpg",
            id: "book1"
        },
        {
            title: "Mystery at Midnight",
            author: "Sarah Johnson",
            description: "A detective story filled with twists and turns. Can you solve the mystery before the final page? Follow Detective Parker as she unravels the clues.",
            image: "image/book2.jpg",
            id: "book2"
        },
        {
            title: "Programming Basics",
            author: "Michael Lee",
            description: "Learn the fundamentals of programming in this comprehensive guide. Perfect for beginners who want to start their coding journey with clear examples.",
            image: "image/book3.jpg",
            id: "book3"
        },
        {
            title: "The Hidden Truth",
            author: "Emily Wilson",
            description: "A compelling tale of secrets and revelations. This story will keep you on the edge of your seat as the protagonist uncovers a decades-old conspiracy.",
            image: "image/book4.jpg",
            id: "book4"
        }
    ];
    
    // Find the area where books will be displayed
    const bookList = document.querySelector('.book-list');
    
    // Create and display each book on the page
    books.forEach(book => {
        // Create a new element for each book
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-item');
        
        // Add the book content (image, title, author, description, and button)
        bookElement.innerHTML = `
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="book-details">
                <h3>${book.title}</h3>
                <p><em>By ${book.author}</em></p>
                <p>${book.description}</p>
                <button class="pay-button" data-book="${book.id}">Pay</button>
            </div>
        `;
        
        // Add the book to the page
        bookList.appendChild(bookElement);
    });
    
    // Make the Pay buttons work
    const payButtons = document.querySelectorAll('.pay-button');
    payButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get which book was clicked
            const bookId = this.getAttribute('data-book');
            
            // Go to the payment page
            window.location.href = 'pay.html?book=' + bookId;
        });
    });
});