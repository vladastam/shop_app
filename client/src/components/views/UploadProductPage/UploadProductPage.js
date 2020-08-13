import React, { useState } from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

//const { Title } = Typography;
const { TextArea } = Input;

const Conitents = [
	{key:1, value:"Black Sesame"},
	{key:2, value:"Injeolmi (Roasted Beans)"},
	{key:3, value:"Ssuk (Mugwort)"}
]

function UploadProductPage(props) {

	const [Title, setTitle] = useState("")
	const [Description, setDescription] = useState("")
	const [Price, setPrice] = useState(0)
	const [Continent, setContinent] = useState(1)
	const [Images, setImages] = useState([])
	const [Amount, setAmount] = useState(0)
	const [Calories, setCalories] = useState(0)
	const [Carb, setCarb] = useState(0)
	const [Fiber, setFiber] = useState(0)
	const [Sugar, setSugar] = useState(0)
	const [Fat, setFat] = useState(0)
	const [Protein, setProtein] = useState(0)
	const [Allergy, setAllergy] = useState("")


	const titleChangeHandler = (event) => {
		setTitle(event.currentTarget.value)
	}

	const descriptionChangeHandler = (event) => {
		setDescription(event.currentTarget.value)
	}

	const priceChangeHandler = (event) => {
		setPrice(event.currentTarget.value)
	}

	const amountChangeHandler = (event) => {
		setAmount(event.currentTarget.value)
	}

	const caloriesChangeHandler = (event) => {
		setCalories(event.currentTarget.value)
	}

	const carbChangeHandler = (event) => {
		setCarb(event.currentTarget.value)
	}

	const fiberChangeHandler = (event) => {
		setFiber(event.currentTarget.value)
	}

	const sugarChangeHandler = (event) => {
		setSugar(event.currentTarget.value)
	}

	const fatChangeHandler = (event) => {
		setFat(event.currentTarget.value)
	}

	const proteinChangeHandler = (event) => {
		setProtein(event.currentTarget.value)
	}

	const allergyChangeHandler = (event) => {
		setAllergy(event.currentTarget.value)
	}

	const continentChangeHandler = (event) => {
		setContinent(event.currentTarget.value)
	}

	const updateImages = (newImages) => {
		setImages(newImages)
	}

	const submitHandler = (event) => {
		event.preventDefault();

		if(!Title || !Description || !Price || !Continent || !Images
			|| !Amount|| !Calories || !Carb || !Fat || !Protein || !Allergy || !Fiber || !Sugar) {
			return alert(" 모든 값을 넣어주셔야 합니다. ")
		}


		//서버에 채운 값들을 request로 보낸다.

		const body = {
			//로그인 된 사람의 ID
			writer: props.user.userData._id,
			title: Title,
			description: Description,
			price: Price,
			images: Images,
			contients: Continent,
			amount: Amount,
			calories: Calories,
			carb: Carb,
			fiber: Fiber,
			sugar: Sugar,
			fat: Fat,
			protein: Protein,
			allergy: Allergy
		}

		Axios.post("/api/product", body)
			.then(response => {
				if(response.data.success) {
					alert('Upload successful')
					props.history.push('/')
				} else {
					alert('Upload failed')
				}
			})

	}

	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h2> Upload Product </h2>
			</div>


			<Form onSubmit={submitHandler}>
				{/* DropZone */}

				<FileUpload refreshFunction={updateImages} />

				<br />
				<br />
				<label>Name</label>
				<Input onChange={titleChangeHandler} value={Title} />
				<br />
				<br />
				<label>Description</label>
				<TextArea onChange={descriptionChangeHandler} value={Description} />
				<br />
				<br />
				<label>Price($)</label>
				<Input type="number" onChange={priceChangeHandler} value={Price} />
				<br />
				<br />
				<label>Quantity</label>
				<Input type="number" onChange={amountChangeHandler} value={Amount} />
				<br />
				<br />
				<label>Calories</label> &emsp;&emsp;
				<label>Carbs</label> &emsp;&emsp;
				<label>Fiber</label> &emsp;&emsp;
				<label>Sugar</label> &emsp;&emsp;
				<label>Fat</label> &emsp;&emsp;&emsp;
				<label>Protein</label> &emsp;&emsp;
				<Input.Group>
					<Input type="number" style ={{width:"10%"}} onChange={caloriesChangeHandler} value={Calories} />
					<Input type="number" style ={{width:"10%"}} onChange={carbChangeHandler} value={Carb} />
					<Input type="number" style ={{width:"10%"}} onChange={fiberChangeHandler} value={Fiber} />
					<Input type="number" style ={{width:"10%"}} onChange={sugarChangeHandler} value={Sugar} />
					<Input type="number" style ={{width:"10%"}} onChange={fatChangeHandler} value={Fat} />
					<Input type="number" style ={{width:"10%"}} onChange={proteinChangeHandler} value={Protein} />
				</Input.Group>
				<br />
				<label>Allergy</label>
				<TextArea onChange={allergyChangeHandler} value={Allergy} />
				<br />
				<br />
				<label>Flavor</label>
				<br />
				<select onChange={continentChangeHandler} value={Continent}>

					{Conitents.map(item => (
						<option key={item.key} value={item.key}> {item.value} </option>
					))}

				</select>
				<br />
				<br />
				<Button
					onClick={submitHandler}
				>
					Submit
				</Button>

			</Form>


		</div>
	)
}

export default UploadProductPage