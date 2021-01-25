import {useState, useEffect} from 'react';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

const App = () => {

	const [alert, setAlert]                 = useState(false);
	const [type, setType]                   = useState('');
	const [msg, setMsg]                     = useState('');
	const [items, setItems]                 = useState(getLocalStorage());
	const [inputBoxValue, setInputBoxValue] = useState('');
	const [isEditing, setIsEditing]         = useState(false);
	const [id, setId]                       = useState('');


	const handleClick = () => {
		if(inputBoxValue === ""){
			setAlert(true);
			setType('error');
			setMsg('Please Enter Item Name');
			return;
		}
		if(isEditing){
			const updatedItems = items.map((i) => {
				if(i.id === id){
					if(i.name === inputBoxValue){
						window.alert('you have not changed anything');
					}
					return {...i, name : inputBoxValue};
				}
				return i;
			})
			setInputBoxValue('');
			setIsEditing(false);
			setItems(updatedItems);
			setAlert(true);
			setMsg('Item Updated');
		}else{
			const item = {id: new Date().getTime().toString(), name : inputBoxValue};
			// setList([...list, newItem]);
			setItems([...items, item]);
			setInputBoxValue("");
			setAlert(true);
			setMsg('Item Added');
		}
		
	}

	useEffect(() => {
		const myTime = setTimeout(() => {
			setAlert(false);
			setType("");
		}, 3000);

		return () => clearTimeout(myTime);
	}, [alert])

	useEffect(() => {
	  localStorage.setItem('list', JSON.stringify(items));
	}, [items]);

	return (
		<div className="container-fluid">
			<div className="row mt-5">
				<div className="col-6 offset-3" style={{backgroundColor : 'white'}}>
					<h2 className="text-center font-weight-bold">Grocery Bud</h2>
					{alert && <Alert type={type} msg={msg} />}
					<div className="text-center border">
						<input type="text"  className="w-75 pt-1" style={{lineHeight : '25px'}} placeholder="e.g. eggs" value={inputBoxValue} onChange={(e) => setInputBoxValue(e.target.value)} />
						<button className="btn btn-primary btn-sm border w-25" style={{marginTop : '-25px !important', height : '35px'}} onClick={handleClick}>{isEditing ? 'Edit' : 'Submit'}</button>
					</div>
				</div>
			</div>
			<div className="row">
			{items.map((i) => {
				const {id, name} = i;
			return (
					<div key={id} className="col-6 offset-3 d-flex justify-content-between" style={{backgroundColor : 'white'}} >
						<div className="mt-2">
							<p>{name}</p>
						</div>
						<div>
							<button className="btn btn-primary" onClick={() => {
								setIsEditing(true);
								setInputBoxValue(name);
								setId(id);
							}}>Edit</button>
							<button className="btn btn-danger" onClick={() => {
								setId(id);
								const newItems = items.filter(i => i.id !== id )
								let confirmed = window.confirm(`Are you Sure to Delete this ${name} form your cart`)
								if(confirmed){
									setItems(newItems);
									setAlert(true);
									setMsg('Item Deleted');
								}
								
								}
							}>Delete</button>
						</div>
					</div>
				)
			})}
				
			</div>
			<div className="row d-flex justify-content-center">
				{ items.length > 0 &&
					<button className="btn btn-outline-danger" onClick={() => {
							setItems([]);
							setAlert(true);
							setType('error');
							setMsg('Item Cleared');
						}}>Clear All</button>
				}
			</div>
		</div>
	)
}

export default App;