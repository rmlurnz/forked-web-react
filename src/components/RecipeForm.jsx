import { useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeForm = () => {
  const { dispatch } = useRecipesContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [description, setdescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }
    
    const recipe = {title, description}

    const response = await fetch('http://localhost:4000/api/recipes', {
      method: 'POST',
      body:JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setdescription('')
      setError(null)
      setEmptyFields([])
      console.log('new recipe added', json)
      dispatch({type: 'CREATE_RECIPE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Recipe</h3>
      <label>Recipe Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title} 
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Description:</label>
      <input 
        type="text"
        onChange={(e) => setdescription(e.target.value)} 
        value={description} 
        className={emptyFields.includes('description') ? 'error' : ''}
      />
      <button>Add Recipe</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default RecipeForm