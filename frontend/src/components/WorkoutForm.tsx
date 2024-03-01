import { useState } from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState<string>('');
    const [load, setLoad] = useState<string>('');
    const [reps, setReps] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Function to handle when submitted
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            console.log("yes error:", json.error); // Log the error message
        }
        if (response.ok) {
            setError('')
            setTitle('')
            setLoad('')
            setReps('')
            console.log('new workout added:', json)
          }
      
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            
            <label>Load (kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm