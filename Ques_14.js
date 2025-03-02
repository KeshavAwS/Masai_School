function createBook(title, author) {
    return {
        title,
        author,
        printInfo() {
            console.log("Book: " + this.title + ", Author: " + this.author);
        }
    };
}

const book = createBook("1984", "George Orwell");
book.printInfo();