import { useEffect, useState } from "react";
import Card from "./Card/Card";
import styles from "./CardLayout.module.css";
import axios from "axios";
import AddWilder from "../AddWilder/AddWilder";

const dummyData = [
    { id: 1, name: 'Tomy Visou', votes: { 'HTML': 3, 'CSS': 3, 'Typescript': 3, 'React': 3, 'Node': 4} },
    { id: 2, name: 'Tomy Thiphon', votes: { 'HTML': 3, 'CSS': 3, 'Typescript': 4, 'React': 2, 'Node': 5} },
    { id: 3, name: 'Tomy Vaisthe', votes: { 'HTML': 3, 'CSS': 3, 'Typescript': 5, 'React': 1, 'Node': 1} },
]

const CardLayout = () => {
  const [wilders, setWilders] = useState([]);
  const [wilderUpdate, setWilderUpdate] = useState({});

  useEffect(() => {
    const fetchWilders = async () => {
      try{
        const wilders = await axios.get('http://localhost:5000/api/wilder');
        setWilders(wilders.data.reverse());
      }catch(err){
        console.log(err)
      }
    }

    fetchWilders();
  },[wilderUpdate]);


  return (
    <>
      <AddWilder setWilderUpdate={setWilderUpdate}/>
      <h2>Wilders</h2>
      <section className={styles.cardRow}>
        {
            wilders.map(wilder => <Card key={wilder.id} id={wilder.id} name={wilder.name} grades={wilder.skills} city={wilder.city} setWilderUpdate={setWilderUpdate}/>)
        }
      </section>
    </>
  );
};

export default CardLayout;
