import React from "react";
import {useForm} from "react-hook-form";


const Payment = () => {
    const {
        register,
        handleSubmit,
        errors,
        formState: {isSubmitting}
    } = useForm();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <div className="container">
            <form className="Form" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="headerBorder">Payment</h1>
                <div className="row">
                    <div className="col-md-5">

                        <label> Bank account owner name</label>
                        <input
                            value="1"
                            name="email"
                            ref={register({required: true, pattern: /^\S+@\S+$/i})}
                        />
                        <ErrorMessage error={errors.email}/>


                    </div>
                    <div className="col-md-2">
                        <label>Payment day</label>
                        <input name="lastName" ref={register({required: true, minLength: 2})}/>
                        <ErrorMessage error={errors.firstName}/>
                    </div>


                    <div className="col-md-3">
                        <label>Currency</label>
                        <input
                            name="age"
                            type="text"
                            ref={register({required: true})}
                        />
                        <ErrorMessage error={errors.age}/>
                    </div>


                </div>
                <div className="row">
                    <div className="col-md-5">
                        <label>Bank account number</label>
                        <input
                            name="age"
                            type="text"
                            ref={register({required: true, min: 18})}
                        />
                        <ErrorMessage error={errors.age}/>
                    </div>

                    <div className="col-md-2">

                        <label>Rental payment</label>
                        <input name="firstName" ref={register({required: true, minLength: 10})} disabled={false}/>
                        <ErrorMessage error={errors.firstName}/>


                    </div>

                    <div className="col-md-5">
                        <label>Who pays for the Rendin service?</label>
                        <select name="gender" ref={register({required: true})}>
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <ErrorMessage error={errors.gender}/>

                    </div>
                </div>


                <input disabled={isSubmitting} type="submit"/>
            </form>
        </div>
    );
};

export default Payment;


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