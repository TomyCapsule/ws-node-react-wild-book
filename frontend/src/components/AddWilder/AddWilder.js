import { useState } from "react";
import styles from './AddWilder.module.css';
import axios from "axios";
import PropTypes from 'prop-types';

const AddWilder = ({setWilderUpdate}) => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newWilder = await axios.post("http://localhost:5000/api/wilder", {
            name,
            city
        });
        setWilderUpdate(newWilder.data);
    }

    return(
        <div>
            <h2>Add a new Wilder</h2>
            <form
                onSubmit={handleSubmit}
                className={styles.addForm}
            >
                <div className={styles.inputContainer}>
                    <label>Name :</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="input name here"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label>City :</label>
                    <input
                        type="text"
                        value={city}
                        placeholder="input city here"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button type="submit">Add Wilder</button>
            </form>
        </div>
    )
}

export default AddWilder;