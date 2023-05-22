import { useEffect, useState } from "react"
import AllPosts from "../PostPageAll"
import AllProfiles from "../ProfPageAll"

function HomePage() {

    const [selected, setSelected] = useState('option1');

    const handleChange = (e) => {
        e.preventDefault();
        if (selected === 'option1') {
            setSelected('option2')
        } else {
            setSelected('option1')
        }
    }

    return (
        <div>
            <h1>Home page</h1>
            <form >
                <div className="radio">
                  <label>
                    <input type="radio" value="option1" checked={selected === 'option1'} onChange={handleChange}/>
                    all posts
                  </label>
                </div>
                <div className="radio">
                  <label>
                  <input type="radio" value="option2" checked={selected === 'option2'} onChange={handleChange}/>
                    all profiles
                  </label>
                </div>
            </form>
            {selected === 'option1' && (
                <AllPosts />
            )}
            {selected === 'option2' && (
                <AllProfiles />
            )}
        </div>
    )
}

export default HomePage
