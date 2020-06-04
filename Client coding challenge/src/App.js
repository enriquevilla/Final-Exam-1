import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            error: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.bookName.value}`)
            .then(r => {
                return r.json();
            })
            .then(bookData => {
                console.log(bookData);
                if (bookData.totalItems === 0) {
                    this.setState(() => {
                        return {error: "No books found for your search term"}
                    });
                } else {
                    const newBooks = bookData.items.map(i => {
                        return {
                            title: i.volumeInfo.title,
                            authors: i.volumeInfo.authors,
                            image: i.volumeInfo.imageLinks.thumbnail,
                            snippet: i.searchInfo.textSnippet
                        }
                    });
                    this.setState(() => {
                        return {books: newBooks,
                                error: ""}
                    });
                }
            })
    }

    render() {
        let key = 0;
        const books = this.state.books.map(i => {
            return <Book 
                        title={i.title}
                        authors={i.authors}
                        image={i.image}
                        snippet={i.snippet}
                        key={key++}
                    >
                    </Book>
        });
        return (
            <div>
                <BookForm
                    handleSubmit={this.handleSubmit}
                >
                </BookForm>
                {this.state.error?this.state.error:books}
            </div>
        )
    }

}

export default App;
