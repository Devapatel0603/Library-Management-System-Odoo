import React from "react";

const Book = ({ bookDetail }) => {
  return (
    <>
      <div className="flex gap-2">
        <img src={bookDetail.imageLink} alt="" className="w-32" />
        <div>
          <h2 className="cursor-pointer font-medium text-blue-600 hover:text-blue-700">
            {bookDetail.name}
          </h2>
          <div className="flex gap-2">
            <h2 className="cursor-pointer font-medium text-blue-600 hover:text-blue-700">
              {bookDetail.author}
            </h2>
            •<h2>{bookDetail.year}</h2>
          </div>
          <p className="text-gray-400 text-sm">{bookDetail.description}</p>
        </div>
      </div>
    </>
  );
};

export default Book;
