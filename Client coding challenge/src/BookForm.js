import React, {useState} from 'react';

function BookForm( props ){
    const [inputValue, updateValue] = useState("");

    return (
        <div>
            <form onSubmit={(e) => props.handleSubmit(e)}>
                <input 
                    type="text" 
                    placeholder="Search for a book"
                    value={inputValue}
                    onChange={(e) => updateValue(e.target.value)}
                    name="bookName"
                />
                <button type="submit">
                    Search
                </button>
            </form>
        </div>
    );
}

export default BookForm;