import "./Cell.css";

function Cell(props) {
  //props - value, clickHandle function
  //value can be 'X', 'O', or an empty string
  return (
    <div className={`cell ${props.className}`} onClick={props.onClick}>
      {props.value}
    </div>
  );
}

export default Cell;
