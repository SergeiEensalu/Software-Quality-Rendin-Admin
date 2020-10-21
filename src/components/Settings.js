import React from "react";
import {useForm} from "react-hook-form";


const Settings = () => {
    const {
        register,
        handleSubmit,
        errors,
        setError,
        clearError,
        formState: { isSubmitting }
    } = useForm();
    const onSubmit = data => {
        alert(JSON.stringify(data));
    };
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const validateUserName = async value => {
        await sleep(1000);
        if (value !== "bill") {
            setError("username", "validate");
        } else {
            clearError("username");
        }
    };

    return (
        <div className="container">
            <form className="Card" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="headerBorder">Profile settings</h1>
                <label>First Name:</label>
                <input name="firstName" ref={register({ required: true })} />
                <ErrorMessage error={errors.firstName} />

                <label>Last Name:</label>
                <input name="lastName" ref={register({ required: true, minLength: 2 })} />
                <ErrorMessage error={errors.firstName} />

                <label>Gender</label>
                <select name="gender" ref={register({ required: true })}>
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <ErrorMessage error={errors.gender} />

                <label>Username</label>
                <input
                    name="username"
                    onBlur={e => validateUserName(e.target.value)}
                    ref={register({ required: true, validate: validateUserName })}
                />
                <ErrorMessage error={errors.username} />

                <label>Email</label>
                <input
                    name="email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                <ErrorMessage error={errors.email} />

                <label>Age</label>
                <input
                    name="age"
                    type="number"
                    ref={register({ required: true, min: 18 })}
                />
                <ErrorMessage error={errors.age} />

                <label>About you</label>
                <textarea name="aboutyou" ref={register} />

                <input disabled={isSubmitting} type="submit" />
            </form>
        </div>
    );
};

export default Settings;


function ErrorMessage(error) {
    if (error.error) {
        switch (error.error.type) {
            case "required":
                return <p>This is required</p>;
            case "minLength":
                return <p>Your last name need minmium 2 charcaters</p>;
            case "pattern":
                return <p>Enter a valid email address</p>;
            case "min":
                return <p>Minmium age is 18</p>;
            case "validate":
                return <p>Username is already used</p>;
            default:
                return null;
        }
    }

    return null;
}