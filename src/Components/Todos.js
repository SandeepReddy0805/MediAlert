import React from 'react'
import { IndividualTodo } from './IndividualTodo'

export const Todos = ({todos, deleteTodo, editModal}) => {
    return (
        <div className='todos'>
            {todos.map((individualTodo)=>(
                <IndividualTodo individualTodo={individualTodo}
                key={individualTodo.id} deleteTodo={deleteTodo}
                    editModal={editModal}
                />))   
            }
        </div>);
}
