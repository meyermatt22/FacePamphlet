import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editProfileThunk, getCurrProfThunk } from "../../store/profiles";
import './ProfPageEditForm.css'

function ProfPageEditForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getCurrProfThunk())
    }, [dispatch])

    const profiles = useSelector(state => Object.values(state.profiles))
    console.log('current users profiles', profiles)
    let userProf = ''

    for(let i = 0; i < profiles.length; i++) {
        if (profiles && profiles[i].userId === parseInt(sessionUser.id)) {
            userProf = profiles[i]
        }
    }

    // console.log('current users profile', userProf)

    const [bio, setBio] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [profPic, setProfPic] = useState('')
    const [backgroundPic, setBackgroundPic] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        if (userProf) {
          setBio(userProf.bio)
          setFirstName(userProf.firstName)
          setLastName(userProf.lastName)
          setMiddleName(userProf.middleName)
          setProfPic(userProf.profPic)
          setBackgroundPic(userProf.backgroundPic)
          setDateOfBirth(userProf.dateOfBirth)
        }
      }, [userProf])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if(validationErrors.length) return alert('Your Profile has errors, cannot submit!')

        const formData = new FormData()
        // formData.append()
        formData.append('bio', bio)
        formData.append('date_of_birth', dateOfBirth)
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('middle_name', middleName)
        formData.append('prof_pic', profPic)
        formData.append('background_pic', backgroundPic)

        const updatedProf = await dispatch(editProfileThunk(formData, sessionUser.id))

        setBio(userProf.bio)
        setDateOfBirth(userProf.dateOfBirth)
        setFirstName(userProf.firstName)
        setLastName(userProf.lastName)
        setMiddleName(userProf.middleName)
        setProfPic(userProf.profPic)
        setBackgroundPic(userProf.backgroundPic)
        setValidationErrors([])
        setHasSubmitted(false)

        history.push(`/profiles/current`)
    }

    useEffect(() => {
        const errors = [];
        // Only adding to the validation errors for fields that are nullable=False in the Song model
        // if (!dateOfBirth) errors.push('Please enter a dateOfBirth!')
        if (!firstName) errors.push('Please provide a first name!')
        if (!lastName) errors.push('Please provide a last name!')
        setValidationErrors(errors)
    }, [ firstName, lastName ])

    if(!userProf) {
        return 'no profile found for user'
    }
    return (
        <div id="newProfileForm">
            <h1>Edit your profile!</h1>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    <h2>The following errors were found:</h2>
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form
                onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data"
                id="newProfForm"
            >
                <div className="form-input-box first-name-input">
                    <div><label for="name">first name:</label></div>
                    <input
                        className="inBox"
                        placeholder="first name"
                        type="text"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required={true}
                        >
                    </input>
                </div>
                <div className="form-input-box last-name-input">
                    <div><label for="name">last name:</label></div>
                    <input
                        className="inBox"
                        placeholder="last name"
                        type="text"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required={true}
                    >
                    </input>
                </div>
                <div className="form-input-box middle-name-input">
                    <div><label for="name">middle name:</label></div>
                    <input
                        className="inBox"
                        placeholder="middle name"
                        type="text"
                        name="middleName"
                        onChange={(e) => setMiddleName(e.target.value)}
                        value={middleName}
                        >
                    </input>
                </div>
                    <div id="aboutBox">
                        <h4 id="aboutBoxin">About me:</h4>
                    </div>
                <div className="form-input-box bio-input">
                    <div><label for="bio"></label></div>
                    <input
                        className="inBox1"
                        placeholder="biography"
                        type="textArea"
                        name="bio"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        >
                    </input>
                </div>

                <div className="form-input-box">
                    <div><label for="profPic">Profile Image:</label></div>
                    <input
                        className="inBox2"
                        placeholder="profile image (jpg, png...)"
                        type="text"
                        name="profPic"
                        accept="image/*"
                        onChange={(e) => setProfPic(e.target.value)}
                        >
                    </input>
                </div>
                <div className="form-input-box">
                    <div><label for="backgroundPic">Background Image:</label></div>
                    <input
                        className="inBox2"
                        placeholder="background image (jpg, png...)"
                        type="text"
                        name="backgroundPic"
                        accept="image/*"
                        onChange={(e) => setBackgroundPic(e.target.value)}
                        >
                    </input>
                </div>
                <div className="form-input-box">
                    <label for="birthday">Birthday:</label>
                    <input

                        type="date"
                        name="birthday"
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        >
                    </input>

                </div>
                <div className="submitBtn">
                    <button className="confirm-submit" type="submit">Create Profile</button>
                </div>
            </form>
        </div>
    )
}

export default ProfPageEditForm;
