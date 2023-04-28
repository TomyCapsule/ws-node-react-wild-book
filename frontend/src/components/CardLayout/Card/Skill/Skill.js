import styles from "./Skill.module.css";
import PropTypes from 'prop-types';

const Skill = ({ skillName, grade }) => {
  return (
    <li>
      {skillName}
      <span className={styles.votes}>{grade}</span>
    </li>
  );
};

Skill.propTypes = {
  skillName: PropTypes.string,
  grade: PropTypes.number
}

export default Skill;
