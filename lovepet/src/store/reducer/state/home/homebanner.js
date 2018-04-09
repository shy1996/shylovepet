
const homebanner = (state=[], action) => {
  const { type, data} = action;
  switch (type){
  	case "GET_BANNER":
  	   return [...state, data];
  	default:
  	   return state;
  }
}



export default homebanner;
