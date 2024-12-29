import PhotosUploader from "../PhotosUploader.jsx"
import Perks from "../Perks.jsx"
import { useState } from "react"

export default function PlacesFormPage(){
    const [title,setTitle] = useState('')
    const [address,setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    // const [redirectToPlacesList, setRedirectToPlacesList] = useState(false)
    const [description,setDescription] = useState('')
    const [perks,setPerks] = useState([])
    const [extraInfo,setExtraInfo] = useState('')
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [maxGuests,setMaxGuests] = useState(1)

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    };
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header,description){
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addNewPlace(ev){
        ev.preventDefault()
        await axios.post('/places', {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests})
      
    }
     
    return (
        <div>
            <form onSubmit={addNewPlace}>
                {preInput('Title','title for your place, should be short and catchy ')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title for example my lovely apartment" />
                {preInput('Address','Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
                
                {/* <div className="flex gap-2">
                    <input value={photoLink} 
                        onChange={ev => setPhotoLink(ev.target.value)} 
                        type="text" placeholder="Add using a link...jpg"/>
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
                </div>
                <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length >0 && addedPhotos.map(link =>(
                        <div>
                            <img src={'http://localhost:4000/uploads/'+link} alt="" />
                        </div>
                    ))} 
                </div> */}

                {preInput('Photos', 'More equals better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                
                

                {preInput('Description','Describe the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
                {preInput('Perks','Select ava classNameilable perks')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks  selected = {perks} onChange={setPerks}/>
                </div>
                
                {preInput('Extra Info','House rules etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                {preInput('Check In and Out Times','Check In times , have some time for cleaning')}
                
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in Time</h3>
                        <input type="text" 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)}  
                            placeholder="00:00"/>  
                    </div>
                    <div>
                        <h3>Check Out Time</h3>
                        <input type="text" 
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}  
                            placeholder="00:00" />  
                    </div>
                    <div>
                        <h3>Max number of guests</h3>
                        <input type="number" 
                            value={maxGuests} 
                            onChange={ev => setMaxGuests(ev.target.value)}/>
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}


