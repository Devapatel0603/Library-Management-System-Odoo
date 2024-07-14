import React, { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Book from "./Book";
import axios from "axios";

const SearchBook = () => {
  const [bookDetail, setBookDetail] = useState({
    name: "Hello",
    author: "Author",
    year: "2022",
    description: "Description",
    imageLink:
      "http://books.google.com/books/content?id=yDB0tAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBook();
    setIsLoading(false);
  }, []);

  const getBook = async () => {
    const res = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=isbn:9781787123427"
    );
    const resData = await res.data;
    console.log(resData);
    setBookDetail({
      name: resData.items[0].volumeInfo.title,
      author: resData.items[0].volumeInfo.authors[0],
      year: resData.items[0].volumeInfo.publishedDate,
      description: resData.items[0].searchInfo.textSnippet,
      imageLink: resData.items[0].volumeInfo.imageLinks.thumbnail,
    });
  };

  return (
    <div className="mt-4">
      <h2 className="text-center text-xl font-medium text-amber-600">
        Search the book available in library
      </h2>
      <form action="" className="flex mx-auto w-9/12 items-center gap-2">
        <Input inputName="book_name" placeholder="Book Name" />
        <Button buttonText="Search" />
      </form>
      <div className="mt-4 grid grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold my-4">New Arrivals</h2>
          <div className="flex flex-col gap-4">
            {!isLoading && (
              <>
                <Book bookDetail={bookDetail} />
                <Book bookDetail={bookDetail} />
              </>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold my-4">Trending</h2>
          <div className="flex flex-col gap-4">
            {!isLoading && <Book bookDetail={bookDetail} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBook;
