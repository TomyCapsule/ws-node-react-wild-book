import axios from "axios";
import blank_profile from "../../../assets/blank_profile.png";
import styles from "./Card.module.css";
import Skill from "./Skill/Skill";
import PropTypes from "prop-types";


const Card = ({id, name, grades, city, setWilderUpdate}) => {
  const handleDelete = async () => {
    const deletedWilder = await axios.delete('http://localhost:5000/api/wilder', {
      data: {
        id
      }
    });
    setWilderUpdate(deletedWilder.data);
  }

  return (
    <article className={styles.card}>
      <img src={blank_profile} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      <h5>{city}</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className={styles.skills}>
        {
            grades.map((grade, idx) => (<Skill key={idx} skillName={grade.title} grade={grade.grade} /> ))
        }
      </ul>
      <button onClick={handleDelete} className={styles.button}>Delete</button>
    </article>
  );
};

Card.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  grades: PropTypes.array,
  city: PropTypes.string,
  setWilderUpdate: PropTypes.func
}

export default Card;
