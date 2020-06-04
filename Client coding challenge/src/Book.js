import React from 'react';

function Book( props ){
    let key = 0;
    return(
        <div className="book-container">
            <h2>
                {props.title}
            </h2>
            <p>
                By:
            </p>
            <ul>
                {props.authors.map(i => {
                    return <li
                            key={key++}>
                        {i}
                    </li>
                })}
            </ul>
            <img src={props.image} alt="Book cover"/>
            <p>
                {props.snippet}
            </p>
        </div>
    );
}

export default Book;