import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    title: '',
    message: ''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    }
})

const PostMessageForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postMessageList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.title = values.title ? "" : "This field is required."
        temp.message = values.message ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Submitted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId == 0)
                props.createPostMessage(values, onSuccess)
            else
                props.updatePostMessage(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={values.title}
                onChange={handleInputChange}
                {...(errors.title && { error: true, helperText: errors.title })}
            />
            <TextField
                name="message"
                variant="outlined"
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={values.message}
                onChange={handleInputChange}
                {...(errors.message && { error: true, helperText: errors.message })}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Submit</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    createPostMessage: actions.create,
    updatePostMessage: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessageForm));