import React, { useState, useMemo } from 'react';
import { Link } from "react-router-dom";

type BookInfo = {
    id: number
    title: string
    author: string
    category: string
    isbn: number
  }
export const upgrade = (obj = {}, id: number, method: string) => {
    updateData(`http://localhost:4200/books/${id}`, obj, method)
}

export async function updateData(url = '', data = {}, method:string) {
    const response = await fetch(url, {
        method, 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
    });
    return await response.json(); 
}


function Dashboard() {
    const [books, setBooks] = useState<BookInfo[]>([])

    const markup = ({ id, title, author, category, isbn }: BookInfo) => {
        return (
            <tr key={id}>
            <td>{title}</td>
            <td>{author}</td>
            <td>{category}</td>
            <td>{isbn}</td>
            <td>
                <Link to={`/book/${id}`}>
                    <button className='actionBtn'>
                        Edit book
                    </button>     
                </Link>
                <button className='actionBtn' onClick={() => {
                    upgrade({}, id, 'DELETE')
                    gettingBooks()
                }}>
                    Delete
                </button>
            </td>
            </tr>
        )
    }

    const gettingBooks = async () => {
        const api_url = await
            fetch(`http://localhost:4200/books`);
        const data = await api_url.json();
        setBooks(data)
    }
    const fetchData = useMemo(() => gettingBooks(), [])

    const rendered = books.map(b => markup(b))

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Book title</th>
                        <th>Author name</th>
                        <th>Category</th>
                        <th>ISBN</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rendered}
                </tbody>
            </table>
      </>
    )
}

export default Dashboard;