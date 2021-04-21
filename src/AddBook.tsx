import React, { useState, useMemo, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateData, upgrade } from './Dashboard' 

type BookInfo = {
    id: number
    title: string
    author: string
    category: string
    isbn: number
}

const addNewBook = (obj: BookInfo) => {
    updateData(`http://localhost:4200/books`, obj, 'POST')
}

function AddBook() {
    const [books, setBooks] = useState<BookInfo[]>([])
    const { register, setValue, handleSubmit } = useForm<BookInfo>();

    const id = useParams()
    let iId = Object(id)["id"]

    const gettingBook = async () => {
        const api_url = await
            fetch(`http://localhost:4200/books`);
        const data = await api_url.json();
        setBooks(data)
        if(iId != 'new') editBook(Number(iId), data)
    }
    const fetchData = useMemo(() => gettingBook(), [])
  function editBook (iId:number, data: BookInfo[]): void { 
    function formMarkup ({ title, author, category, isbn }: BookInfo) {
      setValue("title", title)
      setValue("author", author)
      setValue("category", category)
      setValue("isbn", isbn)
    }
    formMarkup(data.find(b => b.id == iId)!)
  }
  const history = useHistory()

    const onSubmit = (data: BookInfo) => {
        iId === 'new' ? addNewBook({...data, id: Number(books[books.length-1].id)+1}) : upgrade(data, data.id, 'PUT')
        history.push("/")
    }
    return (
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Book title</label>
                <input id='title' {...register("title", { required: true, maxLength: 20 })} />
                <label htmlFor="author">Book author</label>
                <input id='author' {...register("author", { required: true, maxLength: 20 })} />
                <label htmlFor="isbn">ISBN</label>
                <input id='isbn' {...register("isbn", { required: true, maxLength: 20 })} />
                <select id="category" {...register("category")}>
                    <option value="fantasy">Fantasy</option>
                    <option value="classics">Classics</option>
                    <option value="fiction">Fiction</option>
                </select>
               <input className='submitBtn' type="submit" />            
            </form>
        </>
    )
}

export default AddBook