export const fetchBook = async (isbn) => {
    let book = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    book = await book.json();
    return book;
};
