// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from "react-router";
// import { useHistory } from 'react-router-dom';

// import { thunkEditAsset, thunkAddAsset } from '../../../store/assetReducer';

// import "./BuyOrCreateAsset.css"


// const BuyOrCreateAsset = ({ isNew, buyingPower, marketPrice, setIsNew }) => {
//     const dispatch = useDispatch();
//     const [quantity, setQuantity] = useState('');
//     const [hasSubmitted, setHasSubmitted] = useState(false);
//     const [validationErrors, setValidationErrors] = useState([]);
//     const [errors, setErrors] = useState([]);
//     const history = useHistory();
//     const { symbol } = useParams();


//     useEffect(() => {
//         const errors = [];
//         if (quantity <= 0) {
//             errors.push("Please input valid numbers")
//         }
//         if (quantity * marketPrice > buyingPower) {
//             errors.push("Sorry You dont have so much buyingpower")
//         }
//         setValidationErrors(errors);
//     }, [quantity])

//     let handleSubmit
//     // console.log('isNew-----------', isNew)
//     if (!!isNew) {
//         handleSubmit = async (e) => {
//             e.preventDefault();
//             setHasSubmitted(true)
//             console.log('+++++++++++++++++++++++',isNew)
//             if (validationErrors.length) { return }

//             const assetPayload = { quantity, symbol }
//             assetPayload.purchased_price = marketPrice

//             // console.log("!!!!!frontend", assetPayload)

//             let createdAsset = await dispatch(thunkAddAsset(assetPayload))

//             setErrors(validationErrors)
//             if (!validationErrors.length) {
//                 setHasSubmitted(true);
//                 if (createdAsset) {

//                     setValidationErrors([]);
//                     setErrors([]);
//                     setIsNew(false)
//                     // console.log(createdChannel)
//                 }
//             }
//         }
//     } else {
//         handleSubmit = async (e) => {
//             e.preventDefault();
//             setHasSubmitted(true);
//             console.log('----------------------',isNew)
//             if (validationErrors.length) { return }

//             const editedAssetPayload = { quantity, symbol }
//             editedAssetPayload.purchased_price = marketPrice
//             // console.log('editedAssetPayload!!!!!!!!!!!!', editedAssetPayload)

//             let editedAsset = await dispatch(thunkEditAsset(editedAssetPayload))

//             if (!validationErrors.length) {
//                 setHasSubmitted(true);
//                 if (editedAsset) {
//                     // history.push(`/`)
//                     setValidationErrors([]);
//                     setErrors([]);
//                 }
//             }
//         }
//     }


//     return (
//         <>
//             <form onSubmit={handleSubmit} className="channel-edit-form">

//                 {hasSubmitted && !!validationErrors.length && (
//                     <div className='error3-lists'>
//                         <ul className='error-list'>
//                             {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
//                         </ul>
//                     </div>
//                 )}

//                 <div className="input-content-1">
//                     <input type="text"
//                         value={quantity}
//                         onChange={(e) => setQuantity(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <span>Market Price</span>
//                     <span>${marketPrice}</span>
//                 </div>

//                 <div className="editedChannel-button">
//                     <button className="e-c-button"
//                         onClick={handleSubmit}
//                         type="submit">buy asset</button>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default BuyOrCreateAsset;
