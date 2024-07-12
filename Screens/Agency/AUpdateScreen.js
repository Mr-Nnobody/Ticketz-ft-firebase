import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/config";

//implement data passing pproperty to function
// collect data from view item about item
const Update = (props) => {
  const Id = item.id;
  const docToUpdate = doc(database, "Tickets", Id);

  const updateData = () => {
    updateDoc(docToUpdate, {
      agencyName: agencyName,
      city: city,
      arrival_city: arrcity,
      departure_time: deptime,
      est_arrival_time: est_arrtime,
      date: date,
      price: price,
      available: available
    })
      .then(() => {
        alert("Data updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    //similar to add ticket logic
  )
};
