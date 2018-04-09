
const getpetlist = (state=[], action) => {
  const { type, data} = action;
  switch (type){
  	case "GET_GETPETLIST":
  	   return [...state, data];
  	default:
  	   return state;
  }
}

export default getpetlist;
