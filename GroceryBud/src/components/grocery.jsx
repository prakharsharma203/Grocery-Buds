import { useEffect, useState } from "react";
import "./grocery.css";
import toast from "react-hot-toast";

export const GroceryCard = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || [],
  );

  const submitHandler = () => {
    if (!userInput) {
      toast.error("Please provide value")
      return;
    }
    setData([...data, { grocery: userInput, isCompleted: false }]);
    setUserInput("");
    toast.success("Item added to the list")
  };
  const checkedHandler = (grocery) => {
    setData((prev) =>
      prev.map((detail) =>
        detail.grocery === grocery
          ? { ...detail, isCompleted: !detail.isCompleted }
          : detail,
      ),
    );
  };
  const deleteHandler = (grocery) => {
    setData((prev) => prev.filter((detail) => detail.grocery !== grocery));
    toast.success("Item deleted");
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  return (
    <div className="card">
         <h2>Grocery Bud</h2>
      <input className="input1" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button className="btn1" onClick={submitHandler}>Add item</button>
      {data.map((detail) => (
        <div className="grocery">
          <input
            onChange={() => checkedHandler(detail.grocery)}
            type="checkbox"
            checked={detail.isCompleted}
          />
          <div
            style={{
              textDecoration: detail.isCompleted ? "line-through" : "none",
            }}
          >
            {detail.grocery}
          </div>
          <button className="btn2" onClick={() => deleteHandler(detail.grocery)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
